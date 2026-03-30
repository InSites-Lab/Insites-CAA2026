import React from 'react';
import { Modal } from '../common';

export interface SessionReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SessionReportModal: React.FC<SessionReportModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Session Debrief & Trust Profile"
      maxWidth="max-w-4xl"
    >
      <div className="text-left space-y-6" dir="ltr">
        <p className="text-sm text-slate-600 leading-relaxed">
          After completing the assessment (Stage 6), InSites-CAA collects structured reflections and generates
          a research-grade record of how you collaborated with AI. Trust measured, not asserted.
        </p>

        {/* Three Reflection Questions */}
        <div>
          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
            Three Reflection Questions
          </h4>
          <div className="space-y-3">
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
              <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">1. Surprise</p>
              <p className="text-sm text-slate-700 italic">
                "Describe one moment where the AI's output surprised you — positively or negatively. What did you expect instead?"
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">2. Trust</p>
              <p className="text-sm text-slate-700 italic">
                "If you had to use this output in a professional context — what would you keep as-is, and what would you rewrite from scratch?"
              </p>
            </div>
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
              <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">3. Open</p>
              <p className="text-sm text-slate-700 italic">
                "What should we change, test, add, or think about for the future development of this process? Anything goes."
              </p>
            </div>
          </div>
        </div>

        {/* Interaction Map */}
        <div>
          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
            Interaction Map — Action Vocabulary
          </h4>
          <p className="text-xs text-slate-500 mb-3">
            Throughout the session, the bot tracks every active intervention. Passive confirmations are not recorded —
            only moments where you shaped the output.
          </p>
          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="p-3 font-bold text-xs uppercase tracking-wider text-slate-500 border-b border-slate-200 w-24">Tag</th>
                  <th className="p-3 font-bold text-xs uppercase tracking-wider text-slate-500 border-b border-slate-200">Action</th>
                  <th className="p-3 font-bold text-xs uppercase tracking-wider text-slate-500 border-b border-slate-200">Example</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  { tag: '+add', action: 'Added new content', example: 'Added a context the bot missed', color: 'text-emerald-600' },
                  { tag: '−reject', action: 'Rejected bot output', example: 'Dismissed a proposed value', color: 'text-red-600' },
                  { tag: '~revise', action: 'Edited existing content', example: 'Refined a significance statement', color: 'text-amber-600' },
                  { tag: '↔replace', action: 'Swapped entire section', example: 'Rewrote the comparison analysis', color: 'text-purple-600' },
                  { tag: '?question', action: 'Asked a clarifying question', example: '"Why did you rank this high?"', color: 'text-blue-600' },
                  { tag: '!correct', action: 'Corrected a factual error', example: 'Fixed a date or attribution', color: 'text-rose-600' },
                ].map(({ tag, action, example, color }) => (
                  <tr key={tag} className="bg-white hover:bg-slate-50 transition-colors">
                    <td className={`p-3 border-b border-slate-100 font-mono font-bold ${color}`}>{tag}</td>
                    <td className="p-3 border-b border-slate-100 font-medium text-slate-700">{action}</td>
                    <td className="p-3 border-b border-slate-100 text-slate-500 text-xs">{example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Session Signature */}
        <div>
          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
            Session Signature
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200">
              <p className="text-xs font-bold text-indigo-700 uppercase tracking-wider mb-2">Interaction Style</p>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>Majority <span className="font-mono text-emerald-600">+add</span> → <strong>Contributor</strong></li>
                <li>Majority <span className="font-mono text-amber-600">~revise</span> → <strong>Editor</strong></li>
                <li>Majority <span className="font-mono text-red-600">−reject</span> → <strong>Challenger</strong></li>
                <li>≤2 total → <strong>Observer</strong></li>
              </ul>
            </div>
            <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
              <p className="text-xs font-bold text-purple-700 uppercase tracking-wider mb-2">Trust Profile</p>
              <ul className="text-xs text-slate-600 space-y-1">
                <li><strong>High-trust</strong> — would keep most outputs</li>
                <li><strong>Selective-trust</strong> — keep some, rewrite others</li>
                <li><strong>Skeptical</strong> — would rewrite most</li>
              </ul>
            </div>
            <div className="p-4 bg-slate-100 rounded-xl border border-slate-200">
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Bot Dependency</p>
              <ul className="text-xs text-slate-600 space-y-1">
                <li><strong>Low</strong> — user-initiated directions</li>
                <li><strong>Medium</strong> — balanced collaboration</li>
                <li><strong>High</strong> — bot-produced, user-confirmed</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Purpose */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
          <p className="text-sm text-slate-600 leading-relaxed">
            <strong>Research instrument, not a grade.</strong> The session signature creates a quantifiable record
            of human-AI collaboration patterns. It shows how different users interact with the same tool —
            and makes the collaboration itself visible and discussable.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default SessionReportModal;
