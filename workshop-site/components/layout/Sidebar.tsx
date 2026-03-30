import React from 'react';
import { Zap, ChevronRight, Eye } from 'lucide-react';
import { AgentConfig } from '../../types';

export interface SidebarProps {
  width: number;
  isResizing: boolean;
  onStartResize: (e: React.MouseEvent) => void;
  selectedAgentId: number | null;
  showResearchAids: boolean;
  showDesignView: boolean;
  agents: AgentConfig[];
  onAgentSelect: (agentId: number) => void;
  onResearchAidsClick: () => void;
  onDesignClick: () => void;
  getAgentTheme: (agentId: number, colorName: string, isSelected: boolean) => { card: string; icon: string };
}

export const Sidebar: React.FC<SidebarProps> = ({
  width,
  isResizing,
  onStartResize,
  selectedAgentId,
  showResearchAids,
  showDesignView,
  agents,
  onAgentSelect,
  onResearchAidsClick,
  onDesignClick,
  getAgentTheme,
}) => {
  return (
    <aside
      style={{ width }}
      className={`shrink-0 border-r border-slate-200 bg-slate-50/80 backdrop-blur-md transition-shadow duration-300 will-change-transform z-20 flex-col sticky top-[48px] h-[calc(100vh-48px)] hidden md:flex ${selectedAgentId !== null || showResearchAids || showDesignView ? 'shadow-2xl shadow-indigo-200/40' : 'shadow-none'}`}
    >
      {/* Resize handle */}
      <div
        onMouseDown={onStartResize}
        className={`absolute top-0 bottom-0 right-0 w-2 cursor-col-resize z-50 group hover:bg-indigo-400/30 transition-colors ${isResizing ? 'bg-indigo-500/40' : ''}`}
        title="Drag to resize"
      >
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-8 bg-slate-300 rounded-full group-hover:bg-indigo-500 transition-colors ${isResizing ? 'bg-indigo-600 h-12' : ''}`}></div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar-right">
        <div className="p-4 pt-1 text-left flex flex-col h-full">
          <div className="space-y-1 relative">
            <div className="py-2 mb-0">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 text-center">
             Assessment Process (<span className="text-[12px]">CBSA</span> Approach)
              </h3>
            </div>

            {agents.map((agent) => {
              const theme = getAgentTheme(agent.id, agent.color, selectedAgentId === agent.id);
              return (
                <React.Fragment key={agent.id}>
                  <div
                    onClick={() => onAgentSelect(agent.id)}
                    className={`relative flex items-center justify-between p-2 rounded-xl border-2 cursor-pointer transition-all duration-300 ${theme.card}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm duration-500 ${theme.icon}`}>
                        {React.cloneElement(agent.icon as React.ReactElement<{ size?: number }>, { size: 16 })}
                      </div>
                      <div>
                        <h3 className={`font-bold text-[13px] leading-tight ${selectedAgentId === agent.id ? 'text-slate-900' : 'text-slate-600'}`}>
                          {agent.name}
                        </h3>
                        <p className="text-[12px] text-slate-500  uppercase tracking-wide">{agent.role}</p>
                      </div>
                    </div>
                  </div>
                  {(agent.id === 0 || agent.id === 5) && (
                    <div className="py-1 px-4">
                      <div className="h-px bg-slate-400 w-full opacity-70"></div>
                    </div>
                  )}
                  {agent.id === 6 && (
                    <div className="py-3 px-4 mt-1">
                      <div className="h-px bg-slate-300 w-full"></div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Extensions & Tools Button */}
          <div className="pt-0 px-3 mt-0 pb-1">
            <button
              onClick={onResearchAidsClick}
              className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all duration-300 group cursor-pointer ${showResearchAids ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-200' : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 hover:shadow-md'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded-lg transition-all ${showResearchAids ? 'bg-white/20 text-white' : 'bg-slate-50 text-indigo-500 group-hover:bg-indigo-50'}`}>
                  <Zap size={14} />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-[13px] uppercase tracking-wider">Extensions & Tools</h3>
                </div>
              </div>
              <ChevronRight
                size={14}
                className={`transition-transform duration-300 ${showResearchAids ? 'text-indigo-200 translate-x-1' : 'text-slate-300 group-hover:text-indigo-300'}`}
              />
            </button>
          </div>

          {/* Design Principles Button */}
          <div className="pt-0 px-3 mt-0 pb-2">
            <button
              onClick={onDesignClick}
              className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all duration-300 group cursor-pointer ${showDesignView ? 'bg-rose-600 border-rose-500 text-white shadow-lg shadow-rose-200' : 'bg-white border-slate-200 text-slate-600 hover:border-rose-300 hover:text-rose-600 hover:shadow-md'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded-lg transition-all ${showDesignView ? 'bg-white/20 text-white' : 'bg-slate-50 text-rose-500 group-hover:bg-rose-50'}`}>
                  <Eye size={14} />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-[13px] uppercase tracking-wider">Design Principles</h3>
                </div>
              </div>
              <ChevronRight
                size={14}
                className={`transition-transform duration-300 ${showDesignView ? 'text-rose-200 translate-x-1' : 'text-slate-300 group-hover:text-rose-300'}`}
              />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
