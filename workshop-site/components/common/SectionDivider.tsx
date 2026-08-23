import React from 'react';

export interface SectionDividerProps {
  label: string;
  /** Optional second line under the rule, in normal case — for a divider that
   *  has to introduce a section rather than only name it. */
  sublabel?: string;
  colorClass?: string;
  bgColor?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  label,
  sublabel,
  colorClass = "text-slate-400",
  bgColor = "bg-white"
}) =>
  // Two shapes. Without a sublabel the rule runs THROUGH the label, which is
  // the tighter of the two and the one a bare section marker wants. With a
  // sublabel there is no single line to sit on, so the rule goes above the
  // stack — trying to thread it through two centred lines only looks broken.
  sublabel ? (
    <div className="pt-2">
      <div className="border-t border-slate-200 mb-2.5" aria-hidden="true"></div>
      <div className="flex flex-col items-center gap-1">
        <span className={`text-[11px] font-black uppercase tracking-[0.2em] ${colorClass} text-center leading-tight`}>
          {label}
        </span>
        <span className="text-[13px] sm:text-[15px] text-slate-500 text-center leading-snug max-w-2xl">
          {sublabel}
        </span>
      </div>
    </div>
  ) : (
    <div className="relative py-2">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-slate-200"></div>
      </div>
      <div className="relative flex justify-center">
        <span className={`${bgColor} px-4 text-[11px] font-black uppercase tracking-[0.2em] ${colorClass} text-center leading-tight`}>
          {label}
        </span>
      </div>
    </div>
  );

export default SectionDivider;
