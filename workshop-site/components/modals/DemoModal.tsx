import React from 'react';
import { Eye, Quote, Gem, Layers, History, Search } from 'lucide-react';
import { Modal } from '../common';

export interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <Eye size={20} className="text-indigo-600" />
          <span className="mr-1">Visual Analysis in InSites-CAA: The Writing Invention & AI Image</span>
        </div>
      }
      maxWidth="max-w-7xl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start h-full">
        <div className="lg:col-span-5 space-y-6 order-1 lg:order-2 shrink-0">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-slate-200 bg-slate-50 flex items-center justify-center">
            <img
              src="https://alephplace.com/atar.bot/tamuz.jpg"
              alt="Detailed Visual Analysis Case"
              className="max-w-full max-h-[55vh] object-contain"
            />
          </div>
          <div className="bg-indigo-600 p-4 rounded-2xl shadow-xl border-b-4 border-indigo-800">
            <Quote size={20} className="text-indigo-400/40 mb-2" />
            <p className="italic text-white text-sm md:text-base leading-relaxed font-bold">
              "This is an elixir of forgetfulness, not of memory. They will not acquire wisdom, but only the semblance of wisdom..."
            </p>
            <div className="mt-3 pt-3 border-t border-white/20 flex justify-between items-center text-[10px] text-indigo-100 font-bold">
              <span>From: King Thamus to Theuth | Phaedrus | Plato</span>
              <div className="px-2 py-0.5 bg-white/20 rounded uppercase tracking-widest text-[8px]">
                AI Visual Decoding
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6 order-2 lg:order-1 flex flex-col h-full text-left">
          <div className="space-y-4">
            <p className="text-sm text-slate-600 leading-relaxed font-medium border-l-4 border-indigo-500 pl-4">
              Below are the results of the structural analysis performed by InSites-CAA on the visual image, using CBSA methodology for identifying values and contexts.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-2">
              <div className="flex items-center gap-3 text-indigo-600 font-black text-sm border-b border-slate-50 pb-2">
                <Gem size={16} />
                <span>1. Heritage Values Identified</span>
              </div>
              <div className="space-y-2 text-sm leading-relaxed text-slate-700">
                <p>
                  <b>Symbolic value:</b> The illustration represents the constant tension between technology and human memory.
                </p>
                <p>
                  <b>Educational value:</b> The image makes a deep philosophical discussion accessible through the modern context of artificial intelligence.
                </p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-2">
              <div className="flex items-center gap-3 text-emerald-600 font-black text-sm border-b border-slate-50 pb-2">
                <Layers size={16} />
                <span>2. Visual Condition Assessment</span>
              </div>
              <div className="space-y-2 text-sm leading-relaxed text-slate-700">
                <p>
                  <b>Visible layers:</b> Combination of Egyptian iconography with a classical Greek philosopher figure.
                </p>
                <p>
                  <b>Contrast:</b> The tangible scroll versus the ChatGPT screen represents the change in knowledge texture.
                </p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-2">
              <div className="flex items-center gap-3 text-amber-600 font-black text-sm border-b border-slate-50 pb-2">
                <History size={16} />
                <span>3. Context Clues</span>
              </div>
              <div className="space-y-2 text-sm leading-relaxed text-slate-700">
                <p>
                  <b>Thematic context:</b> The dialogue deals with "Forgetfulness" as a central theme.
                </p>
                <p>
                  <b>Intangible heritage:</b> Knowledge transfer, oral tradition versus external documentation.
                </p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-2">
              <div className="flex items-center gap-3 text-rose-600 font-black text-sm border-b border-slate-50 pb-2">
                <Search size={16} />
                <span>4. Comparisons & Data Gaps</span>
              </div>
              <div className="space-y-2 text-sm leading-relaxed text-slate-700">
                <p>
                  <b>Comparison:</b> The image anchors AI within a long historical continuum of technological anxiety.
                </p>
                <p className="italic text-slate-500">
                  ⚠️ <b>Data gaps:</b> The exact source does not appear in the image (created by AI).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DemoModal;
