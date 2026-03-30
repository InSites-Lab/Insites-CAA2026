import React from 'react';
import { Eye } from 'lucide-react';
import { LOOKING_GLASS_CARDS } from '../../constants';
import { WorkshopProgramView } from './WorkshopProgramView';
import MarkdownRenderer from '../MarkdownRenderer';

export interface WorkshopOpeningViewProps {
  onNavigate?: (route: string) => void;
}

const CARD_ACCENTS: Record<string, { border: string; title: string; tagline: string; icon: string }> = {
  rose: {
    border: 'border-l-rose-400',
    title: 'text-rose-900',
    tagline: 'text-rose-600',
    icon: 'bg-rose-100 text-rose-600',
  },
  indigo: {
    border: 'border-l-indigo-400',
    title: 'text-indigo-900',
    tagline: 'text-indigo-600',
    icon: 'bg-indigo-100 text-indigo-600',
  },
  emerald: {
    border: 'border-l-emerald-400',
    title: 'text-emerald-900',
    tagline: 'text-emerald-600',
    icon: 'bg-emerald-100 text-emerald-600',
  },
};

export const WorkshopOpeningView: React.FC<WorkshopOpeningViewProps> = ({ onNavigate }) => {
  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-y-auto custom-scrollbar pb-[140px] sm:pb-[90px] md:pb-16" dir="ltr">

      {/* Poster Hero */}
      <section className="max-w-2xl mx-auto w-full px-6 pt-6 pb-2">
        <img
          src="./poster.png"
          alt="InSites-CAA — CBSA Workshop Poster"
          className="w-full rounded-2xl border border-slate-200 shadow-sm"
        />
        <p className="text-center text-sm text-slate-500 italic mt-3 mb-1">
          "The LLM is a looking glass — more than a wonderland"
        </p>
      </section>

      {/* Looking Glass Slides */}
      <div className="max-w-2xl mx-auto w-full px-6 space-y-4 py-4">
        {LOOKING_GLASS_CARDS.map((card, idx) => {
          const accent = CARD_ACCENTS[card.color] || CARD_ACCENTS.indigo;
          return (
            <section
              key={card.id}
              className={`bg-white border border-slate-200 ${accent.border} border-l-4 rounded-2xl p-6 sm:p-8 shadow-sm`}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-9 h-9 ${accent.icon} rounded-xl flex items-center justify-center shrink-0 mt-0.5`}>
                  <Eye size={18} />
                </div>
                <div>
                  <h3 className={`text-lg font-black ${accent.title} leading-tight`}>{card.title}</h3>
                  <p className={`text-sm font-medium ${accent.tagline} mt-0.5`}>{card.tagline}</p>
                </div>
              </div>
              <div className="text-sm text-slate-700 leading-relaxed pl-12 space-y-2">
                {card.content.split('\\n').map((line, i) => {
                  if (!line.trim()) return null;
                  if (line.startsWith('**') && line.includes('**')) {
                    const parts = line.split('**');
                    return <p key={i} className="mt-3 first:mt-0"><strong className="text-slate-800">{parts[1]}</strong>{parts[2]}</p>;
                  }
                  if (line.startsWith('- ')) return <p key={i} className="pl-2 text-slate-600">{line}</p>;
                  if (line.startsWith('*') && line.endsWith('*')) return <p key={i} className="italic text-slate-500 mt-3">{line.slice(1, -1)}</p>;
                  return <p key={i}>{line}</p>;
                })}
              </div>
            </section>
          );
        })}
      </div>

      {/* Divider */}
      <div className="max-w-2xl mx-auto w-full px-6 py-2">
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Workshop Program</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>
      </div>

      {/* Embedded Program Timeline */}
      <WorkshopProgramView onNavigate={onNavigate} />
    </div>
  );
};

export default WorkshopOpeningView;
