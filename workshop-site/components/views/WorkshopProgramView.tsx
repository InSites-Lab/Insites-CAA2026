import React, { useState, useEffect, useRef } from 'react';
import { Scale, Layers, Activity, SearchCheck, MessageSquare, Github, ExternalLink, ChevronDown, FileSearch, NotebookPen } from 'lucide-react';
import { ExcursionKey } from './ExcursionOutlet';
import { Modal, SectionDivider } from '../common';
import SwitchTransition from '../common/SwitchTransition';
import { DesignPrinciplesView } from './DesignPrinciplesView';

// ─── Tab Definitions ──────────────────────────────────────────────

const PROGRAM_TABS = [
  { id: 'insites', label: 'What is InSites', short: 'InSites', icon: <Layers size={18} /> },
  { id: 'tension', label: 'The Dual Tension', short: 'Tension', icon: <Scale size={18} /> },
  { id: 'notation', label: 'Epistemic Notation', short: 'Notation', icon: <Activity size={18} /> },
  // The bar names the topic; the slide makes the claim. This tab used to carry
  // the paper's title, which is a thesis — it now closes the talk on tab 5,
  // and the bar reads InSites · Tension · Notation · Landscape · Closing, an
  // agenda you can see the shape of.
  { id: 'inquiry', label: 'The Landscape', short: 'Landscape', icon: <SearchCheck size={18} /> },
] as const;


// Still where the questions happen — but the slide behind them is the closing,
// so the audience can see the talk has an ending and not just a question period.
const QA_TAB = { id: 'qa', label: 'Closing', icon: <MessageSquare size={18} /> } as const;

type TabId = typeof PROGRAM_TABS[number]['id'] | 'qa' | 'excursion';

// The repository the PAPER links to, published before the conference — not the
// workshop repo this site lives in. Anyone who read the paper is looking for
// this one, so the slide and the paper must name the same place.
const REPO_URL = 'https://github.com/InSites-Lab/insites/tree/main/system';
const REPO_NAME = 'InSites-Lab / insites';
const REPO_PATH = '/system';

// ─── Component ────────────────────────────────────────────────────

export interface WorkshopProgramViewProps {
  onNavigate?: (route: string) => void;
  /** Non-null when something outside the deck is open. It renders in the tab
   *  panel WITHOUT adding a tab button — the audience never sees the
   *  mechanism; clicking any talk tab returns and clears it. */
  excursion?: ExcursionKey | null;
  excursionContent?: React.ReactNode;
  onCloseExcursion?: () => void;
}

export const WorkshopProgramView: React.FC<WorkshopProgramViewProps> = ({
  onNavigate,
  excursion,
  excursionContent,
  onCloseExcursion,
}) => {
  const [activeTab, setActiveTab] = useState<TabId>(PROGRAM_TABS[0].id);
  // Tab 2's fold-out. The state lives here, not in the tab, so it survives
  // switching away and back — the speaker returns to the card as they left it.
  const [isTensionExampleOpen, setIsTensionExampleOpen] = useState(false);
  const [isWorkedExampleOpen, setIsWorkedExampleOpen] = useState(false);
  const [isDesignOpen, setIsDesignOpen] = useState(false);
  // The talk tab to come back to when the chip is dismissed — the speaker
  // returns to where they were, not to tab 1.
  const [lastDeckTab, setLastDeckTab] = useState<TabId>(PROGRAM_TABS[0].id);

  // Opening an excursion focuses its chip; closing it restores the talk tab.
  useEffect(() => {
    if (excursion) setActiveTab('excursion');
    else setActiveTab((t) => (t === 'excursion' ? lastDeckTab : t));
  }, [excursion, lastDeckTab]);

  // Clicking any talk tab also dismisses whatever excursion is open — the
  // detour is never something the audience has to close by hand.
  const selectDeckTab = (id: TabId) => {
    setActiveTab(id);
    setLastDeckTab(id);
    if (excursion) onCloseExcursion?.();
  };

  // Tabs that must never scroll: the column is bounded to the frame instead of
  // being allowed to grow past it, and the tab yields height from its images.
  // Every other tab keeps `shrink-0`, so tall content scrolls as before.
  const fitsFrame =
    activeTab === 'inquiry' || activeTab === 'tension' || activeTab === 'notation';
  const fillClass = fitsFrame ? 'grow min-h-0' : 'grow shrink-0';

  // The tab bar is the spine of the talk, so it carries the weight the header
  // gave up. The active tab is a SOLID INDIGO BLOCK, not a white pill with a
  // shadow: from the back of a hall, under projector washout, a shadow is
  // invisible and a block of colour is not.
  // Size steps with the width that is actually LEFT, not the viewport: the
  // sidebar takes 430px, so at a 1024 viewport only ~594px reaches this bar.
  // Full labels therefore wait for xl, and 17px for 2xl. `min-w-0` + truncate
  // is the backstop — flex items will not shrink below min-content otherwise,
  // and the row overflows sideways instead of compressing.
  // On a phone the tabs stack icon-over-label at the same scale as the bottom
  // nav, so all five fit one row instead of wrapping. They stay clearly a
  // SEGMENTED CONTROL rather than navigation: a filled tray, and an active tab
  // that is a solid block — where the bottom bar is bare icons on the page.
  const tabClass = (id: TabId) =>
    `flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 xl:gap-2 px-1 sm:px-2.5 xl:px-4 2xl:px-6 py-2 xl:py-2.5 2xl:py-3 rounded-lg text-[10px] sm:text-[13px] xl:text-[15px] 2xl:text-[17px] font-bold whitespace-nowrap min-w-0 transition-all cursor-pointer ${
      activeTab === id
        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
        : 'text-slate-500 hover:text-slate-800 hover:bg-white/60'
    }`;

  return (
    <div
      // The phone padding clears the fixed bottom nav. The desktop one used to
      // clear a footer that is commented out in App.tsx, so it was holding 64px
      // of nothing — which every frame-fit tab was paying for out of its image.
      // If that footer is ever restored, put lg:pb-16 back.
      className={`flex-1 flex flex-col h-full bg-white custom-scrollbar pb-[86px] lg:pb-6 ${
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
        {/* On a phone the tray hides while an excursion is open: reading a CBSA
            stage is its own task, the talk tabs are not part of it, and the
            bottom nav's "Talk" button is already the way back. Worth ~50px of
            vertical space on the screen that has least of it. Desktop keeps it
            — there the tabs are how you leave the excursion. */}
        <div
          className={`flex-nowrap gap-0.5 sm:gap-1.5 bg-slate-100 p-1 sm:p-1.5 rounded-xl shrink-0 ${
            excursion ? 'hidden sm:flex' : 'flex'
          }`}
        >
          {PROGRAM_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => selectDeckTab(tab.id)}
              className={`flex-1 basis-0 ${tabClass(tab.id)}`}
            >
              {tab.icon}
              <span className="hidden xl:inline truncate">{tab.label}</span>
              <span className="xl:hidden truncate">{tab.short}</span>
            </button>
          ))}
          <button
            onClick={() => selectDeckTab(QA_TAB.id)}
            className={`flex-1 basis-0 sm:flex-none sm:shrink-0 ${tabClass(QA_TAB.id)} ${activeTab === QA_TAB.id ? '' : 'text-slate-400'}`}
          >
            {QA_TAB.icon}
            <span>{QA_TAB.label}</span>
          </button>

        </div>

        {/* Tab Content */}
        <SwitchTransition transitionKey={activeTab} className={`${fillClass} flex flex-col`}>
          {activeTab === 'tension' && (
            <DualTensionTab
              isExampleOpen={isTensionExampleOpen}
              onToggleExample={() => setIsTensionExampleOpen((v) => !v)}
            />
          )}
          {activeTab === 'insites' && <WhatIsInSitesTab />}
          {activeTab === 'notation' && <EpistemicNotationTab onNavigate={onNavigate} />}
          {activeTab === 'inquiry' && <FromReportToInquiryTab />}
          {activeTab === 'excursion' && excursionContent}
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
        {/* The Q&A copy of the example. Tab 2 shows the same component in a
            fold-out card; this one is only the backup route from Q&A. */}
        <div className="px-5 py-6">
          <WorkedExample />
        </div>
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
  <p className="text-[12px] font-extrabold tracking-[0.12em] uppercase text-slate-400">{children}</p>
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

  const panel = (offset: number, panelCaption?: string, extra = '') => (
    <div className={`relative rounded-2xl overflow-hidden bg-slate-100 ${extra}`}>
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
      // Two panels side by side on a phone are tall narrow slabs; below sm the
      // strip drops to a single full-width frame and the second panel hides.
      // `transition-all` so a tab can collapse the strip to `max-h-0` and get
      // its height back smoothly — tab 2 does exactly that when its fold-out
      // card opens.
      className={`grid gap-2 sm:gap-3.5 grow min-h-0 basis-0 overflow-hidden w-full mx-auto transition-all duration-300 motion-reduce:transition-none ${maxWidth} ${maxHeight} ${
        columns === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'
      }`}
    >
      {panel(0, caption)}
      {columns === 2 && panel(1, undefined, 'hidden sm:block')}
    </div>
  );
};

// ─── The plates (tab 4) ───────────────────────────────────────────
// The set the speaker steps through, in this order: the site first, our
// reading of it last. Advancing is MANUAL, never a timer — a plate that
// changes behind your back mid-sentence is worse than no plate. Click the
// image, or a dot, to advance.
//
// ADD OR REORDER HERE. The drawing stays last: the photographs are what
// anyone can go and see, and the diptych is what the session made of them.
const PLATES = [
  {
    src: './h40-dolmen-archive.jpg',
    alt: 'A dolmen standing in open grassland, capstone intact, hills behind — archival photograph',
  },
  {
    src: './h40-tuba-field.jpg',
    alt: 'A dolmen and its collapsed tumulus at Tuba-Zangariyye, an Antiquities Authority marker among the stones and the village immediately behind',
  },
  {
    src: './h40-tuba-aerial.jpg',
    alt: 'The dolmen field from the air: cairns scattered across the basalt plateau, cultivated fields and a reservoir beyond',
  },
  {
    src: './tab4-gpt.jpg',
    alt: "Two drawn panels of the same dolmen field, four millennia apart — the reading no source in the file had made. Left, BRONZE AGE PASTORALISTS: a herding family beside the dolmen's cairn, goats and sheep grazing. Right, BEDOUIN ENCAMPMENT: black tents, a coffee hearth, and sheep sheltering under the capstone.",
  },
];

const PlateFigure: React.FC<{
  /** Same two knobs as PhotoStrip, so the tab tunes them the same way. */
  maxWidth?: string;
  maxHeight?: string;
}> = ({ maxWidth = 'max-w-full', maxHeight = 'max-h-[calc(44vh/var(--app-zoom))]' }) => {
  const [index, setIndex] = useState(0);

  return (
    // basis-0 + grow: claims no height of its own, takes only what the tab has
    // left. No mount — every plate carries its own ground, and a frame around
    // them only made them look smaller than they are.
    <div className={`grow min-h-0 basis-0 w-full mx-auto flex flex-col gap-1.5 ${maxWidth}`}>
      <button
        type="button"
        onClick={() => setIndex((i) => (i + 1) % PLATES.length)}
        aria-label={`Image ${index + 1} of ${PLATES.length}. Activate for the next one.`}
        className={`relative grow min-h-0 w-full cursor-pointer ${maxHeight}`}
      >
        {PLATES.map((p, i) => (
          <img
            key={p.src}
            src={p.src}
            alt={i === index ? p.alt : ''}
            className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-[900ms] ease-in-out motion-reduce:transition-none ${
              i === index ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </button>

      {/* Under the plate, never on it: on a photograph a corner overlay lands
          on whatever that photograph happens to have in the corner. */}
      <div className="shrink-0 flex items-center justify-center gap-2">
        {PLATES.map((p, i) => (
          <button
            key={p.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show image ${i + 1}`}
            aria-current={i === index}
            className={`h-2 w-2 rounded-full transition-colors cursor-pointer ${
              i === index ? 'bg-slate-600' : 'bg-slate-300 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// Like tab 4, this tab never scrolls: bounded to the frame, everything
// shrink-0 except the photo strip, which takes only what is left over.
//
// The tab is read in two moves. Closed, it is the challenge and the question
// it opens — the speaker talks over the photographs and stops on "how can we
// afford both". Then the card at the foot unfolds and the answer, the
// assessment claim by claim, takes the frame: the strip collapses to nothing
// and hands its height to the card, which scrolls inside itself. Nothing
// scrolls the slide away, and closing the card puts the photographs back.
const DualTensionTab: React.FC<{ isExampleOpen: boolean; onToggleExample: () => void }> = ({
  isExampleOpen,
  onToggleExample,
}) => (
  <div className="grow min-h-0 overflow-hidden flex flex-col gap-3 sm:gap-4">
    <div className="space-y-1.5 shrink-0">
      <Eyebrow>The challenge</Eyebrow>
      {/* "hallucinates", not "fabricates" — the paper's own abstract wording. */}
      <h3 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-[44px] leading-[1.15] text-slate-900">
        Give it freedom — it hallucinates.
        <br />
        Lock it down — it loses the synthesis we came for.
      </h3>
      {/* Picks up tab 1's "meaning emerges from context" and turns the two
          risks into one mechanism — which is why suppression cannot be the
          answer, and governance has to be. Delete this line if it crowds. */}
      <p className="text-sm sm:text-[15px] md:text-[17px] lg:text-[19px] text-slate-600 pt-1">
        CBSA and the transformer share a core idea: meaning emerges from context.
      </p>
    </div>

    {/* ── TAB 2 IMAGE KNOBS ──────────────────────────────────────────
        maxWidth  — max-w-full is the whole content column; max-w-5xl /
                    4xl / 3xl narrow and centre it.
        maxHeight — lower the vh number for a shorter strip. Keep the
                    /var(--app-zoom) divisor. The open card overrides it. */}
    <PhotoStrip
      maxWidth="max-w-6xl"
      maxHeight={
        isExampleOpen
          ? 'max-h-0 opacity-0'
          : 'max-h-[52vh] sm:max-h-[calc(52vh/var(--app-zoom))]'
      }
      caption="One experimental answer, from one site — a dolmen field in northern Israel."
    />

    <div className="shrink-0 text-center">
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-slate-900 leading-snug">
        How can we afford both: accountability and the emergence of new insight?
      </p>
    </div>

    <WorkedExampleCard open={isExampleOpen} onToggle={onToggleExample} />
  </div>
);

// ─── The worked example — the answer, claim by claim ───────────────
// It used to be tab 3's button, opening public/notation.html in a fullscreen
// modal. Here it is the body of tab 2's fold-out: same content as JSX, so it
// takes the deck's own type and colours instead of the iframe's, and the
// speaker never leaves the slide. (The HTML file stays — it is the printable
// standalone copy.)

// The marks are the subject of the talk, so they are set LARGER than the words
// around them, not smaller. Inline in prose is the one place with a ceiling —
// past ~20px they start breaking the line rhythm of the paragraph they annotate.

/** Inferred — synthesized across sources. */
const Inf = () => (
  <span className="inline-block align-middle rounded bg-amber-100 px-1.5 text-[19px] font-semibold">〰️</span>
);

/** Hypothesis — reading between the lines. */
const Hyp = () => (
  <span className="inline-block align-middle rounded bg-purple-100 px-1.5 text-[19px] font-semibold">💭</span>
);

const Cite: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="font-mono text-[12px] sm:text-[13px] text-slate-400">{children}</span>
);

const EvidenceLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="mt-3.5 mb-1 text-[12px] font-bold uppercase tracking-[0.06em] text-slate-500">
    {children}
  </p>
);

const WorkedExample: React.FC = () => (
  <div className="max-w-3xl mx-auto space-y-5 text-slate-700">
    <div className="border-b-2 border-slate-200 pb-3">
      <h4 className="text-lg sm:text-xl font-bold text-slate-900">CBSA session — notation update</h4>
      <p className="text-[13px] sm:text-sm text-slate-500">
        Tuba-Zangariyye Dolmen Field · Korazim Plateau · March 31, 2026
      </p>
    </div>

    {/* The key itself lives on tab 3 now, where it is quoted as the bot's
        instruction. This strip is what the example needs to read on its own. */}
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 rounded-xl bg-slate-100 px-4 py-2 text-[13px] sm:text-sm text-slate-600">
      <span className="flex items-center gap-1.5">
        <span className="rounded bg-amber-100 px-1.5 text-[20px] font-semibold leading-none">〰️</span>
        inferred
      </span>
      <span className="flex items-center gap-1.5">
        <span className="rounded bg-purple-100 px-1.5 text-[20px] font-semibold leading-none">💭</span>
        hypothesis
      </span>
      <span className="flex items-center gap-1.5">
        <Cite>[C:pp.46–48]</Cite>
        source
      </span>
    </div>

    <img
      src="./dolmen.jpg"
      alt="An IAA archaeologist surveying a dolmen in the Tuba-Zangariyye field, the village behind"
      className="w-full rounded-xl border border-slate-200"
    />

    <section className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6">
      <h5 className="text-base sm:text-lg font-bold text-slate-900">Values — notation update</h5>
      <p className="text-[13px] sm:text-sm text-slate-500 mt-1 mb-5">
        Values 5–6 reformatted from the previous session's notation style to the current InSites
        notation key.
      </p>

      <div className="border-b border-slate-200 pb-5 mb-5">
        <p className="text-[15px] sm:text-base font-bold text-slate-900">
          5. Social — "Pastoralist Continuity and Community Presence" <Inf />
        </p>

        <EvidenceLabel>Evidence</EvidenceLabel>
        <p className="text-sm sm:text-[15px] leading-relaxed">
          Stepansky links the dolmen builders to semi-nomadic pastoralists of the IB–MBIIA period,
          based on Horbat Berekh's material culture. <Cite>[C:pp.46–48]</Cite> The Korazim Plateau
          has sustained pastoral communities through historical periods, and the Zangariyye and
          El-Heib Bedouin tribes have inhabited it since at least the 18th century.{' '}
          <Cite>[C:p.50 note 4; B]</Cite> The dolmen field sits immediately adjacent to the present
          village.
        </p>

        <EvidenceLabel>Broader meaning</EvidenceLabel>
        <p className="text-sm sm:text-[15px] leading-relaxed">
          This long arc of pastoral presence — ancient builders, Ottoman-era cultivators, modern
          Bedouin — suggests a social value rooted in continuity of landscape use, though the
          connection between the Bronze Age population and later inhabitants is cultural-geographic
          rather than demonstrated lineage. <Inf /> The critical gap noted in Stage 1 applies here:
          no community voice has been recorded, and the social value therefore rests on
          archaeological inference rather than living testimony.
        </p>
      </div>

      <div>
        <p className="text-[15px] sm:text-base font-bold text-slate-900">
          6. Intangible Heritage — "Layers of Narrative Across Traditions" <Inf />
        </p>

        <EvidenceLabel>Evidence</EvidenceLabel>
        <p className="text-sm sm:text-[15px] leading-relaxed">
          Biblical references to Rephaim giants in Transjordan, the New Testament "tombs" near
          Korazim, Talmudic references to dolmens as "Merkolis" (pagan entities), and the Bedouin
          term "Dan" (shelter) for dolmens collectively suggest that these structures have generated
          cultural meaning across at least four distinct traditions. <Cite>[C:p.50 note 2; B]</Cite>
        </p>

        <EvidenceLabel>Broader meaning</EvidenceLabel>
        <p className="text-sm sm:text-[15px] leading-relaxed">
          The intangible context (Stage 1) frames the dolmens as persistent stimuli for narrative
          production. However, the evidence linking these specific textual traditions to the
          Tuba-Zangariyye field (rather than to Korazim Plateau dolmens generally) is indirect{' '}
          <Hyp /> — the association is plausible given proximity but not site-specific.
        </p>
      </div>
    </section>

    <p className="border-t-2 border-slate-200 pt-4 text-center text-[13px] sm:text-sm text-slate-500">
      ───── End of 2️⃣ Values Analysis <em>(notation update)</em>
    </p>
  </div>
);

// The fold-out itself. Closed it is one strip at the foot of the tab; open it
// takes every pixel the tab has left (`grow min-h-0`) and scrolls inside.
const WorkedExampleCard: React.FC<{ open: boolean; onToggle: () => void }> = ({ open, onToggle }) => (
  <div
    className={`rounded-2xl border-2 border-indigo-200 bg-white overflow-hidden ${
      open ? 'grow min-h-0 flex flex-col' : 'shrink-0'
    }`}
  >
    <button
      onClick={onToggle}
      aria-expanded={open}
      className="w-full shrink-0 flex items-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3 text-left bg-indigo-50/70 hover:bg-indigo-100/70 transition-colors cursor-pointer"
    >
      <FileSearch size={20} className="text-indigo-600 shrink-0" />
      <span className="flex-1 min-w-0">
        <span className="block text-sm sm:text-[15px] font-bold text-indigo-900">
          Worked example — Tuba-Zangariyye, claim by claim
        </span>
        <span className="hidden sm:block text-[13px] sm:text-sm text-indigo-500/80">
          Two values re-marked: what was read, what was inferred, what is hypothesis
        </span>
      </span>
      <ChevronDown
        size={18}
        className={`text-indigo-400 shrink-0 transition-transform duration-300 motion-reduce:transition-none ${
          open ? 'rotate-180' : ''
        }`}
      />
    </button>

    {open && (
      <div className="grow min-h-0 overflow-y-auto custom-scrollbar border-t border-slate-200 bg-slate-50 px-4 sm:px-6 py-5 animate-fade-in">
        <WorkedExample />
      </div>
    )}
  </div>
);

// ─── 2 · What is InSites ──────────────────────────────────────────

const CHALLENGES = [
  {
    // Merges the two original cards ("too complex" + "too heavy, no one reads
    // it"), so the response merges their answers too.
    quote: "It's important but too complex — and nobody reads it",
    response: "With AI trained in our assessment principles we can simplify the process and link outputs directly to surveys and systems — and with natural language queries and visual tools like knowledge graphs, make the results usable rather than shelved.",
    color: 'amber',
    avatar: './rabbit.png',
  },
  {
    // New card. The response below is a DRAFT — it answers the black box with
    // the paper's own mechanism (epistemic notation). Rewrite as you see fit.
    quote: 'The assessment reasoning is a Black Box',
    response: "Every claim carries a mark for its distance from the sources — what was read, what was inferred, what is hypothesis. The reasoning path stops being tacit and becomes reviewable, claim by claim.",
    color: 'indigo',
    avatar: './hatter.jpg',
  },
  {
    quote: "So will AI replace the professionals?",
    response: "No. Experts remain essential. AI is a smart partner for detecting connections and contexts — but it needs our guidance.",
    color: 'emerald',
    avatar: './robot.png',
  },
];

const challengeColors: Record<string, { border: string; bg: string; text: string; quote: string }> = {
  amber: { border: 'border-l-amber-400', bg: 'bg-amber-50', text: 'text-amber-900/70', quote: 'text-amber-900' },
  indigo: { border: 'border-l-indigo-400', bg: 'bg-indigo-50', text: 'text-indigo-900/70', quote: 'text-indigo-900' },
  emerald: { border: 'border-l-emerald-400', bg: 'bg-emerald-50', text: 'text-emerald-900/70', quote: 'text-emerald-900' },
};

const WhatIsInSitesTab: React.FC = () => (
  <div className="space-y-5">
    {/* Poster */}
    <div className="max-w-3xl mx-auto">
      <img
        src="./poster-light.jpg"
        alt="InSites-CAA — CBSA Workshop"
        className="w-full rounded-2xl border border-slate-200 shadow-sm"
      />
      <p className="text-center text-[15px] sm:text-[17px] text-slate-500 italic mt-2">
        "The LLM is a looking glass — more than a wonderland"
      </p>
      {/* <p className="text-center text-[13px] sm:text-sm text-slate-400 mt-1">
        CBSA and the transformer share a core idea: meaning emerges from context.
      </p> */}
    </div>

    {/* Intro line */}
    <p className="text-[15px] sm:text-[17px] text-slate-600 leading-relaxed">
      AI already speaks our language and is becoming an active partner in culture. We examine how it can help with the cultural assessment challenges:
    </p>

    {/* 3 Challenge cards with character avatars */}
    <div className="space-y-3">
      {CHALLENGES.map((ch, idx) => {
        const c = challengeColors[ch.color] || challengeColors.amber;
        const isRight = idx % 2 === 0;
        return (
          <details key={idx} className={`${c.bg} border border-slate-200 ${c.border} border-l-4 rounded-xl overflow-hidden group`}>
            <summary className={`p-2.5 sm:p-4 cursor-pointer flex items-center gap-2.5 sm:gap-3 select-none ${isRight ? '' : 'sm:flex-row-reverse sm:text-right'}`}>
              <img
                src={ch.avatar}
                alt=""
                className="w-11 h-11 sm:w-16 sm:h-16 rounded-full border-2 border-white shadow-md shrink-0 object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <span className={`font-bold text-[15px] sm:text-[17px] ${c.quote} flex-1`}>"{ch.quote}"</span>
              <ChevronDown size={16} className="text-slate-400 group-open:rotate-180 transition-transform shrink-0" />
            </summary>
            <div className="px-2.5 sm:px-4 pb-3 sm:pb-4 pt-1">
              <p className={`text-sm sm:text-[17px] ${c.text} leading-relaxed`}>{ch.response}</p>
            </div>
          </details>
        );
      })}
    </div>

    {/* Lab intro */}
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
      <h4 className="font-bold text-[15px] sm:text-[17px] text-slate-800">InSites Knowledge Lab</h4>
      <p className="text-[15px] text-slate-400">Technion — Israel Institute of Technology</p>
      <p className="text-sm sm:text-[17px] text-slate-700 leading-relaxed">
        At the intersection of <strong>assessment methods</strong>, <strong>novel technologies</strong>, and <strong>built-heritage data</strong> — we develop computational methods for evidence-based heritage assessment.
      </p>
      <p className="text-sm sm:text-[17px] text-slate-700 leading-relaxed">
        InSites-CAA is our research prototype: a multi-platform AI assistant that structures heritage significance assessment through the CBSA method. Not a black box — a looking glass.
      </p>
    </div>
  </div>
);

// ─── 3 · Epistemic Notation ───────────────────────────────────────

// The bot's instruction, verbatim. InSites-CAA-claude.md v10, lines 187-198 —
// Part 1, Global Controls, "Global Notation Key (Mandatory)". Every string in
// this table is the prompt's own; do not improve the wording. If the prompt is
// edited, re-copy it here and re-check the line numbers in the caption.
const NOTATION_KEY: { mark: React.ReactNode; meaning: string; rowClass: string }[] = [
  {
    // The prompt lists this as two rows — "(none) | Explicit in source" and
    // "[file:page] | Source". They are one thing: an explicit claim carries no
    // glyph BECAUSE it carries the citation. Merged here, which is why the
    // divider says "from" the system prompt and not "verbatim".
    mark: <span className="font-mono text-[13px] lg:text-[15px] text-slate-500">[file:page]</span>,
    meaning: 'Explicit in source — cited to the place it was read',
    rowClass: '',
  },
  {
    // The glyphs are the subject of the talk: biggest thing in the row.
    mark: <span className="inline-block rounded-lg bg-amber-100 px-3 py-1 text-[30px] lg:text-[36px] leading-none">〰️</span>,
    meaning: 'Inferred from 2+ pieces of evidence (cite the evidence)',
    rowClass: 'bg-amber-50/50',
  },
  {
    mark: <span className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-[30px] lg:text-[36px] leading-none">💭</span>,
    meaning: 'Uncertainty / interpretation — a claim that is neither explicit nor confidently inferred',
    rowClass: 'bg-purple-50/50',
  },
];

// 24 + 14 + 4 + 3 = 45. The fifth tile is what used to be missing from the
// sum: three claims counted apart because they are the ones that failed.
// The second tile does NOT say "unmarked": in those 24 cases the model did
// something — it pinned the claim to a page — and the word for that is the
// citation, not the absence of a glyph.
const CLAIM_COUNTS: { n: string; label: string; token?: string; tokenClass?: string; color: string }[] = [
  { n: '45', label: 'claims', color: 'text-slate-900' },
  // The citation format is a footnote on the tile; the glyphs are the point of
  // it — so they are sized in opposite directions.
  { n: '24', label: 'explicit', token: '[file:page]', tokenClass: 'font-mono text-[8px] sm:text-[10px] text-slate-400', color: 'text-slate-900' },
  { n: '14', label: 'inferred', token: '〰️', tokenClass: 'text-[15px] sm:text-[19px]', color: 'text-amber-800' },
  { n: '4', label: 'hypotheses', token: '💭', tokenClass: 'text-[15px] sm:text-[19px]', color: 'text-purple-800' },
  // Same verb as the bottom line below ("the expert caught the other three"),
  // so the tile and the sentence read as one statement.
  { n: '3', label: 'caught', color: 'text-slate-900' },
];

const EpistemicNotationTab: React.FC<{
  onNavigate?: (route: string) => void;
}> = ({ onNavigate }) => (
  // Frame-fit, like tabs 2 and 4: the 42-of-45 panel is this slide's payoff and
  // must not sit below the fold when the speaker lands the sentence. Everything
  // is shrink-0 except the quoted key card, which is the one element allowed to
  // give up height (and scroll inside itself) on a short screen.
  <div className="grow min-h-0 overflow-hidden flex flex-col gap-3 sm:gap-4">
    <div className="space-y-1.5 shrink-0">
      <Eyebrow>The core mechanism</Eyebrow>
      <h3 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-[44px] leading-[1.15] text-slate-900">
        A mark measures a claim's distance from its sources.
      </h3>
      <p className="text-[15px] sm:text-[17px] lg:text-xl font-semibold text-slate-500">Validity remains human judgment.</p>
    </div>

    {/* ── Act one: the instruction ──────────────────────────────────
        The audience sees the rule before it sees any number measured with
        it. The three tier cards that used to stand here were a paraphrase of
        the same three rows, in a second visual grammar — cut, so the quote is
        the only authority on the slide. */}
    <div className="shrink-0">
      <SectionDivider label="The instruction — from the bot's system prompt" />
    </div>

    {/* min-h-0 (not grow) — the card keeps its content height when there is
        room and is the only block that gives way when there is not. */}
    <div className="border-2 border-slate-300 rounded-xl min-h-0 overflow-y-auto custom-scrollbar">
      <table className="w-full text-[15px] sm:text-base lg:text-lg">
        <thead>
          <tr className="bg-slate-50">
            <th className="text-left font-bold text-[11px] uppercase tracking-[0.08em] text-slate-500 border-b border-slate-200 py-2 px-3 sm:px-4 w-[110px] lg:w-[150px]">
              Notation
            </th>
            <th className="text-left font-bold text-[11px] uppercase tracking-[0.08em] text-slate-500 border-b border-slate-200 py-2 px-3 sm:px-4">
              Meaning
            </th>
          </tr>
        </thead>
        <tbody>
          {NOTATION_KEY.map((row) => (
            <tr key={row.meaning} className={row.rowClass}>
              <td className="border-b border-slate-200 py-2 px-3 sm:px-4 text-center align-middle">{row.mark}</td>
              <td className="border-b border-slate-200 py-2 px-3 sm:px-4 text-slate-700 leading-snug">{row.meaning}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* The Rule line is prompt text too, so it stays inside the border. The
          attribution rides the same line — provenance at no height cost. */}
      <p className="px-3 sm:px-4 py-2.5 text-[13px] sm:text-sm text-slate-500 italic leading-snug">
        "When in doubt — mark it. Better an unnecessary notation than an unmarked claim that appears factual."
        <span className="not-italic text-slate-400"> — Global Notation Key (Mandatory), InSites v10</span>
      </p>
    </div>

    {/* The line that used to sit here — "the first tier's mark IS the citation"
        — is now spoken, not printed. The merged first row says it. */}

    {/* ── Act two: the test ─────────────────────────────────────────── */}
    <div className="shrink-0">
      <SectionDivider
        label="The test — one site, one expert, assessed twice"
        sublabel="Once by hand, once with InSites — what the marks caught, and what only the expert could."
        colorClass="text-slate-800"
      />
    </div>

    <div className="shrink-0 grid grid-cols-5 gap-1.5 sm:gap-3.5">
      {CLAIM_COUNTS.map((c) => (
        <div key={c.label} className="bg-slate-50 border border-slate-200 rounded-xl px-1.5 py-1.5 sm:px-3.5 sm:py-2.5">
          <p className={`text-xl sm:text-2xl lg:text-[26px] leading-tight font-extrabold ${c.color}`}>{c.n}</p>
          <p className="text-[10px] sm:text-[12px] font-bold tracking-tight sm:tracking-[0.08em] uppercase text-slate-400 leading-tight">
            {c.label}
            {c.token && (
              // normal-case so the label's uppercase does not eat the token.
              <span className={`normal-case align-middle ${c.tokenClass}`}> {c.token}</span>
            )}
          </p>
        </div>
      ))}
    </div>

    {/* The bottom line on performance: what the marking was worth, and where
        the three missing from the sum went. No percentage — the paper reports
        none, and one case with one expert does not support one. */}
    <div className="shrink-0 border-l-4 border-indigo-500 bg-slate-50 rounded-r-xl px-5 py-4">
      <p className="text-[15px] sm:text-base md:text-lg lg:text-xl font-bold text-slate-900 leading-snug">
        42 of 45 held. The expert caught the other three — in the session.
      </p>
      <p className="text-[15px] text-slate-500 mt-1.5">
        One claim was wrong · one did not belong · one inference went unmarked.
      </p>
    </div>

    {/* The worked example used to sit here as a second button opening a
        fullscreen modal. It is now the fold-out card at the foot of tab 2,
        where the question it answers is asked. */}
    <div className="shrink-0 flex flex-wrap gap-3">
      <button
        onClick={() => onNavigate?.('notation')}
        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-[10px] px-[22px] py-2.5 text-[15px] font-bold shadow-lg shadow-indigo-600/25 transition-colors cursor-pointer"
      >
        The notation in depth
      </button>
    </div>
  </div>
);

// ─── 4 · The Landscape ────────────────────────────────────────────

// The deck's arc is medium → message. Tab 2 is FORM: what a marked
// conversation looks like — and the paragraph headings of its worked example
// (Values 5 and 6) are, word for word, this tab's message. Tab 3 is LOGIC:
// what the mark is. Tab 4 is MEANING: what the marking enabled in the domain —
// the new insight about the landscape of imagination.
//
// So this slide does not explain; it points. The two value headings return
// verbatim from the example the audience has already read, and the slide says
// only: this is what came of it. Projected format: few words, large sizes,
// one thought per line — anything sayable aloud is not printed.
const FromReportToInquiryTab: React.FC = () => (
  // Never scrolls: bounded to the frame, everything shrink-0 except the plate,
  // which takes only what is left over.
  <div className="grow min-h-0 overflow-hidden flex flex-col gap-2.5 lg:gap-3">
    <div className="space-y-1 shrink-0">
      <Eyebrow>The LLM insight</Eyebrow>
      <h3 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-[44px] leading-[1.15] text-slate-900">
        A Landscape of Imagination.
      </h3>
      <p className="text-[15px] sm:text-base lg:text-[17px] text-slate-500 pt-0.5">
        Two values the manual assessment had not reached.
      </p>
    </div>

    {/* The two value headings, verbatim from the worked example on tab 2 —
        same words, presentation sizes. No cites, no gloss: the citations live
        in the example's body, and the audience has already seen these lines. */}
    <div className="shrink-0 grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-3">
      <div className="flex items-center justify-between gap-3 bg-white border border-slate-200 rounded-xl px-4 py-2.5 lg:px-5 lg:py-3">
        <p className="text-base lg:text-[19px] font-bold text-slate-900 leading-snug">
          Social — "Pastoralist Continuity and Community Presence"
        </p>
        <Inf />
      </div>
      <div className="flex items-center justify-between gap-3 bg-white border border-slate-200 rounded-xl px-4 py-2.5 lg:px-5 lg:py-3">
        <p className="text-base lg:text-[19px] font-bold text-slate-900 leading-snug">
          Intangible Heritage — "Layers of Narrative Across Traditions"
        </p>
        <Inf />
      </div>
    </div>

    {/* ── TAB 4 IMAGE KNOBS — same two as tab 2, tuned separately ──── */}
    <PlateFigure maxWidth="max-w-full" maxHeight="max-h-[46vh] sm:max-h-[calc(70vh/var(--app-zoom))]" />

    {/* Nothing after the plate. The imagination reading rose into the
        headline; its provenance — "the phrase is the expert's, not the
        machine's" — is spoken, and is the hinge into tab 5. */}
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

// ─── Speaker note ─────────────────────────────────────────────────
// A note only the presenter reads. The browser's own `title` tooltip was the
// wrong instrument: it appears after a delay, at whatever size the OS decides,
// and it cannot be pinned open while you glance at it — useless at a lectern.
// This is a real panel: click the mark to pin it, click again or press Escape
// to dismiss. The mark itself sits at 30% opacity, invisible from a hall.
const SpeakerNote: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className = '',
  children,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    // Click anywhere outside closes it — the behaviour anyone expects from a
    // note, and the reason this used to feel stuck open.
    const onPointerDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onPointerDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onPointerDown);
    };
  }, [open]);

  // TWO elements on purpose. The caller positions the outer one; the inner one
  // is the anchor. Putting both on one element meant `relative` and `absolute`
  // landed in the same class list, where Tailwind's source order decides the
  // winner rather than the order written — so the mark sat in the flow and the
  // note opened somewhere nobody expected.
  return (
    <span className={className}>
      <span ref={ref} className="relative block">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Speaker note"
          className={`flex items-center justify-center rounded-lg p-1.5 text-slate-500 transition-opacity cursor-pointer ${
            open ? 'opacity-100 bg-white/70' : 'opacity-30 hover:opacity-100'
          }`}
        >
          <NotebookPen size={16} />
        </button>

        {open && (
          // Anchored to the right because the mark sits at the panel's right
          // edge — it opens INWARD, away from the frame, and never clips.
          <div className="absolute right-0 top-full mt-2 z-30 w-[min(600px,78vw)] rounded-xl border border-slate-300 bg-white p-4 lg:p-5 text-left shadow-xl animate-fade-in">
            <p className="text-[11px] font-black uppercase tracking-[0.14em] text-slate-400 mb-2.5">
              Speaker note
            </p>
            <div className="space-y-2.5 text-[15px] lg:text-base leading-relaxed text-slate-700">
              {children}
            </div>
          </div>
        )}
      </span>
    </span>
  );
};

// The last slide, and the one that stays up for the whole question period.
// It is deliberately NOT frame-fit: the closing block is given the height of
// the projected screen, and the backup material begins BELOW THE FOLD. The
// grid is a duplicate of the sidebar's Extensions & Tools, so on the slide it
// would only compete with the talk's last sentence — one scroll away is the
// right distance for it.
const QaTab: React.FC<{
  onNavigate?: (route: string) => void;
  onOpenWorkedExample: () => void;
  onOpenDesign: () => void;
}> = ({ onNavigate, onOpenWorkedExample, onOpenDesign }) => (
  <div className="space-y-5">
    {/* ── Above the fold: the closing, and only the closing ───────────
        min-h is the knob that decides where the projected screen ENDS. At
        80vh the title and the question fill it and everything else — the
        repository, the material — begins below. Lower it and the repo bar
        creeps back onto the slide. Keep the /var(--app-zoom) divisor. */}
    <div className="min-h-[calc(80vh/var(--app-zoom))] flex flex-col justify-center gap-6 lg:gap-8">
      <div className="space-y-1.5">
        <Eyebrow>Closing</Eyebrow>
        {/* The talk's own title, and the only place it appears. The conference
            says Heritage 4.0; this names what 4.0 means for one practice
            inside it, and final/open + report/inquiry is a double antithesis.
            It stands alone — the paper's proceedings title is in the header,
            and repeating it under here would only blunt this line. */}
        <h3 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-[44px] leading-[1.15] text-slate-900">
          Significance Assessment 4.0 — from a final report to an open inquiry
        </h3>
        <p className="text-sm sm:text-base text-slate-500 pt-1">
          Alef, Shafriri &amp; Berger · Heritage 4.0, Florence 2026
        </p>
      </div>

      {/* The talk ENDS ON A QUESTION, and the answer stays in the speaker's
          mouth. What is printed is the thought experiment the paper's own
          conclusion opens with, plus the lens you answer it through — not the
          conclusion itself ("the system that least needs the experts most
          needs to keep them in"), which is now spoken.
          "Afford" is deliberate: tab 2 opens the talk on "how can we afford
          both", and this closes it on the same verb.
          The speaker's script is one click away in the corner — see
          SpeakerNote; invisible to the hall. */}
      <div className="relative rounded-2xl border border-indigo-100 bg-indigo-50/70 px-5 py-4 lg:px-7 lg:py-6 space-y-2">
        <SpeakerNote className="absolute top-2.5 right-2.5">
          <p>Let me end with the thought experiment the paper ends with.</p>
          <p>
            Imagine a system so capable that full automation looks fluent, complete, efficient — a
            perfect assessment machine. Could heritage afford it?
          </p>
          <p>
            Here is the paradox: every gain in autonomy is a loss in humanity — and a cultural
            assessment that is not human cannot count as good.
          </p>
          <p>So the system that least needs the experts, most needs to keep them in.</p>
          <p>I'll leave the question on the screen.</p>
        </SpeakerNote>

        <p className="text-[19px] sm:text-[23px] lg:text-[28px] font-bold text-slate-900 leading-snug pr-8">
          Imagine a perfect assessment machine —{' '}
          <span className="text-indigo-700">could heritage afford it?</span>
        </p>
        <p className="text-sm lg:text-[16px] text-indigo-950/55">Who assesses is part of what is assessed.</p>
      </div>
    </div>

    {/* ── Below the fold ──────────────────────────────────────────────
        The question is left alone on the projected screen. The repository is
        the first thing a scroll reveals — it is what people want after the
        talk, not during its last sentence. */}
    <div>
      {/* The link the paper carries, so it has to be findable and
          photographable: bigger mark, the repo name at headline weight, the
          path beside it. */}
      <a
        href={REPO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-4 py-3.5 sm:px-6 sm:py-4 transition-colors"
      >
        <Github size={32} className="shrink-0" />
        <span className="flex-1 min-w-0">
          <span className="block text-[17px] sm:text-[20px] lg:text-[22px] font-bold leading-tight">
            {REPO_NAME}
            <span className="text-slate-400 font-mono text-[15px] sm:text-[17px]"> {REPO_PATH}</span>
          </span>
          <span className="block text-[13px] sm:text-sm text-slate-400 mt-0.5">
            The system prompt, the specs, and the claim-level evidence behind this talk
          </span>
        </span>
        <ExternalLink size={18} className="text-slate-400 shrink-0" />
      </a>
    </div>

    {/* ── Below the fold: the toolbox ─────────────────────────────── */}
    <SectionDivider
      label="During questions"
      sublabel="The material behind the talk — every card opens live, in this deck."
      colorClass="text-slate-800"
    />

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
      {BACKUP_MATERIAL.map((item) => (
        <button
          key={item.label}
          onClick={() => {
            if (item.action === 'worked-example') return onOpenWorkedExample();
            if (item.action === 'design') return onOpenDesign();
            onNavigate?.(item.route!);
          }}
          className="text-left bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 rounded-xl px-3 py-2 sm:px-4 sm:py-3 transition-colors cursor-pointer"
        >
          <span className="block text-sm sm:text-[15px] font-bold text-slate-800">{item.label}</span>
          <span className="hidden sm:block text-sm text-slate-500">{item.note}</span>
        </button>
      ))}
    </div>
  </div>
);

export default WorkshopProgramView;
