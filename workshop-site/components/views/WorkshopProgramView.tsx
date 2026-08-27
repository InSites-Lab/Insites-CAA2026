import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Scale, Layers, Activity, SearchCheck, MessageSquare, Github, ExternalLink, ChevronDown, FileSearch, NotebookPen, Play, Pause, X, Mail } from 'lucide-react';
import { ExcursionKey } from './ExcursionOutlet';
import { SectionDivider } from '../common';
import SwitchTransition from '../common/SwitchTransition';

// ─── Tab Definitions ──────────────────────────────────────────────

const PROGRAM_TABS = [
  { id: 'insites', label: 'What is InSites', short: 'InSites', icon: <Layers size={18} /> },
  { id: 'tension', label: 'The Dual Tension', short: 'Tension', icon: <Scale size={18} /> },
  { id: 'notation', label: 'Epistemic Notation', short: 'Notation', icon: <Activity size={18} /> },
  // The bar names topics, never claims — a claim belongs to the slide. So the
  // row reads InSites · Tension · Notation · Landscape · Closing: an agenda you
  // can see the shape of.
  { id: 'inquiry', label: 'The Landscape', short: 'Landscape', icon: <SearchCheck size={18} /> },
] as const;


// Still where the questions happen — but the slide behind them is the closing,
// so the audience can see the talk has an ending and not just a question period.
const QA_TAB = { id: 'qa', label: 'Closing', icon: <MessageSquare size={18} /> } as const;

type TabId = typeof PROGRAM_TABS[number]['id'] | 'qa' | 'excursion';

// ─── The sidebar's mode, per tab — set it here ─────────────────────
// The process column beside the deck has two builds: `full` (500px, 20px
// type, a role line under every stage) and `compact` (300px, 16px, stage
// names only). Tab 1 is the tab that TALKS about the framework, so there it
// is the subject and gets the full build. Everywhere else it is context, not
// subject: it stays visible so the room can see where in the process we are,
// at a weight that does not compete with the slide.
//
// Moving a tab between the two is one word on its line. The sizes themselves
// live where sizes live — widths in App.tsx, type in index.css ([data-sb]).
export type SidebarMode = 'full' | 'compact';

const SIDEBAR_MODE: Record<string, SidebarMode> = {
  insites: 'full',
  tension: 'compact',
  notation: 'compact',
  inquiry: 'compact',
  qa: 'compact',
};

// ─── Tabs in the URL ──────────────────────────────────────────────
// Every tab is addressable: #tab-notation opens the deck on Epistemic
// Notation. Two things follow — a reload returns to the slide you were on
// instead of to tab 1, and a single slide can be linked and sent.
//
// The names are the ones the TAB BAR SHOWS, not the internal ids: 'inquiry'
// is Landscape and 'qa' is Closing. A URL that someone types from a
// photograph, or reads down a phone, should match the word on the screen.
//
// The `tab-` prefix is not decoration. The bare names collide with routes
// that already exist in App.tsx — #notation opens the notation MODAL, and
// that link is published. Both have to keep working.
//
// App.tsx must know these five: its hash handler normalises any hash it does
// not recognise back to "", which would erase a tab link on arrival.
const TAB_HASH: Record<string, TabId> = {
  'tab-insites': 'insites',
  'tab-tension': 'tension',
  'tab-notation': 'notation',
  'tab-landscape': 'inquiry',
  'tab-closing': 'qa',
};

const HASH_FOR_TAB = Object.fromEntries(
  Object.entries(TAB_HASH).map(([hash, tab]) => [tab, hash]),
) as Record<TabId, string>;

// Hashes that mean "the deck, with nothing over it". Empty is one of them:
// every modal's onClose sets it. When the URL says one of these it is not
// saying anything a link needs, so the deck replaces it with its own tab.
const DECK_ALIASES = new Set(['', 'program', 'home', 'presentation']);

const tabFromHash = (): TabId | undefined => TAB_HASH[window.location.hash.slice(1)];

// The repository the PAPER links to, published before the conference — not the
// workshop repo this site lives in. Anyone who read the paper is looking for
// this one, so the slide and the paper must name the same place.
//
// Two constants, not one, because they say different things and must not drift
// apart: LINK is where the click goes (deep into the /system folder), LABEL is
// what a person reads and types from a photograph of the slide. The label is
// deliberately the plain repository address — a URL you could key into a
// browser — and the folder is named in words underneath rather than glued on,
// because "InSites-Lab / insites /system" is not an address anyone recognises.
const REPO_URL = 'https://github.com/InSites-Lab/insites/tree/main/system';
const REPO_LABEL = 'github.com/InSites-Lab/insites';

// ─── Component ────────────────────────────────────────────────────

export interface WorkshopProgramViewProps {
  onNavigate?: (route: string) => void;
  /** Non-null when something outside the deck is open. It renders in the tab
   *  panel WITHOUT adding a tab button — the audience never sees the
   *  mechanism; clicking any talk tab returns and clears it. */
  excursion?: ExcursionKey | null;
  excursionContent?: React.ReactNode;
  onCloseExcursion?: () => void;
  /** The deck tells App how loud the sidebar beside it should be. It reports a
   *  MODE, not a tab id, so the per-tab table stays here next to the tabs and
   *  App never has to know what a tab is called. See SIDEBAR_MODE above. */
  onSidebarModeChange?: (mode: SidebarMode) => void;
}

export const WorkshopProgramView: React.FC<WorkshopProgramViewProps> = ({
  onNavigate,
  excursion,
  excursionContent,
  onCloseExcursion,
  onSidebarModeChange,
}) => {
  // The URL decides where the deck opens, so a reload and a sent link both
  // land on the same slide. No hash, or a hash that names something else —
  // the deck starts at tab 1, as it always did.
  const [activeTab, setActiveTab] = useState<TabId>(() => tabFromHash() ?? PROGRAM_TABS[0].id);
  // Tab 2's fold-out. The state lives here, not in the tab, so it survives
  // switching away and back — the speaker returns to the card as they left it.
  const [isTensionExampleOpen, setIsTensionExampleOpen] = useState(false);
  // The talk tab to come back to when the chip is dismissed — the speaker
  // returns to where they were, not to tab 1.
  const [lastDeckTab, setLastDeckTab] = useState<TabId>(() => tabFromHash() ?? PROGRAM_TABS[0].id);

  // Opening an excursion focuses its chip; closing it restores the talk tab.
  useEffect(() => {
    if (excursion) setActiveTab('excursion');
    else setActiveTab((t) => (t === 'excursion' ? lastDeckTab : t));
  }, [excursion, lastDeckTab]);

  // Clicking any talk tab also dismisses whatever excursion is open — the
  // detour is never something the audience has to close by hand.
  //
  // The hash is written as a real navigation (not replaceState): the browser's
  // back button should walk back through the talk, which is what a speaker
  // reaches for when they want the previous slide. That write re-enters App's
  // hash handler, which closes any open modal — wanted, and the reason the
  // excursion is dismissed here too.
  const selectDeckTab = (id: TabId) => {
    setActiveTab(id);
    setLastDeckTab(id);
    if (excursion) onCloseExcursion?.();
    if (HASH_FOR_TAB[id]) window.location.hash = HASH_FOR_TAB[id];
  };

  // The other direction: back, forward, or a hash typed into the bar.
  useEffect(() => {
    const onHashChange = () => {
      const tab = tabFromHash();
      if (!tab) return;
      setActiveTab(tab);
      setLastDeckTab(tab);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Keep the URL honest whenever nothing is over the deck — on a fresh visit,
  // after a modal closes (its onClose sets the hash to ""), after an excursion
  // is dismissed (that sets #program). All of those are the deck, and the deck
  // is always on some tab, so the URL should name it: copy the address bar at
  // any moment and you get a link to what is on the screen.
  //
  // replaceState, not location.hash — this is a correction, not a navigation.
  // It adds no history entry and does not re-enter the hash handler.
  //
  // Deliberately narrow. A hash that names a modal or a CBSA stage is left
  // exactly as it is: those links are published, and while the glossary is
  // open #glossary is the truth about the screen.
  useEffect(() => {
    if (excursion || !HASH_FOR_TAB[activeTab]) return;
    if (!DECK_ALIASES.has(window.location.hash.slice(1))) return;
    window.history.replaceState(null, '', `#${HASH_FOR_TAB[activeTab]}`);
  }, [activeTab, excursion]);

  // The sidebar's mode follows the talk. Keyed on lastDeckTab and NOT on
  // activeTab, deliberately: an excursion is not a slide, and the column beside
  // it should not change width because someone opened a CBSA stage. The deck
  // returns to the same tab it left, at the same width it left it.
  //
  // lastDeckTab is already seeded from the URL and already updated by both
  // selectDeckTab and the hashchange listener, so a link straight to
  // #tab-notation opens compact with no flash of the wide build, and the back
  // button carries the width with it. Nothing else to wire.
  //
  // useLayoutEffect, not useEffect: this runs before the browser paints, so a
  // link opened straight onto tab 3 draws the narrow column once instead of
  // painting the wide one and then animating it away.
  useLayoutEffect(() => {
    onSidebarModeChange?.(SIDEBAR_MODE[lastDeckTab] ?? 'compact');
  }, [lastDeckTab, onSidebarModeChange]);

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
  // sidebar takes 300px there, so a 1600 viewport leaves this bar about 1250.
  // Full labels therefore wait for xl, and 17px for 2xl.
  //
  // THE HORIZONTAL PADDING IS A FIT PROBLEM, not a taste one. Five labels at
  // 17px need roughly 1120px of text; at 24px of padding a side the row asked
  // for more than it had and "Epistemic Notation" — the term the whole talk
  // rests on — truncated to "Epistemic Notati…". 16px a side buys back ~80px,
  // which is the margin. Raise it and measure the longest label again, do not
  // eyeball it: `min-w-0` + truncate mean the row never overflows, it just
  // quietly eats a word.
  //
  // On a phone the tabs stack icon-over-label at the same scale as the bottom
  // nav, so all five fit one row instead of wrapping. They stay clearly a
  // SEGMENTED CONTROL rather than navigation: a filled tray, and an active tab
  // that is a solid block — where the bottom bar is bare icons on the page.
  //
  // `restColor` is a parameter and not part of the string because Tailwind
  // classes from one group do not override by source order — a second
  // `text-*` appended by a caller loses to whichever the stylesheet emits
  // last, which is how the Closing tab's quieter grey silently never painted.
  const tabClass = (id: TabId, restColor = 'text-slate-500') =>
    `flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 xl:gap-2 px-1 sm:px-2.5 xl:px-3 2xl:px-4 py-2 xl:py-2.5 2xl:py-3 rounded-lg text-[10px] sm:text-[13px] xl:text-[15px] 2xl:text-[17px] font-bold whitespace-nowrap min-w-0 transition-all cursor-pointer ${
      activeTab === id
        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
        : `${restColor} hover:text-slate-800 hover:bg-white/60`
    }`;

  return (
    <div
      // The phone padding clears the fixed bottom nav; the desktop one is small
      // because there is no footer to clear. Every frame-fit tab pays for this
      // out of its image, so if a footer is ever added, raise it deliberately.
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
            className={`flex-1 basis-0 sm:flex-none sm:shrink-0 ${tabClass(QA_TAB.id, 'text-slate-400')}`}
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
          {activeTab === 'qa' && <QaTab />}
        </SwitchTransition>
      </div>

    </div>
  );
};

// ─── 1 · The Dual Tension ─────────────────────────────────────────

// ─── The site, in pictures (tab 2) ────────────────────────────────
// READ THIS AS THREE PAIRS, not seven pictures. The strip shows two panels at
// once and now turns them like PAGES — see PhotoStrip — so each row of this
// array is one click, and what matters is which two images stand together:
//
//   1  the dolmen, and the dolmen in its field   (what the object is)
//   2  the field from the air, and the survey map (how many, and where)
//   3  a collapsed one, and the whole one again   (what time does to them)
//
// The map is deliberately the RIGHT panel of pair 2: the aerial photograph
// asks "what am I looking at" and the map answers it, so the answer sits where
// the eye finishes. And the archive dolmen appears twice on purpose — it opens
// the sequence and closes it, against the collapsed one.
//
// The files live in public/tab2/. Three of them are shared with tab 4's
// PLATES, which is why the folder is not named for the photographs' subject:
// tab 2 is where they were first shown. D-1.jpg and D-3.jpg are on disk and
// out of the rotation — add a fourth pair here to bring them back.
const SITE_PHOTOS = [
  { src: './tab2/h40-dolmen-archive.jpg', alt: 'A single dolmen standing in open grassland, capstone intact, hills behind — archival photograph' },
  { src: './tab2/h40-tuba-field.jpg', alt: 'A dolmen and its collapsed tumulus at Tuba-Zangariyye, an Antiquities Authority marker among the stones and the village immediately behind' },

  { src: './tab2/h40-tuba-aerial.jpg', alt: 'The dolmen field at Tuba-Zangariyye from the air: cairns scattered across the basalt plateau, cultivated fields and a reservoir beyond' },
  { src: './tab2/Map-Tuba.jpg', alt: 'Survey map of the Korazim Plateau: every dolmen, tumulus and stone heap plotted between the village of Tuba-Zangariyye and the Jordan River, with the Tuba dolmen field marked at its densest' },

  { src: './tab2/D-2L.jpg', alt: 'A collapsed dolmen under its cairn of basalt slabs, the plateau falling away to the horizon behind' },
  { src: './tab2/h40-dolmen-archive.jpg', alt: 'The same intact dolmen again, for the contrast with the collapsed one beside it' },
];

/**
 * Panels crossfading quietly through a photo set.
 *
 * With two panels the strip turns PAGES: it advances by two, so the images
 * that stand together are the ones the array pairs up. Sliding by one instead
 * makes consecutive states share a photograph, and then no pair can be composed
 * at all — pairing is the whole argument of the tab-2 sequence (see
 * SITE_PHOTOS), so paging is what it needs.
 *
 * Below sm the second panel is hidden, so there the step drops back to one and
 * every photograph is seen in turn — otherwise a phone would show only the
 * left-hand half of the set.
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
  // The strip runs itself, and the speaker can take it. Clicking a panel
  // advances AND stops the timer — the picture you just chose must not slide
  // out from under the sentence you chose it for. The pause control puts it
  // back. Same gesture as PlateFigure on tab 4, so the deck behaves the same
  // way wherever a picture is being stepped through.
  const [playing, setPlaying] = useState(true);

  // How far one click moves: a whole pair where both panels are on screen, one
  // picture where only the left one is. Tailwind's `sm` is 40rem, and this has
  // to agree with the `sm:grid-cols-2` below or the pairing silently breaks.
  const [step, setStep] = useState(columns === 2 ? 2 : 1);
  useEffect(() => {
    if (columns !== 2) return setStep(1);
    const mq = window.matchMedia('(min-width: 40rem)');
    const apply = () => {
      const next = mq.matches ? 2 : 1;
      setStep(next);
      // Keep the cursor on a page boundary, or the pairs shift by one for the
      // rest of the session after a resize across the breakpoint.
      setIndex((i) => (next === 2 ? i - (i % 2) : i));
    };
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, [columns]);

  const pages = Math.ceil(photos.length / step);
  const advance = () => setIndex((i) => (i + step) % photos.length);

  useEffect(() => {
    if (!playing) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + step) % photos.length), 6000);
    return () => window.clearInterval(id);
  }, [photos.length, playing, step]);

  const panel = (offset: number, panelCaption?: string, extra = '') => (
    <button
      type="button"
      onClick={() => {
        setPlaying(false);
        advance();
      }}
      aria-label="Next photograph"
      className={`relative rounded-2xl overflow-hidden bg-slate-100 cursor-pointer text-left ${extra}`}
    >
      {photos.map((photo, i) => (
        <img
          // Keyed by POSITION, not by src: the same photograph may legitimately
          // appear twice in a sequence (it opens and closes the tab-2 set), and
          // a duplicate key would make React drop one of the two.
          key={i}
          src={photo.src}
          alt={i === (index + offset) % photos.length ? photo.alt : ''}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ease-in-out motion-reduce:transition-none ${
            i === (index + offset) % photos.length ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      {panelCaption && (
        <div className="absolute inset-x-0 bottom-0 px-4 pt-7 pb-2.5 text-white text-[15px] lg:text-[17px] font-semibold bg-gradient-to-t from-slate-900/75 to-transparent">
          {panelCaption}
        </div>
      )}
    </button>
  );

  return (
    <div
      // basis-0 + min-h-0 so the strip claims no height of its own, plus a hard
      // viewport cap. The cap is what actually bounds it — the app root is
      // `min-h-screen`, so the frame handed down here can be taller than the
      // window and `grow` alone would over-allocate.
      // `transition-all` + overflow-hidden so a tab can collapse the strip to
      // `max-h-0` and get its height back smoothly — tab 2 does exactly that
      // when its fold-out card opens. The cap and the clip belong to THIS
      // element, which is why the controls sit inside it: collapsing the strip
      // has to take its controls with it.
      className={`grow min-h-0 basis-0 overflow-hidden w-full mx-auto flex flex-col gap-1.5 transition-all duration-300 motion-reduce:transition-none ${maxWidth} ${maxHeight}`}
    >
      {/* Two panels side by side on a phone are tall narrow slabs; below sm the
          strip drops to a single full-width frame and the second panel hides. */}
      <div
        className={`grid gap-2 sm:gap-3.5 grow min-h-0 ${
          columns === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'
        }`}
      >
        {panel(0, caption)}
        {columns === 2 && panel(1, undefined, 'hidden sm:block')}
      </div>

      {/* Under the strip, never on it — same rule as PlateFigure's dots: on a
          photograph a corner overlay lands on whatever that photograph happens
          to have in the corner.

          The play/pause is the last thing on the row and the quietest: it is
          for the speaker, not the audience, and from the back of a hall it
          should read as one more dot until you are looking for it. */}
      <div className="shrink-0 flex items-center justify-center gap-2">
        {/* One dot per PAGE, not per photograph — three dots for three pairs.
            Seven dots under a strip that turns in threes was a count of the
            wrong thing, and told the speaker nothing about where they were. */}
        {Array.from({ length: pages }, (_, p) => (
          <button
            key={p}
            type="button"
            onClick={() => {
              setPlaying(false);
              setIndex(p * step);
            }}
            aria-label={`Show ${step === 2 ? 'pair' : 'photograph'} ${p + 1}`}
            aria-current={p === Math.floor(index / step)}
            className={`h-3 w-3 rounded-full transition-colors cursor-pointer ${
              p === Math.floor(index / step) ? 'bg-indigo-600' : 'bg-slate-300 hover:bg-slate-400'
            }`}
          />
        ))}
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? 'Pause the photographs' : 'Play the photographs'}
          className="ms-1.5 text-slate-300 hover:text-slate-500 transition-colors cursor-pointer leading-none"
        >
          {playing ? <Pause size={11} /> : <Play size={11} />}
        </button>
      </div>
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
    src: './tab2/h40-dolmen-archive.jpg',
    alt: 'A dolmen standing in open grassland, capstone intact, hills behind — archival photograph',
  },
  {
    src: './tab2/h40-tuba-field.jpg',
    alt: 'A dolmen and its collapsed tumulus at Tuba-Zangariyye, an Antiquities Authority marker among the stones and the village immediately behind',
  },
  {
    src: './tab2/h40-tuba-aerial.jpg',
    alt: 'The dolmen field from the air: cairns scattered across the basalt plateau, cultivated fields and a reservoir beyond',
  },
  {
    src: './tab4/tab4-gpt.jpg',
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
            className={`h-3 w-3 rounded-full transition-colors cursor-pointer ${
              i === index ? 'bg-indigo-600' : 'bg-slate-300 hover:bg-slate-400'
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
      {/* The lead-in rides the first line rather than standing above it, which
          buys the strip below a line of height. It comes FIRST here, unlike
          tab 4's, because it reads as a lead-in and not as an attribution:
          "The challenge: Give it freedom — it hallucinates."
          "hallucinates", not "fabricates" — the paper's own abstract wording. */}
      <h3 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-[44px] leading-[1.15] text-slate-900">
        <span className="label text-slate-400 align-middle me-2.5 whitespace-nowrap">The challenge</span>
        Give it freedom — it hallucinates.
        <br />
        Lock it down — it loses the AI power to synthesize
      </h3>
      {/* Picks up tab 1's "meaning emerges from context" and turns the two
          risks into one mechanism — which is why suppression cannot be the
          answer, and governance has to be. Delete this line if it crowds. */}
      <p className="text-[length:var(--t2-lead)] text-slate-600 pt-1">
        CBSA and the transformer-architecture share a core idea: meaning emerges from context.
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
      <p className="text-[length:var(--t2-question)] font-bold text-slate-900 leading-snug">
        How can we afford both: accountability and the emergence of new insight?
      </p>
    </div>

    <WorkedExampleCard open={isExampleOpen} onToggle={onToggleExample} />
  </div>
);

// ─── The worked example — the answer, claim by claim ───────────────
// The body of tab 2's fold-out, as JSX rather than an iframe: it takes the
// deck's own type and colours, and the speaker never leaves the slide.
// public/notation.html is the same content as a printable standalone copy —
// keep the two in step when either changes.

// The marks are the subject of the talk, so they are set LARGER than the words
// around them, not smaller — one size for every mark on the deck, --mark-size
// in index.css. Inline in prose is the one place with a ceiling; the reasoning
// and the ceiling are written out beside the variable.

/** Inferred — synthesized across sources. */
const Inf = () => (
  <span className="inline-block align-middle rounded bg-amber-100 px-1.5 text-[length:var(--mark-size)] font-semibold">〰️</span>
);

/** Hypothesis — reading between the lines. */
const Hyp = () => (
  <span className="inline-block align-middle rounded bg-purple-100 px-1.5 text-[length:var(--mark-size)] font-semibold">💭</span>
);

const Cite: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="font-mono text-[length:var(--t2-ex-small)] text-slate-400">{children}</span>
);

const EvidenceLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="label mt-3.5 mb-1 text-slate-500">
    {children}
  </p>
);

const WorkedExample: React.FC = () => (
  <div className="max-w-3xl mx-auto space-y-5 text-slate-700">
    <div className="border-b-2 border-slate-200 pb-3">
      <h4 className="text-[length:var(--t2-ex-title)] font-bold text-slate-900">
        CBSA session — notation update
      </h4>
      <p className="text-[length:var(--t2-ex-small)] text-slate-500">
        Tuba-Zangariyye Dolmen Field · Korazim Plateau · March 31, 2026
      </p>
    </div>

    {/* The key itself lives on tab 3 now, where it is quoted as the bot's
        instruction. This strip is what the example needs to read on its own. */}
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 rounded-xl bg-slate-100 px-4 py-2 text-[length:var(--t2-ex-small)] text-slate-600">
      <span className="flex items-center gap-1.5">
        <span className="rounded bg-amber-100 px-1.5 text-[length:var(--mark-size)] font-semibold leading-none">〰️</span>
        inferred
      </span>
      <span className="flex items-center gap-1.5">
        <span className="rounded bg-purple-100 px-1.5 text-[length:var(--mark-size)] font-semibold leading-none">💭</span>
        hypothesis
      </span>
      <span className="flex items-center gap-1.5">
        <Cite>[C:pp.46–48]</Cite>
        source
      </span>
    </div>

    <img
      src="./tab2/dolmen.jpg"
      alt="An IAA archaeologist surveying a dolmen in the Tuba-Zangariyye field, the village behind"
      className="w-full rounded-xl border border-slate-200"
    />

    <section className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6">
      <h5 className="text-[length:var(--t2-ex-head)] font-bold text-slate-900">Values — notation update</h5>
      <p className="text-[length:var(--t2-ex-small)] text-slate-500 mt-1 mb-5">
        Values 5–6 reformatted from the previous session's notation style to the current InSites
        notation key.
      </p>

      <div className="border-b border-slate-200 pb-5 mb-5">
        <p className="text-[length:var(--t2-ex-head)] font-bold text-slate-900">
          5. Social — "4 Millennia Pastoralist Continuity" <Inf />
        </p>

        <EvidenceLabel>Evidence</EvidenceLabel>
        <p className="text-[length:var(--t2-ex-body)] leading-relaxed">
          Stepansky links the dolmen builders to semi-nomadic pastoralists of the IB–MBIIA period,
          based on Horbat Berekh's material culture. <Cite>[C:pp.46–48]</Cite> The Korazim Plateau
          has sustained pastoral communities through historical periods, and the Zangariyye and
          El-Heib Bedouin tribes have inhabited it since at least the 18th century.{' '}
          <Cite>[C:p.50 note 4; B]</Cite> The dolmen field sits immediately adjacent to the present
          village.
        </p>

        <EvidenceLabel>Broader meaning</EvidenceLabel>
        <p className="text-[length:var(--t2-ex-body)] leading-relaxed">
          This long arc of pastoral presence — ancient builders, Ottoman-era cultivators, modern
          Bedouin — suggests a social value rooted in continuity of landscape use, though the
          connection between the Bronze Age population and later inhabitants is cultural-geographic
          rather than demonstrated lineage. <Inf /> The critical gap noted in Stage 1 applies here:
          no community voice has been recorded, and the social value therefore rests on
          archaeological inference rather than living testimony.
        </p>
      </div>

      <div>
        <p className="text-[length:var(--t2-ex-head)] font-bold text-slate-900">
          6. Intangible Heritage — "A Landscape of Imagination Across Traditions" <Inf />
        </p>

        <EvidenceLabel>Evidence</EvidenceLabel>
        <p className="text-[length:var(--t2-ex-body)] leading-relaxed">
          Biblical references to Rephaim giants in Transjordan, the New Testament "tombs" near
          Korazim, Talmudic references to dolmens as "Merkolis" (pagan entities), and the Bedouin
          term "Dan" (shelter) for dolmens collectively suggest that these structures have generated
          cultural meaning across at least four distinct traditions. <Cite>[C:p.50 note 2; B]</Cite>
        </p>

        <EvidenceLabel>Broader meaning</EvidenceLabel>
        <p className="text-[length:var(--t2-ex-body)] leading-relaxed">
          The intangible context (Stage 1) frames the dolmens as persistent stimuli for narrative
          production. However, the evidence linking these specific
          textual traditions to the Tuba-Zangariyye field (rather than to Korazim Plateau dolmens
          generally) is indirect{' '}
          <Hyp /> — the association is plausible given proximity but not site-specific.
        </p>
      </div>
    </section>

    <p className="border-t-2 border-slate-200 pt-4 text-center text-[length:var(--t2-ex-small)] text-slate-500">
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
        <span className="block text-[length:var(--t2-card-title)] font-bold text-indigo-900">
          Worked example — Tuba-Zangariyye, claim by claim
        </span>
        <span className="hidden sm:block text-[length:var(--t2-card-sub)] text-indigo-500/80">
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

// WHO IS SPEAKING is carried by the accent border, the tint and the avatar —
// three signals, all of which a projector reproduces. The TEXT does not carry
// it: a question set in amber-900 on amber-50 is a muddy brown, and the answer
// under it at 70% opacity of that same brown is worse. Both are near-black
// now, on the tint that already names the speaker.
const challengeColors: Record<string, { border: string; bg: string; text: string; quote: string }> = {
  amber: { border: 'border-l-amber-400', bg: 'bg-amber-50', text: 'text-slate-700', quote: 'text-slate-900' },
  indigo: { border: 'border-l-indigo-400', bg: 'bg-indigo-50', text: 'text-slate-700', quote: 'text-slate-900' },
  emerald: { border: 'border-l-emerald-400', bg: 'bg-emerald-50', text: 'text-slate-700', quote: 'text-slate-900' },
};

// The tab scrolls, so its vertical budget is not a hard frame — but everything
// spent above the challenge cards is something the room has to scroll past to
// reach them. space-y-3 rather than 5 for that reason.
const WhatIsInSitesTab: React.FC = () => (
  <div className="space-y-3">
    {/* Poster. The line is ON the picture, in its sky — which is the only
        reason the picture could grow: a caption that costs no height of its own
        gives its height to the image. Same overlay device as the photo strip on
        tab 2, mirrored to the top edge, because up there the illustration is
        clouds and the words have somewhere quiet to sit.

        White on a scrim, not dark type on the sky: the sky is pale but it is
        not uniform, and a gradient is the only way to promise legibility over
        an image you did not draw for the purpose. rounded-t-2xl so the scrim
        keeps the picture's own corners.

        SIZE KNOB — max-w below, currently 48rem. The picture is centred, so
        this is the one number that grows it. Sizes on this tab come from
        --t1-* in index.css, tunable live in DevTools. */}
    <div className="max-w-[48rem] mx-auto relative">
      <img
        src="./poster-light.jpg"
        alt="InSites-CAA — CBSA Workshop"
        className="w-full rounded-2xl border border-slate-200 shadow-sm"
      />
      <p className="absolute inset-x-0 top-0 rounded-t-2xl px-4 pt-3 pb-9 text-center text-[length:var(--t1-lead)] font-semibold text-white drop-shadow-sm bg-gradient-to-b from-slate-900/70 via-slate-900/35 to-transparent">
        "The LLM is a looking glass — more than a wonderland"
      </p>
    </div>

    {/* Intro line */}
    <p className="text-[length:var(--t1-lead)] text-slate-600 leading-relaxed">
      AI already speaks our language and is becoming an active partner in culture. <br/> We examine how it can help with the cultural assessment challenges:
    </p>

    {/* 3 Challenge cards with character avatars */}
    <div className="flex flex-col gap-[var(--t1-card-gap)]">
      {CHALLENGES.map((ch, idx) => {
        const c = challengeColors[ch.color] || challengeColors.amber;
        return (
          <details key={idx} className={`${c.bg} border border-slate-200 ${c.border} border-l-4 rounded-xl overflow-hidden group`}>
            {/* ONE pattern for all three: avatar, question, chevron. The middle
                card used to mirror, which is charming at a desk and reads as an
                inconsistency from a hall — three cards in one alignment read as
                a set, and the speaker is quoting three voices, not staging a
                conversation between them.

                The card grows as a piece: avatar, padding and chevron step
                with the type in index.css (--t1-*), so a bigger question does
                not end up rattling around inside a small box.
                HEIGHT lives in --t1-card-pad-y: a closed card is the avatar
                plus twice that padding, and the avatar below is the floor. */}
            <summary className="px-2.5 sm:px-4 lg:px-5 py-[var(--t1-card-pad-y)] cursor-pointer flex items-center gap-2.5 sm:gap-3 lg:gap-4 select-none">
              <img
                src={ch.avatar}
                alt=""
                className="w-11 h-11 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full border-2 border-white shadow-md shrink-0 object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <span className={`font-bold text-[length:var(--t1-quote)] leading-snug ${c.quote} flex-1`}>"{ch.quote}"</span>
              <ChevronDown size={16} className="lg:hidden text-slate-500 group-open:rotate-180 transition-transform shrink-0" />
              <ChevronDown size={20} className="hidden lg:block text-slate-500 group-open:rotate-180 transition-transform shrink-0" />
            </summary>
            <div className="px-2.5 sm:px-4 lg:px-5 pb-[var(--t1-card-pad-y)] pt-1">
              <p className={`text-[length:var(--t1-answer)] ${c.text} leading-relaxed`}>{ch.response}</p>
            </div>
          </details>
        );
      })}
    </div>

    {/* Lab intro. What the LAB is — the three-way intersection — moved to the
        closing tab, where it belongs beside the credit and the repository: it
        is who to remember, and this tab is about what the tool is. What stays
        here is the tool. */}
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 lg:p-5 space-y-2">
      <h4 className="font-bold text-[length:var(--t1-quote)] text-slate-800">InSites Knowledge Lab</h4>
      <p className="text-[length:var(--t1-answer)] text-slate-400">Technion — Israel Institute of Technology</p>
      <p className="text-[length:var(--t1-answer)] text-slate-700 leading-relaxed">
        InSites is our research prototype: a multi-platform AI environment that structures heritage significance assessment through the CBSA method. Not a black box — a looking glass.
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
    mark: <span className="font-mono text-[length:var(--t3-key-cite)] text-slate-500">[file:page]</span>,
    meaning: 'Explicit in source — cited to the place it was read',
    rowClass: '',
  },
  {
    // The glyphs are the subject of the talk: biggest thing in the row.
    mark: <span className="inline-block rounded-lg bg-amber-100 px-3 py-1 text-[length:var(--t3-key-mark)] leading-none">〰️</span>,
    meaning: 'Inferred from 2+ pieces of evidence (cite the evidence)',
    rowClass: 'bg-amber-50/50',
  },
  {
    mark: <span className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-[length:var(--t3-key-mark)] leading-none">💭</span>,
    meaning: 'Uncertainty / interpretation — a claim that is neither explicit nor confidently inferred',
    rowClass: 'bg-purple-50/50',
  },
];

// The tile row's partition, as the speaker counts the session: 24 citations +
// 20 epistemic marks (16 〰️, of which 2 rejected → 14/16 accepted · 4 💭) +
// 1 unmarked = 45. The marks pair sits inside ONE framed box (see the row in
// the component) so the row itself draws the distinction that matters: marked
// (whatever then happened to it) versus the single claim that carried nothing.
// The 14/16 fraction is where the rejections live — no separate tile needed.
// The "explicit" tile does NOT say "unmarked": in those 24 cases the model did
// something — it pinned the claim to a page — and the word for that is the
// citation, not the absence of a glyph.
//
// NOTE, and it is not a discrepancy: the repo's claim-level files count what
// the system MARKED (14 °), this slide counts what the claims WERE (16
// inferences, 2 of which the expert rejected). Same 45 claims, two framings —
// one measures the notation's output, the other the session's content. The
// mapping between them is written out in docs/tab3-count-mapping.md, which is
// where to send anyone who arrives at Q&A having added up the dataset.
// (This slide superseded the "42 of 45 held / 3 caught" build, 2026-08-26.)

// ─── The Rule, on demand ──────────────────────────────────────────
// "When in doubt — mark it" is the sentence the whole notation rests on, and
// it used to sit under the key permanently. Two costs: it is four lines of
// small italic prose competing with the three rows it is a footnote to, and
// once it is always there the room stops reading it. Now the table carries a
// button and the sentence arrives when the speaker calls it.
//
// It expands IN FLOW rather than floating: the card around the key is
// `overflow-y-auto`, so an absolutely-positioned panel would be clipped by it.
// A block that pushes is also the honest shape here — this is the key's own
// footnote, not an annotation hovering over something else.
//
// Closing: the X, Escape, or a click anywhere outside. Same three exits as
// SpeakerNote, for the same reason — at a lectern you must be able to dismiss
// a panel without aiming.
const NotationRule: React.FC = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
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

  return (
    <div ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={`w-full flex items-center justify-between gap-3 px-3 sm:px-4 py-2 border-t border-slate-200 text-left transition-colors cursor-pointer ${
          open ? 'bg-slate-50 text-slate-700' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
        }`}
      >
        <span className="label">The rule</span>
        <ChevronDown
          size={16}
          className={`shrink-0 transition-transform duration-300 motion-reduce:transition-none ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <div className="relative px-3 sm:px-4 pt-3 pb-3.5 bg-slate-50 border-t border-slate-200 animate-fade-in">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close the rule"
            className="absolute top-2 right-2 sm:right-3 p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
          <p className="pr-8 text-[length:var(--t3-rule)] text-slate-600 italic leading-snug">
            "When in doubt — mark it. Better an unnecessary notation than an unmarked claim that
            appears factual."
            <span className="not-italic text-slate-400"> — Global Notation Key (Mandatory), InSites v10</span>
          </p>
        </div>
      )}
    </div>
  );
};

const EpistemicNotationTab: React.FC<{
  onNavigate?: (route: string) => void;
}> = ({ onNavigate }) => (
  // Frame-fit, like tabs 2 and 4: the false-negative panel is this slide's
  // payoff and must not sit below the fold when the speaker lands it. Everything
  // is shrink-0 except the quoted key card, which is the one element allowed to
  // give up height (and scroll inside itself) on a short screen.
  //
  // The gap is 14px and not 16 for a measured reason: this tab has six blocks,
  // so every 2px on the gap is 10px off the bottom of the slide, and after the
  // small type went up a step that was the margin between the payoff sitting in
  // frame and sitting under it.
  <div className="grow min-h-0 overflow-hidden flex flex-col gap-3 sm:gap-3.5">
    <div className="space-y-1.5 shrink-0">
      {/* No lead-in over this headline: it announces itself, and this is the
          tab with least room to spare — every line here comes off the
          payoff at the bottom. */}
      <h3 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-[41px] leading-[1.15] text-slate-900">
        A mark measures a claim's distance from its sources.
      </h3>
      <p className="text-[length:var(--t3-lead)] font-semibold text-slate-500">Validity remains human judgment.</p>
    </div>

    {/* ── Act one: the instruction ──────────────────────────────────
        The audience sees the rule before it sees any number measured with
        it, and the quoted key is the only authority on the slide — resist
        restating those three rows beside themselves in a second grammar. */}
    <div className="shrink-0">
      <SectionDivider label="The instruction — from the bot's system prompt" />
    </div>

    {/* min-h-0 (not grow) — the card keeps its content height when there is
        room and is the only block that gives way when there is not. */}
    <div className="border-2 border-slate-300 rounded-xl min-h-0 overflow-y-auto custom-scrollbar">
      <table className="w-full text-[length:var(--t3-key-body)]">
        <thead>
          <tr className="bg-slate-50">
            <th className="label text-left text-slate-500 border-b border-slate-200 py-2 px-3 sm:px-4 w-[110px] lg:w-[150px]">
              Notation
            </th>
            <th className="label text-left text-slate-500 border-b border-slate-200 py-2 px-3 sm:px-4">
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
      {/* The Rule is prompt text too, so it stays inside this border — but it
          is now folded away behind a button. See NotationRule. */}
      <NotationRule />
    </div>

    {/* ── Act two: the test ─────────────────────────────────────────── */}
    <div className="shrink-0">
      {/* The title carries the SCOPE — one site, one expert, and the two
          routes set against each other — because that is what the room has to
          hold while it reads the counts below. The old title said "assessed
          twice" without ever saying what the second route was, so the thing
          under test (the same expert working with the assistant, against the
          same expert working alone) was never printed anywhere.

          "vs." and not "by hand and with": a test is a comparison, and the
          conjunction described two activities instead of standing them
          against each other. No "(HITL)" after the name — an acronym in a
          projected title has to be decoded aloud, which costs the second the
          slide exists to save, and the line below already says the mechanism
          in full words. The name is never italicised, here or anywhere: Alef
          ships 400 and 700 only, so italic is a synthesised slant — passable
          in small prose, visibly broken in tracked capitals.

          The second line is the mechanism, not a repeat: on the assisted run
          the expert approved every stage. That is the method's core, and the
          reason the counts below are a finding rather than a demo. It stays
          short on purpose — see the sublabel note in index.css: past about
          105 characters it wraps at the projector, and it wraps EARLIER on a
          1600-wide screen, so 70 is the safe neighbourhood. */}
      <SectionDivider
        label="The Test:One site, one expert — hand vs. InSites assisted"
        sublabel="On the assisted route, the expert reviewed and approved every stage."
        colorClass="text-slate-800"
      />
    </div>

    {/* The tile row — see the partition note above the component. Four cells,
        one of them a framed PAIR: the frame is what says "these two are the
        same kind of thing" (a claim that wore a mark), so the row reads left
        to right as the epistemic spectrum — cited · marked · nothing. The
        rejections live inside the 〰️ fraction, not in a tile of their own:
        14/16 IS the reject count, one glance. */}
    <div className="shrink-0 flex items-stretch gap-1.5 sm:gap-3.5">
        <div className="flex-1 min-w-0 bg-slate-50 border border-slate-200 rounded-xl px-1.5 py-1.5 sm:px-3.5 sm:py-2.5">
          <p className="text-[length:var(--t3-tile-n)] leading-tight font-extrabold text-slate-900">45</p>
          <p className="label tracking-tight sm:tracking-[0.1em] text-slate-400">claims</p>
        </div>
        <div className="flex-1 min-w-0 bg-slate-50 border border-slate-200 rounded-xl px-1.5 py-1.5 sm:px-3.5 sm:py-2.5">
          <p className="text-[length:var(--t3-tile-n)] leading-tight font-extrabold text-slate-900">24</p>
          <p className="label tracking-tight sm:tracking-[0.1em] text-slate-400">
            explicit <span className="normal-case align-middle font-mono text-[8px] sm:text-[10px] text-slate-400">[file:page]</span>
          </p>
        </div>
        {/* The framed pair. The chip on the border carries the group's own
            number — 20 — so the row still sums out loud: 24 + 20 + 1 = 45. */}
        <div className="flex-[2] min-w-0 relative border-2 border-slate-300 rounded-xl bg-slate-50 px-1.5 pt-2 pb-1.5 sm:px-3.5 sm:pt-2.5 sm:pb-2.5">
          <span className="absolute -top-2 sm:-top-2.5 left-2.5 sm:left-3.5 bg-white px-1.5 rounded label text-slate-500">
            epistemic marks · 20
          </span>
          <div className="grid grid-cols-2 h-full">
            <div className="pr-1.5 sm:pr-3">
              <p className="text-[length:var(--t3-tile-n)] leading-tight font-extrabold text-amber-800">
                14<span className="text-[0.55em] font-bold text-amber-800/60">/16</span>
              </p>
              <p className="label tracking-tight sm:tracking-[0.1em] text-slate-400">
                accepted <span className="normal-case align-middle text-[15px] sm:text-[19px]"> 〰️</span>
              </p>
            </div>
            <div className="pl-1.5 sm:pl-3 border-l border-slate-200">
              <p className="text-[length:var(--t3-tile-n)] leading-tight font-extrabold text-purple-800">4</p>
              <p className="label tracking-tight sm:tracking-[0.1em] text-slate-400">
                hypotheses <span className="normal-case align-middle text-[15px] sm:text-[19px]"> 💭</span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 min-w-0 bg-slate-50 border border-slate-200 rounded-xl px-1.5 py-1.5 sm:px-3.5 sm:py-2.5">
          <p className="text-[length:var(--t3-tile-n)] leading-tight font-extrabold text-rose-800">1</p>
          <p className="label tracking-tight sm:tracking-[0.1em] text-slate-400">unmarked · wrong</p>
        </div>
      </div>

    {/* The bottom line on performance — the notation's whole scorecard as a
        detector: across the test, exactly one claim that needed a mark reached
        the expert without one. The line under it says what that one was —
        unmarked, an inference, and wrong on its content: the complete false
        negative — and that the human layer caught it. "42 of 45 held" is the
        speaker's line, not the screen's. The two content rejections keep their
        own clause so the two axes (marking vs. validity) never blur into one
        count. No percentage — the paper reports none, and one case with one
        expert does not support one. */}
    <div className="shrink-0 border-l-4 border-indigo-500 bg-slate-50 rounded-r-xl px-5 py-4">
      <p className="text-[length:var(--t3-payoff)] font-bold text-slate-900 leading-snug">
        One false negative in 45.
      </p>
      <p className="text-[length:var(--t3-payoff-sub)] text-slate-500 mt-1.5">
        The one claim that slipped the notation was unmarked, inferred — and wrong. The expert
        caught it in session; two marked inferences <span className="align-middle">〰️</span> she
        rejected on content.
      </p>
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
      {/* "The LLM insight" trails the headline rather than standing over it:
          it is a four-word attribution, not a section name, and a line of its
          own would give it the weight of one — and cost the plate below that
          line. The `.label` device set inline; whitespace-nowrap so it breaks
          away from the title as a unit rather than mid-phrase. */}
      <h3 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-[44px] leading-[1.15] text-slate-900">
        A Landscape of Imagination.
        <span className="label text-slate-400 align-middle ms-2.5 whitespace-nowrap">The LLM insight</span>
      </h3>
      <p className="text-base sm:text-lg lg:text-[21px] text-slate-500 pt-0.5">
        Two values the manual assessment had not reached.
      </p>
    </div>

    {/* The two value headings, verbatim from the worked example on tab 2 —
        same words, presentation sizes. No cites, no gloss: the citations live
        in the example's body, and the audience has already seen these lines.

        The mark sits INSIDE the sentence, after the closing quote, exactly as
        it does in the example's prose. Held at the card's right edge by a
        justify-between it read as a status badge on a box — a property OF THE
        CARD — when what it says is that this claim is inferred. It is
        annotation, so it belongs on the line it annotates, at its end. The
        nbsp before it keeps it married to the last word: without it a wrap can
        leave the mark alone on a line of its own. */}
    <div className="shrink-0 grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-3">
      <div className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 lg:px-5 lg:py-3">
        <p className="text-base lg:text-[19px] font-bold text-slate-900 leading-snug">
          Social — "4 Millennia Pastoralist Continuity"{' '}
          <Inf />
        </p>
      </div>
      <div className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 lg:px-5 lg:py-3">
        <p className="text-base lg:text-[19px] font-bold text-slate-900 leading-snug">
          Intangible Heritage — "A Landscape of Imagination Across Traditions"{' '}
          <Inf />
        </p>
      </div>
    </div>

    {/* The mark needs a key HERE. Tab 3 is where the notation is taught, and
        tab 3 comes before this one in the bar but not necessarily in the room:
        anyone arriving on #tab-landscape, or looking up mid-question, meets two
        marks with nothing on screen that decodes them. One line, at label size,
        so it explains without competing with the two values it annotates. */}
    <p className="shrink-0 flex items-center gap-2 text-[length:var(--label)] text-slate-500">
      <Inf />
      <span className="label">inferred</span>
      <span>— a claim built from two or more pieces of evidence</span>
    </p>

    {/* ── TAB 4 IMAGE KNOBS — same two as tab 2, tuned separately ────
        maxHeight is the one number to touch. Everything above the plate —
        the tab bar, the headline block, the two value cards, and the page's
        own padding — costs roughly 30vh of a 1080 screen, and MORE when the
        two headings wrap to a second line, which they do at this width. So
        70vh here asked for a plate the frame could not seat: the photograph
        ran to the bottom edge and its dots went off-screen.

        The plate is this slide's whole payload, so spare height belongs to
        it — but raise this only while watching the dots underneath: the
        moment they touch the bottom edge you have taken more than there is.
        Keep the /var(--app-zoom) divisor; it is a no-op while the zoom is 1
        and the difference between fitting and overflowing when it is not. */}
    <PlateFigure maxWidth="max-w-full" maxHeight="max-h-[46vh] sm:max-h-[calc(62vh/var(--app-zoom))]" />

    {/* Nothing after the plate. The imagination reading rose into the
        headline; its provenance — "the phrase is the expert's, not the
        machine's" — is spoken, and is the hinge into tab 5. */}
  </div>
);

// ─── 5 · Q&A ──────────────────────────────────────────────────────

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
    // note, and what keeps it from feeling stuck open at a lectern.
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
            <p className="label text-slate-400 mb-2.5">Speaker note</p>
            <div className="space-y-2.5 text-[16px] lg:text-[18px] leading-relaxed text-slate-700">
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
const QaTab: React.FC = () => (
  <div className="space-y-5">
    {/* ── The closing ─────────────────────────────────────────────────
        THREE BLOCKS: the hero, the repository, the contact row.

        The hero is the whole top of the slide in ONE card — title, subtitle,
        question, punchline, and the picture. It used to be a headline block
        standing above a panel that overlapped a picture beside it: three
        objects doing one job, with two seams between them. Now there is one
        object and no seam at all. The picture is not placed ON the card, it
        IS the card's right-hand side, and the text sits on the same ground
        rather than in a box of its own.

        The repository stays FULL WIDTH under it. Its mono address is a string
        people type from a photograph of this slide, and at 25px it needs about
        450px of run — in a narrow column it would have to shrink or wrap,
        which is the one thing that line cannot do. */}
    <div className="space-y-3 lg:space-y-5">
      {/* ── THE HERO ────────────────────────────────────────────────
          Three layers, in this order: the picture, a fade over it, then the
          text. The fade is what makes the text readable without a panel —
          it holds the card's own colour flat, thins through the middle, and
          is gone before the right edge, so the painting emerges rather than
          being cut off. The Hatter sits right where it thins, which is the
          point: he is half-dissolved, not cropped away.

          HOW MUCH of him shows is FIVE KNOBS, and they live in index.css
          under "TAB 5" — the stops of the fade plus --t5-photo-w, the
          picture's own reach. No number here: they are set in one place so
          the comment explaining them cannot drift out of step with them,
          which is exactly what this paragraph used to do.

          object-position right: the picture is anchored to its right edge,
          so what gets cropped when the card is short is the left side —
          which is the side the fade covers anyway. Alice and the graph, the
          two things the slide wants seen, are on the right and always
          survive.

          Everything here is lg-only. Below it the card is text on a flat
          ground with the picture underneath in normal flow, because a
          470px hero with an absolutely-placed image is a desktop object. */}
      <div className="relative overflow-hidden rounded-2xl bg-[#f3f5fc] lg:min-h-[470px] flex flex-col lg:block">
        <img
          src="./poster-light.jpg"
          alt="InSites-CAA — CBSA Workshop"
          className="hidden lg:block absolute inset-y-0 right-0 h-full w-[var(--t5-photo-w)] object-cover object-right"
        />
        <div
          aria-hidden="true"
          className="hidden lg:block absolute inset-0 t5-hero-fade"
        />

        {/* The talk ENDS ON A QUESTION, and the answer stays in the speaker's
            mouth. What is printed is the thought experiment the paper's own
            conclusion opens with, plus the lens you answer it through — not
            the conclusion itself ("the system that least needs the experts
            most needs to keep them in"), which is now spoken.
            "Afford" is deliberate: tab 2 opens the talk on "how can we
            afford both", and this closes it on the same verb.
            The speaker's script is one click away in the corner — see
            SpeakerNote; invisible to the hall.

            VERTICAL POSITION — lg:pt-16 is the knob. The block is anchored to
            the TOP of the card (justify-start), not centred in it, so this one
            padding decides how high the title sits: smaller number, higher
            block. Centring put the title at 125px down a 470px card, which
            left it floating in the middle of the picture instead of heading
            the slide. 64px heads it.

            Change this and nothing else moves — the question and the
            punchline follow the title down, and the card keeps its height. */}
        <div className="relative z-10 max-w-full lg:max-w-[780px] px-5 py-6 lg:px-10 lg:pt-16 lg:pb-10 flex flex-col justify-start lg:h-[470px]">
          <SpeakerNote className="absolute top-2.5 right-2.5 lg:right-auto lg:left-2.5">
            <p>Let me end with the thought experiment the paper ends with.</p>
            <p>
              Imagine a system so capable that full automation looks fluent, complete, efficient —
              a perfect assessment machine. Could heritage 4.0 — or 10.0 — afford it?
            </p>
            <p>
              Here is the paradox: every gain in autonomy is a loss in humanity — and a cultural
              assessment that is not human cannot count as good.
            </p>
            <p>So the system that least needs the experts, most needs to keep them in.</p>
            <p>I'll leave the question on the screen.</p>
          </SpeakerNote>

          {/* GAP 1 of 3 — title to subtitle. space-y-*, because these two
              are one block and belong tighter than the blocks are to each
              other. */}
          <div className="space-y-1 lg:space-y-2">
            {/* The talk's own title, and the only place it appears. The
                conference says Heritage 4.0; this names what 4.0 means for one
                practice inside it, and final/open + report/inquiry is a double
                antithesis. It stands alone — the paper's proceedings title is
                in the header, and repeating it here would only blunt it.

                ONE LINE from lg up: broken in two it read as two titles, and
                the subtitle below already carries the second thought. The
                nowrap is lg-only for the obvious reason.

                46px is a MEASURED fit, not a preference: this line needs
                677px and the column gives it 700. Raise it and it runs past
                the column, out over the part of the fade that has started
                letting the picture through — so the last characters of the
                talk's own title would sit on a cloud. The column width and
                the fade's first stop move together with this number. */}
            <h3 className="font-display text-2xl sm:text-3xl lg:text-[38px] lg:whitespace-nowrap leading-[1.1] text-slate-900">
              Significance Assessment 4.0
            </h3>
            <p className="font-display text-xl sm:text-2xl lg:text-[30px] leading-tight text-slate-600">
              from a final report to an open inquiry
            </p>
          </div>

          {/* GAP 2 of 3 — the title block to the question. */}
          <p className="mt-5 lg:mt-12 text-[20px] sm:text-[26px] lg:text-[33px] font-bold text-slate-900 leading-snug">
            Imagine a perfect assessment machine{' '}<br/>
            <span className="text-indigo-700">could heritage 4.0 or 10.0 afford it?</span>
          </p>

          {/* The lens the question is answered through, not a second headline —
              so it stays a clear step under it. The indigo rule on its left is
              what keeps it from reading as a caption on the question: a quoted
              aside has a mark of its own.

              GAP 3 of 3 — the question to the punchline. */}
          <p className="mt-5 lg:mt-8 border-l-4 border-indigo-500 ps-4 text-[18px] sm:text-[21px] lg:text-[25px] italic text-indigo-950/90">
            Who assesses is part of what is assessed.<br />
            so how to design the Human-in-the-Loop? <br/>THAT IS THE QUESTION.
          </p>
        </div>

        {/* Below lg the picture is a plain block under the text — no absolute
            placement, no fade, nothing to go wrong on a narrow screen. */}
        <img
          src="./poster-light.jpg"
          alt=""
          aria-hidden="true"
          className="lg:hidden w-full"
        />
      </div>


        {/* The link the paper carries, so it has to be findable and
            photographable TWICE OVER: the address to type on the left, the
            code to photograph on the right. Full width under the row — see
            the band note above for why it does not sit in the right column. */}
        <a
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-5 sm:gap-6 bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-5 py-4 sm:px-7 sm:py-5 transition-colors"
        >
          <Github size={44} className="shrink-0" />
          <span className="flex-1 min-w-0">
            {/* Mono, because this is a string you TYPE. It is the one line on
                the slide that has to survive being photographed from row 20. */}
            <span className="block font-mono text-[17px] sm:text-[21px] lg:text-[25px] font-bold leading-tight">
              {REPO_LABEL}
            </span>
            <span className="block text-[15px] sm:text-[17px] lg:text-[19px] text-slate-300 mt-1.5">
              The <span className="font-mono text-white">/system</span> folder — the workflow,
              the specs, and the claim-level evidence behind this talk
            </span>
          </span>
          {/* The QR earns the right-hand end of the card because a room reaches
              for a phone before it reaches for a keyboard. It is a committed
              static asset (scripts/make-qr.mjs) — white on transparent, so the
              card's own ground shows through and no white plate appears.
              Hidden below sm: on a phone the whole card is already a tap. */}
          <img
            src="./tab5/qr-repo.svg"
            alt=""
            aria-hidden="true"
            className="hidden sm:block shrink-0 w-[104px] lg:w-[120px] h-auto"
          />
          <ExternalLink size={20} className="text-slate-300 shrink-0" />
        </a>

        {/* ONE row under the repository: who to write to, and who we are.
            Both answer "who is behind this", and at this point in the talk
            that is one question, not two — so it is one line rather than a
            block of chips followed by a paragraph.

            Chips, not underlined links: a chip reads as something you may act
            on even in a photograph, where an underline just reads as emphasis.
            The envelope says which kind of action without a word.

            The lab is a NAME here, not a description. The sentence about the
            intersection of assessment methods, novel technologies and
            built-heritage data was cut with it: on the slide the room looks
            at longest, a paragraph nobody will read competes with the two
            things they might act on. */}
        <div className="flex flex-wrap items-center gap-3.5">
          {[
            'yaelalef@technion.ac.il',
            'yuval.shafriri@gmail.com',
          ].map((address) => (
            <a
              key={address}
              href={`mailto:${address}`}
              className="inline-flex items-center gap-2.5 rounded-lg border border-slate-300 px-3.5 py-2 lg:px-4 lg:py-2.5 text-lg sm:text-xl lg:text-[23px] tracking-wide text-slate-600 hover:border-slate-400 hover:bg-slate-50 hover:text-slate-800 transition-colors"
            >
              <Mail size={20} className="shrink-0 text-slate-400" />
              {address}
            </a>
          ))}
          <p className="text-lg sm:text-xl lg:text-[23px] text-slate-600 whitespace-nowrap">
            <span className="font-bold text-slate-800">InSites Knowledge Lab</span> · Technion
          </p>
        </div>
    </div>
  </div>
);

// Nothing follows the closing, deliberately: everything a question might call
// for is reachable while it is up — the tab bar, the deck's own hashes, the
// fold-out on tab 2 — so a second door under the last slide would only compete
// with it.

export default WorkshopProgramView;
