import React from 'react';
import { Modal } from '../common';

export interface EpistemicNotationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EpistemicNotationModal: React.FC<EpistemicNotationModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Epistemic Notation — Transparent Evidence Marking"
      maxWidth="max-w-4xl"
    >
      <div className="text-left space-y-6" dir="ltr">
        <p className="text-sm text-slate-600 leading-relaxed">
          InSites-CAA uses a three-tier notation system to mark the epistemic status of every claim.
          This teaches critical thinking about evidence — distinguishing what a source says explicitly
          from what the bot infers or interprets.
        </p>

        {/* Three-tier table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="p-3 font-bold text-xs uppercase tracking-wider text-slate-500 border-b border-slate-200 w-24">Notation</th>
                <th className="p-3 font-bold text-xs uppercase tracking-wider text-slate-500 border-b border-slate-200">Status</th>
                <th className="p-3 font-bold text-xs uppercase tracking-wider text-slate-500 border-b border-slate-200">Prose Style</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="bg-emerald-50/50 hover:bg-emerald-50 transition-colors">
                <td className="p-4 border-b border-slate-100 font-mono text-lg text-center text-emerald-700">—</td>
                <td className="p-4 border-b border-slate-100">
                  <span className="font-bold text-emerald-800">Explicit in source</span>
                  <p className="text-slate-500 text-xs mt-1">Directly stated in user-supplied material</p>
                </td>
                <td className="p-4 border-b border-slate-100 text-slate-600">
                  Declarative: <span className="font-medium">"Built in 1923"</span>
                </td>
              </tr>
              <tr className="bg-amber-50/50 hover:bg-amber-50 transition-colors">
                <td className="p-4 border-b border-slate-100 font-mono text-lg text-center text-amber-700">°</td>
                <td className="p-4 border-b border-slate-100">
                  <span className="font-bold text-amber-800">Inferred</span>
                  <p className="text-slate-500 text-xs mt-1">Synthesized from 2+ pieces of evidence — must cite both</p>
                </td>
                <td className="p-4 border-b border-slate-100 text-slate-600">
                  Suggestive: <span className="font-medium">"may have", "suggests", "likely"</span>
                </td>
              </tr>
              <tr className="bg-purple-50/50 hover:bg-purple-50 transition-colors">
                <td className="p-4 border-slate-100 font-mono text-lg text-center text-purple-700">💭</td>
                <td className="p-4 border-slate-100">
                  <span className="font-bold text-purple-800">Uncertain / Interpretive</span>
                  <p className="text-slate-500 text-xs mt-1">Neither explicit nor confidently inferred — reading between the lines</p>
                </td>
                <td className="p-4 border-slate-100 text-slate-600">
                  Hedging: <span className="font-medium">"might", "possibly", "uncertain"</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Live example */}
        <div>
          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
            Same Claim, Three Epistemic States
          </h4>
          <div className="space-y-3">
            <div className="p-4 bg-emerald-50 border-l-4 border-emerald-400 rounded-r-lg">
              <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">Explicit</p>
              <p className="text-sm text-slate-700">
                "Built in 1923 as a water tower for Kibbutz Ayelet HaShachar" <span className="text-slate-400 font-mono text-xs">[A:2]</span>
              </p>
            </div>
            <div className="p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
              <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">Inferred °</p>
              <p className="text-sm text-slate-700">
                "The tower <em>may have served</em>° as a regional landmark, given its elevated position and the absence of competing structures" <span className="text-slate-400 font-mono text-xs">[A:3, B:1]</span>
              </p>
            </div>
            <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
              <p className="text-xs font-bold text-purple-700 uppercase tracking-wider mb-1">Interpretive 💭</p>
              <p className="text-sm text-slate-700">
                "The tower <em>might represent</em>💭 a collective aspiration — the act of building upward in a landscape that demanded horizontal settlement"
              </p>
            </div>
          </div>
        </div>

        {/* Prose-Notation Coherence */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
          <h4 className="font-bold text-slate-800 text-sm mb-2">Prose-Notation Coherence</h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            When a claim carries ° or 💭, the surrounding prose <strong>must match</strong> the notation's epistemic status.
            A ° mark with certainty in the sentence is a contradiction. This rule forces alignment between
            what the evidence actually supports and how the finding is communicated — a micro-lesson in critical reading
            that distinguishes AI inference from hallucination.
          </p>
        </div>

        {/* Where it activates */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">Stage 1 — Contexts</p>
            <p className="text-xs text-slate-600">Contexts emerging uniquely from the description (°), reading between the lines (💭)</p>
          </div>
          <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
            <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">Stage 2 — Values</p>
            <p className="text-xs text-slate-600">Values inferred from cross-context analysis (°), values from subtext (💭)</p>
          </div>
          <div className="p-3 bg-slate-100 rounded-lg border border-slate-200">
            <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Throughout</p>
            <p className="text-xs text-slate-600">Every claim in every stage must be marked and cited [file:page]</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EpistemicNotationModal;
