import React, { useState } from 'react';
import { Clock, BookOpen, PenTool, MessageSquare, Presentation, Coffee, ChevronDown, ArrowRight, Users, Lightbulb, ShieldCheck, Home, Eye } from 'lucide-react';
import { SESSION_RESOURCES, LOOKING_GLASS_CARDS } from '../../constants';

// ─── Schedule Data ────────────────────────────────────────────────

interface ProgramBlock {
  number: number | null;
  title: string;
  duration: string;
  type: 'lecture' | 'hands-on' | 'discussion' | 'break';
  description: string;
  icon: React.ReactNode;
}

const WORKSHOP_PROGRAM: ProgramBlock[] = [
  { number: 1, title: "Opening + Theory & Demo", duration: "40 min", type: "lecture", description: "CBSA introduction, transformer mirrors, live InSites demo", icon: <Presentation size={18} /> },
  { number: 2, title: "Write with InSites", duration: "50 min", type: "hands-on", description: "Participants write a significance assessment using InSites", icon: <PenTool size={18} /> },
  { number: null, title: "Break", duration: "10 min", type: "break", description: "", icon: <Coffee size={18} /> },
  { number: 3, title: "Read with InSites", duration: "30 min", type: "hands-on", description: "Analyze existing assessments (EAC11 case studies)", icon: <BookOpen size={18} /> },
  { number: 4, title: "Ethics in Practice", duration: "40 min", type: "discussion", description: "Critical discussion: transparency, bias, responsibility", icon: <MessageSquare size={18} /> },
  { number: 5, title: "Wrap-up & Discussion", duration: "10 min", type: "lecture", description: "Takeaways, open questions, feedback", icon: <Presentation size={18} /> },
];

const TYPE_STYLES: Record<string, { bg: string; border: string; badge: string; badgeText: string; icon: string }> = {
  lecture: { bg: 'bg-indigo-50', border: 'border-indigo-200', badge: 'bg-indigo-100', badgeText: 'text-indigo-700', icon: 'text-indigo-600' },
  'hands-on': { bg: 'bg-emerald-50', border: 'border-emerald-200', badge: 'bg-emerald-100', badgeText: 'text-emerald-700', icon: 'text-emerald-600' },
  discussion: { bg: 'bg-amber-50', border: 'border-amber-200', badge: 'bg-amber-100', badgeText: 'text-amber-700', icon: 'text-amber-600' },
  break: { bg: 'bg-slate-50', border: 'border-slate-200', badge: 'bg-slate-100', badgeText: 'text-slate-500', icon: 'text-slate-400' },
};

const TYPE_LABELS: Record<string, string> = {
  lecture: 'Lecture + Demo', 'hands-on': 'Hands-on', discussion: 'Discussion + Exercise', break: 'Break',
};

// ─── Tab Definitions ──────────────────────────────────────────────

const PROGRAM_TABS = [
  { id: 'story', label: 'Our Story', icon: <Users size={14} /> },
  { id: 'principles', label: 'Principles', icon: <Eye size={14} /> },
  { id: 'cbsa', label: 'CBSA', icon: <Lightbulb size={14} /> },
  { id: 'schedule', label: 'Schedule', icon: <Clock size={14} /> },
] as const;

type TabId = typeof PROGRAM_TABS[number]['id'];

// ─── Component ────────────────────────────────────────────────────

export interface WorkshopProgramViewProps {
  onNavigate?: (route: string) => void;
}

export const WorkshopProgramView: React.FC<WorkshopProgramViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<TabId>('story');

  const totalMinutes = WORKSHOP_PROGRAM.reduce((sum, b) => sum + (parseInt(b.duration) || 0), 0);

  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-y-auto custom-scrollbar pb-[140px] sm:pb-[90px] md:pb-16" dir="ltr">
      <div className="max-w-4xl mx-auto w-full px-6 py-4 space-y-4">

        {/* Tab Bar */}
        <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => onNavigate?.('home')}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all cursor-pointer"
            title="Back to Home"
          >
            <Home size={14} />
            <span className="hidden sm:inline">Home</span>
          </button>
          <div className="w-px bg-slate-300 my-1" />
          {PROGRAM_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-white text-slate-800 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'story' && <OurStoryTab />}
        {activeTab === 'principles' && <PrinciplesTab onNavigate={onNavigate} />}
        {activeTab === 'cbsa' && <CbsaTab onNavigate={onNavigate} />}
        {activeTab === 'schedule' && <ScheduleTab onNavigate={onNavigate} totalMinutes={totalMinutes} />}
      </div>
    </div>
  );
};

// ─── Our Story Tab ────────────────────────────────────────────────

const OurStoryTab: React.FC = () => (
  <div className="space-y-5">
    <div>
      <h3 className="text-xl font-black text-slate-800">InSites Knowledge Lab</h3>
      <p className="text-xs text-slate-400 mt-0.5">Technion — Israel Institute of Technology</p>
    </div>

    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
      <p className="text-sm text-slate-700 leading-relaxed">
        At the intersection of <strong>assessment methods</strong>, <strong>novel technologies</strong>, and <strong>built-heritage data</strong> — we develop computational methods for evidence-based heritage assessment.
      </p>
      <p className="text-sm text-slate-700 leading-relaxed">
        Atar.Bot is our research prototype: a multi-platform AI assistant that structures heritage significance assessment through the CBSA method. Not a black box — a looking glass.
      </p>
    </div>

    <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
      <h4 className="font-bold text-sm text-rose-900 mb-2">The Looking Glass Metaphor</h4>
      <p className="text-sm text-rose-800/80 italic leading-relaxed">
        "The LLM is a looking glass — more than a wonderland."
      </p>
      <p className="text-sm text-rose-800/70 mt-2 leading-relaxed">
        It reflects your material back, structured through CBSA. Every claim sourced. Every step approved by you. Alice decides where and when to step.
      </p>
    </div>

    <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
      <h4 className="font-bold text-sm text-indigo-900 mb-2">What We'll Do Today</h4>
      <ul className="text-sm text-indigo-800/80 space-y-1.5">
        <li className="flex gap-2"><span className="text-indigo-500">1.</span> Understand the design principles behind AI-assisted assessment</li>
        <li className="flex gap-2"><span className="text-indigo-500">2.</span> Write a real heritage assessment with the bot</li>
        <li className="flex gap-2"><span className="text-indigo-500">3.</span> Read and analyze existing assessments</li>
        <li className="flex gap-2"><span className="text-indigo-500">4.</span> Discuss ethics, transparency, and what this means for practice</li>
      </ul>
    </div>
  </div>
);

// ─── Principles Tab ───────────────────────────────────────────────

const PrinciplesTab: React.FC<{ onNavigate?: (route: string) => void }> = ({ onNavigate }) => {
  const colorMap: Record<string, { border: string; bg: string; icon: string; text: string }> = {
    rose: { border: 'border-rose-200', bg: 'bg-rose-50', icon: 'bg-rose-100 text-rose-600', text: 'text-rose-900' },
    indigo: { border: 'border-indigo-200', bg: 'bg-indigo-50', icon: 'bg-indigo-100 text-indigo-600', text: 'text-indigo-900' },
    emerald: { border: 'border-emerald-200', bg: 'bg-emerald-50', icon: 'bg-emerald-100 text-emerald-600', text: 'text-emerald-900' },
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-black text-slate-800">Design Principles</h3>
        <p className="text-xs text-slate-500 mt-0.5">How transparency, control, and evidence governance work in Atar.Bot</p>
      </div>

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

      {/* Link to full design view with additional details */}
      <button
        onClick={() => onNavigate?.('design')}
        className="w-full flex items-center justify-center gap-2 p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:text-slate-800 transition-all cursor-pointer"
      >
        <span>See full Design Principles view</span>
        <ArrowRight size={14} />
      </button>
    </div>
  );
};

// ─── CBSA Tab ─────────────────────────────────────────────────────

const CbsaTab: React.FC<{ onNavigate?: (route: string) => void }> = ({ onNavigate }) => (
  <div className="space-y-5">
    <div>
      <h3 className="text-xl font-black text-slate-800">Context-Based Significance Assessment</h3>
      <p className="text-xs text-slate-500 mt-0.5">A structured heritage method — not a bot feature</p>
    </div>

    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
      <p className="text-sm text-slate-700 leading-relaxed">
        CBSA is a values-based heritage assessment method. It structures the thinking process through 7 stages — each building on the previous — from data inventory to a synthesized significance statement. The method is platform-independent; the bot implements it.
      </p>
    </div>

    {/* Two differentiators */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <button
        onClick={() => onNavigate?.('governance')}
        className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-left hover:bg-emerald-100 hover:border-emerald-300 transition-all cursor-pointer group"
      >
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck size={16} className="text-emerald-600" />
          <h4 className="font-bold text-sm text-emerald-900">Human-in-the-Loop</h4>
          <ArrowRight size={12} className="text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
        </div>
        <p className="text-xs text-emerald-800/70 leading-relaxed">
          You approve every stage transition. The bot proposes analysis; you decide what stays, what changes, what's missing.
        </p>
      </button>
      <button
        onClick={() => onNavigate?.('step-1')}
        className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-left hover:bg-indigo-100 hover:border-indigo-300 transition-all cursor-pointer group"
      >
        <div className="flex items-center gap-2 mb-2">
          <ArrowRight size={16} className="text-indigo-600 rotate-45" />
          <h4 className="font-bold text-sm text-indigo-900">Context Effect</h4>
          <ArrowRight size={12} className="text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
        </div>
        <p className="text-xs text-indigo-800/70 leading-relaxed">
          Bidirectional framing: contexts shape how we read significance, and recognized significance reframes the context itself.
        </p>
      </button>
    </div>
  </div>
);

// ─── Schedule Tab ─────────────────────────────────────────────────

const ScheduleTab: React.FC<{ onNavigate?: (route: string) => void; totalMinutes: number }> = ({ onNavigate, totalMinutes }) => (
  <div className="space-y-4">
    <div>
      <h3 className="text-xl font-black text-slate-800">Workshop Schedule</h3>
      <p className="text-xs text-slate-500 mt-0.5">
        CAA 2026 — {Math.floor(totalMinutes / 60)}h {totalMinutes % 60 > 0 ? `${totalMinutes % 60}min` : ''} total
      </p>
    </div>

    {/* Timeline */}
    <div className="relative">
      <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-slate-200" />
      <div className="space-y-4">
        {WORKSHOP_PROGRAM.map((block, idx) => {
          const style = TYPE_STYLES[block.type];
          return (
            <div key={idx} className="relative flex gap-4">
              <div className="relative z-10 shrink-0">
                <div className={`w-10 h-10 rounded-full ${style.bg} border-2 ${style.border} flex items-center justify-center ${style.icon}`}>
                  {block.number !== null ? (
                    <span className="text-sm font-black">{block.number}</span>
                  ) : (
                    block.icon
                  )}
                </div>
              </div>
              <div className={`flex-1 ${style.bg} border ${style.border} rounded-xl p-4 ${block.type === 'break' ? 'py-3' : ''}`}>
                <div className="flex items-center justify-between gap-3 mb-1">
                  <h3 className={`font-bold text-sm ${block.type === 'break' ? 'text-slate-400' : 'text-slate-800'}`}>
                    {block.title}
                  </h3>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${style.badge} ${style.badgeText}`}>
                      {TYPE_LABELS[block.type]}
                    </span>
                    <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                      <Clock size={12} />
                      {block.duration}
                    </span>
                  </div>
                </div>
                {block.description && (
                  <p className="text-xs text-slate-600 leading-relaxed">{block.description}</p>
                )}
                {block.number !== null && SESSION_RESOURCES[block.number] && (
                  <details className="mt-2 group/res">
                    <summary className="text-[11px] font-bold text-slate-400 cursor-pointer flex items-center gap-1 hover:text-slate-600 transition-colors select-none">
                      <span>Resources</span>
                      <ChevronDown size={12} className="group-open/res:rotate-180 transition-transform" />
                    </summary>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {SESSION_RESOURCES[block.number]?.stages?.map((s) => (
                        <button
                          key={`s-${s}`}
                          onClick={() => onNavigate?.(`step-${s}`)}
                          className="text-[10px] font-bold bg-slate-100 text-slate-600 hover:bg-indigo-100 hover:text-indigo-700 px-2 py-0.5 rounded-full transition-colors cursor-pointer"
                        >
                          Stage {s}
                        </button>
                      ))}
                      {SESSION_RESOURCES[block.number]?.hashLinks?.map((link) => (
                        link.hash ? (
                          <button
                            key={link.hash}
                            onClick={() => onNavigate?.(link.hash)}
                            className="text-[10px] font-bold bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-2 py-0.5 rounded-full transition-colors cursor-pointer"
                          >
                            {link.label}
                          </button>
                        ) : (
                          <span key={link.label} className="text-[10px] font-bold bg-slate-50 text-slate-400 px-2 py-0.5 rounded-full">
                            {link.label}
                          </span>
                        )
                      ))}
                    </div>
                  </details>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>

    {/* Summary bar */}
    <div className="bg-slate-100 rounded-xl p-4 border border-slate-200">
      <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-500">
        {Object.entries(TYPE_LABELS).filter(([k]) => k !== 'break').map(([key, label]) => {
          const mins = WORKSHOP_PROGRAM.filter(b => b.type === key).reduce((s, b) => s + parseInt(b.duration), 0);
          const style = TYPE_STYLES[key];
          return (
            <div key={key} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${style.badge} border ${style.border}`} />
              <span>{label}: {mins} min</span>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

export default WorkshopProgramView;
