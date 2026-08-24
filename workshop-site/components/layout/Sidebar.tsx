import React from 'react';
import { Zap, ChevronRight } from 'lucide-react';
import { AgentConfig } from '../../types';

export interface SidebarProps {
  width: number;
  isResizing: boolean;
  onStartResize: (e: React.MouseEvent) => void;
  selectedAgentId: number | null;
  showResearchAids: boolean;
  agents: AgentConfig[];
  onAgentSelect: (agentId: number) => void;
  onResearchAidsClick: () => void;
  getAgentTheme: (agentId: number, colorName: string, isSelected: boolean) => { card: string; icon: string };
}

// ─── Process spine ─────────────────────────────────────────────────
// The sidebar reads as a process, not a button list: one vertical line
// (the spine) runs through all stages. Gates (0 and 6 — data/QA checks)
// attach via an open ring; stages 1–5 are the CBSA core, marked by a
// thicker indigo segment. A filled dot on every connector is the HITL
// stop — the expert review crossed between one stage and the next.

// ─── Sizing — the only place to tune the sidebar's scale ───────────
// Every font and icon size in this column comes from here. The values are
// literal Tailwind classes, so changing one changes every station at once
// (stages, gates and Extensions & Tools alike). Raising `title`/`role`
// raises each button's height, which lengthens the whole spine.
// Spacing between stations is NOT here — it is hand-tuned in the markup
// (`pt-5`, `min-h-[35px]`, `pt-2`). Leave those alone unless you mean to.

// The four TEXT sizes are not here — they are CSS variables in index.css
// (--sb-heading, --sb-title, --sb-role, --sb-legend), so they can be tried out
// live in DevTools without a rebuild and only written down once you like them.
// See the block above ":root" in index.css for the how-to and three preset
// sets. Everything that cannot be a CSS variable — icon sizes are numeric
// props to lucide, not styles — stays here.
const SIZE = {
  heading: 'text-[length:var(--sb-heading)]',  // "Assessment Process (CBSA Approach)"
  title: 'text-[length:var(--sb-title)]',      // stage name — drives button height
  role: 'text-[length:var(--sb-role)]',        // the line under the stage name
  legend: 'text-[length:var(--sb-legend)]',    // the ○ / ● key at the bottom
  bubble: 'w-11 h-8',      // the round icon holder inside each button
  icon: 20,                // lucide icon size inside the bubble, in px
  cardPad: 'p-2.5',        // padding inside every button
  chevron: 16,             // the Extensions & Tools arrow, in px
} as const;

const isGate = (id: number) => id === 0 || id === 6;

// Line running through a station row (trimmed at the process ends)
const stationLine = (id: number) =>
  id === 0
    ? 'top-1/2 bottom-0 w-px bg-slate-300'
    : id === 6
      ? 'top-0 bottom-1/2 w-px bg-slate-300'
      : 'top-0 bottom-0 w-[3px] bg-indigo-300';

// Line on the connector after a given stage (core between 1..5)
const connectorLine = (afterId: number) =>
  afterId >= 1 && afterId <= 4 ? 'w-[3px] bg-indigo-300' : 'w-px bg-slate-300';

export const Sidebar: React.FC<SidebarProps> = ({
  width,
  isResizing,
  onStartResize,
  selectedAgentId,
  showResearchAids,
  agents,
  onAgentSelect,
  onResearchAidsClick,
  getAgentTheme,
}) => {
  return (
    <aside
      style={{ width }}
      className={`shrink-0 border-r border-slate-200 bg-slate-50/80 backdrop-blur-md transition-shadow duration-300 will-change-transform z-20 flex-col sticky top-0 h-full pb-[46px] hidden lg:flex ${selectedAgentId !== null || showResearchAids ? 'shadow-2xl shadow-indigo-200/40' : 'shadow-none'}`}
    >
      {/* Resize handle */}
      <div
        onMouseDown={onStartResize}
        className={`absolute top-1 bottom-0 right-0 w-2 cursor-col-resize z-50 group hover:bg-indigo-400/30 bg-slate-200/40 transition-colors ${isResizing ? 'bg-indigo-500/40' : ''}`}
        title="Drag to resize"
      >
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-8 bg-slate-300 rounded-full group-hover:bg-indigo-500 transition-colors ${isResizing ? 'bg-indigo-600 h-12' : ''}`}></div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="h-full px-2 pt-0 pb-2 text-left flex flex-col">
          <h3 className={`${SIZE.heading} font-black uppercase tracking-widest text-slate-400 text-center pt-5 pb-5`}>
            Assessment Process (CBSA Approach)
          </h3>

          {/* Stations on the spine */}
          <div className="flex-1 min-h-0 flex flex-col">
            {agents.map((agent, idx) => {
              const theme = getAgentTheme(agent.id, agent.color, selectedAgentId === agent.id);
              return (
                <React.Fragment key={agent.id}>
                  {/* Station row */}
                  <div className="flex items-stretch">
                    <div className="w-6 shrink-0 relative flex items-center justify-center">
                      <div className={`absolute left-1/2 -translate-x-1/2 ${stationLine(agent.id)}`}></div>
                      {isGate(agent.id) && (
                        <div
                          title="Data & QA gate"
                          className="relative z-10 w-3.5 h-3.5 rounded-full bg-white border-2 border-slate-400"
                        ></div>
                      )}
                    </div>
                    <div
                      onClick={() => onAgentSelect(agent.id)}
                      className={`flex-1 relative flex items-center justify-between ${SIZE.cardPad} rounded-xl border-2 cursor-pointer transition-all duration-300 ${theme.card} ${isGate(agent.id) ? 'border-dashed' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`${SIZE.bubble} shrink-0 rounded-full flex items-center justify-center border-2 border-white shadow-sm duration-500 ${theme.icon}`}>
                          {React.cloneElement(agent.icon as React.ReactElement<{ size?: number }>, { size: SIZE.icon })}
                        </div>
                        <div>
                          <h3 className={`font-bold ${SIZE.title} leading-tight ${selectedAgentId === agent.id ? 'text-slate-900' : 'text-slate-600'}`}>
                            {agent.name}
                          </h3>
                          <p className={`${SIZE.role} text-slate-500 leading-tight mt-0.5`}>{agent.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Connector with the HITL stop */}
                  {idx < agents.length - 1 && (
                    <div className="flex items-stretch flex-1 min-h-[35px]">
                      <div className="w-6 shrink-0 relative flex items-center justify-center">
                        <div className={`absolute left-1/2 -translate-x-1/2 top-0 bottom-0 ${connectorLine(agent.id)}`}></div>
                        <div
                          title="Human-in-the-loop — expert review before the next stage"
                          className="relative z-10 w-[9px] h-[9px] rounded-full bg-indigo-500 ring-2 ring-slate-50"
                        ></div>
                      </div>
                      <div className="flex-1"></div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Extensions - a station off the spine: same card, no dot, no line */}
          <div className="flex items-stretch pt-5 shrink-0">
            <div className="w-6 shrink-0"></div>
            <div
              onClick={onResearchAidsClick}
              className={`flex-1 relative flex items-center justify-between ${SIZE.cardPad} rounded-xl border-2 cursor-pointer transition-all duration-300 ${showResearchAids ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-200' : 'bg-indigo-50/60 border-indigo-200 hover:bg-indigo-100/70 hover:border-indigo-300 hover:shadow-md'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`${SIZE.bubble} shrink-0 rounded-full flex items-center justify-center border-2 border-white shadow-sm duration-500 ${showResearchAids ? 'bg-indigo-600 text-white shadow-indigo-200' : 'bg-indigo-50 text-indigo-700 border-indigo-100'}`}>
                  <Zap size={SIZE.icon} />
                </div>
                <div>
                  <h3 className={`font-bold ${SIZE.title} leading-tight ${showResearchAids ? 'text-white' : 'text-indigo-900'}`}>
                    Extensions &amp; Tools
                  </h3>
                  <p className={`${SIZE.role} leading-tight mt-0.5 ${showResearchAids ? 'text-indigo-100' : 'text-indigo-500/80'}`}>Knowledge graph, dashboard, readings</p>
                </div>
              </div>
              <ChevronRight
                size={SIZE.chevron}
                className={`transition-transform duration-300 ${showResearchAids ? 'text-indigo-400 translate-x-1' : 'text-slate-300'}`}
              />
            </div>
          </div>

          {/* Legend */}
          <p className={`${SIZE.legend} text-slate-400 text-center pt-2 shrink-0 tracking-wide`}>
            <span className="text-slate-500">○</span> data &amp; QA gate&ensp;·&ensp;<span className="text-indigo-500">●</span> HITL expert review
          </p>

        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
