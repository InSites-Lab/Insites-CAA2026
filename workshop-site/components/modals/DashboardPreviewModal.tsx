import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Modal } from '../common';

export interface DashboardPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DashboardPreviewModal: React.FC<DashboardPreviewModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Assessment Dashboard"
      maxWidth="max-w-7xl"
    >
      <div className="text-left space-y-4" dir="ltr">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
              After completing Stage 6, InSites-CAA generates a 10-tab interactive dashboard that visualizes the entire
              assessment. Tabs cross-reference each other — clicking a context highlights related values, and vice versa.
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {['Overview', 'Timeline', 'Contexts', 'Values', 'Integrity', 'Comparative', 'Significance', 'Vulnerability', 'Process', 'KG'].map(tab => (
                <span key={tab} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase tracking-wider">
                  {tab}
                </span>
              ))}
            </div>
          </div>
          <a
            href="/dashboard-demo.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold hover:bg-indigo-100 transition-colors shrink-0"
          >
            <ExternalLink size={12} />
            Open in new tab
          </a>
        </div>

        {/* Desktop: iframe */}
        <div className="hidden sm:block rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-white">
          <iframe
            src="./dashboard-demo.html"
            className="w-full border-0"
            style={{ height: '70vh', minHeight: '500px' }}
            title="Assessment Dashboard Demo — Ayelet HaShachar Water Tower"
          />
        </div>

        {/* Mobile: description only */}
        <div className="sm:hidden p-4 bg-slate-50 rounded-xl border border-slate-200">
          <p className="text-sm text-slate-600 text-center">
            The interactive dashboard is best experienced on desktop.
          </p>
          <a
            href="/dashboard-demo.html"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors"
          >
            <ExternalLink size={14} />
            Open Dashboard
          </a>
        </div>
      </div>
    </Modal>
  );
};

export default DashboardPreviewModal;
