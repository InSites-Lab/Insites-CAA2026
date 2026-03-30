import React, { useState } from 'react';
import { FileText, BookOpen, Zap } from 'lucide-react';
import { Modal } from '../common';

export interface GraphInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  inputText: string;
  onInputTextChange: (value: string) => void;
  onSampleSelect?: (text: string, sampleKey: string) => void;
  onGenerate: (forceApi?: boolean) => void;
}

export const GraphInputModal: React.FC<GraphInputModalProps> = ({
  isOpen,
  onClose,
  inputText,
  onInputTextChange,
  onSampleSelect,
  onGenerate,
}) => {
  const [useApi, setUseApi] = useState(false);

  const selectSample = (text: string, key: string) => {
    if (onSampleSelect) {
      onSampleSelect(text, key);
    } else {
      onInputTextChange(text);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Knowledge Graph" maxWidth="max-w-2xl">
      <div className="space-y-6">
        <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
          <p className="text-xs text-emerald-800 font-medium leading-relaxed">
            This tool analyzes free text and extracts entities, values, and relationships to create a visual semantic map.
          </p>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-bold text-slate-700">Text for analysis:</label>
          <div className="flex flex-wrap gap-2 mb-2">
            <a
              href="https://gemini.google.com/share/03421deb044b"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[120px] py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 hover:text-indigo-900 border border-indigo-200 hover:border-indigo-300 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <BookOpen size={14} /> Zaira KG (Gemini demo)
            </a>
            <a
              href="./chaco-kg.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[120px] py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 hover:text-emerald-900 border border-emerald-200 hover:border-emerald-300 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <FileText size={14} /> Chaco KG (demo)
            </a>
          </div>
          <textarea
            className="w-full h-48 p-4 bg-white rounded-xl border border-slate-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none text-sm leading-relaxed text-slate-700 placeholder:text-slate-300 resize-none shadow-inner"
            placeholder="Paste the text you want to analyze here..."
            value={inputText}
            onChange={(e) => onInputTextChange(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-end pt-4 border-t border-slate-100">
          <button
            onClick={() => {
              onClose();
              onGenerate(false);
            }}
            disabled={!inputText.trim()}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg hover:shadow-emerald-200 transition-all active:scale-95"
          >
            <Zap size={18} />
            <span>Generate Knowledge Graph</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default GraphInputModal;
