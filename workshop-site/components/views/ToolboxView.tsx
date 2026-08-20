import React from 'react';
import { BookOpen, Box, ChevronLeft, Copy, LayoutDashboard, Library, Loader2, Scroll, Send, Sparkles, Zap } from 'lucide-react';
import MarkdownRenderer from '../MarkdownRenderer';
import { copyToClipboard } from '../../utils';

export interface ToolboxViewProps {
  onNavigate: (route: string) => void;
  consultationInput: string;
  setConsultationInput: (v: string) => void;
  consultationResult: string | null;
  setConsultationResult: (v: string | null) => void;
  isConsulting: boolean;
  onConsult: () => void;
}

/**
 * Extensions & Tools. Extracted verbatim from App.tsx; the outer scroll+pad
 * wrapper is deliberately NOT part of it — the deck column already scrolls
 * and already reserves the mobile-nav padding.
 */
export const ToolboxView: React.FC<ToolboxViewProps> = ({
  onNavigate,
  consultationInput,
  setConsultationInput,
  consultationResult,
  setConsultationResult,
  isConsulting,
  onConsult,
}) => (
  <div className="max-w-4xl mx-auto w-full px-6 py-6 space-y-6">
    {/* Breadcrumb Navigation */}
    <div className="flex items-center gap-2 text-sm">
      <button
        onClick={() => onNavigate("home")}
        className="text-indigo-600 hover:text-indigo-700 hover:underline flex items-center gap-1 transition-colors font-medium"
      >
        <BookOpen size={16} />
        <span>Home</span>
      </button>
      <ChevronLeft
        size={16}
        className="text-slate-400 rotate-180"
      />
      <span className="text-slate-600 font-medium">
        Extensions & Tools
      </span>
    </div>

    <div>
      <h3 className="text-2xl font-black text-slate-500 mb-2">
        Toolbox & Extensions
      </h3>
      <p className="text-slate-500">
        Advanced tools for analysis, visualization and deep
        exploration{" "}
      </p>
    </div>

    {/* Tools Section */}
    <div className="space-y-2">
      <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
        Tools integrated in InSites-CAA
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Assessment Dashboard */}
        <button
          onClick={() => onNavigate("dashboard-preview")}
          className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-200 hover:bg-blue-50/30 transition-all group cursor-pointer"
        >
          <div className="w-9 h-9 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <LayoutDashboard size={18} />
          </div>
          <div className="text-left">
            <h4 className="font-bold text-slate-800 text-sm">
              Assessment Dashboard
            </h4>
            <p className="text-[11px] text-slate-500 line-clamp-2">
              10-tab interactive visualization of a complete
              assessment
            </p>
          </div>
        </button>

        {/* Knowledge Graph */}
        <button
          onClick={() => onNavigate("graph")}
          className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-emerald-200 hover:bg-emerald-50/30 transition-all group cursor-pointer"
        >
          <div className="w-9 h-9 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Zap size={18} />
          </div>
          <div className="text-left">
            <h4 className="font-bold text-slate-800 text-sm">
              Knowledge Graph
            </h4>
            <p className="text-[11px] text-slate-500 line-clamp-2">
              Visual mapping of entities and semantic
              relationships
            </p>
          </div>
        </button>

        {/* Visual Analysis */}
        <button
          onClick={() => onNavigate("visual")}
          className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group cursor-pointer"
        >
          <div className="w-9 h-9 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Box size={18} />
          </div>
          <div className="text-left">
            <h4 className="font-bold text-slate-800 text-sm">
              Visual Decoding
            </h4>
            <p className="text-[11px] text-slate-500 line-clamp-2">
              Analyze attributes, relationships and values from
              images
            </p>
          </div>
        </button>

        {/* Collection Analysis */}
        <button
          onClick={() => onNavigate("inventory")}
          className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-amber-200 hover:bg-amber-50/30 transition-all group cursor-pointer"
        >
          <div className="w-9 h-9 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Library size={18} />
          </div>
          <div className="text-left">
            <h4 className="font-bold text-slate-800 text-sm">
              Collection Analysis
            </h4>
            <p className="text-[11px] text-slate-500 line-clamp-2">
              Cross-sectional analysis of assessment collections
              (MA-RC)
            </p>
          </div>
        </button>

        {/* Read Assessment (MA-RA) */}
        <button
          onClick={() => onNavigate("read-assessment")}
          className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-purple-200 hover:bg-purple-50/30 transition-all group cursor-pointer"
        >
          <div className="w-9 h-9 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Scroll size={18} />
          </div>
          <div className="text-left">
            <h4 className="font-bold text-slate-800 text-sm">
              Read Assessment
            </h4>
            <p className="text-[11px] text-slate-500 line-clamp-2">
              Structured readings: analytical, interpretive, and
              generative lenses
            </p>
          </div>
        </button>

        {/* Examples */}
        <div className="pt-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 px-1">Examples</p>
          <div className="flex flex-wrap gap-1.5">
            <a href="./chaco-kg.html" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold bg-blue-50 text-blue-600 hover:bg-blue-100 px-2.5 py-1 rounded-full transition-colors">KG: Chaco</a>
            <a href="./chaco-dashboard.html" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold bg-emerald-50 text-emerald-600 hover:bg-emerald-100 px-2.5 py-1 rounded-full transition-colors">Dashboard: Chaco</a>
            <a href="./mills-dashboard.html" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold bg-amber-50 text-amber-600 hover:bg-amber-100 px-2.5 py-1 rounded-full transition-colors">Collection: Mills</a>
          </div>
        </div>
      </div>
    </div>

    {/* Prompt Advisor Section */}
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 bg-violet-100 text-violet-600 rounded-lg flex items-center justify-center">
          <Sparkles size={18} />
        </div>
        <div>
          <h4 className="font-bold text-slate-800">
            Prompt Building Advisor
          </h4>
          <p className="text-xs text-slate-500">
            Preparation stage: role definition and methodology
          </p>
        </div>
      </div>
      <p className="text-sm text-slate-600 mb-3">
        Enter your goal (e.g., "I want to analyze the social
        values"), and the advisor will build a customized prompt
        for the language model.
      </p>
      <div className="relative">
        <textarea
          className="w-full h-20 p-3 bg-slate-50 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/10 transition-all outline-none text-sm text-slate-700 placeholder:text-slate-400 resize-none"
          placeholder="Describe your goal or question..."
          value={consultationInput}
          onChange={(e) => setConsultationInput(e.target.value)}
        />
        <button
          onClick={onConsult}
          disabled={isConsulting || !consultationInput.trim()}
          className="absolute bottom-2 left-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white px-3 py-1.5 rounded-lg shadow transition-all active:scale-95 flex items-center gap-2 font-bold text-xs cursor-pointer disabled:cursor-not-allowed"
        >
          {isConsulting ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Send size={14} />
          )}
          <span>Build Prompt</span>
        </button>
      </div>
      {consultationResult && (
        <div className="mt-3 bg-slate-900 rounded-xl p-4 max-h-[250px] overflow-y-auto custom-scrollbar">
          <MarkdownRenderer
            text={consultationResult
              .split("---PROMPT_BOUNDARY---")[0]
              .replace(/^```(markdown|json)?/g, "")
              .replace(/```$/g, "")
              .trim()}
            dir="ltr"
            theme="dark"
          />
          <div className="flex justify-end mt-2 gap-2">
            <button
              onClick={() =>
                copyToClipboard(
                  consultationResult
                    .split("---PROMPT_BOUNDARY---")[0]
                    .replace(/^```(markdown|json)?/g, "")
                    .replace(/```$/g, "")
                    .trim(),
                )
              }
              className="text-xs bg-white/10 hover:bg-white/20 text-indigo-200 hover:text-white px-2 py-1 rounded transition-all flex items-center gap-1 cursor-pointer"
            >
              <Copy size={12} /> Copy
            </button>
            <button
              onClick={() => setConsultationResult(null)}
              className="text-xs text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
);

export default ToolboxView;
