import React from 'react';
import { Eye, ChevronDown, ShieldCheck, Activity, ArrowRight } from 'lucide-react';
import { LOOKING_GLASS_CARDS } from '../../constants';

export interface DesignPrinciplesViewProps {
  onNavigate?: (route: string) => void;
}

const colorMap: Record<string, { border: string; bg: string; icon: string; text: string }> = {
  rose: { border: 'border-rose-200', bg: 'bg-rose-50', icon: 'bg-rose-100 text-rose-600', text: 'text-rose-900' },
  indigo: { border: 'border-indigo-200', bg: 'bg-indigo-50', icon: 'bg-indigo-100 text-indigo-600', text: 'text-indigo-900' },
  emerald: { border: 'border-emerald-200', bg: 'bg-emerald-50', icon: 'bg-emerald-100 text-emerald-600', text: 'text-emerald-900' },
};

export const DesignPrinciplesView: React.FC<DesignPrinciplesViewProps> = ({ onNavigate }) => (
  <div className="space-y-6">
    {/* Through the Looking Glass */}
    <div className="space-y-3">
      <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
        Through the Looking Glass
      </h4>
      <p className="text-sm text-slate-500 italic">
        "The LLM is a looking glass — more than a wonderland"
      </p>
      {LOOKING_GLASS_CARDS.map((card) => {
        const c = colorMap[card.color] || colorMap.indigo;
        return (
          <details key={card.id} className={`bg-white border ${c.border} rounded-xl overflow-hidden group`}>
            <summary className={`p-4 cursor-pointer flex items-center justify-between hover:${c.bg} transition-colors select-none`}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 ${c.icon} rounded-lg flex items-center justify-center shrink-0`}>
                  <Eye size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{card.title}</h4>
                  <p className="text-[11px] text-slate-500">{card.tagline}</p>
                </div>
              </div>
              <ChevronDown size={16} className="text-slate-400 group-open:rotate-180 transition-transform shrink-0" />
            </summary>
            <div className={`px-4 pb-4 pt-2 border-t ${c.border}`}>
              <div className={`text-sm ${c.text}/80 leading-relaxed whitespace-pre-line`}>
                {card.content.split('\\n').map((line, i) => {
                  if (line.startsWith('**') && line.includes('**')) {
                    const parts = line.split('**');
                    return <p key={i} className="mt-2"><strong>{parts[1]}</strong>{parts[2]}</p>;
                  }
                  if (line.startsWith('- ')) return <p key={i} className="ml-3">{line}</p>;
                  if (line.startsWith('*') && line.endsWith('*')) return <p key={i} className="italic mt-2">{line.slice(1, -1)}</p>;
                  return <p key={i}>{line}</p>;
                })}
              </div>
            </div>
          </details>
        );
      })}
    </div>

    {/* Divider — clickable title */}
    <div className="flex items-center gap-3 pt-2">
      <div className="flex-1 h-px bg-slate-200" />
      <button
        onClick={() => onNavigate?.("governance")}
        className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-emerald-600 transition-colors cursor-pointer flex items-center gap-1"
      >
        How the Bot Works
        <ArrowRight size={10} className="opacity-0 group-hover:opacity-100" />
      </button>
      <div className="flex-1 h-px bg-slate-200" />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <button
        onClick={() => onNavigate?.("notation")}
        className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-rose-200 hover:bg-rose-50/30 transition-all group cursor-pointer"
      >
        <div className="w-9 h-9 bg-rose-100 text-rose-600 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
          <Eye size={18} />
        </div>
        <div className="text-left">
          <h4 className="font-bold text-slate-800 text-sm">Epistemic Notation</h4>
          <p className="text-[11px] text-slate-500 line-clamp-2">Three-tier evidence marking: explicit, inferred〰️, uncertain💭</p>
        </div>
      </button>

      <button
        onClick={() => onNavigate?.("governance")}
        className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-emerald-200 hover:bg-emerald-50/30 transition-all group cursor-pointer"
      >
        <div className="w-9 h-9 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
          <ShieldCheck size={18} />
        </div>
        <div className="text-left">
          <h4 className="font-bold text-slate-800 text-sm">Governance & Control</h4>
          <p className="text-[11px] text-slate-500 line-clamp-2">HITL protocol, evidence mandate, revision control, status tracking</p>
        </div>
      </button>

      <button
        onClick={() => onNavigate?.("session-report")}
        className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-purple-200 hover:bg-purple-50/30 transition-all group cursor-pointer"
      >
        <div className="w-9 h-9 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
          <Activity size={18} />
        </div>
        <div className="text-left">
          <h4 className="font-bold text-slate-800 text-sm">Session Debrief & Trust Profile</h4>
          <p className="text-[11px] text-slate-500 line-clamp-2">Research instrumentation: interaction map, trust measurement</p>
        </div>
      </button>
    </div>
  </div>
);

export default DesignPrinciplesView;
