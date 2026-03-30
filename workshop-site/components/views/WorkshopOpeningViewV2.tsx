import React from 'react';
import { Eye, ChevronDown } from 'lucide-react';
import { LOOKING_GLASS_CARDS } from '../../constants';
import { WorkshopProgramView } from './WorkshopProgramView';

export interface WorkshopOpeningViewV2Props {
  onNavigate?: (route: string) => void;
}

const CARD_STYLES: Record<string, { border: string; bg: string; title: string; tagline: string; icon: string; expandBg: string }> = {
  rose: {
    border: 'border-l-rose-400',
    bg: 'bg-rose-50/40',
    title: 'text-rose-900',
    tagline: 'text-rose-700/80',
    icon: 'bg-rose-100 text-rose-600',
    expandBg: 'bg-rose-50/60',
  },
  indigo: {
    border: 'border-l-indigo-400',
    bg: 'bg-indigo-50/40',
    title: 'text-indigo-900',
    tagline: 'text-indigo-700/80',
    icon: 'bg-indigo-100 text-indigo-600',
    expandBg: 'bg-indigo-50/60',
  },
  emerald: {
    border: 'border-l-emerald-400',
    bg: 'bg-emerald-50/40',
    title: 'text-emerald-900',
    tagline: 'text-emerald-700/80',
    icon: 'bg-emerald-100 text-emerald-600',
    expandBg: 'bg-emerald-50/60',
  },
};

export const WorkshopOpeningViewV2: React.FC<WorkshopOpeningViewV2Props> = ({ onNavigate }) => {
  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-y-auto custom-scrollbar pb-[140px] sm:pb-[90px] md:pb-16" dir="ltr">

      {/* Poster Hero */}
      <section className="max-w-2xl mx-auto w-full px-6 pt-6 pb-4">
        <img
          src="./poster.png"
          alt="InSites-CAA — CBSA Workshop Poster"
          className="w-full rounded-2xl border border-slate-200 shadow-sm"
        />
        <p className="text-center text-base text-slate-500 italic mt-3">
          "The LLM is a looking glass — more than a wonderland"
        </p>
      </section>

      {/* Looking Glass Slides — Presentation Scale */}
      <div className="max-w-2xl mx-auto w-full px-6 space-y-5 py-4">
        {LOOKING_GLASS_CARDS.map((card, idx) => {
          const s = CARD_STYLES[card.color] || CARD_STYLES.indigo;
          return (
            <section
              key={card.id}
              className={`${s.bg} border border-slate-200 ${s.border} border-l-4 rounded-2xl shadow-sm overflow-hidden`}
            >
              {/* Hero area — always visible, presentation-scale */}
              <div className="px-8 pt-8 pb-6 sm:px-10 sm:pt-10 sm:pb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-11 h-11 ${s.icon} rounded-xl flex items-center justify-center shrink-0`}>
                    <Eye size={22} />
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{idx + 1} / 3</span>
                </div>
                <h3 className={`text-2xl sm:text-3xl font-black ${s.title} leading-tight mb-2`}>
                  {card.title}
                </h3>
                <p className={`text-lg sm:text-xl font-medium ${s.tagline} leading-snug`}>
                  {card.tagline}
                </p>
              </div>

              {/* Expandable body — for detail reading */}
              <details className="group/detail">
                <summary className={`px-8 sm:px-10 py-3 ${s.expandBg} border-t border-slate-200/60 cursor-pointer flex items-center gap-2 select-none hover:opacity-80 transition-opacity`}>
                  <ChevronDown size={14} className="text-slate-400 group-open/detail:rotate-180 transition-transform" />
                  <span className="text-xs font-bold text-slate-400">More</span>
                </summary>
                <div className="px-8 sm:px-10 pb-8 pt-4">
                  <div className="text-sm text-slate-700 leading-relaxed space-y-2">
                    {card.content.split('\\n').map((line, i) => {
                      if (!line.trim()) return null;
                      if (line.startsWith('**') && line.includes('**')) {
                        const parts = line.split('**');
                        return <p key={i} className="mt-3 first:mt-0"><strong className="text-slate-800">{parts[1]}</strong>{parts[2]}</p>;
                      }
                      if (line.startsWith('- ')) return <p key={i} className="pl-3 text-slate-600">{line}</p>;
                      if (line.startsWith('*') && line.endsWith('*')) return <p key={i} className="italic text-slate-500 mt-3">{line.slice(1, -1)}</p>;
                      return <p key={i}>{line}</p>;
                    })}
                  </div>
                </div>
              </details>
            </section>
          );
        })}
      </div>

      {/* Divider */}
      <div className="max-w-2xl mx-auto w-full px-6 py-3">
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

export default WorkshopOpeningViewV2;
