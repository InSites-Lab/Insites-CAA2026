import React from 'react';
import { Zap, ChevronRight } from 'lucide-react';
import { AgentConfig } from '../../types';
// Type-only, so it is erased at build time and adds no import edge between
// layout and views.
import type { SidebarMode } from '../views/WorkshopProgramView';

export interface SidebarProps {
  width: number;
  /** Which build to paint. `full` on tab 1, where the framework is the subject;
   *  `compact` on the rest, where it is context. Set by the deck — see
   *  SIDEBAR_MODE in WorkshopProgramView. */
  mode: SidebarMode;
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
// See the block above ":root" in index.css for the how-to and the presets.
// The four class names below therefore do NOT change with the mode: they name
// variables, and it is the variables that swap — the <aside> carries
// data-sb={mode} and the [data-sb="compact"] rule redefines them for everything
// under it. Everything that cannot be a CSS variable — icon sizes are numeric
// props to lucide, not styles — stays here, and needs both builds spelled out.
const TEXT = {
  heading: 'text-[length:var(--sb-heading)]',  // "InSites CBSA Framework"
  title: 'text-[length:var(--sb-title)]',      // stage name — drives button height
  role: 'text-[length:var(--sb-role)]',        // the line under the stage name
  legend: 'text-[length:var(--sb-legend)]',    // the ○ / ● key at the bottom
} as const;

const SIZE = {
  full: {
    bubble: 'w-11 h-8',    // the round icon holder inside each button
    icon: 20,              // lucide icon size inside the bubble, in px
    cardPad: 'p-2.5',      // padding inside every button
    chevron: 16,           // the Extensions & Tools arrow, in px
  },
  compact: {
    bubble: 'w-9 h-7',
    icon: 17,
    cardPad: 'p-2',
    chevron: 14,
  },
} as const;

// ─── Hover — tune the size step here ──────────────────────────────
// The other half of the hover, and the half that survives a projector even
// where colour does not: the card the pointer is on GROWS. It is how the
// speaker points at a stage from a lectern, so it has to be visible from the
// back of a hall rather than merely felt by whoever holds the mouse.
//
// 1.03 is the ceiling that still fits. The card is flex-1 in a row with the
// 24px spine on its left and the column's px-2 (8px) on its right, so a 3%
// step on a ~270px card spends about 4px per side — inside that padding, with
// nothing to clip and no horizontal scrollbar. Go past ~1.04 and the rail
// starts scrolling sideways.
//
// z-10 matches what a SELECTED card already does, so a hovered card lifts over
// its neighbours' borders instead of being cut by them. The colour half lives
// with the colours, in AGENT_STYLE.hoverCard (App.tsx).
const HOVER =
  'hover:scale-[1.04] hover:z-16 hover:shadow-lg motion-reduce:hover:scale-100';

const isGate = (id: number) => id === 0 || id === 6;

// Line running through a station row (trimmed at the process ends)
// The grey strokes take --sb-line so they follow the rail's ground; the indigo
// core segment does NOT, on purpose — it marks CBSA stages 1-5, and a semantic
// mark should not fade out when someone tries a darker rail.
const stationLine = (id: number) =>
  id === 0
    ? 'top-1/2 bottom-0 w-px bg-[var(--sb-line)]'
    : id === 6
      ? 'top-0 bottom-1/2 w-px bg-[var(--sb-line)]'
      : 'top-0 bottom-0 w-[3px] bg-indigo-300';

// Line on the connector after a given stage (core between 1..5)
const connectorLine = (afterId: number) =>
  afterId >= 1 && afterId <= 4 ? 'w-[3px] bg-indigo-300' : 'w-px bg-[var(--sb-line)]';

export const Sidebar: React.FC<SidebarProps> = ({
  width,
  mode,
  isResizing,
  onStartResize,
  selectedAgentId,
  showResearchAids,
  agents,
  onAgentSelect,
  onResearchAidsClick,
  getAgentTheme,
}) => {
  const S = SIZE[mode];
  return (
    // data-sb is what makes the mode reach the type: the [data-sb="compact"]
    // rule in index.css redefines the four --sb-* variables, and CSS variables
    // inherit, so every text-[length:var(--sb-…)] below picks up the new value
    // without a single conditional class.
    //
    // The width animates between the two builds, so a tab change reads as the
    // column stepping back rather than as a cut. NOT while dragging, though —
    // a transition there makes the edge lag behind the cursor.
    <aside
      data-sb={mode}
      style={{ width }}
      className={`shrink-0 border-r border-[var(--sb-line)] bg-[var(--sb-bg)] backdrop-blur-md will-change-transform z-20 flex-col sticky top-0 h-full pb-[46px] hidden lg:flex ${
        isResizing
          ? 'transition-shadow duration-300'
          : 'transition-[box-shadow,width] duration-200 ease-out motion-reduce:transition-none'
      } ${selectedAgentId !== null || showResearchAids ? 'shadow-2xl shadow-indigo-200/40' : 'shadow-none'}`}
    >
      {/* Resize handle */}
      <div
        onMouseDown={onStartResize}
        className={`absolute top-1 bottom-0 right-0 w-2 cursor-col-resize z-50 group hover:bg-indigo-400/30 bg-slate-200/40 transition-colors ${isResizing ? 'bg-indigo-500/40' : ''}`}
        title="Drag to resize"
      >
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-8 bg-[var(--sb-line)] rounded-full group-hover:bg-indigo-500 transition-colors ${isResizing ? 'bg-indigo-600 h-12' : ''}`}></div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto">
        {/* min-h-full, NOT h-full: with the app shell now a definite h-dvh,
            a hard height here pinned this column to the rail even when its
            content was taller — the flex children compressed and the cards
            painted over each other instead of the rail scrolling. A MINIMUM
            keeps the nice tall-screen behaviour (the spine's connectors
            stretch, the legend sits at the bottom) and lets the column grow
            past the rail on a short screen, which is what hands the
            overflow-y-auto above something to scroll. */}
        <div className="min-h-full px-2 pt-0 pb-2 text-left flex flex-col">
          <h3 className={`${TEXT.heading} font-black uppercase tracking-widest text-[var(--sb-ink)] text-center pt-5 pb-5`}>
              InSites CBSA Framework 
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
                      className={`flex-1 relative flex items-center justify-between ${S.cardPad} rounded-xl border-2 cursor-pointer transition-all duration-300 ${HOVER} ${theme.card} ${isGate(agent.id) ? 'border-dashed' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`${S.bubble} shrink-0 rounded-full flex items-center justify-center border-2 border-white shadow-sm duration-500 ${theme.icon}`}>
                          {React.cloneElement(agent.icon as React.ReactElement<{ size?: number }>, { size: S.icon })}
                        </div>
                        <div>
                          <h3 className={`font-bold ${TEXT.title} leading-tight ${selectedAgentId === agent.id ? 'text-slate-900' : 'text-slate-600'}`}>
                            {agent.name}
                          </h3>
                          {/* The role line is what the compact build gives up: on tabs
                              2-5 the spine is a reminder of where we are, and a stage
                              NAME is enough for that. Seven descriptions there are
                              seven lines of prose beside a slide, unread. */}
                          {mode === 'full' && (
                            <p className={`${TEXT.role} text-slate-500 leading-tight mt-0.5`}>{agent.role}</p>
                          )}
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
                          // The ring is not a halo, it is the RAIL painted around
                          // the dot so the spine appears to break for it. It must
                          // therefore be --sb-bg exactly; anything else becomes a
                          // visible pale donut the moment the rail darkens.
                          className="relative z-10 w-[9px] h-[9px] rounded-full bg-indigo-500 ring-2 ring-[var(--sb-bg)]"
                        ></div>
                      </div>
                      <div className="flex-1"></div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Extensions - a station off the spine: same card, no dot, no line.
              This one KEEPS its description in both builds: it is not part of
              the process, so its name alone does not say what it opens — the
              three words underneath are the whole of what it is. */}
          <div className="flex items-stretch pt-5 shrink-0">
            <div className="w-6 shrink-0"></div>
            <div
              onClick={onResearchAidsClick}
              className={`flex-1 relative flex items-center justify-between ${S.cardPad} rounded-xl border-2 cursor-pointer transition-all duration-300 ${showResearchAids ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-200' : 'bg-indigo-50/60 border-indigo-200 hover:bg-indigo-100/70 hover:border-indigo-300 hover:shadow-md'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`${S.bubble} shrink-0 rounded-full flex items-center justify-center border-2 border-white shadow-sm duration-500 ${showResearchAids ? 'bg-indigo-600 text-white shadow-indigo-200' : 'bg-indigo-50 text-indigo-700 border-indigo-100'}`}>
                  <Zap size={S.icon} />
                </div>
                <div>
                  <h3 className={`font-bold ${TEXT.title} leading-tight ${showResearchAids ? 'text-white' : 'text-indigo-900'}`}>
                    Extensions &amp; Tools
                  </h3>
                  <p className={`${TEXT.role} leading-tight mt-0.5 ${showResearchAids ? 'text-indigo-100' : 'text-indigo-500/80'}`}>Knowledge graph, dashboard, readings</p>
                </div>
              </div>
              <ChevronRight
                size={S.chevron}
                className={`transition-transform duration-300 ${showResearchAids ? 'text-indigo-400 translate-x-1' : 'text-slate-300'}`}
              />
            </div>
          </div>

          {/* Legend */}
          <p className={`${TEXT.legend} text-[var(--sb-ink)] text-center pt-2 shrink-0 tracking-wide`}>
            <span className="text-[var(--sb-ink)]">○</span> data &amp; QA gate&ensp;·&ensp;<span className="text-indigo-500">●</span> HITL expert review
          </p>

        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
