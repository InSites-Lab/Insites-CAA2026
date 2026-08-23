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
    // The sublabel form is a SECTION TITLE, not a marker: it has to read as the
    // start of something from the back of a hall, so the label is set at
    // heading scale in near-black rather than as a grey whisper on a rule.
    <div className="pt-1">
      <div className="border-t border-slate-200 mb-3" aria-hidden="true"></div>
      <div className="flex flex-col items-center gap-1.5">
        <span className={`text-[15px] sm:text-[17px] lg:text-xl font-extrabold uppercase tracking-[0.1em] ${colorClass} text-center leading-tight`}>
          {label}
        </span>
        <span className="text-[15px] sm:text-[17px] text-slate-600 text-center leading-snug max-w-3xl">
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
