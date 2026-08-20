import React, { useState } from "react";
import { Cpu } from "lucide-react";

// ─── Sizing — the only place to tune the header ────────────────────
// Same idea as `SIZE` in Sidebar.tsx: every dimension in this bar comes from
// here, so one edit moves the whole row instead of five scattered literals.
//
// The header deliberately gives weight to the tab bar below it — that bar is
// the spine of the talk and this is a colophon. If you raise `height`, raise
// `title` and `logo` with it or the row will look empty.
//
// NOTE: the app is scaled by `--app-zoom` (index.css), currently 1.1 — so 40px
// here paints as 44px. Judge the size on screen, not from the number.

// Each value is "phone lg:desktop". The header is a colophon on a large
// screen and pure overhead on a small one, where every pixel it takes comes
// out of the slide — so it shrinks hard below lg.
const SIZE = {
  height: 'h-11 lg:h-14',
  gap: 'gap-2 lg:gap-3',
  padX: 'px-3 lg:px-6',

  title: 'text-[13px] lg:text-[20px]',
  titleWeight: 'font-bold lg:font-black',

  subtitle: 'text-[20px]',    // desktop only — hidden below lg
  subtitleWeight: 'font-bold',

  divider: 'w-px h-6',
  dividerGap: 'mx-3',

  authors: 'text-[20px]',     // desktop only
  authorsWeight: 'font-medium',

  lab: 'text-[13px] lg:text-[24px]',
  labWeight: 'font-bold',
  logo: 'h-6 lg:h-10',

  icon: 14,                   // the Cpu glyph on a phone, in px
  iconLg: 18,                 // ...and from lg
  iconPad: 'p-1 lg:p-2',
  iconRadius: 'rounded-md',
} as const;

// ─── Colour ────────────────────────────────────────────────────────
// Everything sits on the near-black bar, so these are all light-on-dark.
// Tailwind's slate ramp runs 50 (near white) -> 950 (near black): 300/400 read
// as quiet, 100/200 as prominent. Any Tailwind colour works, or an arbitrary
// value like `text-[#c7d2fe]`.
//
// NOT here: the Cpu box, whose colour comes from localStorage
// ('siteBrandColor', default #4F46E5) through the --brand variable below.

const COLOR = {
  bar: 'bg-[#020617]',
  barBorder: 'border-slate-800',

  title: 'text-slate-200',
  titleHover: 'group-hover:text-slate-100',
  subtitle: 'text-slate-300',
  underline: 'bg-indigo-400',   // the rule that grows under the title on hover

  divider: 'bg-indigo-500',     // was a dim "|" glyph — now a real rule
  authors: 'text-slate-300',
  lab: 'text-slate-200',
} as const;

export interface HeaderProps {
  onHomeClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onHomeClick }) => {
  const [brand] = useState<string>(() => {
    try {
      return localStorage.getItem("siteBrandColor") || "#4F46E5";
    } catch {
      return "#4F46E5";
    }
  });

  const lightenHex = (hex: string, percent: number) => {
    const h = hex.replace("#", "");
    const num = parseInt(h, 16);
    let r = (num >> 16) + Math.round(255 * (percent / 100));
    let g = ((num >> 8) & 0x00ff) + Math.round(255 * (percent / 100));
    let b = (num & 0x0000ff) + Math.round(255 * (percent / 100));
    r = Math.min(255, Math.max(0, r));
    g = Math.min(255, Math.max(0, g));
    b = Math.min(255, Math.max(0, b));
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };

  const headerStyle: React.CSSProperties = {
    // CSS variables used by the styles below
    ["--brand" as any]: brand,
    ["--brand-hover" as any]: lightenHex(brand, 10),
  };

  return (
    <header
      style={headerStyle}
      className={`${COLOR.bar} text-white shadow-xl z-50 shrink-0 border-b ${COLOR.barBorder} ${SIZE.padX} ${SIZE.height} flex items-center`}
    >
      <div className="w-full flex items-center justify-between gap-2">
         <div className={`flex items-center ${SIZE.gap} min-w-2`}>
          <div
            className={`${SIZE.iconPad} ${SIZE.iconRadius} shadow-inner cpu-box shrink-0`}
            style={{ boxShadow: "inset 0 0 6px rgba(0,0,0,0.25)" }}
          >
            <Cpu size={SIZE.icon} className="lg:hidden" />
            <Cpu size={SIZE.iconLg} className="hidden lg:block" />
          </div>
     
         <button
  onClick={onHomeClick}
  title="Back to home"
  aria-label="Back to home"
  className="group min-w-0 flex-1 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded flex items-center"
>
  {/* leading-TIGHT, not leading-none: `truncate` brings overflow:hidden with
      it, and leading-none makes the line box exactly the font size — which
      clips every descender, so "Governing" lost the tail of its g. Same fix as
      88858bb; it came back with a paste. */}
  <h1 className={`${SIZE.titleWeight} ${SIZE.title} tracking-tight leading-tight ${COLOR.title} ${COLOR.titleHover} truncate relative inline-block transition-colors duration-300`}>
    From Report to Inquiry <span className={`hidden lg:inline ${COLOR.subtitle} ${SIZE.subtitleWeight} ${SIZE.subtitle}`}>— Governing Generative AI Insights in Heritage Significance Assessment</span>
    <span className={`absolute -bottom-0.5 left-0 w-0 h-px ${COLOR.underline} transition-all duration-300 group-hover:w-full`}></span>
  </h1>
</button>

          {/* A real rule, not a "|" glyph — a dim pipe character reads as noise
              at this size and cannot be sized or coloured independently. */}
          <span
            className={`hidden lg:block shrink-0 rounded-full ${SIZE.divider} ${SIZE.dividerGap} ${COLOR.divider}`}
            aria-hidden="true"
          />
          <span className={`hidden lg:inline ${COLOR.authors} ${SIZE.authorsWeight} ${SIZE.authors} whitespace-nowrap`}>Alef, Shafriri & Berger</span>
        </div>
        <div
          className="flex items-center gap-2 lg:gap-3 shrink-0 whitespace-nowrap justify-end"
          dir="ltr"
        >
          {/* Mobile Technion logo (public/technion-small.png) */}
          <img
            src="./technion-small.png"
            alt="Technion"
            className={`${SIZE.logo} object-contain inline-block lg:hidden`}
          />

          {/* Desktop Technion logo (public/Technion_Logo.png) */}
          <img
            src="./Technion_Logo.png"
            alt="Technion"
            className={`${SIZE.logo} object-contain hidden lg:inline-block mr-1`}
          />

          <h2 className={`${COLOR.lab} ${SIZE.labWeight} ${SIZE.lab} leading-tight whitespace-nowrap`}>
            InSites Lab
          </h2>

        </div>
      </div>
      <style>{`
        .brand-btn{ background: var(--brand); border: 1px solid rgba(255,255,255,0.06); }
        @media (min-width: 768px){
          .brand-btn{ border-color: rgba(255,255,255,0.16); }
          .brand-btn:hover{ border-color: rgba(255,255,255,0.28); }
        }
        .brand-btn:hover{ background: var(--brand-hover); }
        .cpu-box{ background: var(--brand); border: 1px solid rgba(255,255,255,0.06); display:inline-flex; align-items:center; justify-content:center }
      `}</style>
    </header>
  );
};

export default Header;
