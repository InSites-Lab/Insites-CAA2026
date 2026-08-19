import React, { useState, useEffect } from 'react';
import { Scale, Layers, Activity, SearchCheck, MessageSquare, Github, ExternalLink } from 'lucide-react';
import { Modal } from '../common';
import SwitchTransition from '../common/SwitchTransition';
import { DesignPrinciplesView } from './DesignPrinciplesView';

// ─── Tab Definitions ──────────────────────────────────────────────

const PROGRAM_TABS = [
  { id: 'tension', label: 'The Dual Tension', short: 'Tension', icon: <Scale size={14} /> },
  { id: 'insites', label: 'What is InSites', short: 'InSites', icon: <Layers size={14} /> },
  { id: 'notation', label: 'Epistemic Notation', short: 'Notation', icon: <Activity size={14} /> },
  { id: 'inquiry', label: 'From Report to Inquiry', short: 'Inquiry', icon: <SearchCheck size={14} /> },
] as const;

const QA_TAB = { id: 'qa', label: 'Q&A', icon: <MessageSquare size={14} /> } as const;

type TabId = typeof PROGRAM_TABS[number]['id'] | 'qa';

const REPO_URL = 'https://github.com/InSites-Lab/Insites-CAA2026';

// ─── Component ────────────────────────────────────────────────────

export interface WorkshopProgramViewProps {
  onNavigate?: (route: string) => void;
}

export const WorkshopProgramView: React.FC<WorkshopProgramViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<TabId>('tension');
  const [isWorkedExampleOpen, setIsWorkedExampleOpen] = useState(false);
  const [isDesignOpen, setIsDesignOpen] = useState(false);

  const tabClass = (id: TabId) =>
    `flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
      activeTab === id
        ? 'bg-white text-slate-800 shadow-sm'
        : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'
    }`;

  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-y-auto custom-scrollbar pb-[140px] sm:pb-[90px] md:pb-16" dir="ltr">
      <div className="max-w-4xl mx-auto w-full px-6 py-4 space-y-5 shrink-0">

        {/* Tab Bar */}
        <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl">
          {PROGRAM_TABS.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 ${tabClass(tab.id)}`}>
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.short}</span>
            </button>
          ))}
          <button
            onClick={() => setActiveTab(QA_TAB.id)}
            className={`shrink-0 ${tabClass(QA_TAB.id)} ${activeTab === QA_TAB.id ? '' : 'text-slate-400'}`}
          >
            {QA_TAB.icon}
            <span>{QA_TAB.label}</span>
          </button>
        </div>

        {/* Tab Content */}
        <SwitchTransition transitionKey={activeTab}>
          {activeTab === 'tension' && <DualTensionTab />}
          {activeTab === 'insites' && <WhatIsInSitesTab />}
          {activeTab === 'notation' && (
            <EpistemicNotationTab
              onNavigate={onNavigate}
              onOpenWorkedExample={() => setIsWorkedExampleOpen(true)}
            />
          )}
          {activeTab === 'inquiry' && <FromReportToInquiryTab />}
          {activeTab === 'qa' && (
            <QaTab
              onNavigate={onNavigate}
              onOpenWorkedExample={() => setIsWorkedExampleOpen(true)}
              onOpenDesign={() => setIsDesignOpen(true)}
            />
          )}
        </SwitchTransition>
      </div>

      <Modal
        isOpen={isWorkedExampleOpen}
        onClose={() => setIsWorkedExampleOpen(false)}
        title="Worked example — Tuba-Zangariyye, claim by claim"
        fullscreen
      >
        <iframe src="./notation.html" className="w-full h-full border-0" title="Worked example" />
      </Modal>

      <Modal
        isOpen={isDesignOpen}
        onClose={() => setIsDesignOpen(false)}
        title="Design principles"
        maxWidth="max-w-4xl"
      >
        <DesignPrinciplesView onNavigate={onNavigate} />
      </Modal>
    </div>
  );
};

// ─── Shared bits ──────────────────────────────────────────────────

const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-[11px] font-extrabold tracking-[0.12em] uppercase text-slate-400">{children}</p>
);

// ─── 1 · The Dual Tension ─────────────────────────────────────────

const SITE_PHOTOS = [
  { src: './h40-tuba-field.jpg', alt: 'The dolmen field at Tuba-Zangariyye, seen from the ground' },
  { src: './h40-tuba-aerial.jpg', alt: 'Aerial view of the dolmen field at Tuba-Zangariyye' },
  { src: './h40-dolmen-archive.jpg', alt: 'A dolmen in the Upper Galilee landscape, archival photograph' },
];

/** Two panels crossfading quietly through the site photos — no arrows, no dots. */
const PhotoStrip: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % SITE_PHOTOS.length), 6000);
    return () => window.clearInterval(id);
  }, []);

  const panel = (offset: number, caption?: string) => (
    <div className="relative rounded-2xl overflow-hidden bg-slate-100">
      {SITE_PHOTOS.map((photo, i) => (
        <img
          key={photo.src}
          src={photo.src}
          alt={i === (index + offset) % SITE_PHOTOS.length ? photo.alt : ''}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ease-in-out motion-reduce:transition-none ${
            i === (index + offset) % SITE_PHOTOS.length ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      {caption && (
        <div className="absolute inset-x-0 bottom-0 px-4 pt-7 pb-2.5 text-white text-[13px] font-semibold bg-gradient-to-t from-slate-900/75 to-transparent">
          {caption}
        </div>
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-2 gap-3.5 h-[190px]">
      {panel(0, 'One experimental answer, from one site — a dolmen field in northern Israel.')}
      {panel(1)}
    </div>
  );
};

const DualTensionTab: React.FC = () => (
  <div className="space-y-5">
    <div className="space-y-1.5">
      <Eyebrow>Why governance</Eyebrow>
      <h3 className="text-3xl md:text-[33px] leading-tight font-extrabold text-slate-900">
        Give it freedom — it fabricates.
        <br />
        Lock it down — it loses the synthesis we came for.
      </h3>
    </div>

    <div className="flex flex-col items-center gap-3">
      <div className="grid grid-cols-2 gap-4 w-full">
        <div className="bg-white border-2 border-slate-300 rounded-xl px-[18px] py-3.5 shadow-sm">
          <p className="text-[11px] font-extrabold tracking-[0.1em] text-amber-700">FREEDOM</p>
          <p className="text-[15px] text-slate-700 mt-1">Fluent claims no source supports</p>
        </div>
        <div className="bg-white border-2 border-slate-300 rounded-xl px-[18px] py-3.5 shadow-sm">
          <p className="text-[11px] font-extrabold tracking-[0.1em] text-indigo-700">GUARDRAILS</p>
          <p className="text-[15px] text-slate-700 mt-1">The synthesis we came for is lost</p>
        </div>
      </div>
      <svg width="20" height="18" viewBox="0 0 20 18" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 1v13" />
        <path d="m4 9 6 6 6-6" />
      </svg>
      <div className="bg-slate-900 text-white rounded-xl px-[26px] py-3 text-[15px] font-semibold">
        Both share one cause — the reasoning path stays tacit.
      </div>
    </div>

    <p className="text-lg font-bold text-indigo-600 text-center">
      Under which affordances — and which human oversight — can AI assess accountably?
    </p>

    <PhotoStrip />
  </div>
);

// ─── 2 · What is InSites ──────────────────────────────────────────

const INSITES_PRINCIPLES = [
  { label: 'Grounded', hint: "Every claim traced to the site's own written sources" },
  { label: 'Staged', hint: 'Staged reasoning — from scope declaration to significance statement' },
  { label: 'HITL by principle', hint: 'Expert review as assessment practice, not compensation for model limits' },
  { label: 'Platform-agnostic', hint: 'What transfers is the expert–system interaction, not a model or a platform' },
];

const WhatIsInSitesTab: React.FC = () => (
  <div className="space-y-8">
    <div className="space-y-2.5 mt-6">
      <Eyebrow>The tool</Eyebrow>
      <h3 className="text-4xl leading-tight font-extrabold text-slate-900">Analytical scaffolding.</h3>
      <p className="text-[17px] text-slate-600">
        Not a trained model — staged reasoning anchored to the sources, expert review between stages.
      </p>
    </div>

    <div className="inline-flex items-center gap-3.5 bg-indigo-50 border-2 border-indigo-200 rounded-xl px-5 py-4">
      <span className="w-[34px] h-[34px] rounded-full bg-indigo-600 flex items-center justify-center shrink-0">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5" />
          <path d="m12 19-7-7 7-7" />
        </svg>
      </span>
      <span className="text-base font-bold text-indigo-900">The process is live on the left — step into any stage.</span>
    </div>

    <div className="flex flex-wrap gap-2.5">
      {INSITES_PRINCIPLES.map((p) => (
        <span
          key={p.label}
          title={p.hint}
          className="border border-slate-300 bg-white rounded-full px-4 py-2 text-[13px] font-bold text-slate-700 cursor-help"
        >
          {p.label}
        </span>
      ))}
    </div>
  </div>
);

// ─── 3 · Epistemic Notation ───────────────────────────────────────

const NOTATION_TIERS = [
  { mark: <span className="border border-dashed border-slate-300 text-slate-400 rounded px-2 text-xs font-semibold">no mark</span>, title: 'Explicit', titleColor: 'text-emerald-800', body: 'Stated in the sources' },
  { mark: <span className="bg-amber-100 rounded px-2 text-[15px] font-semibold">〰️</span>, title: 'Inferred', titleColor: 'text-amber-800', body: 'Synthesized across sources' },
  { mark: <span className="bg-purple-100 rounded px-2 text-[15px] font-semibold">💭</span>, title: 'Hypothesis', titleColor: 'text-purple-800', body: 'Reading between the lines' },
];

const CLAIM_COUNTS = [
  { n: '45', label: 'claims', color: 'text-slate-900' },
  { n: '24', label: 'unmarked', color: 'text-slate-900' },
  { n: '14', label: 'inferred 〰️', color: 'text-amber-800' },
  { n: '4', label: 'hypotheses 💭', color: 'text-purple-800' },
];

const EpistemicNotationTab: React.FC<{
  onNavigate?: (route: string) => void;
  onOpenWorkedExample: () => void;
}> = ({ onNavigate, onOpenWorkedExample }) => (
  <div className="space-y-5">
    <div className="space-y-1.5">
      <Eyebrow>The core mechanism</Eyebrow>
      <h3 className="text-3xl leading-tight font-extrabold text-slate-900">
        A mark measures a claim's distance from its sources.
      </h3>
      <p className="text-lg font-semibold text-slate-500">Validity remains human judgment.</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
      {NOTATION_TIERS.map((tier) => (
        <div key={tier.title} className="bg-white border-2 border-slate-300 rounded-xl px-4 py-3.5 shadow-sm space-y-1.5">
          <div className="flex">{tier.mark}</div>
          <p className={`text-[15px] font-extrabold ${tier.titleColor}`}>{tier.title}</p>
          <p className="text-[13px] text-slate-500">{tier.body}</p>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
      {CLAIM_COUNTS.map((c) => (
        <div key={c.label} className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5">
          <p className={`text-[26px] leading-tight font-extrabold ${c.color}`}>{c.n}</p>
          <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-slate-400">{c.label}</p>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
      <div className="bg-white border-2 border-dashed border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-700">
        <strong className="text-slate-900">An unmarked hierarchy claim</strong> — stopped by the expert.
      </div>
      <div className="bg-white border-2 border-dashed border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-700">
        <strong className="text-slate-900">A correctly marked 〰️ claim — still removed.</strong> A mark is not analytical value.
      </div>
    </div>

    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => onNavigate?.('notation')}
        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-[10px] px-[22px] py-2.5 text-sm font-bold shadow-lg shadow-indigo-600/25 transition-colors cursor-pointer"
      >
        The notation
      </button>
      <button
        onClick={onOpenWorkedExample}
        className="bg-white hover:bg-indigo-50 text-indigo-600 border-2 border-indigo-200 rounded-[10px] px-[22px] py-2.5 text-sm font-bold transition-colors cursor-pointer"
      >
        Worked example
      </button>
    </div>
  </div>
);

// ─── 4 · From Report to Inquiry ───────────────────────────────────

const readingIcon = (paths: React.ReactNode) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
    {paths}
  </svg>
);

const NEW_READINGS: { icon: React.ReactNode; text: React.ReactNode }[] = [
  {
    icon: readingIcon(<><path d="M3 17c2.5-9 15.5-9 18 0" /><circle cx="3" cy="17" r="1.5" /><circle cx="21" cy="17" r="1.5" /></>),
    text: 'A four-millennia pastoral arc — the dolmen builders to the Tuba-Zangariyye Bedouin',
  },
  {
    icon: readingIcon(<><circle cx="12" cy="12" r="3" /><path d="M12 2v4M12 18v4M2 12h4M18 12h4" /></>),
    text: 'A resource node within a landscape corridor — built from the four mapped springs',
  },
  {
    icon: readingIcon(<><path d="M17.5 19a4.5 4.5 0 1 0-1.7-8.7 6 6 0 1 0-9.8 5.4" /><path d="M6 19h11.5" /></>),
    text: 'A persistent landscape for imagination — gathered from a single footnote',
  },
  {
    icon: readingIcon(<><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 13 9 5 9-5" /></>),
    text: (
      <>
        The field's place in a mortuary landscape <span className="bg-purple-100 rounded px-1.5 text-[13px]">💭</span>
      </>
    ),
  },
  {
    icon: readingIcon(<path d="M20 13c0 5-3.5 7.5-7.7 8.9a1 1 0 0 1-.6 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.2-2.7a1.2 1.2 0 0 1 1.6 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z" />),
    text: 'An interpretive inversion — the absence of excavation read as a form of preservation',
  },
];

const FromReportToInquiryTab: React.FC = () => (
  <div className="space-y-5">
    <div className="space-y-1.5">
      <Eyebrow>What it yielded</Eyebrow>
      <h3 className="text-3xl leading-tight font-extrabold text-slate-900">
        Not a report to be accepted —
        <br />
        an inquiry to be examined, claim by claim.
      </h3>
    </div>

    <div className="space-y-2.5">
      <p className="text-xs font-extrabold tracking-[0.1em] uppercase text-slate-500">
        Five readings the manual assessment had not reached
      </p>
      {NEW_READINGS.map((r, i) => (
        <div key={i} className="flex items-center gap-3 bg-white border border-slate-200 rounded-[10px] px-3.5 py-2.5">
          {r.icon}
          <p className="text-sm text-slate-700">{r.text}</p>
        </div>
      ))}
    </div>

    <div className="bg-slate-900 rounded-2xl px-7 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
      <div className="space-y-1.5">
        <p className="text-[19px] font-bold text-white leading-snug">
          Even a perfect machine, optimally serving conservation —
          <br className="hidden sm:inline" /> cultural assessment must remain human.
        </p>
        <p className="text-[13px] text-slate-400">Who assesses is part of what is assessed.</p>
      </div>
      <a
        href={REPO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl px-4 py-3 text-[13px] font-bold transition-colors"
      >
        <Github size={16} />
        <span>GitHub repository</span>
        <ExternalLink size={13} className="text-slate-400" />
      </a>
    </div>
  </div>
);

// ─── 5 · Q&A ──────────────────────────────────────────────────────

type BackupItem = { label: string; note: string; route?: string; action?: 'worked-example' | 'design' };

const BACKUP_MATERIAL: BackupItem[] = [
  { label: 'The notation', note: 'Three tiers, prose coherence, where it activates', route: 'notation' },
  { label: 'Worked example', note: 'The Tuba-Zangariyye assessment, claim by claim', action: 'worked-example' },
  { label: 'Design principles', note: 'Transparency, control, evidence governance', action: 'design' },
  { label: 'Knowledge graph', note: 'Contexts and values as a navigable graph', route: 'graph-view' },
  { label: 'Assessment dashboard', note: 'The assessment read back as structured evidence', route: 'dashboard-preview' },
  { label: 'Glossary', note: 'CBSA terms used in the talk', route: 'glossary' },
];

const QaTab: React.FC<{
  onNavigate?: (route: string) => void;
  onOpenWorkedExample: () => void;
  onOpenDesign: () => void;
}> = ({ onNavigate, onOpenWorkedExample, onOpenDesign }) => (
  <div className="space-y-5">
    <div className="space-y-1.5">
      <Eyebrow>Questions</Eyebrow>
      <h3 className="text-3xl leading-tight font-extrabold text-slate-900">The material behind the talk.</h3>
      <p className="text-[15px] text-slate-600">
        <em>From Report to Inquiry: Governing Generative AI Insights in Heritage Significance Assessment</em> — Alef, Shafriri &amp; Berger.
      </p>
    </div>

    <a
      href={REPO_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-5 py-4 transition-colors"
    >
      <Github size={20} className="shrink-0" />
      <span className="flex-1">
        <span className="block text-sm font-bold">InSites-Lab / Insites-CAA2026</span>
        <span className="block text-[13px] text-slate-400">Prompts, specs, the assessment runs and the claim-level evidence</span>
      </span>
      <ExternalLink size={15} className="text-slate-400 shrink-0" />
    </a>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {BACKUP_MATERIAL.map((item) => (
        <button
          key={item.label}
          onClick={() => {
            if (item.action === 'worked-example') return onOpenWorkedExample();
            if (item.action === 'design') return onOpenDesign();
            onNavigate?.(item.route!);
          }}
          className="text-left bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 rounded-xl px-4 py-3 transition-colors cursor-pointer"
        >
          <span className="block text-sm font-bold text-slate-800">{item.label}</span>
          <span className="block text-[13px] text-slate-500">{item.note}</span>
        </button>
      ))}
    </div>
  </div>
);

export default WorkshopProgramView;
