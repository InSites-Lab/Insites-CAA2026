import React from 'react';
import { BookOpen, BookText, Bot, ChevronDown, Github, Layout, LayoutDashboard, PieChart, Share2, Sparkles } from 'lucide-react';
import { ResourceLink, ResourceGroup } from '../common';

export interface ResourcesViewProps {
  onNavigate: (route: string) => void;
}

/**
 * The old HOME page — poster, bot platforms, resource links, key terms.
 * Extracted verbatim; the outer scroll+pad wrapper stays behind for the same
 * reason as ToolboxView.
 */
export const ResourcesView: React.FC<ResourcesViewProps> = ({ onNavigate }) => (
  <div className="max-w-3xl mx-auto w-full px-6 py-2 md:py-3 space-y-5">
    {/* Poster — slightly constrained width */}
    <div className="pt-2 md:pt-3 max-w-2xl mx-auto">
      <img
        src="./poster-light.jpg"
        alt="InSites-CAA — CBSA Workshop Poster"
        className="w-full rounded-2xl border border-slate-200 shadow-sm"
      />
      <p className="text-center text-lg text-slate-900 italic mt-2">
        "The LLM is a looking glass — more than a wonderland"
      </p>
    </div>

    <div className="space-y-4">
      {/* Workshop Program Card */}
      <button
        onClick={() => onNavigate("program")}
        className="w-full flex items-center gap-4 p-4 bg-indigo-50 hover:bg-indigo-100 rounded-2xl border border-indigo-200 hover:border-indigo-300 transition-all group cursor-pointer text-left shadow-sm"
      >
        <div className="p-2.5 bg-indigo-600 text-white rounded-xl shrink-0 group-hover:scale-110 transition-transform">
          <Layout size={20} />
        </div>
        <div>
          <h4 className="font-bold text-base text-indigo-900 mb-0.5">
            Workshop Introduction
          </h4>
          <p className="text-sm text-indigo-600/70">
            What is the story of "InSites"?, Design Principles,
            Workshop Program{" "}
          </p>
        </div>
      </button>

      {/* Bot Platform Cards */}
      <div>
        <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">
          Try InSites-CAA
        </h4>
        <p className="text-[11px] text-slate-500 mb-2">
          Recommended: paid account with reasoning mode
        </p>
        <div className="grid grid-cols-3 gap-2">
          <a
            href="https://chatgpt.com/g/g-69ca986712f88191828a4a1122278392-insites-caa26"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1.5 p-3 bg-white border border-slate-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50/30 transition-all group cursor-pointer"
          >
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Bot size={20} className="text-emerald-600" />
            </div>
            <span className="text-xs font-bold text-slate-700">
              ChatGPT
            </span>
          </a>
          <a
            href="https://gemini.google.com/gem/1PMAcB6O2FGJPYonixa3ZA7_2xwiTIVKA?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1.5 p-3 bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/30 transition-all group cursor-pointer"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sparkles size={20} className="text-blue-600" />
            </div>
            <span className="text-xs font-bold text-slate-700">
              Gemini
            </span>
            <span className="text-[9px] font-bold text-red-500">
              Thinking mode!
            </span>
          </a>
          <details className="flex flex-col items-center bg-white border border-slate-200 rounded-xl cursor-pointer group">
            <summary className="flex flex-col items-center gap-1.5 p-3 select-none list-none">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles size={20} className="text-purple-600" />
              </div>
              <span className="text-xs font-bold text-slate-700">
                Claude
              </span>
              <span className="text-[9px] font-bold text-purple-500">
                DIY setup ↓
              </span>
            </summary>
            <div className="px-3 pb-3 text-left border-t border-slate-100 mt-1 pt-2">
              <ol className="text-[11px] text-slate-600 space-y-1 list-decimal ml-3">
                <li>
                  Go to{" "}
                  <strong>
                    claude.ai → Projects → Create Project
                  </strong>
                </li>
                <li>
                  Paste{" "}
                  <a
                    href="https://github.com/InSites-Lab/Insites-CAA2026/blob/main/InSites-Brain/Claude/InSites-CAA-claude.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 underline"
                  >
                    this prompt
                  </a>{" "}
                  into Custom Instructions
                </li>
                <li>
                  Upload your document and type{" "}
                  <strong>"start"</strong>
                </li>
              </ol>
            </div>
          </details>
        </div>
      </div>

      {/* Links */}
      <div className="space-y-2">
        <ResourceLink
          href="https://drive.google.com/drive/folders/1HxWjZ1GVGtRsoGWZZi4kaiNuhhLPTfO1?usp=sharing"
          icon={<BookOpen size={16} />}
          label="Shared Materials"
          secondaryLabel="Heritage documents to work with during the workshop"
          highlight={true}
          colorScheme="emerald"
        />
        <ResourceLink
          href="https://gemini.google.com/gem/1OI5VSeNb5J94Rr53Abuv8VK5nNkXq7jF?usp=sharing"
          icon={<Bot size={16} />}
          label="Build Your Own AI Assistant"
          secondaryLabel="Build a custom AI assistant for a specific task — like drafting policy documents, reviewing reports, or analyzing data. You define the purpose first and then this agent will help you build your own."
          highlight={true}
          colorScheme="indigo"
        />
        <ResourceLink
          href="https://forms.gle/zqsZA7DXNJVe4zJc7"
          icon={<Share2 size={16} />}
          label="Share Your Session"
          secondaryLabel="Share your session link for our research"
          highlight={true}
          colorScheme="amber"
        />
        <ResourceLink
          href="https://github.com/InSites-Lab/Insites-CAA2026"
          icon={<Github size={16} />}
          label="GitHub Repository"
          secondaryLabel="Source code and system instructions"
          highlight={true}
          colorScheme="slate"
        />
      </div>

      {/* Key Terms + More Resources */}
      <div className="space-y-2">
        <button
          onClick={() => onNavigate("glossary")}
          className="w-full flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 hover:border-slate-300 transition-all group cursor-pointer text-left"
        >
          <div className="w-8 h-8 bg-slate-200 text-slate-600 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <BookText size={16} />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-700">
              Key Terms
            </h4>
            <p className="text-[11px] text-slate-500">
              CBSA, HITL, Context Effect, Nara Grid and more
            </p>
          </div>
        </button>

        <details className="bg-white border border-slate-200 rounded-xl overflow-hidden group">
          <summary className="p-4 cursor-pointer flex items-center justify-between hover:bg-slate-50 transition-colors select-none">
            <span className="font-bold text-sm text-slate-600">
              More Resources
            </span>
            <ChevronDown
              size={16}
              className="text-slate-400 group-open:rotate-180 transition-transform"
            />
          </summary>
          <div className="px-4 pb-4 space-y-3 border-t border-slate-100">
            <ResourceGroup title="Dashboards & Visualization">
              <div className="hidden sm:block">
                <ResourceLink
                  onClick={() => onNavigate("dashboard-preview")}
                  icon={<LayoutDashboard size={16} />}
                  label="Assessment Dashboard — Demo"
                  noBorder
                />
                <ResourceLink
                  onClick={() => onNavigate("inventory")}
                  icon={<PieChart size={16} />}
                  label="Collection Dashboard — Demo"
                  noBorder
                />
              </div>
              <div className="sm:hidden">
                <ResourceLink
                  icon={<LayoutDashboard size={16} />}
                  label="Assessment Dashboard — Demo"
                  secondaryLabel="Open on desktop"
                  noBorder
                />
              </div>
            </ResourceGroup>
            <ResourceGroup title="Agent Builder">
              <ResourceLink
                href="https://chatgpt.com/g/g-69492aebb530819199628bb444d024f3-svkn-lbnyyt-svkn-yqvmvs"
                icon={<Bot size={16} />}
                label="Build Agent (GPTs)"
                noBorder
                colorScheme="emerald"
              />
              <ResourceLink
                href="https://gemini.google.com/gem/1OI5VSeNb5J94Rr53Abuv8VK5nNkXq7jF?usp=sharing"
                icon={<Sparkles size={16} />}
                label="Build Agent (Gemini)"
                noBorder
                colorScheme="emerald"
              />
            </ResourceGroup>
            <ResourceLink
              href="https://drive.google.com/drive/folders/1AOu_r9towgJwqgQfrLEI8JcbOltprpJH?usp=sharing"
              icon={<LayoutDashboard size={16} />}
              label="Workshop Presentations"
              secondaryLabel="Previous workshop presentations"
              colorScheme="indigo"
              highlight
            />
          </div>
        </details>
      </div>
    </div>
  </div>
);

export default ResourcesView;
