import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  BookOpen,
  ChevronLeft,
  Maximize2,
} from "lucide-react";
import SwitchTransition from "./components/common/SwitchTransition";
import { Header, Sidebar, MobileNav } from "./components/layout";
import { DesignPrinciplesView } from "./components/views/DesignPrinciplesView";
import { ToolboxView } from "./components/views/ToolboxView";
import { ResourcesView } from "./components/views/ResourcesView";
import {
  WelcomeOverlay,
  AboutView,
  StepsList,
  StepDetailView,
  WorkshopProgramView,
} from "./components/views";
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
  PresentationModal,
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

const AGENT_STYLE: Record<
  AgentColor,
  {
    selectedCard: string;
    selectedIcon: string;
    unselectedIcon: string;
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
  return {
    card: "bg-white shadow-sm hover:shadow-md border-slate-300",
    icon: style.unselectedIcon,
  };
};

const App: React.FC = () => {
  const [selectedAgentId, setSelectedAgentId] = useState<number | null>(null);
  const [showResearchAids, setShowResearchAids] = useState<boolean>(false);
  const [rawData] = useState<string>(DEMO_DATA);
  // ── SIDEBAR WIDTH — tune here ────────────────────────────────────
  // Default width of the process sidebar, in px. Not persisted: dragging the
  // handle changes it for the session only, every reload comes back here.
  // Drag limits are 220–700 (see `resize` below) — keep this inside them.
  // Font/icon sizes are a separate knob: `SIZE` in components/layout/Sidebar.tsx
  const [sidebarWidth, setSidebarWidth] = useState<number>(430);
  const [isResizingState, setIsResizingState] = useState<boolean>(false);
  const [promptLang, setPromptLang] = useState<"he" | "en">("en");

  // Mobile View State
  const [mobileView, setMobileView] = useState<
    "HOME" | "TOOLS" | "STEPS" | "ABOUT" | "STEP_DETAIL" | "PROGRAM" | "DESIGN"
  >("HOME");

  // Welcome/About overlay state
  const [showWelcome, setShowWelcome] = useState<boolean>(false);

  const handleCloseWelcome = () => {
    setShowWelcome(false);
  };

  const handleCloseWelcomeAndClearHash = () => {
    setShowWelcome(false);
    window.location.hash = "";
  };

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
  const [isPresentationModalOpen, setIsPresentationModalOpen] = useState(false);
  const [isOpeningSlideOpen, setIsOpeningSlideOpen] = useState(false);
  const [readAssessmentInitialRoute, setReadAssessmentInitialRoute] = useState<
    string | null
  >(null);
  const [inventoryModalLang, setInventoryModalLang] = useState<"he" | "en">(
    "en",
  );

  // Design view state
  const [showDesignView, setShowDesignView] = useState<boolean>(false);

  const openResearchTools = useCallback(() => {
    setShowResearchAids(true);
    setShowDesignView(false);
    setSelectedAgentId(null);
  }, []);

  const openDesignView = useCallback(() => {
    setShowDesignView(true);
    setShowResearchAids(false);
    setSelectedAgentId(null);
  }, []);

  // Deep linking - hash routes mapping
  const hashRoutes: Record<string, () => void> = {
    graph: () => setIsGraphInputModalOpen(true),
    "graph-view": () => setIsGraphModalOpen(true),
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
    presentation: () => setIsPresentationModalOpen(true),
    opening: () => setIsOpeningSlideOpen(true),
    design: () => {
      openDesignView();
      setMobileView(window.innerWidth < 768 ? "DESIGN" : "HOME");
    },
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
    "step-0": () => {
      setSelectedAgentId(0);
      setShowResearchAids(false);
      setShowDesignView(false);
      setMobileView(window.innerWidth < 768 ? "STEP_DETAIL" : "HOME");
    },
    "step-1": () => {
      setSelectedAgentId(1);
      setShowResearchAids(false);
      setShowDesignView(false);
      setMobileView(window.innerWidth < 768 ? "STEP_DETAIL" : "HOME");
    },
    "step-2": () => {
      setSelectedAgentId(2);
      setShowResearchAids(false);
      setShowDesignView(false);
      setMobileView(window.innerWidth < 768 ? "STEP_DETAIL" : "HOME");
    },
    "step-3": () => {
      setSelectedAgentId(3);
      setShowResearchAids(false);
      setShowDesignView(false);
      setMobileView(window.innerWidth < 768 ? "STEP_DETAIL" : "HOME");
    },
    "step-4": () => {
      setSelectedAgentId(4);
      setShowResearchAids(false);
      setShowDesignView(false);
      setMobileView(window.innerWidth < 768 ? "STEP_DETAIL" : "HOME");
    },
    "step-5": () => {
      setSelectedAgentId(5);
      setShowResearchAids(false);
      setShowDesignView(false);
      setMobileView(window.innerWidth < 768 ? "STEP_DETAIL" : "HOME");
    },
    "step-6": () => {
      setSelectedAgentId(6);
      setShowResearchAids(false);
      setShowDesignView(false);
      setMobileView(window.innerWidth < 768 ? "STEP_DETAIL" : "HOME");
    },
    home: () => {
      setSelectedAgentId(null);
      setShowResearchAids(false);
      setShowDesignView(false);
      setMobileView("HOME");
    },
    tools: () => {
      openResearchTools();
      setMobileView("TOOLS");
    },
    steps: () => {
      setMobileView("STEPS");
      setSelectedAgentId(null);
      setShowResearchAids(false);
      setShowDesignView(false);
    },
    welcome: () => {
      if (window.innerWidth < 768) {
        setMobileView("ABOUT");
        setShowWelcome(false);
      } else {
        setShowWelcome(true);
      }
    },
    program: () => {
      setMobileView("PROGRAM");
      setSelectedAgentId(null);
      setShowResearchAids(false);
    },
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
    // Note: presentation modal is NOT closed here — it persists across hash navigation
  }, []);

  // Handle hash change
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove #
      if (hash && hashRoutes[hash]) {
        closeAllModals();
        hashRoutes[hash]();
      } else if (!hash) {
        closeAllModals();
        hashRoutes['program']();
      }
    };

    // Handle initial hash on mount
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Knowledge Graph states
  const [graphData, setGraphData] = useState<any | null>(null);
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

  const resize = useCallback((e: MouseEvent) => {
    if (!isResizing.current) return;
    // The sidebar is docked LEFT — dragging right widens it. Clamp rather
    // than ignore out-of-range values, so the edge follows the cursor to the
    // limit instead of freezing the drag.
    const next = resizeStart.current.width + (e.clientX - resizeStart.current.x);
    setSidebarWidth(Math.min(700, Math.max(220, next)));
  }, []);

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
    if (!showWelcome && !isGraphModalOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (isGraphModalOpen) setIsGraphModalOpen(false);
      if (showWelcome) handleCloseWelcome();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showWelcome, isGraphModalOpen]);

  useEffect(() => {
    if (graphData && graphContainerRef.current) {
      const nodes = new DataSet(
        graphData.nodes.map((n: any) => ({
          ...n,
          label: n.name || n.label, // Fix: Ensure label is populated from name
          color: getNodeColor(n.type),
          font: {
            color: "#000000",
            face: "Assistant",
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
          font: { align: "middle", size: 10, face: "Assistant" },
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
  }, [graphData]);

  // mainViewKey determines which view is shown - modals are separate overlays, not part of this
  const mainViewKey =
    selectedAgentId !== null && currentAgent
      ? `step-${selectedAgentId}`
      : mobileView === "STEPS"
        ? "steps"
        : mobileView === "ABOUT"
          ? "about"
          : mobileView === "PROGRAM"
            ? "program"
            : mobileView === "STEP_DETAIL" && currentAgent
              ? `step-detail-${selectedAgentId}`
              : showDesignView
                ? "design"
                : showResearchAids || mobileView === "TOOLS"
                  ? "tools"
                  : "home";

  return (
    <div
      className="flex flex-col min-h-screen min-h-dvh bg-slate-100 text-slate-800 overflow-hidden"
      dir="ltr"
    >
      {/* Phone-only bottom tabs overlay: ensure scroll areas don't end under it */}

      {/**/}

      <Header
        onHomeClick={() => navigateTo("home")}
      />

      {/* Mobile Horizontal Navigation (Sticky) */}
      <MobileNav
        currentView={mobileView}
        selectedAgentId={selectedAgentId}
        onHomeClick={() => {
          navigateTo("home");
        }}
        onResearchAidsClick={() => {
          navigateTo("tools");
        }}
        onProgramClick={() => {
          navigateTo("program");
        }}
        onDesignClick={() => {
          navigateTo("design");
        }}
        onStepsClick={() => {
          navigateTo("steps");
        }}
      />

      <div className="flex-1 min-h-0 overflow-y-auto relative flex flex-col md:flex-row md:items-start">
        <Sidebar
          width={sidebarWidth}
          isResizing={isResizingState}
          onStartResize={startResizing}
          selectedAgentId={selectedAgentId}
          showResearchAids={showResearchAids}
          agents={CORE_AGENTS}
          onAgentSelect={(agentId) => {
            navigateTo(`step-${agentId}`);
            handleCloseWelcome();
          }}
          onResearchAidsClick={() => {
            navigateTo("tools");
            handleCloseWelcome();
          }}
          getAgentTheme={getAgentTheme}
        />

        {/* The row above sets `md:items-start`, so <main> is not stretched and
            `flex-1` governs its WIDTH only — its height stays content-sized.
            The talk view needs a real height to hand down (its photo strips
            grow into the leftover), so it opts into stretching. Other views
            keep the existing content-height behaviour. */}
        <main
          className={`flex-1 min-h-0 flex flex-col bg-white shadow-inner relative transition-all overflow-hidden ${
            mobileView === "PROGRAM" ? "md:self-stretch" : ""
          }`}
        >
          {/* Welcome/About Overlay - Desktop Only */}
          <div className="hidden md:block">
            <WelcomeOverlay
              isOpen={showWelcome}
              onClose={handleCloseWelcomeAndClearHash}
              onNavigate={navigateTo}
            />
          </div>

          <SwitchTransition
            transitionKey={mainViewKey}
            className="flex-1 min-h-0 flex flex-col"
            duration={250}
          >
            {mobileView === "STEPS" ? (
              <StepsList
                agents={CORE_AGENTS}
                selectedAgentId={selectedAgentId}
                onAgentSelect={(agentId) => {
                  navigateTo(`step-${agentId}`);
                }}
                getAgentTheme={getAgentTheme}
              />
            ) : mobileView === "ABOUT" ? (
              <div
                className="flex-1 overflow-y-auto bg-white custom-scrollbar pb-[140px] sm:pb-[90px] md:pb-16"
                dir="ltr"
              >
                <div className="px-6 pt-4">
                  {/* Breadcrumb Navigation */}
                  <div className="flex items-center gap-2 text-sm mb-4">
                    <button
                      onClick={() => navigateTo("home")}
                      className="text-indigo-600 hover:text-indigo-700 hover:underline flex items-center gap-1 transition-colors font-medium"
                    >
                      <BookOpen size={16} />
                      <span>Home</span>
                    </button>
                    <ChevronLeft
                      size={16}
                      className="text-slate-400 rotate-180"
                    />
                    <span className="text-slate-600 font-medium">About</span>
                  </div>
                </div>
                <AboutView onNavigate={navigateTo} />
              </div>
            ) : mobileView === "PROGRAM" ? (
              <div className="relative h-full">
                <button
                  onClick={() => navigateTo("presentation")}
                  className="absolute top-2 right-2 z-10 p-1.5 rounded-lg bg-white/80 hover:bg-white text-slate-500 hover:text-slate-700 shadow-sm border border-slate-200 transition-all"
                  aria-label="Fullscreen presentation"
                  title="Fullscreen presentation"
                >
                  <Maximize2 size={16} />
                </button>
                <WorkshopProgramView onNavigate={navigateTo} />
              </div>
            ) : currentAgent ? (
              <div
                className="flex-1 flex flex-col bg-slate-50 overflow-y-auto custom-scrollbar pb-[140px] sm:pb-[90px] md:pb-16"
                dir="ltr"
              >
                <div className="max-w-3xl mx-auto w-full">
                  <StepDetailView
                    agent={currentAgent}
                    onBack={() => navigateTo("steps")}
                    consultationInput={consultationInput}
                    setConsultationInput={setConsultationInput}
                    consultationResult={consultationResult}
                    setConsultationResult={setConsultationResult}
                    isConsulting={isConsulting}
                    onConsult={handleConsult}
                    promptLang={promptLang}
                    setPromptLang={setPromptLang}
                    rawData={rawData}
                    onNavigate={navigateTo}
                  />
                </div>
              </div>
            ) : showDesignView ? (
              /* DESIGN PRINCIPLES VIEW */
              <div className="flex-1 flex flex-col overflow-y-auto bg-slate-50/30 custom-scrollbar pb-[140px] sm:pb-[90px] md:pb-16">
                <div className="max-w-4xl mx-auto w-full px-6 py-6 space-y-6">
                  <div>
                    <h3 className="text-2xl font-black text-slate-500 mb-2">
                      Design Principles
                    </h3>
                    <p className="text-slate-500">
                      How transparency, control, and evidence governance work in
                      InSites-CAA
                    </p>
                  </div>

                  <DesignPrinciplesView onNavigate={navigateTo} />
                </div>
              </div>
            ) : showResearchAids || mobileView === "TOOLS" ? (
              <div className="flex-1 flex flex-col overflow-y-auto bg-slate-50/30 custom-scrollbar pb-[140px] sm:pb-[90px] md:pb-16">
                <ToolboxView
                  onNavigate={navigateTo}
                  consultationInput={consultationInput}
                  setConsultationInput={setConsultationInput}
                  consultationResult={consultationResult}
                  setConsultationResult={setConsultationResult}
                  isConsulting={isConsulting}
                  onConsult={handleConsult}
                />
              </div>
            ) : (
              <div className="flex-1 flex flex-col overflow-y-auto bg-slate-50/30 custom-scrollbar pb-[140px] sm:pb-[90px] md:pb-16">
                <ResourcesView onNavigate={navigateTo} />
              </div>
            )}
          </SwitchTransition>

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

      {/* Rendered first so the content modals below it (notation, graph, dashboards)
          paint ABOVE the fullscreen presentation — they share the same z-index. */}
      <PresentationModal
        isOpen={isPresentationModalOpen}
        onClose={() => {
          setIsPresentationModalOpen(false);
          navigateTo("program");
        }}
        onNavigate={navigateTo}
      />

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
