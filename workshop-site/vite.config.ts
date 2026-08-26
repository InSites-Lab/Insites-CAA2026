import fs from 'fs';
import path from 'path';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// ─── /notes — the speaker's running notes, dev only ────────────────
// docs/NOTES.MD is the talk's punch-list. It lives outside the app on purpose
// (it is not content, it is scaffolding), but it has to be READABLE from
// another machine while the deck is being worked on — over the tunnel, on a
// phone, from the other side of a hotel room.
//
// `apply: 'serve'` is what makes this development-only, and it is not a flag
// that can be forgotten: the plugin is never handed to the build at all, so
// there is nothing to strip out later and no way for /notes to reach a
// deployed site. Stop the dev server and the URL stops existing.
//
// The file is read on every request rather than at startup, so saving the
// notes and reloading the page is the whole loop.
const devNotesPlugin = (): Plugin => ({
  name: 'dev-notes',
  apply: 'serve',
  configureServer(server) {
    server.middlewares.use('/notes', (_req, res) => {
      const file = path.resolve(__dirname, 'docs/NOTES.MD');
      let raw: string;
      try {
        raw = fs.readFileSync(file, 'utf8');
      } catch {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end('docs/NOTES.MD not found');
        return;
      }

      const escape = (s: string) =>
        s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

      // The notes have exactly one piece of structure: a line that names a tab
      // starts a section. Everything else is a line of prose, kept as written —
      // this is a reading view of a scratch file, not a Markdown renderer.
      const body = raw
        .split(/\r?\n/)
        .map((line) => {
          const text = escape(line.trim());
          if (!text) return '<div class="gap"></div>';
          if (/^tab\s*\d/i.test(text)) return `<h2>${text}</h2>`;
          return `<p>${text}</p>`;
        })
        .join('\n');

      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      // Never let a proxy or a browser hold on to a copy — the point is that a
      // reload shows what was just typed.
      res.setHeader('Cache-Control', 'no-store');
      res.end(`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Speaker notes — Heritage 4.0</title>
<style>
  :root { color-scheme: light dark; }
  body { margin: 0; padding: 2.5rem 1.5rem 6rem; background: #f8fafc; color: #1e293b;
         font: 17px/1.65 -apple-system, "Segoe UI", system-ui, sans-serif; }
  main { max-width: 46rem; margin: 0 auto; }
  h1 { font-size: 1.1rem; font-weight: 800; letter-spacing: .12em; text-transform: uppercase;
       color: #94a3b8; margin: 0 0 2rem; }
  h2 { font-size: 1.05rem; font-weight: 800; letter-spacing: .1em; text-transform: uppercase;
       color: #4f46e5; margin: 2.25rem 0 .75rem; }
  h2:first-of-type { margin-top: 0; }
  p { margin: .35rem 0; }
  .gap { height: .6rem; }
  footer { max-width: 46rem; margin: 3rem auto 0; padding-top: 1rem; border-top: 1px solid #e2e8f0;
           font-size: .8rem; color: #94a3b8; }
  @media (prefers-color-scheme: dark) {
    body { background: #0f172a; color: #e2e8f0; }
    h2 { color: #a5b4fc; }
    footer { border-color: #1e293b; }
  }
</style>
</head>
<body>
<main>
<h1>Speaker notes</h1>
${body}
</main>
<footer>docs/NOTES.MD · read live from disk · development server only</footer>
</body>
</html>`);
    });
  },
});

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    // נסה לקרוא מכמה שמות אפשריים
    const apiKey = env.GEMINI_API_KEY || env.VITE_GEMINI_API_KEY || '';
    return {
      base: './', // נתיבים יחסיים לתמיכה בכל סביבת hosting
      server: {
        port: 3000,
        host: '0.0.0.0',
        // Vite 6 rejects any request whose Host header it does not recognise
        // ("Blocked request. This host is not allowed."), which is every
        // request that arrives through a tunnel. This lets a Cloudflare quick
        // tunnel through — the random *.trycloudflare.com hostname it hands
        // out — so the dev server can be shown to someone off this network.
        // It widens nothing on its own: reaching the server still requires the
        // tunnel to be running and its URL to be known.
        allowedHosts: ['.trycloudflare.com'],
      },
      plugins: [react(), devNotesPlugin()],
      define: {
        'process.env.API_KEY': JSON.stringify(apiKey),
        'process.env.GEMINI_API_KEY': JSON.stringify(apiKey)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
