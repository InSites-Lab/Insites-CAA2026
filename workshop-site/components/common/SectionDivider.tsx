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
    //
    // Sentence case, not capitals. The deck's rule is that CAPITALS ARE FOR
    // LABELS — the `.label` device — and anything read as a sentence is set in
    // ordinary case. This title is the place that proves it: uppercase flattens
    // "InSites" to INSITES and destroys the internal capital, which is the one
    // mark that makes the name a name. Tracking goes with the capitals; letter-
    // spaced lower case reads as airy, not as emphatic.
    <div className="pt-1">
      <div className="border-t border-slate-200 mb-3" aria-hidden="true"></div>
      <div className="flex flex-col items-center gap-1.5">
        <span className={`text-[length:var(--divider-label)] font-bold ${colorClass} text-center leading-tight`}>
          {label}
        </span>
        {/* No max-width. The 3xl box that used to be here broke a sentence
            written for one line into two, on a screen that had the room —
            the cap is now the sentence's own length, not a container. */}
        <span className="text-[length:var(--divider-sub)] text-slate-600 text-center leading-snug">
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
        {/* The deck's one label device — see `.label` in index.css. It used to
            carry its own size, weight and a 0.2em tracking, which made it a
            seventh dialect of a label that appears on every tab. */}
        <span className={`label ${bgColor} px-4 ${colorClass} text-center`}>
          {label}
        </span>
      </div>
    </div>
  );

export default SectionDivider;
