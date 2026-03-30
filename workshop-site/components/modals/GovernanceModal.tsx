import React from 'react';
import { Modal } from '../common';

export interface GovernanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GovernanceModal: React.FC<GovernanceModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Governance & Control Framework"
      maxWidth="max-w-4xl"
    >
      <div className="text-left space-y-6" dir="ltr">
        <p className="text-sm text-slate-600 leading-relaxed">
          InSites-CAA embeds a governance framework that keeps the human in control at every point.
          These aren't safety guardrails — they're design features that make the collaboration transparent and productive.
        </p>

        {/* HITL Protocol Visual */}
        <div>
          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
            Human-in-the-Loop Protocol
          </h4>
          <div className="flex flex-wrap items-center gap-2 p-4 bg-slate-50 rounded-xl border border-slate-200">
            {['Stage N', 'Deliver Output', 'Reflect & Question', 'User Reviews', 'Continue / Revise'].map((step, i) => (
              <React.Fragment key={step}>
                <div className={`px-3 py-2 rounded-lg text-xs font-bold ${
                  i === 3 ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-300' : 'bg-white text-slate-700 border border-slate-200'
                }`}>
                  {step}
                </div>
                {i < 4 && <span className="text-slate-300 text-lg">→</span>}
              </React.Fragment>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-2">
            After every stage, the bot pauses and asks a provocative reflection question anchored in that stage's content.
            You decide when to proceed.
          </p>
        </div>

        {/* Governance mechanisms grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Evidence Mandate */}
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
            <h5 className="font-bold text-emerald-800 text-sm mb-2">Evidence Mandate</h5>
            <p className="text-xs text-slate-600 leading-relaxed">
              The bot uses <strong>only</strong> user-supplied material. Every claim is cited with
              <span className="font-mono bg-white px-1 rounded text-xs">[file:page]</span>.
              No external sources, no fabrication. If data is missing — the bot asks you.
            </p>
          </div>

          {/* Status Line */}
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <h5 className="font-bold text-blue-800 text-sm mb-2">Status Line</h5>
            <p className="text-xs text-slate-600 leading-relaxed mb-2">
              Every bot response ends with a status line so you always know which stage you're in:
            </p>
            <div className="bg-white p-2 rounded-lg border border-blue-100 font-mono text-xs text-slate-500">
              ───── End of 📋 Preliminary Review
            </div>
          </div>

          {/* Revision Control */}
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
            <h5 className="font-bold text-amber-800 text-sm mb-2">Revision Control</h5>
            <p className="text-xs text-slate-600 leading-relaxed">
              After delivering any revision at any stage, the bot <strong>stops</strong>.
              A revision completes the correction, not the stage. You decide when to move forward.
            </p>
          </div>

          {/* Missing Data Warning */}
          <div className="p-4 bg-rose-50 rounded-xl border border-rose-200">
            <h5 className="font-bold text-rose-800 text-sm mb-2">Missing Data Warning</h5>
            <p className="text-xs text-slate-600 leading-relaxed mb-2">
              If earlier context is unavailable, the bot warns explicitly before proceeding:
            </p>
            <div className="bg-white p-2 rounded-lg border border-rose-100 text-xs text-slate-600">
              ⚠️ Running with missing data: <span className="text-rose-600">timeline dates, site dimensions</span>
            </div>
          </div>

          {/* CSR Brief */}
          <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200">
            <h5 className="font-bold text-indigo-800 text-sm mb-2">Stage Anchoring (CSR Brief)</h5>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every stage opens with a brief that tells you where you are, why this stage matters,
              and 1–2 specific items from the previous stage you're building on. No disorientation.
            </p>
          </div>

          {/* DQR Reflection */}
          <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
            <h5 className="font-bold text-purple-800 text-sm mb-2">Provocative Reflection (DQR)</h5>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every stage closes with 1–2 expert-level questions designed to provoke disagreement.
              <em>"Would an archaeologist want to argue with it?"</em> — if they'd just nod, it's too safe.
            </p>
          </div>
        </div>

        {/* Summary principle */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
          <p className="text-sm text-slate-600 leading-relaxed">
            <strong>The design principle:</strong> Every mechanism serves cognitive transparency.
            The bot doesn't just produce output — it shows you where the evidence comes from,
            what it's certain about, and where your judgment is needed. The HITL pause is where learning happens.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default GovernanceModal;
