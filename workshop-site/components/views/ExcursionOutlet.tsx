import React from 'react';
import { AgentConfig } from '../../types';
import { CORE_AGENTS } from '../../constants';
import { AboutView } from './AboutView';
import { DesignPrinciplesView } from './DesignPrinciplesView';
import { ResourcesView } from './ResourcesView';
import { StepDetailView } from './StepDetailView';
import { ToolboxView } from './ToolboxView';
import { StepsList } from './StepsList';

/**
 * An EXCURSION is anything that is not one of the four talk tabs: a CBSA stage,
 * the toolbox, the design principles, the resources page. It opens as a
 * transient chip in the deck's tab bar instead of replacing the deck.
 *
 * The key is a plain string, deliberately — not a ready-made ReactNode. The
 * sidebar drag calls setSidebarWidth on every mousemove, and a node prop would
 * rebuild this whole subtree on each of those frames.
 */
export type ExcursionKey =
  | `step-${0 | 1 | 2 | 3 | 4 | 5 | 6}`
  | 'tools'
  | 'design'
  | 'steps'
  | 'about'
  | 'resources';

/** Label shown on the chip. Steps read their name from CORE_AGENTS so the
 *  sidebar and the chip can never disagree. */
export const excursionLabel = (key: ExcursionKey): string => {
  if (key.startsWith('step-')) {
    const agent = CORE_AGENTS.find((a) => a.id === Number(key.slice(5)));
    return agent ? agent.name.replace(/^(\d+)\s*-\s*/, '$1 · ') : 'Stage';
  }
  return {
    tools: 'Extensions & Tools',
    design: 'Design Principles',
    steps: 'Assessment Process',
    about: 'About',
    resources: 'Resources',
  }[key as Exclude<ExcursionKey, `step-${number}`>];
};

export interface ExcursionOutletProps {
  excursion: ExcursionKey;
  agent: AgentConfig | null | undefined;
  onNavigate: (route: string) => void;
  consultationInput: string;
  setConsultationInput: (v: string) => void;
  consultationResult: string | null;
  setConsultationResult: (v: string | null) => void;
  isConsulting: boolean;
  onConsult: () => void;
  promptLang: 'he' | 'en';
  setPromptLang: (l: 'he' | 'en') => void;
  rawData: string;
  getAgentTheme: (agentId: number, colorName: string, isSelected: boolean) => { card: string; icon: string };
}

export const ExcursionOutlet: React.FC<ExcursionOutletProps> = ({
  excursion,
  agent,
  onNavigate,
  consultationInput,
  setConsultationInput,
  consultationResult,
  setConsultationResult,
  isConsulting,
  onConsult,
  promptLang,
  setPromptLang,
  rawData,
  getAgentTheme,
}) => {
  if (excursion.startsWith('step-')) {
    if (!agent) return null;
    return (
      <StepDetailView
        agent={agent}
        consultationInput={consultationInput}
        setConsultationInput={setConsultationInput}
        consultationResult={consultationResult}
        setConsultationResult={setConsultationResult}
        isConsulting={isConsulting}
        onConsult={onConsult}
        promptLang={promptLang}
        setPromptLang={setPromptLang}
        rawData={rawData}
        onNavigate={onNavigate}
      />
    );
  }

  switch (excursion) {
    case 'tools':
      return (
        <ToolboxView
          onNavigate={onNavigate}
          consultationInput={consultationInput}
          setConsultationInput={setConsultationInput}
          consultationResult={consultationResult}
          setConsultationResult={setConsultationResult}
          isConsulting={isConsulting}
          onConsult={onConsult}
        />
      );
    case 'design':
      return <DesignPrinciplesView onNavigate={onNavigate} />;
    case 'steps':
      return (
        <StepsList
          agents={CORE_AGENTS}
          selectedAgentId={null}
          onAgentSelect={(id) => onNavigate(`step-${id}`)}
          getAgentTheme={getAgentTheme}
        />
      );
    case 'about':
      return <AboutView onNavigate={onNavigate} />;
    case 'resources':
      return <ResourcesView onNavigate={onNavigate} />;
    default:
      return null;
  }
};

export default ExcursionOutlet;
