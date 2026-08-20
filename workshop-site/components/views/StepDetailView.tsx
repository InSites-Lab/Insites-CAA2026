import React from 'react';
import { AgentConfig } from '../../types';
import { Lightbulb, Layers, ListChecks, Code, ChevronLeft, Loader2, Sparkles, Copy } from 'lucide-react';
import MarkdownRenderer from '../MarkdownRenderer';
import { STEP_DETAILS, PROMPT_TRANSLATIONS, PROMPT_PREVIEWS_EN, PROMPT_TEMPLATES } from '../../constants';
import { copyToClipboard } from '../../utils';

interface StepDetailViewProps {
    agent: AgentConfig;
    /** Omit to hide the header — the excursion chip already names the stage. */
    onBack?: () => void;
    onConsult?: () => void;
    consultationInput: string;
    setConsultationInput: (input: string) => void;
    consultationResult: string | null;
    setConsultationResult: (result: string | null) => void;
    isConsulting: boolean;
    promptLang: 'he' | 'en';
    setPromptLang: (lang: 'he' | 'en') => void;
    rawData: string;
    /** Stage 5's extension tracks need to route out of the view. */
    onNavigate?: (route: string) => void;
}

export const StepDetailView: React.FC<StepDetailViewProps> = ({
    agent,
    onBack,
    onConsult,
    consultationInput,
    setConsultationInput,
    consultationResult,
    setConsultationResult,
    isConsulting,
    promptLang,
    setPromptLang,
    rawData,
    onNavigate
}) => {
    const selectedStepDetails = STEP_DETAILS[agent.id];

    // Local helper for getAgentChipTheme matching App.tsx logic
    const getAgentChipTheme = (colorName: string) => {
        // Simplified mapping for now, or import if moved to shared util
        const chipMap: Record<string, string> = {
            slate: 'bg-slate-100 text-slate-700',
            blue: 'bg-blue-100 text-blue-700',
            amber: 'bg-amber-100 text-amber-800',
            emerald: 'bg-emerald-100 text-emerald-700',
            indigo: 'bg-indigo-100 text-indigo-700',
            purple: 'bg-purple-100 text-purple-700',
            rose: 'bg-rose-100 text-rose-700',
        };
        return chipMap[agent.color] || chipMap.slate;
    };

    return (
        <div className="flex flex-col bg-slate-50" dir="ltr">
            {/* Sticky header — only when the caller supplies a way back. Inside
                the deck the excursion chip names the stage and carries the ×. */}
            {onBack && (
            <div className="p-3 border-b border-slate-200 flex justify-between items-center bg-white shadow-sm z-30 px-4 shrink-0 h-[60px] sticky top-0">
                <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-1.5 rounded-lg ${getAgentChipTheme(agent.color)} shrink-0`}>
                        {React.cloneElement(agent.icon as React.ReactElement<{ size?: number }>, { size: 18 })}
                    </div>
                    <div className="min-w-0">
                        <h2 className="font-black text-base leading-tight text-slate-900 truncate">{agent.name}</h2>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide truncate">{agent.role}</p>
                    </div>
                </div>
                <button
                    onClick={onBack}
                    className="p-2 -ml-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
                    aria-label="Back"
                >
                    <ChevronLeft size={24} />
                </button>
            </div>
            )}

            {/* Content. No scroller of its own — the deck column already
                scrolls; a nested one produced a scroll trap. */}
            <div className="px-4 pt-5 pb-8 space-y-5">

                {/* Why Important & Cognitive Link — stacked on mobile,
                    side by side from md, as the desktop view had them. */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5">
                        <div className="flex items-center gap-2 mb-2">
                            <Lightbulb size={16} className="text-amber-600" />
                            <h3 className="font-bold text-amber-800 text-sm">Why is this stage important?</h3>
                        </div>
                        <p className="text-amber-900/80 text-sm leading-relaxed">
                            {selectedStepDetails?.whyImportant}
                        </p>
                    </div>

                    <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3.5">
                        <div className="flex items-center gap-2 mb-2">
                            <Layers size={16} className="text-indigo-600" />
                            <h3 className="font-bold text-indigo-800 text-sm">Link to previous stages</h3>
                        </div>
                        <p className="text-indigo-900/80 text-sm leading-relaxed">
                            {selectedStepDetails?.cognitiveLink}
                        </p>
                    </div>
                </div>

                {/* Feature Spotlight */}
                {selectedStepDetails?.featureSpotlight && (
                    <div className="border-l-4 border-indigo-300 bg-indigo-50/50 rounded-r-xl p-3.5">
                        <h4 className="font-bold text-indigo-800 text-sm mb-1">{selectedStepDetails.featureSpotlight.title}</h4>
                        <p className="text-indigo-900/70 text-sm leading-relaxed">{selectedStepDetails.featureSpotlight.description}</p>
                    </div>
                )}

                {/* What Happens */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                        <ListChecks size={16} className="text-emerald-600" />
                        <h3 className="font-bold text-slate-800 text-sm">What happens in this stage?</h3>
                    </div>
                    <ul className="space-y-2.5">
                        {(selectedStepDetails?.whatHappens ?? []).map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                                <span className="text-emerald-500 mt-1">•</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Stage 5 only — the extension tracks, ported from the
                        desktop view that this component now replaces. */}
                    {agent.id === 5 && selectedStepDetails?.extensions && onNavigate && (
                        <div className="mt-3 pt-3 border-t border-slate-200">
                            <div className="text-[13.5px] text-slate-600 flex flex-wrap items-center gap-x-2 gap-y-1">
                                <span className="font-bold text-slate-700">Extension tracks:</span>
                                {selectedStepDetails.extensions
                                    .filter((ext) => ext.url !== 'q-jester')
                                    .map((ext) => (
                                        <button
                                            key={ext.url}
                                            onClick={() => onNavigate(ext.url)}
                                            title={ext.description}
                                            className="cursor-pointer text-indigo-600 hover:text-indigo-800 underline underline-offset-2"
                                        >
                                            {ext.name}
                                        </button>
                                    ))}
                                <button
                                    onClick={() => onNavigate('tools')}
                                    className="cursor-pointer text-slate-500 hover:text-slate-700 underline underline-offset-2"
                                >
                                    All tools
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Prompt Section */}
                <details className="bg-white border border-slate-200 rounded-xl overflow-hidden group shadow-sm" open>
                    <summary className="p-4 cursor-pointer flex items-center justify-between bg-slate-50/50 hover:bg-slate-100 transition-colors select-none">
                        <div className="flex items-center gap-2">
                            <Code size={16} className="text-slate-500" />
                            <h3 className="font-bold text-slate-700 text-sm">Bot Instructions (Prompt)</h3>
                        </div>
                        <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                            <div className="flex bg-white rounded-lg p-0.5 border border-slate-200 shadow-sm" dir="ltr">
                                <button
                                    onClick={() => setPromptLang('he')}
                                    className={`px-2 py-0.5 text-[10px] font-bold rounded transition-colors ${promptLang === 'he' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                >עברית</button>
                                <button
                                    onClick={() => setPromptLang('en')}
                                    className={`px-2 py-0.5 text-[10px] font-bold rounded transition-colors ${promptLang === 'en' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                >English</button>
                            </div>
                        </div>
                    </summary>

                    <div className="p-4 border-t border-slate-200">
                        <div className="bg-slate-900 rounded-xl p-3.5 max-h-[300px] overflow-y-auto custom-scrollbar custom-scrollbar-dark text-sm">
                            <MarkdownRenderer
                                text={agent.id !== null ? (promptLang === 'he' ? (PROMPT_TRANSLATIONS[agent.id] || PROMPT_TEMPLATES[agent.id](rawData).toString()) : (PROMPT_PREVIEWS_EN[agent.id] || PROMPT_TEMPLATES[agent.id](rawData).toString())) : ''}
                                dir={promptLang === 'he' ? 'rtl' : 'ltr'}
                                theme="dark"
                            />
                        </div>

                        {/* Prompt Builder/Consultant */}
                        <div className="mt-4 pt-4 border-t border-slate-100">
                            <p className="text-xs font-bold text-slate-500 mb-2">Customization:</p>
                            <div className="relative">
                                <textarea
                                    className="w-full h-24 p-3 bg-slate-50 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/10 transition-all outline-none text-sm text-slate-700 placeholder:text-slate-400 resize-none"
                                    placeholder="Describe your goal..."
                                    value={consultationInput}
                                    onChange={(e) => setConsultationInput(e.target.value)}
                                />
                                <button
                                    onClick={onConsult}
                                    disabled={isConsulting || !consultationInput.trim()}
                                    className="absolute bottom-2 left-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white px-3 py-1.5 rounded-lg shadow-sm transition-all active:scale-95 flex items-center gap-1.5 font-bold text-xs disabled:cursor-not-allowed"
                                >
                                    {isConsulting ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                                    <span>Build</span>
                                </button>
                            </div>

                            {consultationResult && (() => {
                                const [promptText, explanationText] = consultationResult.includes('---PROMPT_BOUNDARY---')
                                    ? consultationResult.split('---PROMPT_BOUNDARY---')
                                    : [consultationResult, ''];
                                const cleanPrompt = promptText.replace(/^```(markdown|json)?/g, '').replace(/```$/g, '').trim();

                                return (
                                    <div className="mt-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <div className="bg-slate-800 rounded-xl overflow-hidden shadow-sm border border-slate-700">
                                            <div className="bg-slate-900/50 p-2 border-b border-white/5 flex items-center justify-between">
                                                <span className="text-[10px] font-bold text-slate-400 px-2">Result:</span>
                                                <button onClick={() => copyToClipboard(cleanPrompt)} className="text-[10px] bg-white/10 hover:bg-white/20 text-indigo-300 hover:text-white px-2 py-1 rounded transition-colors flex items-center gap-1">
                                                    <Copy size={10} /> Copy
                                                </button>
                                            </div>
                                            <div className="p-3 max-h-[200px] overflow-y-auto custom-scrollbar custom-scrollbar-dark">
                                                <MarkdownRenderer text={cleanPrompt} dir="ltr" theme="dark" />
                                            </div>
                                        </div>
                                        {explanationText && (
                                            <div className="bg-indigo-50 p-3 rounded-xl border border-indigo-100 text-xs text-indigo-900 leading-relaxed">
                                                <span className="font-bold block mb-1">Explanation:</span>
                                                {explanationText.trim()}
                                            </div>
                                        )}
                                        <button onClick={() => setConsultationResult(null)} className="text-xs text-slate-400 hover:text-red-500 w-full text-center py-1">Clear results</button>
                                    </div>
                                );
                            })()}
                        </div>
                    </div>
                </details>
            </div>
        </div>
    );
};
