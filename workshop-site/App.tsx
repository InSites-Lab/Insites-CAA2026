import React, { useState, useEffect, useRef, useCallback } from "react";
import { Header, Sidebar, MobileNav } from "./components/layout";
import {
  ExcursionOutlet,
  ExcursionKey,
} from "./components/views/ExcursionOutlet";
import { WorkshopProgramView } from "./components/views";
import type { SidebarMode } from "./components/views";
import {
  PrinciplesModal,
  DemoModal,
  InventoryModal,
  PromptAdvisorModal,
  GraphInputModal,
  GraphModal,
  EpistemicNotationModal,
  GovernanceModal,
  SessionReportModal,
  DashboardPreviewModal,
  CollectionDashboardModal,
  ReadAssessmentModal,
  GlossaryModal,
} from "./components/modals";
import {
  CORE_AGENTS,
  DEMO_DATA,
  ZAIRA_TEXT,
  GRAPH_PROMPT,
  PROMPT_ADVISOR_SYSTEM,
  getNodeColor,
} from "./constants";
import { callGemini } from "./services/geminiService";
import { PREBUILT_GRAPHS } from "./config/prebuiltGraphs";
import { Network } from "vis-network";
import { DataSet } from "vis-data";

type AgentColor =
  | "slate"
  | "blue"
  | "amber"
  | "emerald"
  | "indigo"
  | "purple"
  | "rose";

// `hoverCard` is what the ROOM sees. The sidebar is pointed at from a lectern
// during the talk, and the only hover a stage card used to carry was
// `hover:shadow-md` — a shadow, which a projector does not reproduce at all.
// Each stage already owns a colour, in its icon; hovering now spreads that
// colour to the whole card, which is legible from the back of a hall.
const AGENT_STYLE: Record<
  AgentColor,
  {
    selectedCard: string;
    selectedIcon: string;
    unselectedIcon: string;
    hoverCard: string;
    chip: string;
    mobileSelected: string;
    mobileBadgeSelected: string;
  }
> = {
  slate: {
    selectedCard:
      "bg-white border-slate-300 ring-1 ring-slate-200 shadow-md z-10",
    selectedIcon: "bg-slate-900 text-white shadow-slate-200",
    unselectedIcon: "bg-slate-50 text-slate-700 border-slate-200",
    hoverCard: "hover:bg-slate-100 hover:border-slate-400",
    chip: "bg-slate-100 text-slate-700",
    mobileSelected:
      "bg-slate-50 border-slate-300 ring-1 ring-slate-200 text-slate-800",
    mobileBadgeSelected: "bg-slate-900 text-white",
  },
  blue: {
    selectedCard:
      "bg-white border-blue-200 ring-1 ring-blue-200 shadow-md z-10",
    selectedIcon: "bg-blue-600 text-white shadow-blue-200",
    unselectedIcon: "bg-blue-50 text-blue-700 border-blue-100",
    hoverCard: "hover:bg-blue-50 hover:border-blue-400",
    chip: "bg-blue-100 text-blue-700",
    mobileSelected:
      "bg-blue-50 border-blue-200 ring-1 ring-blue-200 text-blue-800",
    mobileBadgeSelected: "bg-blue-600 text-white",
  },
  amber: {
    selectedCard:
      "bg-white border-amber-200 ring-1 ring-amber-200 shadow-md z-10",
    selectedIcon: "bg-amber-600 text-white shadow-amber-200",
    unselectedIcon: "bg-amber-50 text-amber-700 border-amber-100",
    hoverCard: "hover:bg-amber-50 hover:border-amber-400",
    chip: "bg-amber-100 text-amber-800",
    mobileSelected:
      "bg-amber-50 border-amber-200 ring-1 ring-amber-200 text-amber-900",
    mobileBadgeSelected: "bg-amber-600 text-white",
  },
  emerald: {
    selectedCard:
      "bg-white border-emerald-200 ring-1 ring-emerald-200 shadow-md z-10",
    selectedIcon: "bg-emerald-600 text-white shadow-emerald-200",
    unselectedIcon: "bg-emerald-50 text-emerald-700 border-emerald-100",
    hoverCard: "hover:bg-emerald-50 hover:border-emerald-400",
    chip: "bg-emerald-100 text-emerald-700",
    mobileSelected:
      "bg-emerald-50 border-emerald-200 ring-1 ring-emerald-200 text-emerald-800",
    mobileBadgeSelected: "bg-emerald-600 text-white",
  },
  indigo: {
    selectedCard:
      "bg-white border-indigo-200 ring-1 ring-indigo-200 shadow-md z-10",
    selectedIcon: "bg-indigo-600 text-white shadow-indigo-200",
    unselectedIcon: "bg-indigo-50 text-indigo-700 border-indigo-100",
    hoverCard: "hover:bg-indigo-50 hover:border-indigo-400",
    chip: "bg-indigo-100 text-indigo-700",
    mobileSelected:
      "bg-indigo-50 border-indigo-200 ring-1 ring-indigo-200 text-indigo-800",
    mobileBadgeSelected: "bg-indigo-600 text-white",
  },
  purple: {
    selectedCard:
      "bg-white border-purple-200 ring-1 ring-purple-200 shadow-md z-10",
    selectedIcon: "bg-purple-600 text-white shadow-purple-200",
    unselectedIcon: "bg-purple-50 text-purple-700 border-purple-100",
    hoverCard: "hover:bg-purple-50 hover:border-purple-400",
    chip: "bg-purple-100 text-purple-700",
    mobileSelected:
      "bg-purple-50 border-purple-200 ring-1 ring-purple-200 text-purple-800",
    mobileBadgeSelected: "bg-purple-600 text-white",
  },
  rose: {
    selectedCard:
      "bg-white border-rose-200 ring-1 ring-rose-200 shadow-md z-10",
    selectedIcon: "bg-rose-600 text-white shadow-rose-200",
    unselectedIcon: "bg-rose-50 text-rose-700 border-rose-100",
    hoverCard: "hover:bg-rose-50 hover:border-rose-400",
    chip: "bg-rose-100 text-rose-700",
    mobileSelected:
      "bg-rose-50 border-rose-200 ring-1 ring-rose-200 text-rose-800",
    mobileBadgeSelected: "bg-rose-600 text-white",
  },
};

const getAgentColorStyle = (colorName: string) => {
  const normalized = (colorName || "").toLowerCase() as AgentColor;
  return AGENT_STYLE[normalized] ?? AGENT_STYLE.slate;
};

const getAgentTheme = (
  agentId: number,
  colorName: string,
  isSelected: boolean,
) => {
  const style = getAgentColorStyle(colorName);
  if (isSelected) {
    return { card: style.selectedCard, icon: style.selectedIcon };
  }
  // The resting card is the same white for every stage — the colour is carried
  // by the icon, and seven tinted cards in a column would be a rainbow rather
  // than a process. It arrives on hover, where it means "this one", and leaves
  // again. The shadow stays for the pointer; the colour is for the room.
  return {
    card: `bg-white shadow-sm hover:shadow-md border-slate-300 ${style.hoverCard}`,
    icon: style.unselectedIcon,
  };
};

const App: React.FC = () => {
  // ── ONE SURFACE ────────────────────────────────────────────────
  // The deck is always mounted. Everything that used to REPLACE it is now an
  // "excursion": a transient sixth chip in the deck's own tab bar. One string
  // key replaces mobileView + showResearchAids + showDesignView +
  // selectedAgentId, so the four can no longer drift out of sync.
  const [excursion, setExcursion] = useState<ExcursionKey | null>(null);
  const selectedAgentId = excursion?.startsWith("step-")
    ? Number(excursion.slice(5))
    : null;
  const [rawData] = useState<string>(DEMO_DATA);
  // ── SIDEBAR WIDTH — tune here ────────────────────────────────────
  // Two widths, because the process sidebar has two builds. Which one is on
  // screen is the deck's call (SIDEBAR_MODE in WorkshopProgramView): tab 1
  // talks about the framework and gets `full`; tabs 2-5 get `compact`, where
  // the column is context rather than subject. The type sizes for each build
  // are in index.css (:root and [data-sb="compact"]) — only the widths are here.
  //
  // Not persisted: dragging the handle changes the CURRENT mode for the session
  // only, every reload comes back to these. Drag limits are 220–700 (see
  // `resize` below) — keep both numbers inside them.
  //
  // Both are painted 1.1x on a desktop by --app-zoom, and whatever they take
  // comes out of the slide beside them.
  //
  // Each width and its mode's type size are one decision, not two — the space
  // left for text is roughly (width - 100), and a line wraps when it no longer
  // fits:
  //   full    the role line is the long one, "Description, timeline & context
  //           analysis", ~40 characters at ~0.48 x --sb-role per character. 500
  //           here carries the 20px role. Above that, widen or step the role down.
  //   compact no role line on the stages, so the STAGE NAME is the long one —
  //           "0 - Pre-check & Data Inventory", 30 characters at ~0.52 x
  //           --sb-title. 360 carries the 16px title with a little to spare;
  //           below ~340 it breaks to two lines.
  const [sidebarMode, setSidebarMode] = useState<SidebarMode>('full');
  const [sidebarWidths, setSidebarWidths] = useState<Record<SidebarMode, number>>({
    full: 500,
    compact: 300,
  });
  const sidebarWidth = sidebarWidths[sidebarMode];
  const [isResizingState, setIsResizingState] = useState<boolean>(false);
  const [promptLang, setPromptLang] = useState<"he" | "en">("en");





  // Dialogue Advisor states
  const [consultationInput, setConsultationInput] = useState<string>("");
  const [consultationResult, setConsultationResult] = useState<string | null>(
    null,
  );
  const [isConsulting, setIsConsulting] = useState<boolean>(false);

  // Custom KG input
  const [kgInputText, setKgInputText] = useState<string>(ZAIRA_TEXT);  // Zaira now in English via prebuiltGraphs
  const [kgSelectedSample, setKgSelectedSample] = useState<string | null>(
    "zaira",
  );

  // Modals states
  const [isGraphModalOpen, setIsGraphModalOpen] = useState(false);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isPrinciplesModalOpen, setIsPrinciplesModalOpen] = useState(false);
  const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false);
  const [isGraphInputModalOpen, setIsGraphInputModalOpen] = useState(false);
  const [isEpistemicModalOpen, setIsEpistemicModalOpen] = useState(false);
  const [isGovernanceModalOpen, setIsGovernanceModalOpen] = useState(false);
  const [isSessionReportModalOpen, setIsSessionReportModalOpen] =
    useState(false);
  const [isDashboardPreviewModalOpen, setIsDashboardPreviewModalOpen] =
    useState(false);
  const [isCollectionDashboardOpen, setIsCollectionDashboardOpen] =
    useState(false);
  const [isReadAssessmentModalOpen, setIsReadAssessmentModalOpen] =
    useState(false);
  const [isGlossaryModalOpen, setIsGlossaryModalOpen] = useState(false);
  const [isOpeningSlideOpen, setIsOpeningSlideOpen] = useState(false);
  const [readAssessmentInitialRoute, setReadAssessmentInitialRoute] = useState<
    string | null
  >(null);
  const [inventoryModalLang, setInventoryModalLang] = useState<"he" | "en">(
    "en",
  );

  // Design view state



  // Deep linking - hash routes mapping
  const hashRoutes: Record<string, () => void> = {
    // ── The five talk tabs ────────────────────────────────────────
    // #tab-insites · #tab-tension · #tab-notation · #tab-landscape ·
    // #tab-closing. Which tab is the deck's own business — it reads the same
    // hash (see TAB_HASH in WorkshopProgramView). They are listed here for one
    // reason: the handler below normalises any hash it does not recognise back
    // to "", so an unregistered tab link would be erased the moment it loaded.
    //
    // All five mean the same thing to App: the deck, with nothing over it.
    // They are prefixed because the bare names are taken — #notation is the
    // notation MODAL, three lines down, and that link is published.
    "tab-insites": () => setExcursion(null),
    "tab-tension": () => setExcursion(null),
    "tab-notation": () => setExcursion(null),
    "tab-landscape": () => setExcursion(null),
    "tab-closing": () => setExcursion(null),
    // TEMPORARY — the second build of the closing, up for comparison. Delete
    // with QA_B_TAB in WorkshopProgramView.
    "tab-closing-b": () => setExcursion(null),
    graph: () => setIsGraphInputModalOpen(true),
    // constants.tsx:385 and the README both point at #graph-create.
    "graph-create": () => setIsGraphInputModalOpen(true),
    // The Q&A tab jumps straight here. The vis-network instance is built by
    // generateKnowledgeGraph, reached via #graph — so without this the button
    // opened an EMPTY graph unless one had been generated earlier in the
    // session. It is a backup button for audience questions: it would have
    // failed exactly when it was needed.
    "graph-view": () => {
      if (graphDataRef.current) setIsGraphModalOpen(true);
      else void generateKnowledgeGraph();
    },
    visual: () => setIsDemoModalOpen(true),
    prompts: () => setIsPromptModalOpen(true),
    principles: () => setIsPrinciplesModalOpen(true),
    inventory: () => setIsInventoryModalOpen(true),
    notation: () => setIsEpistemicModalOpen(true),
    governance: () => setIsGovernanceModalOpen(true),
    "session-report": () => setIsSessionReportModalOpen(true),
    "dashboard-preview": () => setIsDashboardPreviewModalOpen(true),
    "collection-dashboard": () => setIsCollectionDashboardOpen(true),
    "read-assessment": () => {
      setReadAssessmentInitialRoute(null);
      setIsReadAssessmentModalOpen(true);
    },
    glossary: () => setIsGlossaryModalOpen(true),
    // Presentation chrome mode is gone — F11 removes the browser's chrome, and
    // the site's own header and sidebar should stay: the sidebar is part of the
    // argument. The hash is kept as a deck alias so old links still resolve.
    presentation: () => setExcursion(null),
    opening: () => setIsOpeningSlideOpen(true),
    design: () => setExcursion("design"),
    // Legacy routes — redirect to MA-RA modal with the relevant reading pre-selected
    "q-narratives": () => {
      setReadAssessmentInitialRoute("q-narratives");
      setIsReadAssessmentModalOpen(true);
    },
    "q-sentiment": () => {
      setReadAssessmentInitialRoute("q-sentiment");
      setIsReadAssessmentModalOpen(true);
    },
    "q-education": () => {
      setReadAssessmentInitialRoute("q-education");
      setIsReadAssessmentModalOpen(true);
    },
    "q-semiotics": () => {
      setReadAssessmentInitialRoute("q-semiotics");
      setIsReadAssessmentModalOpen(true);
    },
    "q-jester-chorus": () => {
      setReadAssessmentInitialRoute("q-jester");
      setIsReadAssessmentModalOpen(true);
    },
    "q-jester": () => {
      setReadAssessmentInitialRoute("q-jester");
      setIsReadAssessmentModalOpen(true);
    },
    "q-chorus": () => {
      setReadAssessmentInitialRoute("q-chorus");
      setIsReadAssessmentModalOpen(true);
    },
    "step-0": () => setExcursion("step-0"),
    "step-1": () => setExcursion("step-1"),
    "step-2": () => setExcursion("step-2"),
    "step-3": () => setExcursion("step-3"),
    "step-4": () => setExcursion("step-4"),
    "step-5": () => setExcursion("step-5"),
    "step-6": () => setExcursion("step-6"),
    // #home used to be a separate page. Under "you cannot leave the deck" it
    // means the deck; its old body is now the `resources` excursion.
    home: () => setExcursion(null),
    resources: () => setExcursion("resources"),
    tools: () => setExcursion("tools"),
    steps: () => setExcursion("steps"),
    welcome: () => setExcursion("about"),
    // #program is the way OUT of presentation chrome as well as the way back
    // to the deck — both the corner button and Escape route here. Without the
    // setChromeHidden(false) nothing ever turned chrome mode off again and the
    // only escape was a page reload.
    program: () => setExcursion(null),
  };

  // Navigate to hash route
  const navigateTo = useCallback((hash: string) => {
    window.location.hash = hash;
  }, []);

  // Close all modals and clear hash
  const closeAllModals = useCallback(() => {
    setIsGraphModalOpen(false);
    setIsGraphInputModalOpen(false);
    setIsDemoModalOpen(false);
    setIsPromptModalOpen(false);
    setIsPrinciplesModalOpen(false);
    setIsInventoryModalOpen(false);
    setIsEpistemicModalOpen(false);
    setIsGovernanceModalOpen(false);
    setIsSessionReportModalOpen(false);
    setIsDashboardPreviewModalOpen(false);
    setIsCollectionDashboardOpen(false);
    setIsReadAssessmentModalOpen(false);
    setIsGlossaryModalOpen(false);
    // The opening slide is a bare fixed inset-0 overlay, not a Modal. Leaving
    // it out of here meant #opening followed by any navigation left a white
    // sheet over the whole app whose only exit was its own x.
    setIsOpeningSlideOpen(false);
    // Presentation is no longer a modal — it is chrome state, untouched here.
  }, []);

  // Handle hash change
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove #
      closeAllModals();
      if (hash && hashRoutes[hash]) {
        hashRoutes[hash]();
      } else if (hash) {
        // Unknown hash used to hit neither branch and leave the app sitting on
        // a dead route with no handler run at all. Normalise to the deck.
        window.location.hash = "";
      }
      // Empty hash: every modal's onClose sets it, so this fires on each modal
      // close. Deliberately does NOT clear the excursion — closing a glossary
      // opened from a CBSA stage should return to that stage.
    };

    // Handle initial hash on mount
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Knowledge Graph states
  const [graphData, setGraphData] = useState<any | null>(null);
  // hashRoutes is captured once (the hash effect has [] deps), so it would read
  // a permanently-null graphData. A ref survives that closure.
  const graphDataRef = useRef<any | null>(null);
  const [isGraphLoading, setIsGraphLoading] = useState(false);
  const [selectedNodeDetails, setSelectedNodeDetails] = useState<any | null>(
    null,
  );
  const graphContainerRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<Network | null>(null);

  const currentAgent =
    selectedAgentId !== null
      ? CORE_AGENTS.find((a) => a.id === selectedAgentId)
      : null;
  const isResizing = useRef<boolean>(false);

  // Where the drag began, and how wide the sidebar was at that moment.
  // The new width is derived from the DELTA, so the handle never jumps to
  // meet the cursor and the maths does not depend on where the sidebar sits.
  const resizeStart = useRef<{ x: number; width: number }>({ x: 0, width: 0 });

  const startResizing = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      resizeStart.current = { x: e.clientX, width: sidebarWidth };
      isResizing.current = true;
      setIsResizingState(true);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    },
    [sidebarWidth],
  );

  const stopResizing = useCallback(() => {
    if (isResizing.current) {
      isResizing.current = false;
      setIsResizingState(false);
      document.body.style.cursor = "default";
      document.body.style.userSelect = "auto";
    }
  }, []);

  const resize = useCallback(
    (e: MouseEvent) => {
      if (!isResizing.current) return;
      // The sidebar is docked LEFT — dragging right widens it. Clamp rather
      // than ignore out-of-range values, so the edge follows the cursor to the
      // limit instead of freezing the drag.
      const next = resizeStart.current.width + (e.clientX - resizeStart.current.x);
      // The drag tunes the mode that is on screen, and only that one: widening
      // the compact column on tab 3 must not silently move the full one on
      // tab 1. Each build keeps its own number for the session.
      setSidebarWidths((w) => ({
        ...w,
        [sidebarMode]: Math.min(700, Math.max(220, next)),
      }));
    },
    [sidebarMode],
  );

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  const handleConsult = async () => {
    if (!consultationInput.trim()) return;
    setIsConsulting(true);
    setConsultationResult(null);
    try {
      const result = await callGemini(
        `${PROMPT_ADVISOR_SYSTEM}\nRequested research goal: "${consultationInput}"`,
      );
      setConsultationResult(result);
    } catch (e) {
      setConsultationResult(
        "An error occurred building the research plan. Please try again.",
      );
    } finally {
      setIsConsulting(false);
    }
  };

  const generateKnowledgeGraph = async (forceApi?: boolean) => {
    window.location.hash = "graph-view";
    setIsGraphModalOpen(true);
    setSelectedNodeDetails(null);

    // Use pre-built data for known samples (unless AI Live mode is on)
    const sampleKey = kgSelectedSample || "zaira";
    if (!forceApi && PREBUILT_GRAPHS[sampleKey]) {
      setIsGraphLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 3500));
      setGraphData(PREBUILT_GRAPHS[sampleKey]);
      setIsGraphLoading(false);
      return;
    }

    // Custom text — call Gemini API
    setIsGraphLoading(true);
    const prompt = GRAPH_PROMPT(kgInputText, "Methodology learning session.");
    try {
      const response = await callGemini(prompt);
      const cleanJson = response.replace(/```json|```/gi, "").trim();
      const data = JSON.parse(cleanJson);
      setGraphData(data);
    } catch (e) {
      console.error("Graph Error", e);
      alert("Error creating graph. Make sure the model returned valid JSON.");
    } finally {
      setIsGraphLoading(false);
    }
  };


  useEffect(() => {
    if (!isGraphModalOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsGraphModalOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isGraphModalOpen]);

  useEffect(() => {
    if (graphData && graphContainerRef.current) {
      // The graph paints onto a canvas, so it cannot inherit the page font.
      // It reads the same --font-body knob instead (see index.css).
      const graphFace =
        getComputedStyle(document.documentElement).getPropertyValue('--font-body').trim() ||
        'sans-serif';
      const nodes = new DataSet(
        graphData.nodes.map((n: any) => ({
          ...n,
          label: n.name || n.label, // Fix: Ensure label is populated from name
          color: getNodeColor(n.type),
          font: {
            color: "#000000",
            face: graphFace,
            size: 14,
            weight: "bold",
          },
          shape: n.type === "site" ? "hexagon" : "dot",
          size: n.type === "site" ? 40 : 25,
          borderWidth: 2,
          shadow: true,
        })),
      );
      const edges = new DataSet(
        graphData.edges.map((e: any) => ({
          ...e,
          arrows: "to",
          color: { color: "#cbd5e1", highlight: "#6366f1" },
          width: 1,
          font: { align: "middle", size: 10, face: graphFace },
          smooth: { type: "continuous" },
        })),
      );
      const options = {
        physics: {
          enabled: true,
          barnesHut: {
            gravitationalConstant: -2000,
            centralGravity: 0.3,
            springLength: 150,
            springConstant: 0.04,
            damping: 0.09,
            avoidOverlap: 1,
          },
          stabilization: { iterations: 150 },
        },
        interaction: { hover: true, tooltipDelay: 200, hideEdgesOnDrag: true },
      };
      const network = new Network(
        graphContainerRef.current,
        { nodes, edges },
        options,
      );
      networkRef.current = network;
      network.on("click", (params) => {
        if (params.nodes.length > 0) {
          const nodeId = params.nodes[0];
          const node = graphData.nodes.find((n: any) => n.id === nodeId);
          setSelectedNodeDetails(node);
        } else {
          setSelectedNodeDetails(null);
        }
      });
      return () => {
        network.destroy();
      };
    }
    graphDataRef.current = graphData;
  }, [graphData]);


  return (
    <div
      className="flex flex-col min-h-screen min-h-dvh bg-slate-100 text-slate-800 overflow-hidden"
      dir="ltr"
    >
      {/* Phone-only bottom tabs overlay: ensure scroll areas don't end under it */}

      {/**/}

      <Header onHomeClick={() => navigateTo("home")} />

      {/* Mobile Horizontal Navigation (Sticky) */}
      <MobileNav
        active={excursion ?? "deck"}
        selectedAgentId={selectedAgentId}
        onTalkClick={() => {
          navigateTo("program");
        }}
        onResearchAidsClick={() => {
          navigateTo("tools");
        }}
        onResourcesClick={() => {
          navigateTo("resources");
        }}
        onDesignClick={() => {
          navigateTo("design");
        }}
        onStepsClick={() => {
          navigateTo("steps");
        }}
      />

      <div className="flex-1 min-h-0 overflow-y-auto relative flex flex-col lg:flex-row lg:items-start">
        <Sidebar
          width={sidebarWidth}
          mode={sidebarMode}
          isResizing={isResizingState}
          onStartResize={startResizing}
          selectedAgentId={selectedAgentId}
          showResearchAids={excursion === "tools"}
          agents={CORE_AGENTS}
          onAgentSelect={(agentId) => {
            navigateTo(`step-${agentId}`);
          }}
          onResearchAidsClick={() => {
            navigateTo("tools");
          }}
          getAgentTheme={getAgentTheme}
        />

        {/* The row above sets `md:items-start`, so <main> is not stretched and
            `flex-1` governs its WIDTH only — its height stays content-sized.
            The talk view needs a real height to hand down (its photo strips
            grow into the leftover), so it opts into stretching. Other views
            keep the existing content-height behaviour. */}
        <main
          className="flex-1 min-h-0 flex flex-col bg-white shadow-inner relative transition-all overflow-hidden lg:self-stretch"
        >

          {/* THE DECK — always mounted, never replaced. Anything that used to
              take over this pane now arrives as an excursion chip inside it. */}
          <WorkshopProgramView
            onNavigate={navigateTo}
            onSidebarModeChange={setSidebarMode}
            excursion={excursion}
            onCloseExcursion={() => navigateTo("program")}
            excursionContent={
              excursion ? (
                <ExcursionOutlet
                  excursion={excursion}
                  agent={currentAgent}
                  onNavigate={navigateTo}
                  consultationInput={consultationInput}
                  setConsultationInput={setConsultationInput}
                  consultationResult={consultationResult}
                  setConsultationResult={setConsultationResult}
                  isConsulting={isConsulting}
                  onConsult={handleConsult}
                  promptLang={promptLang}
                  setPromptLang={setPromptLang}
                  rawData={rawData}
                  getAgentTheme={getAgentTheme}
                />
              ) : null
            }
          />

          {/* <footer
            className="flex-row-reverse fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-slate-200 p-2 shadow-lg md:bottom-0"
            style={{
              zIndex: 45,
              bottom: window.innerWidth < 768 ? "70px" : "0",
            }}
            dir="ltr"
          >
            <div className=" mx-auto flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
              <a
                href="mailto:yuval.shafriri@gmail.com?subject=Contact%20from%20InSites-CAA%20-%20CAA%20Workshop&body=Hello,%0D%0A%0D%0A"
                className="flex items-center gap-2 bg-indigo-100 hover:bg-indigo-300 text-black px-2 py-2 sm:px-1.5 sm:py-1 rounded-lg shadow-md hover:shadow-lg transition-all active:scale-95 text-xs sm:text-sm font-bold shrink-0"
                dir="ltr"
                aria-label="Send email to site creators"
              >
                <Mail size={14} />
                <span className="hidden xs:inline">Contact</span>
              </a>

              <div className=" text-xs sm:text-[13px] text-slate-400 opacity-100 truncate flex-1 text-center sm:text-left">
                Companion site for InSites-CAA significance assessment workshops
                © Developed by Dr. Yael Alef and Yuval Shafriri
              </div>
            </div>
          </footer> */}
        </main>
      </div>


      <InventoryModal
        isOpen={isInventoryModalOpen}
        onClose={() => {
          setIsInventoryModalOpen(false);
          window.location.hash = "";
        }}
        lang={inventoryModalLang}
        onOpenCollectionDashboard={() => navigateTo("collection-dashboard")}
      />

      <PromptAdvisorModal
        isOpen={isPromptModalOpen}
        onClose={() => {
          setIsPromptModalOpen(false);
          window.location.hash = "";
        }}
        consultationInput={consultationInput}
        onConsultationInputChange={setConsultationInput}
        consultationResult={consultationResult}
        onClearResult={() => setConsultationResult(null)}
        isConsulting={isConsulting}
        onConsult={handleConsult}
      />

      <PrinciplesModal
        isOpen={isPrinciplesModalOpen}
        onClose={() => {
          setIsPrinciplesModalOpen(false);
          window.location.hash = "";
        }}
      />

      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => {
          setIsDemoModalOpen(false);
          window.location.hash = "";
        }}
      />

      <GraphModal
        isOpen={isGraphModalOpen}
        onClose={() => {
          setIsGraphModalOpen(false);
          window.location.hash = "";
        }}
        selectedNodeDetails={selectedNodeDetails}
        isLoading={isGraphLoading}
        graphContainerRef={graphContainerRef}
      />

      <GraphInputModal
        isOpen={isGraphInputModalOpen}
        onClose={() => {
          setIsGraphInputModalOpen(false);
          window.location.hash = "";
        }}
        inputText={kgInputText}
        onInputTextChange={(text: string) => {
          setKgInputText(text);
          setKgSelectedSample(null);
        }}
        onSampleSelect={(text: string, sampleKey: string) => {
          setKgInputText(text);
          setKgSelectedSample(sampleKey);
        }}
        onGenerate={generateKnowledgeGraph}
      />

      <EpistemicNotationModal
        isOpen={isEpistemicModalOpen}
        onClose={() => {
          setIsEpistemicModalOpen(false);
          window.location.hash = "";
        }}
      />

      <GovernanceModal
        isOpen={isGovernanceModalOpen}
        onClose={() => {
          setIsGovernanceModalOpen(false);
          window.location.hash = "";
        }}
      />

      <SessionReportModal
        isOpen={isSessionReportModalOpen}
        onClose={() => {
          setIsSessionReportModalOpen(false);
          window.location.hash = "";
        }}
      />

      <DashboardPreviewModal
        isOpen={isDashboardPreviewModalOpen}
        onClose={() => {
          setIsDashboardPreviewModalOpen(false);
          window.location.hash = "";
        }}
      />

      <CollectionDashboardModal
        isOpen={isCollectionDashboardOpen}
        onClose={() => {
          setIsCollectionDashboardOpen(false);
          window.location.hash = "";
        }}
      />

      <ReadAssessmentModal
        isOpen={isReadAssessmentModalOpen}
        onClose={() => {
          setIsReadAssessmentModalOpen(false);
          setReadAssessmentInitialRoute(null);
          window.location.hash = "";
        }}
        initialReadingRoute={readAssessmentInitialRoute}
        onOpenGraph={() => navigateTo("graph")}
      />

      <GlossaryModal
        isOpen={isGlossaryModalOpen}
        onClose={() => {
          setIsGlossaryModalOpen(false);
          window.location.hash = "";
        }}
        onNavigate={navigateTo}
      />

      {/* Opening Slide — presenter only */}
      {isOpeningSlideOpen && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-8">
          <button
            onClick={() => {
              setIsOpeningSlideOpen(false);
              window.location.hash = "";
            }}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-2xl cursor-pointer"
          >
            ✕
          </button>
          <img
            src="./poster-light.jpg"
            alt="InSites Workshop"
            className="max-h-[55vh] rounded-2xl border border-slate-200 shadow-lg mb-6"
          />
          <h1 className="text-4xl md:text-4xl font-black text-slate-800 text-center leading-tight mb-2">
            InSites: Significance Assessment <br />
            through the Looking Glass of Gen-AI
          </h1>

          <p className="text-lg text-slate-800 mb-6">
            Dr. Yael Alef &amp; Yuval Shafriri · InSites Knowledge Lab ·
            Technion
          </p>
          <a
            href="https://bit.ly/insites-caa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-4xl md:text-4xl font-normal text-indigo-800 hover:text-indigo-700 transition-colors underline underline-offset-4"
          >
            bit.ly/insites-caa
          </a>
        </div>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes bounce-subtle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
        .animate-bounce-subtle { animation: bounce-subtle 2s infinite ease-in-out; }
        .custom-scrollbar-right::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar-right::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar-right::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `,
        }}
      />
    </div>
  );
};

export default App;
