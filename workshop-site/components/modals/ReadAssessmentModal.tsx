import React, { useState, useEffect } from 'react';
import { Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { Modal } from '../common';
import { copyToClipboard } from '../../utils';
import { RESEARCH_QUERIES } from '../../constants';

export interface ReadAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialReadingRoute?: string | null;
  onOpenGraph?: () => void;
}

interface Reading {
  id: string;
  category: 'analytical' | 'interpretive' | 'generative';
  title: string;
  description: string;
  prompt?: string;
  linkRoute?: string;
  linkLabel?: string;
}

const READINGS: Reading[] = [
  // Analytical readings
  {
    id: 'source-fidelity',
    category: 'analytical',
    title: 'Source-Assessment Fidelity',
    description: 'Checks whether the assessment used source data at the depth the source provides. Diagnoses compression, omission, or under-analysis.',
    prompt: `Perform a Source-Assessment Fidelity reading of this assessment. For each CBSA stage, identify:
1. What the source material contains at full depth
2. What the assessment actually used
3. Where compression, omission, or under-analysis occurred
Do not produce new stage content — diagnose what's there vs. what could be there.`,
  },
  {
    id: 'context-effect-audit',
    category: 'analytical',
    title: 'Context-Effect Audit',
    description: 'Traces every context-effect pair: internal only or outward? Planning implication? Connections missed?',
    prompt: `Perform a Context-Effect Audit of this assessment. For every context-effect pair identified, create a summary table:
| Context-effect | Direction (internal/outward) | Planning implication | Gap? |
Identify any context-effect connections the assessment missed.`,
  },
  {
    id: 'knowledge-graph',
    category: 'analytical',
    title: 'Knowledge Graph',
    description: 'Interactive map of entities and relationships extracted from the assessment.',
    linkRoute: 'graph',
    linkLabel: 'Open KG Tool',
  },
  {
    id: 'evidence-weight',
    category: 'analytical',
    title: 'Evidence Weight',
    description: 'Which claims are well-supported vs. thinly grounded. Maps evidence strength across the assessment.',
    prompt: `Perform an Evidence Weight reading of this assessment. For each major claim or value identification:
- Rate evidence support: Strong (multiple explicit sources) / Moderate (single source or inference) / Thin (interpretive, no direct citation)
- Flag any claims presented with certainty that rest on thin evidence.`,
  },
  {
    id: 'gap-strength',
    category: 'analytical',
    title: 'Gap & Strength',
    description: "What's solid in the assessment and what needs work. Structured diagnostic.",
    prompt: `Perform a Gap & Strength reading of this assessment.
Strengths: What is well-developed, well-cited, and analytically solid?
Gaps: What is missing, thin, or insufficiently grounded?
For each gap, suggest what kind of additional data or analysis would address it.`,
  },
  {
    id: 'timeline',
    category: 'analytical',
    title: 'Timeline',
    description: 'Interactive timeline of dated events if the assessment contains chronological data.',
    prompt: `Generate a Timeline reading of this assessment. Extract all dated events mentioned in the assessment and organize them chronologically. For each event, note:
- Year/period
- What happened
- Change type (structure/use/setting/infrastructure)
- Source reference`,
  },
  // Interpretive readings (migrated from extension queries)
  {
    id: 'q-narratives',
    category: 'interpretive',
    title: 'The Stakeholder Table',
    description: 'How different decision-makers would read this assessment — heritage manager, developer, community, researcher, educator.',
    prompt: RESEARCH_QUERIES.find(q => q.route === 'q-narratives')?.prompt || '',
  },
  {
    id: 'q-jester',
    category: 'interpretive',
    title: 'The Court Jester',
    description: 'Deliberately provocative reader questioning unstated assumptions. Playful but sharp.',
    prompt: (() => {
      const parent = RESEARCH_QUERIES.find(q => q.route === 'q-jester-chorus');
      const sub = parent?.subQueries?.find((s: any) => s.route === 'q-jester');
      return sub?.prompt || '';
    })(),
  },
  {
    id: 'q-chorus',
    category: 'interpretive',
    title: 'The Greek Chorus',
    description: 'Interpretive-public voice illuminating choices and value tensions. Careful, self-aware.',
    prompt: (() => {
      const parent = RESEARCH_QUERIES.find(q => q.route === 'q-jester-chorus');
      const sub = parent?.subQueries?.find((s: any) => s.route === 'q-chorus');
      return sub?.prompt || '';
    })(),
  },
  {
    id: 'muse',
    category: 'interpretive',
    title: 'The Muse',
    description: 'Reader attuned to aesthetic, narrative, and emotional dimensions — what makes this place evocative, not just significant.',
    prompt: `Act as "The Muse" — a reader attuned to aesthetic, narrative, and emotional dimensions of this assessment.
Surface what the CBSA structure compresses: sensory experiences, narrative potential, the feeling of the place.
Produce 3–5 observations:
- "The story here is..."
- "What's felt but not said..."
- "If this were told to [audience]..."
End with: "Would you like to develop one of these narrative directions?"`,
  },
  {
    id: 'q-semiotics',
    category: 'interpretive',
    title: 'Semiotic Analysis',
    description: 'Decode symbols, cultural codes, and metaphors in the heritage asset.',
    prompt: RESEARCH_QUERIES.find(q => q.route === 'q-semiotics')?.prompt || '',
  },
  {
    id: 'q-sentiment',
    category: 'interpretive',
    title: 'Community Sentiment',
    description: 'Extract social values map and Spirit of Place from community-facing language.',
    prompt: RESEARCH_QUERIES.find(q => q.route === 'q-sentiment')?.prompt || '',
  },
  // Generative readings
  {
    id: 'q-education',
    category: 'generative',
    title: 'Interpretation & Education',
    description: 'Develop experiential-educational activity concepts based on identified heritage values.',
    prompt: RESEARCH_QUERIES.find(q => q.route === 'q-education')?.prompt || '',
  },
];

const CATEGORY_LABELS: Record<string, { label: string; color: string }> = {
  analytical: { label: 'Analytical Readings', color: 'text-emerald-700' },
  interpretive: { label: 'Interpretive Readings', color: 'text-indigo-700' },
  generative: { label: 'Generative Readings', color: 'text-amber-700' },
};

export const ReadAssessmentModal: React.FC<ReadAssessmentModalProps> = ({
  isOpen,
  onClose,
  initialReadingRoute,
  onOpenGraph,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setExpandedId(initialReadingRoute || 'q-narratives');
    }
  }, [initialReadingRoute, isOpen]);

  const handleCopy = async (id: string, prompt: string) => {
    await copyToClipboard(prompt);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const categories = ['interpretive', 'analytical', 'generative'] as const;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Read Assessment (MA-RA) — Reading Menu"
      maxWidth="max-w-4xl"
    >
      <div className="text-left space-y-6" dir="ltr">
        <p className="text-sm text-slate-600 leading-relaxed">
          A "reading" is any structured way of examining a completed assessment to surface insights
          that aren't visible on first encounter. Readings range from analytical (data-driven) to
          interpretive (perspective-driven) to generative (creative). Choose one or more, or propose your own.
        </p>

        {categories.map(cat => {
          const items = READINGS.filter(r => r.category === cat);
          const { label, color } = CATEGORY_LABELS[cat];
          return (
            <div key={cat}>
              <h4 className={`text-xs font-black uppercase tracking-widest mb-3 ${color}`}>
                {label}
              </h4>
              <div className="space-y-2">
                {items.map(reading => {
                  const isExpanded = expandedId === reading.id;
                  return (
                    <div
                      key={reading.id}
                      className={`rounded-xl border transition-all ${isExpanded ? 'border-slate-300 shadow-md bg-white' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                    >
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : reading.id)}
                        className="w-full flex items-center justify-between p-3 text-left cursor-pointer"
                      >
                        <div className="min-w-0">
                          <h5 className="font-bold text-sm text-slate-800">{reading.title}</h5>
                          <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{reading.description}</p>
                        </div>
                        {isExpanded ? <ChevronUp size={16} className="text-slate-400 shrink-0 ml-2" /> : <ChevronDown size={16} className="text-slate-400 shrink-0 ml-2" />}
                      </button>
                      {isExpanded && (
                        <div className="px-3 pb-3 border-t border-slate-100">
                          <p className="text-xs text-slate-600 mt-3 mb-3 leading-relaxed">{reading.description}</p>
                          {reading.prompt && (
                            <div className="relative">
                              <pre className="bg-slate-50 p-3 rounded-lg text-xs text-slate-700 whitespace-pre-wrap border border-slate-200 max-h-48 overflow-y-auto">
                                {reading.prompt}
                              </pre>
                              <button
                                onClick={() => handleCopy(reading.id, reading.prompt!)}
                                className="absolute top-2 right-2 p-1.5 bg-white rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                                title="Copy prompt"
                              >
                                {copiedId === reading.id ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} className="text-slate-400" />}
                              </button>
                            </div>
                          )}
                          {reading.linkRoute && (
                            <button
                              onClick={() => {
                                onClose();
                                if (reading.linkRoute === 'graph' && onOpenGraph) {
                                  onOpenGraph();
                                } else {
                                  window.location.hash = reading.linkRoute!;
                                }
                              }}
                              className="mt-3 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold hover:bg-indigo-100 transition-colors"
                            >
                              {reading.linkLabel || 'Open Tool'}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default ReadAssessmentModal;
