import React, { useState } from "react";
import { Cpu } from "lucide-react";

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
      className="bg-[#020617] text-white shadow-xl z-50 shrink-0 border-b border-slate-800 px-3 md:px-6 h-10 flex items-center"
    >
      <div className="w-full flex items-center justify-between gap-2">
         <div className="flex items-center gap-3 min-w-2">
          <div
            className="p-1 rounded-md shadow-inner cpu-box"
            style={{ boxShadow: "inset 0 0 6px rgba(0,0,0,0.25)" }}
          >
            <Cpu size={16} />
          </div>
     
         <button
  onClick={onHomeClick}
  title="Back to home"
  aria-label="Back to home"
  className="group min-w-0 flex-1 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded flex items-center"
>
  <h1 className="font-medium tracking-tight leading-none text-[13px] text-slate-400 group-hover:text-slate-200 truncate relative inline-block transition-colors duration-300">
    From Report to Inquiry
    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-indigo-400 transition-all duration-300 group-hover:w-full"></span>
  </h1>
</button>
 
          <span className="hidden md:inline text-slate-600 mx-2.5">|</span>
          <span className="hidden md:inline text-slate-400 font-medium text-[13px] whitespace-nowrap">Alef &amp; Shafriri</span>
        </div>
        <div
          className="flex items-center gap-2 md:gap-3 shrink-0 whitespace-nowrap justify-end"
          dir="ltr"
        >
          {/* Mobile Technion logo (public/technion-small.png) */}
          <img
            src="./technion-small.png"
            alt="Technion"
            className="h-5 object-contain inline-block md:hidden"
          />

          {/* Desktop Technion logo (public/Technion_Logo.png) */}
          <img
            src="./Technion_Logo.png"
            alt="Technion"
            className="h-5 object-contain hidden md:inline-block mr-1"
          />

          <h3 className="text-slate-300 font-bold text-[13px] leading-none whitespace-nowrap">
            InSites Lab
          </h3>

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
