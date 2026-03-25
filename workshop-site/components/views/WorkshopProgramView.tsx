import React, { useState } from 'react';
import { Clock, BookOpen, PenTool, MessageSquare, Presentation, Coffee, ChevronDown } from 'lucide-react';
import { SESSION_RESOURCES } from '../../constants';

interface ProgramBlock {
  number: number | null;
  title: string;
  duration: string;
  type: 'lecture' | 'hands-on' | 'discussion' | 'break';
  description: string;
  icon: React.ReactNode;
}

const WORKSHOP_PROGRAM: ProgramBlock[] = [
  {
    number: 1,
    title: "Opening + Theory & Demo",
    duration: "40 min",
    type: "lecture",
    description: "CBSA introduction, transformer mirrors, live InSites demo",
    icon: <Presentation size={18} />,
  },
  {
    number: 2,
    title: "Write with InSites",
    duration: "50 min",
    type: "hands-on",
    description: "Participants write a significance assessment using InSites",
    icon: <PenTool size={18} />,
  },
  {
    number: null,
    title: "Break",
    duration: "10 min",
    type: "break",
    description: "",
    icon: <Coffee size={18} />,
  },
  {
    number: 3,
    title: "Read with InSites",
    duration: "30 min",
    type: "hands-on",
    description: "Analyze existing assessments (EAC11 case studies)",
    icon: <BookOpen size={18} />,
  },
  {
    number: 4,
    title: "Ethics in Practice",
    duration: "40 min",
    type: "discussion",
    description: "Critical discussion: transparency, bias, responsibility",
    icon: <MessageSquare size={18} />,
  },
  {
    number: 5,
    title: "Wrap-up & Discussion",
    duration: "10 min",
    type: "lecture",
    description: "Takeaways, open questions, feedback",
    icon: <Presentation size={18} />,
  },
];

const TYPE_STYLES: Record<string, { bg: string; border: string; badge: string; badgeText: string; icon: string }> = {
  lecture: {
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    badge: 'bg-indigo-100',
    badgeText: 'text-indigo-700',
    icon: 'text-indigo-600',
  },
  'hands-on': {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    badge: 'bg-emerald-100',
    badgeText: 'text-emerald-700',
    icon: 'text-emerald-600',
  },
  discussion: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    badge: 'bg-amber-100',
    badgeText: 'text-amber-700',
    icon: 'text-amber-600',
  },
  break: {
    bg: 'bg-slate-50',
    border: 'border-slate-200',
    badge: 'bg-slate-100',
    badgeText: 'text-slate-500',
    icon: 'text-slate-400',
  },
};

const TYPE_LABELS: Record<string, string> = {
  lecture: 'Lecture + Demo',
  'hands-on': 'Hands-on',
  discussion: 'Discussion + Exercise',
  break: 'Break',
};

export interface WorkshopProgramViewProps {
  onNavigate?: (route: string) => void;
}

export const WorkshopProgramView: React.FC<WorkshopProgramViewProps> = ({ onNavigate }) => {
  const totalMinutes = WORKSHOP_PROGRAM.reduce((sum, b) => {
    const m = parseInt(b.duration);
    return sum + (isNaN(m) ? 0 : m);
  }, 0);

  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-y-auto custom-scrollbar pb-[140px] sm:pb-[90px] md:pb-16" dir="ltr">
      <div className="max-w-2xl mx-auto w-full px-6 py-6 space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-black text-slate-800 leading-tight">Workshop Program</h2>
          <p className="text-sm text-slate-500 mt-1">
            CAA 2026 — {Math.floor(totalMinutes / 60)}h {totalMinutes % 60 > 0 ? `${totalMinutes % 60}min` : ''} total
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-slate-200" />

          <div className="space-y-4">
            {WORKSHOP_PROGRAM.map((block, idx) => {
              const style = TYPE_STYLES[block.type];
              return (
                <div key={idx} className="relative flex gap-4">
                  {/* Timeline dot */}
                  <div className="relative z-10 shrink-0">
                    <div className={`w-10 h-10 rounded-full ${style.bg} border-2 ${style.border} flex items-center justify-center ${style.icon}`}>
                      {block.number !== null ? (
                        <span className="text-sm font-black">{block.number}</span>
                      ) : (
                        block.icon
                      )}
                    </div>
                  </div>

                  {/* Content card */}
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
              const mins = WORKSHOP_PROGRAM
                .filter(b => b.type === key)
                .reduce((s, b) => s + parseInt(b.duration), 0);
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
    </div>
  );
};

export default WorkshopProgramView;
