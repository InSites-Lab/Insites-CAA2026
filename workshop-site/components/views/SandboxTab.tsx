import React from 'react';
import { ChevronDown } from 'lucide-react';

// ─── SANDBOX — a dev-only slot for trying a tab design ─────────────
//
// This file is the CONTENT of the experimental tab. It is rendered only
// when `import.meta.env.DEV` is true, so Vite drops it from the production
// bundle entirely — it cannot reach the hall by accident.
//
// The slot is meant to be reused: to try a different design, replace what
// is below and update SANDBOX_LABEL. To retire the experiment, delete this
// file and the two dev-gated lines in WorkshopProgramView.tsx.
//
// Currently holding: the original CAA "Our Story" tab, restored verbatim
// from 88858bb — poster, the three challenge cards, and the Lab paragraph.
// Kept whole on purpose, so the decision about what to cut is made by
// looking at it rather than by guessing.

// In dev this tab TAKES THE PLACE of the real "What is InSites" tab, so it
// is labelled as its candidate replacement. The ✱ marks it as the experiment.
export const SANDBOX_LABEL = '✱ What is InSites';
export const SANDBOX_LABEL_SHORT = '✱ InSites';

const CHALLENGES = [
  {
    // Merges the two original cards ("too complex" + "too heavy, no one reads
    // it"), so the response merges their answers too.
    quote: "It's important but too complex — and nobody reads it",
    response: "With AI trained in our assessment principles we can simplify the process and link outputs directly to surveys and systems — and with natural language queries and visual tools like knowledge graphs, make the results usable rather than shelved.",
    color: 'amber',
    avatar: './rabbit.png',
  },
  {
    // New card. The response below is a DRAFT — it answers the black box with
    // the paper's own mechanism (epistemic notation). Rewrite as you see fit.
    quote: 'The assessment reasoning is a Black Box',
    response: "Every claim carries a mark for its distance from the sources — what was read, what was inferred, what is hypothesis. The reasoning path stops being tacit and becomes reviewable, claim by claim.",
    color: 'indigo',
    avatar: './hatter.jpg',
  },
  {
    quote: "So will AI replace the professionals?",
    response: "No. Experts remain essential. AI is a smart partner for detecting connections and contexts — but it needs our guidance.",
    color: 'emerald',
    avatar: './robot.png',
  },
];

const challengeColors: Record<string, { border: string; bg: string; text: string; quote: string }> = {
  amber: { border: 'border-l-amber-400', bg: 'bg-amber-50', text: 'text-amber-900/70', quote: 'text-amber-900' },
  indigo: { border: 'border-l-indigo-400', bg: 'bg-indigo-50', text: 'text-indigo-900/70', quote: 'text-indigo-900' },
  emerald: { border: 'border-l-emerald-400', bg: 'bg-emerald-50', text: 'text-emerald-900/70', quote: 'text-emerald-900' },
};

export const SandboxTab: React.FC = () => (
  <div className="space-y-5">
    {/* Poster */}
    <div className="max-w-3xl mx-auto">
      <img
        src="./poster-light.jpg"
        alt="InSites-CAA — CBSA Workshop"
        className="w-full rounded-2xl border border-slate-200 shadow-sm"
      />
      <p className="text-center text-base text-slate-500 italic mt-2">
        "The LLM is a looking glass — more than a wonderland"
      </p>
      <p className="text-center text-sm text-slate-400 mt-1">
        CBSA and the transformer share a core idea: meaning emerges from context.
      </p>
    </div>

    {/* Intro line */}
    <p className="text-base text-slate-600 leading-relaxed">
      AI already speaks our language and is becoming an active partner in culture. We examine how it can help with the cultural assessment challenges:
    </p>

    {/* 3 Challenge cards with character avatars */}
    <div className="space-y-3">
      {CHALLENGES.map((ch, idx) => {
        const c = challengeColors[ch.color] || challengeColors.amber;
        const isRight = idx % 2 === 0;
        return (
          <details key={idx} className={`${c.bg} border border-slate-200 ${c.border} border-l-4 rounded-xl overflow-hidden group`}>
            <summary className={`p-4 cursor-pointer flex items-center gap-3 select-none ${isRight ? '' : 'flex-row-reverse text-right'}`}>
              <img
                src={ch.avatar}
                alt=""
                className="w-16 h-16 rounded-full border-2 border-white shadow-md shrink-0 object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <span className={`font-bold text-base ${c.quote} flex-1`}>"{ch.quote}"</span>
              <ChevronDown size={16} className="text-slate-400 group-open:rotate-180 transition-transform shrink-0" />
            </summary>
            <div className="px-4 pb-4 pt-1">
              <p className={`text-base ${c.text} leading-relaxed`}>{ch.response}</p>
            </div>
          </details>
        );
      })}
    </div>

    {/* Lab intro */}
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
      <h4 className="font-bold text-base text-slate-800">InSites Knowledge Lab</h4>
      <p className="text-sm text-slate-400">Technion — Israel Institute of Technology</p>
      <p className="text-base text-slate-700 leading-relaxed">
        At the intersection of <strong>assessment methods</strong>, <strong>novel technologies</strong>, and <strong>built-heritage data</strong> — we develop computational methods for evidence-based heritage assessment.
      </p>
      <p className="text-base text-slate-700 leading-relaxed">
        InSites-CAA is our research prototype: a multi-platform AI assistant that structures heritage significance assessment through the CBSA method. Not a black box — a looking glass.
      </p>
    </div>
  </div>
);

export default SandboxTab;
