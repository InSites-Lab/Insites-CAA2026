import { useEffect, useRef, useState } from 'react';

// ─────────────────────────────────────────────────────────────
// PHASE-1 GATE — does vis-network render inside a Claude artifact?
// Loads vis-network from cdnjs (the whitelisted host) the same way the
// runtime will, and draws a tiny graph. If a colored node-graph appears
// below, vis-network works in the artifact → KG-via-vis-network is GO.
// Paste into a claude.ai chat → render as a React artifact.
// ─────────────────────────────────────────────────────────────
const VIS_URL = 'https://cdnjs.cloudflare.com/ajax/libs/vis-network/9.1.9/standalone/umd/vis-network.min.js';

export default function App() {
  const ref = useRef(null);
  const [status, setStatus] = useState('loading vis-network…');
  const [err, setErr] = useState('');

  useEffect(() => {
    function draw() {
      if (!window.vis) { setStatus('script loaded but window.vis missing'); return; }
      try {
        const nodes = new window.vis.DataSet([
          { id: 1, label: 'Asset', color: { background: 'rgba(229,57,53,0.7)', border: '#E53935' } },
          { id: 2, label: 'Place', color: { background: 'rgba(16,185,129,0.7)', border: '#10b981' } },
          { id: 3, label: 'Cultural Value', color: { background: 'rgba(99,102,241,0.7)', border: '#6366f1' } },
          { id: 4, label: 'Event', color: { background: 'rgba(239,68,68,0.7)', border: '#ef4444' } },
        ]);
        const edges = new window.vis.DataSet([
          { from: 1, to: 2, label: 'located_in' },
          { from: 1, to: 3, label: 'embodies' },
          { from: 3, to: 4, label: 'commemorates' },
        ]);
        const net = new window.vis.Network(ref.current, { nodes, edges }, {
          nodes: { shape: 'dot', size: 18, font: { size: 14 } },
          edges: { arrows: 'to', font: { size: 11, align: 'middle' }, smooth: { type: 'curvedCW', roundness: 0.2 } },
          physics: { stabilization: true },
        });
        net.once('stabilizationIterationsDone', () => setStatus('✅ RENDERED — vis-network works in the Claude artifact'));
        setStatus('✅ network created — stabilizing…');
      } catch (e) {
        setStatus('❌ vis.Network threw');
        setErr(e && e.message ? e.message : String(e));
      }
    }
    if (window.vis) { draw(); return; }
    const s = document.createElement('script');
    s.src = VIS_URL;
    s.onload = () => { setStatus('script loaded — drawing…'); draw(); };
    s.onerror = () => setStatus('❌ failed to load vis-network from cdnjs');
    document.head.appendChild(s);
  }, []);

  return (
    <div style={{ font: '14px system-ui, sans-serif', padding: 16, color: '#0f172a' }}>
      <h3 style={{ margin: '0 0 4px' }}>vis-network — Claude artifact smoke test</h3>
      <p style={{ marginTop: 0, color: '#475569' }}>Status: <b>{status}</b></p>
      {err && <pre style={{ color: '#dc2626', whiteSpace: 'pre-wrap' }}>{err}</pre>}
      <div ref={ref} style={{ height: 380, border: '1px solid #e2e8f0', borderRadius: 10, background: '#f8fafc' }} />
      <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 10 }}>
        PASS = a graph of 4 colored nodes with arrowed edges appears and the status reads “RENDERED”. FAIL = a thrown error, a blank box, or “failed to load”.
      </p>
    </div>
  );
}
