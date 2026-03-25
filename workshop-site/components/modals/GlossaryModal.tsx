import React, { useState, useMemo } from 'react';
import { Modal } from '../common';
import { Search, ArrowRight } from 'lucide-react';
import { GLOSSARY } from '../../constants';

export interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (hash: string) => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [filter, setFilter] = useState('');

  const filtered = useMemo(() => {
    if (!filter.trim()) return GLOSSARY;
    const q = filter.toLowerCase();
    return GLOSSARY.filter(
      (g) => g.term.toLowerCase().includes(q) || g.definition.toLowerCase().includes(q)
    );
  }, [filter]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Key Terms" maxWidth="max-w-lg">
      <div className="space-y-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search terms..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all"
          />
        </div>

        <div className="space-y-2 max-h-[60vh] overflow-y-auto custom-scrollbar pr-1">
          {filtered.length === 0 && (
            <p className="text-sm text-slate-400 text-center py-4">No matching terms</p>
          )}
          {filtered.map((item) => (
            <div key={item.term} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-bold text-sm text-slate-800">{item.term}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mt-0.5">{item.definition}</p>
                </div>
                {item.relatedHash && onNavigate && (
                  <button
                    onClick={() => {
                      onClose();
                      onNavigate(item.relatedHash!);
                    }}
                    className="shrink-0 text-indigo-500 hover:text-indigo-700 p-1 hover:bg-indigo-50 rounded-lg transition-colors"
                    title="See in context"
                  >
                    <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default GlossaryModal;
