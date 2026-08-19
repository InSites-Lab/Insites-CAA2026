import React, { useState, useEffect } from 'react';
import { Scale, Layers, Activity, SearchCheck, MessageSquare, Github, ExternalLink } from 'lucide-react';
import { Modal } from '../common';
import SwitchTransition from '../common/SwitchTransition';
import { DesignPrinciplesView } from './DesignPrinciplesView';
import { SandboxTab, SANDBOX_LABEL, SANDBOX_LABEL_SHORT } from './SandboxTab';

// Dev-only experiment slot. Vite substitutes `false` here in a production
// build, so the tab and everything it imports drop out of the bundle.
const SHOW_SANDBOX = import.meta.env.DEV;

// ─── Tab Definitions ──────────────────────────────────────────────

const PROGRAM_TABS = [
  { id: 'insites', label: 'What is InSites', short: 'InSites', icon: <Layers size={14} /> },
  { id: 'tension', label: 'The Dual Tension', short: 'Tension', icon: <Scale size={14} /> },
  { id: 'notation', label: 'Epistemic Notation', short: 'Notation', icon: <Activity size={14} /> },
  { id: 'inquiry', label: 'From Report to Inquiry', short: 'Inquiry', icon: <SearchCheck size={14} /> },
] as const;

// In dev the sandbox REPLACES tab 2 in place rather than adding a sixth tab:
// the experiment is judged in the slot it would actually occupy, and the bar
// keeps the same five items. `WhatIsInSitesTab` stays in the file untouched.
const VISIBLE_TABS = PROGRAM_TABS.map((tab) =>
  SHOW_SANDBOX && tab.id === 'insites'
    ? { ...tab, id: 'sandbox' as const, label: SANDBOX_LABEL, short: SANDBOX_LABEL_SHORT, isSandbox: true }
    : { ...tab, isSandbox: false },
);

const QA_TAB = { id: 'qa', label: 'Q&A', icon: <MessageSquare size={14} /> } as const;

type TabId = typeof PROGRAM_TABS[number]['id'] | 'qa' | 'sandbox';

const REPO_URL = 'https://github.com/InSites-Lab/Insites-CAA2026';

// ─── Component ────────────────────────────────────────────────────

export interface WorkshopProgramViewProps {
  onNavigate?: (route: string) => void;
}

export const WorkshopProgramView: React.FC<WorkshopProgramViewProps> = ({ onNavigate }) => {
  // Opens on the first tab, whichever it is — in dev that is the sandbox.
  const [activeTab, setActiveTab] = useState<TabId>(VISIBLE_TABS[0].id);
  const [isWorkedExampleOpen, setIsWorkedExampleOpen] = useState(false);
  const [isDesignOpen, setIsDesignOpen] = useState(false);

  // Tabs that must never scroll: the column is bounded to the frame instead of
  // being allowed to grow past it, and the tab yields height from its images.
  // Every other tab keeps `shrink-0`, so tall content scrolls as before.
  const fitsFrame = activeTab === 'inquiry' || activeTab === 'tension';
  const fillClass = fitsFrame ? 'grow min-h-0' : 'grow shrink-0';

  const tabClass = (id: TabId) =>
    `flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
      activeTab === id
        ? 'bg-white text-slate-800 shadow-sm'
        : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'
    }`;

  return (
    <div
      className={`flex-1 flex flex-col h-full bg-white custom-scrollbar pb-[140px] sm:pb-[90px] md:pb-16 ${
        fitsFrame ? 'overflow-hidden' : 'overflow-y-auto'
      }`}
      dir="ltr"
    >
      {/* Content column. 4xl (896px) is the width the design canvas was drawn
          at; the wider steps only kick in on large screens, so the tab bar has
          room for full labels instead of compressing them. Drop the xl/2xl
          classes to pin every screen back to the canvas width. */}
      {/* `grow shrink-0` (not flex-1) makes the column fill the viewport down to
          the bottom while still growing past it when a tab is tall — so a tab
          can hand its spare height to an image strip instead of leaving a gap. */}
      <div className={`max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto w-full px-6 py-4 ${fillClass} flex flex-col gap-5`}>

        {/* Tab Bar */}
        <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl shrink-0">
          {VISIBLE_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              // Gated on SHOW_SANDBOX, not just tab.isSandbox, so the minifier
              // can fold the branch away and these literals never ship.
              title={SHOW_SANDBOX && tab.isSandbox ? 'Dev-only experiment — not in the production build' : undefined}
              className={`flex-1 ${tabClass(tab.id)} ${
                SHOW_SANDBOX && tab.isSandbox
                  ? `border border-dashed ${activeTab === tab.id ? 'border-amber-400 text-amber-700' : 'border-amber-300 text-amber-600/80 hover:text-amber-700'}`
                  : ''
              }`}
            >
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
        <SwitchTransition transitionKey={activeTab} className={`${fillClass} flex flex-col`}>
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
          {SHOW_SANDBOX && activeTab === 'sandbox' && <SandboxTab />}
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

/**
 * Panels crossfading quietly through a photo set — no arrows, no dots. With two
 * panels they are offset by one, so the same picture is never on screen twice.
 *
 * The strip always yields its height first: `basis-0` means it claims none of
 * its own and only takes what the tab has left over, so nothing below it is
 * ever pushed out of the frame. The two knobs below bound the result.
 */
const PhotoStrip: React.FC<{
  photos?: { src: string; alt: string }[];
  caption?: string;
  columns?: 1 | 2;
  /** WIDTH KNOB — a Tailwind max-w class. 'max-w-full' fills the content
   *  column; narrower values centre the strip inside it. Set per tab. */
  maxWidth?: string;
  /** HEIGHT KNOB — a Tailwind max-h class. Keep the /var(--app-zoom) divisor,
   *  or the cap is painted 1.1x too tall. Set per tab. */
  maxHeight?: string;
}> = ({
  photos = SITE_PHOTOS,
  caption,
  columns = 2,
  maxWidth = 'max-w-full',
  maxHeight = 'max-h-[calc(44vh/var(--app-zoom))]',
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % photos.length), 6000);
    return () => window.clearInterval(id);
  }, [photos.length]);

  const panel = (offset: number, panelCaption?: string) => (
    <div className="relative rounded-2xl overflow-hidden bg-slate-100">
      {photos.map((photo, i) => (
        <img
          key={photo.src}
          src={photo.src}
          alt={i === (index + offset) % photos.length ? photo.alt : ''}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ease-in-out motion-reduce:transition-none ${
            i === (index + offset) % photos.length ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      {panelCaption && (
        <div className="absolute inset-x-0 bottom-0 px-4 pt-7 pb-2.5 text-white text-[13px] font-semibold bg-gradient-to-t from-slate-900/75 to-transparent">
          {panelCaption}
        </div>
      )}
    </div>
  );

  return (
    <div
      // basis-0 + min-h-0 so the strip claims no height of its own, plus a hard
      // viewport cap. The cap is what actually bounds it — the app root is
      // `min-h-screen`, so the frame handed down here can be taller than the
      // window and `grow` alone would over-allocate.
      className={`grid gap-3.5 grow min-h-0 basis-0 overflow-hidden w-full mx-auto ${maxWidth} ${maxHeight} ${
        columns === 1 ? 'grid-cols-1' : 'grid-cols-2'
      }`}
    >
      {panel(0, caption)}
      {columns === 2 && panel(1)}
    </div>
  );
};

// Like tab 4, this tab never scrolls: bounded to the frame, everything
// shrink-0 except the photo strip, which takes only what is left over.
const DualTensionTab: React.FC = () => (
  <div className="grow min-h-0 overflow-hidden flex flex-col gap-5">
    <div className="space-y-1.5 shrink-0">
      <Eyebrow>The challenge</Eyebrow>
      {/* "hallucinates", not "fabricates" — the paper's own abstract wording. */}
      <h3 className="text-3xl md:text-[33px] leading-tight font-extrabold text-slate-900">
        Give it freedom — it hallucinates.
        <br />
        Lock it down — it loses the synthesis we came for.
      </h3>
      {/* Picks up tab 1's "meaning emerges from context" and turns the two
          risks into one mechanism — which is why suppression cannot be the
          answer, and governance has to be. Delete this line if it crowds. */}
      <p className="text-lg text-slate-600 pt-1">
        One capability, two faces — meaning emerges from context, in the transformer as in CBSA.
      </p>
    </div>

    {/* "afford" deliberately echoes "affordances" below, so the two read as one
        question and its research phrasing rather than as two competing ones. */}
    <div className="space-y-2 shrink-0 text-center">
      <p className="text-2xl font-bold text-slate-900 leading-snug">
        How can we afford both: accountability and the growth of new insight?
      </p>
      <p className="text-lg font-bold text-indigo-600">
        Under which affordances — and which human oversight — can AI assess accountably?
      </p>
    </div>

    {/* ── TAB 2 IMAGE KNOBS ──────────────────────────────────────────
        maxWidth  — max-w-full is the whole content column; max-w-5xl /
                    4xl / 3xl narrow and centre it.
        maxHeight — lower the vh number for a shorter strip. Keep the
                    /var(--app-zoom) divisor. */}
    <PhotoStrip
      maxWidth="max-w-6xl"
      maxHeight="max-h-[calc(45vh/var(--app-zoom))]"
      caption="One experimental answer, from one site — a dolmen field in northern Israel."
    />
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

// 24 + 14 + 4 + 3 = 45. The fifth tile is what used to be missing from the
// sum: three claims counted apart because they are the ones that failed.
const CLAIM_COUNTS = [
  { n: '45', label: 'claims', color: 'text-slate-900' },
  { n: '24', label: 'unmarked', color: 'text-slate-900' },
  { n: '14', label: 'inferred 〰️', color: 'text-amber-800' },
  { n: '4', label: 'hypotheses 💭', color: 'text-purple-800' },
  // Same verb as the bottom line below ("the expert caught the other three"),
  // so the tile and the sentence read as one statement.
  { n: '3', label: 'caught', color: 'text-slate-900' },
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

    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3.5">
      {CLAIM_COUNTS.map((c) => (
        <div key={c.label} className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5">
          <p className={`text-[26px] leading-tight font-extrabold ${c.color}`}>{c.n}</p>
          <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-slate-400">{c.label}</p>
        </div>
      ))}
    </div>

    {/* The bottom line on performance: what the marking was worth, and where
        the three missing from the sum went. No percentage — the paper reports
        none, and one case with one expert does not support one. */}
    <div className="border-l-4 border-indigo-500 bg-slate-50 rounded-r-xl px-5 py-4">
      <p className="text-xl font-bold text-slate-900 leading-snug">
        42 of 45 held. The expert caught the other three — in the session.
      </p>
      <p className="text-sm text-slate-500 mt-1.5">
        One claim was wrong · one did not belong · one inference went unmarked.
      </p>
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
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
    {paths}
  </svg>
);

// Two of the five, chosen as the ones that carry the talk: the long arc and
// the landscape of imagination. The other three are in git history at aecd58b.
const NEW_READINGS: { icon: React.ReactNode; text: React.ReactNode }[] = [
  {
    icon: readingIcon(<><path d="M3 17c2.5-9 15.5-9 18 0" /><circle cx="3" cy="17" r="1.5" /><circle cx="21" cy="17" r="1.5" /></>),
    text: 'A four-millennia pastoral arc — the dolmen builders to the Tuba-Zangariyye Bedouin',
  },
  {
    icon: readingIcon(<><path d="M17.5 19a4.5 4.5 0 1 0-1.7-8.7 6 6 0 1 0-9.8 5.4" /><path d="M6 19h11.5" /></>),
    text: 'A persistent landscape for imagination — gathered from a single footnote',
  },
];

const FromReportToInquiryTab: React.FC = () => (
  // This tab never scrolls. It is bounded to the frame (`min-h-0` +
  // `overflow-hidden`), everything except the photo is `shrink-0`, and the photo
  // flexes — so the closing panel is always on screen and the image is what
  // gives way when the viewport is short.
  <div className="grow min-h-0 overflow-hidden flex flex-col gap-4">
    <div className="space-y-1.5 shrink-0">
      {/* <Eyebrow>What it yielded</Eyebrow> */}
      <h3 className="text-3xl leading-tight font-extrabold text-slate-900">
        From a final report — To an inquiry to be examined. <span className="text-[22px] font-medium text-slate-500">
    &nbsp; &nbsp; &nbsp;( Two LLM InSites examples)</span>
        {/* <br /> */}
        
      </h3>
    </div>

    <div className="space-y-2.5 shrink-0">
      {/* <p className="text-sm font-extrabold tracking-[0.1em] uppercase text-slate-500">
        Two examples from readings the manual assessment had not reached
      </p> */}
      {NEW_READINGS.map((r, i) => (
        <div key={i} className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl px-5 py-3">
          {r.icon}
          <p className="text-xl text-slate-700 leading-snug">{r.text}</p>
        </div>
      ))}
    </div>

    {/* Placeholder photos, to be swapped for the pastoral landscape these two
        readings describe. `fit` so the closing panel below is never pushed
        out of the frame — the image gives up its height first. */}
    {/* ── TAB 4 IMAGE KNOBS — same two as tab 2, tuned separately ──── */}
    <PhotoStrip columns={1} maxWidth="max-w-full" maxHeight="max-h-[calc(48vh/var(--app-zoom))]" />

    <div className="bg-slate-900 rounded-2xl px-7 py-5 shrink-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
      <div className="space-y-1.5">
        <p className="text-[19px] font-bold text-white leading-snug">
          Even a perfect machine, optimally serving conservation — cultural assessment must remain human.
          <br className="hidden sm:inline" /> 
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
