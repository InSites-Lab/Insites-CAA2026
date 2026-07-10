import React, { useState } from "react";
import { Cpu, Info, Layers } from "lucide-react";

export interface HeaderProps {
  onAboutClick: () => void;
  onHomeClick: () => void;
  sidebarWidth?: number;
}

export const Header: React.FC<HeaderProps> = ({
  onAboutClick,
  onHomeClick,
  sidebarWidth = 380,
}) => {
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
      className="flex shrink-0 z-50 shadow-xl"
    >
      {/* Left zone — top of the sidebar column; light, matches the sidebar (desktop only) */}
      <div
        style={{ width: sidebarWidth }}
        className="hidden md:flex items-center justify-center gap-2 shrink-0 bg-slate-50/90 backdrop-blur-md border-r border-b border-slate-200 px-4"
      >
        <Layers size={18} className="text-indigo-500 shrink-0" />
        <h3 className="text-sm font-black tracking-wide text-indigo-700 leading-none text-center">
          InSites Process Stages · Demo
        </h3>
      </div>

      {/* Right zone — presentation identity; dark */}
      <div className="flex-1 min-w-0 bg-[#020617] text-white border-b border-slate-800 flex items-center justify-between gap-2 px-3 py-1.5 md:py-2 md:pr-6 md:pl-10">
         <div className="flex items-center gap-3 min-w-2">
          <div
            className="p-1 md:p-1.5 rounded-lg shadow-inner cpu-box"
            style={{ boxShadow: "inset 0 0 6px rgba(0,0,0,0.25)" }}
          >
            <Cpu size={20} />
          </div>

         <button
  onClick={onHomeClick}
  title="Back to the presentation"
  aria-label="Back to the presentation"
  className="group min-w-0 flex-1 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded px-0 py-1.5 flex items-center"
>
  <h1 className="font-black tracking-tight leading-none text-indigo-100 group-hover:text-white text-base md:text-lg truncate relative inline-block transition-colors duration-300">
    <span className="md:hidden">InSites-CAA Workshop</span>
    <span className="hidden md:inline">CAA26 — Significance Assessment through the Looking Glass of Gen-AI</span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-400 transition-all duration-300 group-hover:w-full"></span>
  </h1>
</button>
 
          <span className="hidden md:inline text-slate-500 mx-3">|</span>
          <span className="hidden md:inline text-indigo-100 font-bold text-xl">Alef &amp; Shafriri</span>
        </div>
        <div
          className="flex items-center gap-2 md:gap-3 shrink-0 whitespace-nowrap justify-end"
          dir="ltr"
        >
          {/* Mobile Technion logo (public/technion-small.png) */}
          <img
            src="./technion-small.png"
            alt="Technion"
            className="h-6 object-contain inline-block md:hidden"
          />

          {/* Desktop Technion logo (public/Technion_Logo.png) */}
          <img
            src="./Technion_Logo.png"
            alt="Technion"
            className="h-6 md:h-7 lg:h-8 object-contain hidden md:inline-block mr-1"
          />

          <h3 className="text-slate-200 font-bold text-lg md:text-[1.5rem] leading-none">
            InSites Lab
          </h3>

          <div className="w-1 h-4 bg-slate-800 rounded-full hidden md:block"></div>
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
