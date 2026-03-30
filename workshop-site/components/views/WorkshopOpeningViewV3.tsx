import React, { useState } from 'react';
import { Eye, ChevronRight } from 'lucide-react';
import { LOOKING_GLASS_CARDS } from '../../constants';
import { WorkshopProgramView } from './WorkshopProgramView';

export interface WorkshopOpeningViewV3Props {
  onNavigate?: (route: string) => void;
}

const TAB_STYLES: Record<string, {
  activeBg: string; activeBorder: string; activeText: string;
  pillBg: string; pillText: string;
  icon: string; contentBg: string; titleText: string; taglineText: string;
}> = {
  rose: {
    activeBg: 'bg-rose-50/50', activeBorder: 'border-rose-300', activeText: 'text-rose-800',
    pillBg: 'bg-rose-600', pillText: 'text-white',
    icon: 'bg-rose-100 text-rose-600',
    contentBg: 'bg-rose-50/30',
    titleText: 'text-rose-900',
    taglineText: 'text-rose-700/70',
  },
  indigo: {
    activeBg: 'bg-indigo-50/50', activeBorder: 'border-indigo-300', activeText: 'text-indigo-800',
    pillBg: 'bg-indigo-600', pillText: 'text-white',
    icon: 'bg-indigo-100 text-indigo-600',
    contentBg: 'bg-indigo-50/30',
    titleText: 'text-indigo-900',
    taglineText: 'text-indigo-700/70',
  },
  emerald: {
    activeBg: 'bg-emerald-50/50', activeBorder: 'border-emerald-300', activeText: 'text-emerald-800',
    pillBg: 'bg-emerald-600', pillText: 'text-white',
    icon: 'bg-emerald-100 text-emerald-600',
    contentBg: 'bg-emerald-50/30',
    titleText: 'text-emerald-900',
    taglineText: 'text-emerald-700/70',
  },
};

export const WorkshopOpeningViewV3: React.FC<WorkshopOpeningViewV3Props> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState(0);
  const card = LOOKING_GLASS_CARDS[activeTab];
  const s = TAB_STYLES[card.color] || TAB_STYLES.indigo;

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

      {/* Tab Section */}
      <div className="max-w-2xl mx-auto w-full px-6 py-4">

        {/* Pill Tabs */}
        <div className="flex gap-2 mb-4">
          {LOOKING_GLASS_CARDS.map((c, idx) => {
            const ts = TAB_STYLES[c.color] || TAB_STYLES.indigo;
            const isActive = idx === activeTab;
            return (
              <button
                key={c.id}
                onClick={() => setActiveTab(idx)}
                className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer border ${
                  isActive
                    ? `${ts.pillBg} ${ts.pillText} border-transparent shadow-md`
                    : `bg-white ${ts.activeText} border-slate-200 hover:${ts.activeBg}`
                }`}
              >
                {c.title}
              </button>
            );
          })}
        </div>

        {/* Active Card Content */}
        <div className={`${s.contentBg} border ${s.activeBorder} rounded-2xl overflow-hidden transition-all`}>

          {/* Header */}
          <div className="px-6 pt-6 pb-4 sm:px-8 sm:pt-8 sm:pb-5">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 ${s.icon} rounded-xl flex items-center justify-center shrink-0`}>
                <Eye size={20} />
              </div>
              <div>
                <h3 className={`text-xl font-black ${s.titleText} leading-tight`}>{card.title}</h3>
                <p className={`text-sm font-medium ${s.taglineText} mt-0.5`}>{card.tagline}</p>
              </div>
            </div>

            {/* Body — large readable text */}
            <div className="text-base text-slate-700 leading-relaxed space-y-3">
              {card.content.split('\\n').map((line, i) => {
                if (!line.trim()) return null;
                if (line.startsWith('**') && line.includes('**')) {
                  const parts = line.split('**');
                  return <p key={i} className="mt-4 first:mt-0"><strong className="text-slate-800 text-lg">{parts[1]}</strong>{parts[2]}</p>;
                }
                if (line.startsWith('- ')) return <p key={i} className="pl-4 text-slate-600">{line}</p>;
                if (line.startsWith('*') && line.endsWith('*')) return <p key={i} className="italic text-slate-500 mt-4 text-[15px]">{line.slice(1, -1)}</p>;
                return <p key={i}>{line}</p>;
              })}
            </div>
          </div>

          {/* Visual placeholder */}
          <div className={`mx-6 mb-6 sm:mx-8 sm:mb-8 rounded-xl border border-dashed border-slate-300 ${s.activeBg} p-6 flex items-center justify-center`}>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Visual placeholder</span>
          </div>
        </div>

        {/* Next tab hint */}
        {activeTab < LOOKING_GLASS_CARDS.length - 1 && (
          <button
            onClick={() => setActiveTab(activeTab + 1)}
            className="mt-3 flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors cursor-pointer mx-auto"
          >
            <span>Next: {LOOKING_GLASS_CARDS[activeTab + 1].title}</span>
            <ChevronRight size={14} />
          </button>
        )}
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

export default WorkshopOpeningViewV3;
