import React, { useState } from 'react';
import { Clock, BookOpen, PenTool, MessageSquare, Presentation, Coffee, ChevronDown, ArrowRight, Users, Lightbulb, ShieldCheck, Home, Eye } from 'lucide-react';
import { SESSION_RESOURCES } from '../../constants';
import { DesignPrinciplesView } from './DesignPrinciplesView';

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
  { number: 4, title: "Build Your Own AI Assistant", duration: "40 min", type: "hands-on", description: "Design your own AI agent — choose its expertise, principles, and workflow. Then deploy it.", icon: <MessageSquare size={18} /> },
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
  { id: 'challenges', label: 'Our Story', icon: <Users size={14} /> },
  { id: 'cbsa', label: 'CBSA', icon: <Lightbulb size={14} /> },
  { id: 'principles', label: 'Principles', icon: <Eye size={14} /> },
  { id: 'schedule', label: 'Program', icon: <Clock size={14} /> },
] as const;

type TabId = typeof PROGRAM_TABS[number]['id'];

// ─── Component ────────────────────────────────────────────────────

export interface WorkshopProgramViewProps {
  onNavigate?: (route: string) => void;
}

export const WorkshopProgramView: React.FC<WorkshopProgramViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<TabId>('challenges');

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
        {activeTab === 'challenges' && <ChallengesTab />}
        {activeTab === 'principles' && <PrinciplesTab onNavigate={onNavigate} />}
        {activeTab === 'cbsa' && <CbsaTab onNavigate={onNavigate} />}
        {activeTab === 'schedule' && <ScheduleTab onNavigate={onNavigate} totalMinutes={totalMinutes} />}
      </div>
    </div>
  );
};

// ─── Challenges Tab (Our Story v2 — poster + challenge cards) ─────

const CHALLENGES = [
  {
    quote: "It's important but too complex",
    response: "With AI trained in our assessment principles, we can simplify the process and link outputs directly to surveys and systems.",
    color: 'amber',
    avatar: './rabbit.png',
  },
  {
    quote: "It's too heavy, no one reads it",
    response: "With natural language queries and visual tools like knowledge graphs, we can make cultural insights clearer, usable, and even discover new ones.",
    color: 'indigo',
    avatar: './hatter.jpg',
  },
  {
    quote: "So will AI replace the professionals?",
    response: "No. Experts remain essential. AI is a smart partner for detecting connections and contexts — but it needs our guidance.",
    color: 'emerald',
    avatar: './robot.png',
  },
];

const challengeColors: Record<string, { border: string; bg: string; text: string; quote: string }> = {
  amber: { border: 'border-l-amber-400', bg: 'bg-amber-50', text: 'text-amber-900/70', quote: 'text-amber-900' },
  indigo: { border: 'border-l-indigo-400', bg: 'bg-indigo-50', text: 'text-indigo-900/70', quote: 'text-indigo-900' },
  emerald: { border: 'border-l-emerald-400', bg: 'bg-emerald-50', text: 'text-emerald-900/70', quote: 'text-emerald-900' },
};

const ChallengesTab: React.FC = () => (
  <div className="space-y-5">
    {/* Poster */}
    <div>
      <img
        src="./poster.png"
        alt="InSites-CAA — CBSA Workshop"
        className="w-full rounded-2xl border border-slate-200 shadow-sm"
      />
      <p className="text-center text-base text-slate-500 italic mt-2">
        "The LLM is a looking glass — more than a wonderland"
      </p>
      <p className="text-center text-sm text-slate-400 mt-1">
        CBSA and the transformer share a core idea: meaning emerges from context.
      </p>
    </div>

    {/* Intro line */}
    <p className="text-base text-slate-600 leading-relaxed">
      AI already speaks our language and is becoming an active partner in culture. In this workshop, we examine how it can help with the assessment challenges:
    </p>

    {/* 3 Challenge cards with character avatars */}
    <div className="space-y-3">
      {CHALLENGES.map((ch, idx) => {
        const c = challengeColors[ch.color] || challengeColors.amber;
        const isRight = idx % 2 === 0;
        return (
          <details key={idx} className={`${c.bg} border border-slate-200 ${c.border} border-l-4 rounded-xl overflow-hidden group`}>
            <summary className={`p-4 cursor-pointer flex items-center gap-3 select-none ${isRight ? '' : 'flex-row-reverse text-right'}`}>
              <img
                src={ch.avatar}
                alt=""
                className="w-16 h-16 rounded-full border-2 border-white shadow-md shrink-0 object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <span className={`font-bold text-base ${c.quote} flex-1`}>"{ch.quote}"</span>
              <ChevronDown size={16} className="text-slate-400 group-open:rotate-180 transition-transform shrink-0" />
            </summary>
            <div className="px-4 pb-4 pt-1">
              <p className={`text-base ${c.text} leading-relaxed`}>{ch.response}</p>
            </div>
          </details>
        );
      })}
    </div>

    {/* Lab intro */}
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
      <h4 className="font-bold text-base text-slate-800">InSites Knowledge Lab</h4>
      <p className="text-sm text-slate-400">Technion — Israel Institute of Technology</p>
      <p className="text-base text-slate-700 leading-relaxed">
        At the intersection of <strong>assessment methods</strong>, <strong>novel technologies</strong>, and <strong>built-heritage data</strong> — we develop computational methods for evidence-based heritage assessment.
      </p>
      <p className="text-base text-slate-700 leading-relaxed">
        InSites-CAA is our research prototype: a multi-platform AI assistant that structures heritage significance assessment through the CBSA method. Not a black box — a looking glass.
      </p>
    </div>
  </div>
);

// ─── Principles Tab (uses shared DesignPrinciplesView) ────────────

const PrinciplesTab: React.FC<{ onNavigate?: (route: string) => void }> = ({ onNavigate }) => (
  <div className="space-y-4">
    <div>
      <h3 className="text-2xl font-black text-slate-800">Design Principles</h3>
      <p className="text-sm text-slate-500 mt-0.5">How transparency, control, and evidence governance work in InSites-CAA</p>
    </div>
    <DesignPrinciplesView onNavigate={onNavigate} />
  </div>
);

// ─── CBSA Tab ─────────────────────────────────────────────────────

const CbsaTab: React.FC<{ onNavigate?: (route: string) => void }> = ({ onNavigate }) => (
  <div className="space-y-5">
    <div>
      <h3 className="text-2xl font-black text-slate-800">Context-Based Significance Assessment</h3>
      <p className="text-sm text-slate-500 mt-0.5">A structured heritage method — not a bot feature</p>
    </div>

    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
      <p className="text-base text-slate-700 leading-relaxed">
        CBSA is a values-based heritage assessment method. It structures the thinking process through 7 stages — each building on the previous — from data inventory to a synthesized significance statement. The method is platform-independent; the bot implements it.
      </p>
    </div>

    {/* Context Effect — visual explanation */}
    <details className="bg-indigo-50 border border-indigo-200 border-l-4 border-l-indigo-400 rounded-xl overflow-hidden group">
      <summary className="p-4 cursor-pointer flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <ArrowRight size={16} className="text-indigo-600 rotate-45" />
          <div>
            <h4 className="font-bold text-base text-indigo-900">Context Effect</h4>
            <p className="text-xs text-indigo-600/70">The core CBSA principle — bidirectional, evaluative</p>
          </div>
        </div>
        <ChevronDown size={16} className="text-indigo-400 group-open:rotate-180 transition-transform shrink-0" />
      </summary>
      <div className="px-4 pb-4 pt-2 border-t border-indigo-200 space-y-4">
        {/* Visual diagram */}
        <div className="flex items-center justify-center gap-3 py-3">
          <div className="bg-white border-2 border-indigo-300 rounded-xl px-4 py-3 text-center shadow-sm">
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-wide">Context</p>
            <p className="text-[10px] text-indigo-400">(lens)</p>
          </div>
          <div className="flex flex-col items-center gap-0.5 text-indigo-500">
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-bold">frames</span>
              <span>→</span>
            </div>
            <div className="flex items-center gap-1">
              <span>←</span>
              <span className="text-[10px] font-bold">reframes</span>
            </div>
          </div>
          <div className="bg-white border-2 border-amber-300 rounded-xl px-4 py-3 text-center shadow-sm">
            <p className="text-xs font-bold text-amber-600 uppercase tracking-wide">Asset</p>
            <p className="text-[10px] text-amber-400">(significance)</p>
          </div>
        </div>

        {/* Example */}
        <div className="bg-white/60 rounded-lg p-3 space-y-1.5">
          <p className="text-[11px] font-bold text-indigo-800">Example:</p>
          <p className="text-xs text-indigo-800/70">
            🏛 <strong>"Mamluk trade route"</strong> (context)
          </p>
          <p className="text-xs text-indigo-800/60 ml-4">
            → frames the caravanserai as having economic + social value
          </p>
          <p className="text-xs text-indigo-800/60 ml-4">
            ← the caravanserai's survival reframes the trade route as heritage-significant
          </p>
        </div>

        {/* Rule */}
        <p className="text-[11px] text-indigo-700/60 italic">
          Evaluative, not causal. Never "caused" or "led to" — always "frames" and "reframes."
        </p>
      </div>
    </details>
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
                {block.number === 4 && (
                  <details className="mt-2 group/deploy">
                    <summary className="text-[11px] font-bold text-amber-600 cursor-pointer flex items-center gap-1 hover:text-amber-700 transition-colors select-none">
                      <span>How to deploy what you built</span>
                      <ChevronDown size={12} className="group-open/deploy:rotate-180 transition-transform" />
                    </summary>
                    <div className="mt-2 bg-amber-50 border border-amber-200 rounded-lg p-3 space-y-2">
                      <p className="text-[11px] text-slate-700 font-medium">After the bot generates your system instructions:</p>
                      <ol className="text-[11px] text-slate-600 space-y-1.5 list-decimal ml-3">
                        <li><strong>Copy</strong> the generated text</li>
                        <li><strong>Deploy</strong> on your platform:
                          <ul className="mt-1 ml-3 space-y-0.5 list-disc text-[10px]">
                            <li><strong>Claude</strong> → Projects → New Project → paste as Custom Instructions</li>
                            <li><strong>ChatGPT</strong> → Explore GPTs → Create → paste in Instructions</li>
                            <li><strong>Gemini</strong> → Gem Manager → New Gem → paste in System Instructions</li>
                          </ul>
                        </li>
                        <li><strong>Test</strong> — give it a short task and see how it responds</li>
                        <li><strong>Save</strong> — the file is yours to keep refining</li>
                      </ol>
                    </div>
                  </details>
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
