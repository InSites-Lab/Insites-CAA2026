import React from 'react';
import { ListOrdered, Zap, Eye, Presentation, Library } from 'lucide-react';

export interface MobileNavProps {
  /** The open excursion key, or 'deck' when the talk surface is showing. */
  active: string;
  selectedAgentId: number | null;
  /** Back to the talk deck. */
  onTalkClick: () => void;
  /** The old home page — bot platforms, resource links, key terms. */
  onResourcesClick: () => void;
  onResearchAidsClick: () => void;
  onDesignClick: () => void;
  onStepsClick: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  active,
  selectedAgentId,
  onTalkClick,
  onResourcesClick,
  onResearchAidsClick,
  onDesignClick,
  onStepsClick,
}) => {

  return (
    <>
      {/* Mobile bottom tabs (< md / 768px) */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-t border-slate-200"
        dir="ltr"
        aria-label="Mobile navigation"
      >
        <div className="grid grid-cols-5 px-1 py-1.5">
          <button
            onClick={onTalkClick}
            className={`flex flex-col items-center justify-center gap-0.5 py-2 rounded-lg ${active === 'deck' ? 'text-indigo-600' : 'text-slate-600'}`}
            aria-label="Talk"
          >
            <Presentation size={18} />
            <span className="text-[10px] font-bold">Talk</span>
          </button>

          <button
            onClick={onStepsClick}
            className={`flex flex-col items-center justify-center gap-0.5 py-2 rounded-lg ${active === 'steps' || selectedAgentId !== null ? 'text-indigo-600' : 'text-slate-600'}`}
            aria-label="Stages"
          >
            <ListOrdered size={18} />
            <span className="text-[10px] font-bold">Stages</span>
          </button>

          <button
            onClick={onDesignClick}
            className={`flex flex-col items-center justify-center gap-0.5 py-2 rounded-lg ${active === 'design' ? 'text-rose-600' : 'text-slate-600'}`}
            aria-label="Design"
          >
            <Eye size={18} />
            <span className="text-[10px] font-bold">Design</span>
          </button>

          <button
            onClick={onResearchAidsClick}
            className={`flex flex-col items-center justify-center gap-0.5 py-2 rounded-lg ${active === 'tools' ? 'text-indigo-600' : 'text-slate-600'}`}
            aria-label="Tools"
          >
            <Zap size={18} />
            <span className="text-[10px] font-bold">Tools</span>
          </button>

          <button
            onClick={onResourcesClick}
            className={`flex flex-col items-center justify-center gap-0.5 py-2 rounded-lg ${active === 'resources' ? 'text-indigo-600' : 'text-slate-600'}`}
            aria-label="Resources"
          >
            <Library size={18} />
            <span className="text-[10px] font-bold">Resources</span>
          </button>
        </div>

        {/* iOS safe-area */}
        <div style={{ height: 'env(safe-area-inset-bottom, 0px)' }} />
      </nav>
    </>
  );
};

export default MobileNav;

