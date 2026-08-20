import React from 'react';
import { Home, ListOrdered, Zap, Eye, Presentation } from 'lucide-react';

export interface MobileNavProps {
  currentView: 'HOME' | 'TOOLS' | 'STEPS' | 'ABOUT' | 'STEP_DETAIL' | 'PROGRAM' | 'DESIGN';
  selectedAgentId: number | null;
  onHomeClick: () => void;
  onProgramClick: () => void;
  onResearchAidsClick: () => void;
  onDesignClick: () => void;
  onStepsClick: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentView,
  selectedAgentId,
  onHomeClick,
  onProgramClick,
  onResearchAidsClick,
  onDesignClick,
  onStepsClick,
}) => {

  return (
    <>
      {/* Mobile bottom tabs (< md / 768px) */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-t border-slate-200"
        dir="ltr"
        aria-label="Mobile navigation"
      >
        <div className="grid grid-cols-5 px-1 py-1.5">
          <button
            onClick={onHomeClick}
            className={`flex flex-col items-center justify-center gap-0.5 py-2 rounded-lg ${currentView === 'HOME' && selectedAgentId === null ? 'text-indigo-600' : 'text-slate-600'}`}
            aria-label="Home"
          >
            <Home size={18} />
            <span className="text-[10px] font-bold">Home</span>
          </button>

          <button
            onClick={onStepsClick}
            className={`flex flex-col items-center justify-center gap-0.5 py-2 rounded-lg ${currentView === 'STEPS' || currentView === 'STEP_DETAIL' || selectedAgentId !== null ? 'text-indigo-600' : 'text-slate-600'}`}
            aria-label="Stages"
          >
            <ListOrdered size={18} />
            <span className="text-[10px] font-bold">Stages</span>
          </button>

          <button
            onClick={onDesignClick}
            className={`flex flex-col items-center justify-center gap-0.5 py-2 rounded-lg ${currentView === 'DESIGN' ? 'text-rose-600' : 'text-slate-600'}`}
            aria-label="Design"
          >
            <Eye size={18} />
            <span className="text-[10px] font-bold">Design</span>
          </button>

          <button
            onClick={onResearchAidsClick}
            className={`flex flex-col items-center justify-center gap-0.5 py-2 rounded-lg ${currentView === 'TOOLS' ? 'text-indigo-600' : 'text-slate-600'}`}
            aria-label="Tools"
          >
            <Zap size={18} />
            <span className="text-[10px] font-bold">Tools</span>
          </button>

          <button
            onClick={onProgramClick}
            className={`flex flex-col items-center justify-center gap-0.5 py-2 rounded-lg ${currentView === 'PROGRAM' ? 'text-indigo-600' : 'text-slate-600'}`}
            aria-label="Program"
          >
            <Presentation size={18} />
            <span className="text-[10px] font-bold">Program</span>
          </button>
        </div>

        {/* iOS safe-area */}
        <div style={{ height: 'env(safe-area-inset-bottom, 0px)' }} />
      </nav>
    </>
  );
};

export default MobileNav;

