import React from 'react';
import { FileCode, Copy, TerminalSquare, Loader2, Sparkles, Info } from 'lucide-react';
import { Modal } from '../common';
import MarkdownRenderer from '../MarkdownRenderer';
import { EDUCATIONAL_PROMPT, DIALOGUE_PRINCIPLES } from '../../constants';
import { copyToClipboard } from '../../utils';

export interface PromptAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  consultationInput: string;
  onConsultationInputChange: (value: string) => void;
  consultationResult: string | null;
  onClearResult: () => void;
  isConsulting: boolean;
  onConsult: () => void;
}

export const PromptAdvisorModal: React.FC<PromptAdvisorModalProps> = ({
  isOpen,
  onClose,
  consultationInput,
  onConsultationInputChange,
  consultationResult,
  onClearResult,
  isConsulting,
  onConsult,
}) => {
  const renderResult = () => {
    if (!consultationResult) return null;

    const [promptText, explanationText] = consultationResult.includes('---PROMPT_BOUNDARY---')
      ? consultationResult.split('---PROMPT_BOUNDARY---')
      : [consultationResult, ''];

    const cleanPrompt = promptText.replace(/^```(markdown|json)?/g, '').replace(/```$/g, '').trim();

    return (
      <div className="mt-4 space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
        {/* Prompt Section */}
        <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-800 text-left" dir="ltr">
          <div className="bg-slate-800/50 p-2 border-b border-white/5 flex items-center justify-between">
            <div className="flex gap-1.5 px-2">
              <div className="w-2 h-2 rounded-full bg-red-400/20"></div>
              <div className="w-2 h-2 rounded-full bg-amber-400/20"></div>
              <div className="w-2 h-2 rounded-full bg-emerald-400/20"></div>
            </div>
            <button
              onClick={() => copyToClipboard(cleanPrompt)}
              className="text-[10px] bg-white/10 hover:bg-white/20 text-indigo-200 hover:text-white px-2 py-1 rounded transition-all flex items-center gap-1.5 font-bold"
            >
              <Copy size={12} /> Copy Prompt
            </button>
          </div>
          <div className="p-4 max-h-60 overflow-y-auto custom-scrollbar">
            <MarkdownRenderer text={cleanPrompt} dir="ltr" theme="dark" />
          </div>
        </div>

        {/* Explanation Section */}
        {explanationText && (
          <div className="bg-white p-4 rounded-xl border-l-4 border-indigo-500 shadow-sm text-xs text-slate-700 leading-relaxed">
            <h4 className="font-bold text-slate-900 text-[11px] mb-1 flex items-center gap-2">
              <Sparkles size={12} className="text-indigo-500" /> Advisor's Note
            </h4>
            {explanationText.trim()}
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button onClick={onClearResult} className="text-[10px] font-medium text-slate-400 hover:text-red-500 transition-colors">
            Clear Results
          </button>
        </div>
      </div>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Dialogue & Smart Prompts Workshop" maxWidth="max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full max-h-[85vh]">
        <div className="flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-2">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-indigo-50 pb-2">
              <h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-widest flex items-center gap-2">
                <FileCode size={12} /> Sample Prompt for Copying (Educational Prompt)
              </h3>
              <span className="text-[8px] bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded font-black uppercase tracking-tighter">
                Human-Machine Dialogue Example
              </span>
            </div>
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-0 shadow-2xl overflow-hidden flex flex-col group">
              <div className="flex items-center gap-3 p-3 bg-slate-900 border-b border-slate-800 shrink-0">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/30"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/30"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/30"></div>
                </div>
                <span className="text-[9px] font-mono text-slate-500 tracking-wider">workshop_sample_prompt.txt</span>
              </div>
              <div className="p-5 max-h-[50vh] overflow-auto custom-scrollbar" dir="ltr">
                <MarkdownRenderer text={EDUCATIONAL_PROMPT} dir="ltr" theme="dark" />
              </div>
              <div className="p-2.5 bg-slate-900/50 flex items-center justify-center gap-3">
                <button
                  onClick={() => copyToClipboard(EDUCATIONAL_PROMPT)}
                  className="flex items-center gap-2 text-[9px] font-black text-slate-400 hover:text-indigo-400 transition-colors uppercase tracking-widest group/copy active:scale-95"
                >
                  <Copy size={12} /><span>Copy Sample Prompt</span>
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-widest border-b border-indigo-50 pb-2">
              Dialogue Principles (CBSA)
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {DIALOGUE_PRINCIPLES.map((p, i) => (
                <div key={i} className="flex gap-4 group bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                  <div className="shrink-0 w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-500 transition-all flex items-center justify-center text-xs font-black">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-800 mb-0.5">{p.title}</h4>
                    <p className="text-[11px] text-slate-500 leading-tight font-medium">{p.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-2xl p-6 flex flex-col gap-6 border border-slate-200 shadow-inner overflow-y-auto custom-scrollbar">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 text-white rounded-lg shadow-md"><TerminalSquare size={20} /></div>
            <h3 className="font-black text-lg text-slate-900">Custom Prompt Builder (AI)</h3>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Enter your research goal, and the advisor will build a professional prompt based on CBSA methodology and the rules shown in the example.
          </p>

          <div className="relative">
            <textarea
              className="w-full h-32 p-4 bg-white rounded-2xl border border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-sm font-medium text-slate-700 placeholder:text-slate-300 resize-none shadow-sm"
              placeholder="e.g., 'I want to understand the connection between the machines and the technological value'..."
              value={consultationInput}
              onChange={(e) => onConsultationInputChange(e.target.value)}
            ></textarea>
            <button
              onClick={onConsult}
              disabled={isConsulting || !consultationInput.trim()}
              className="absolute bottom-4 left-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white p-2.5 rounded-xl shadow-lg transition-all active:scale-95 flex items-center gap-2 font-black text-[11px]"
            >
              {isConsulting ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
              <span>Build Prompt</span>
            </button>
          </div>

          {renderResult()}

          <div className="mt-auto pt-6 border-t border-slate-200">
            <div className="bg-white p-4 rounded-xl border border-slate-100 flex items-center gap-4">
              <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><Info size={16} /></div>
              <p className="text-[10px] font-bold text-slate-500 leading-tight">
                Remember: Copy the generated prompt and paste it into the full InSites-CAA interface (ChatGPT/Gemini) to start the process.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PromptAdvisorModal;
