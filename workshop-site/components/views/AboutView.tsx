import React from 'react';
import { Cpu, CheckCircle2, Zap, BookOpen, ExternalLink, Eye, Layers, Users, Sparkles, Share2 } from 'lucide-react';
import { LAB_TEAM, EXPERIENCE_COMPONENTS } from '../../constants';

export interface AboutViewProps {
    onNavigate?: (route: string) => void;
    hideHeader?: boolean;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, hideHeader = false }) => {
    const handleNavigate = (route: string) => {
        if (onNavigate) {
            onNavigate(route);
        }
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-white" dir="ltr">
            <div className="pt-2 pb-6 px-6 md:pt-3 md:pb-8 md:px-8 max-w-2xl mx-auto w-full space-y-2">
                {/* Header Section - hidden when inside modal */}
                {!hideHeader && (
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-md shrink-0">
                            <Cpu size={24} />
                        </div>
                        <div>
                            <h2 className="font-black text-xl text-slate-900 leading-tight">
                                Resource Center
                            </h2>
                            <p className="text-sm text-slate-500 font-medium">
                                InSites-CAA Workshops — Significance Assessment
                            </p>
                        </div>
                    </div>
                )}

                <div className="text-left">
                    <div className="text-sm text-slate-600 leading-relaxed mb-6 space-y-4">
                        <p>
                            InSites-CAA is an experimental AI tool supporting cultural significance assessment of heritage assets using the
                            <span className="font-bold text-indigo-700">
                          &nbsp; CBSA
                         </span> <br/> <span className="font-bold text-indigo-700">
                          (Context Based Significance Assessment)
                            </span>.
                        </p>
                        <p>
                            The system is developed for research purposes by Dr. Yael Alef and Yuval Shafriri, and will be integrated into <b>InSites</b> — a new research lab at the Faculty of Architecture, Technion. The lab investigates assessment aspects of heritage assets, for decision-making on their integration into planning and understanding their place in culture, society, and community.
                        </p>
                    </div>

                    {/* Lab Team */}
                    <div className="space-y-3 mb-6">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Lab Team</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {LAB_TEAM.map((member) => (
                                <div key={member.name} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                                    <h4 className="font-bold text-sm text-slate-800">{member.name}</h4>
                                    <p className="text-[11px] text-indigo-600 font-medium">{member.role}</p>
                                    <p className="text-[11px] text-slate-500 mt-0.5">{member.affiliation}</p>
                                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{member.bio}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Experience Components */}
                    <div className="space-y-3 mb-6">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">5 Experience Components</h3>
                        <div className="space-y-2">
                            {EXPERIENCE_COMPONENTS.map((comp, idx) => {
                                const icons: Record<string, React.ReactNode> = {
                                    layers: <Layers size={14} />,
                                    users: <Users size={14} />,
                                    eye: <Eye size={14} />,
                                    sparkles: <Sparkles size={14} />,
                                    share: <Share2 size={14} />,
                                };
                                return (
                                    <div key={comp.label} className="flex items-center gap-3 p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                                        <div className="w-7 h-7 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center shrink-0 text-xs font-black">
                                            {icons[comp.icon] || (idx + 1)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-xs text-slate-800">{comp.label}</h4>
                                            <p className="text-[11px] text-slate-500">{comp.description}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">What's on this site?</h3>

                        <button
                            onClick={() => handleNavigate('step-0')}
                            className="w-full flex items-start gap-4 p-4 bg-slate-50 hover:bg-emerald-50 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-all group cursor-pointer text-left"
                        >
                            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl shrink-0 group-hover:scale-110 transition-transform">
                                <CheckCircle2 size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-base text-slate-800 mb-1">Assessment Stages Framework</h4>
                                <p className="text-sm text-slate-500 leading-snug">
                                    The structured assessment process in InSites-CAA. Click on each stage to see its rationale and prompt summary.
                                </p>
                            </div>
                        </button>

                        <button
                            onClick={() => handleNavigate('tools')}
                            className="w-full flex items-start gap-4 p-4 bg-slate-50 hover:bg-indigo-50 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-all group cursor-pointer text-left"
                        >
                            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-xl shrink-0 group-hover:scale-110 transition-transform">
                                <Zap size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-base text-slate-800 mb-1">Process Extensions</h4>
                                <p className="text-sm text-slate-500 leading-snug">Knowledge graph, visual analysis, collection analysis and extension query prompts for the bot.</p>
                            </div>
                        </button>

                        <button
                            onClick={() => handleNavigate('design')}
                            className="w-full flex items-start gap-4 p-4 bg-slate-50 hover:bg-rose-50 rounded-2xl border border-slate-100 hover:border-rose-200 transition-all group cursor-pointer text-left"
                        >
                            <div className="p-2 bg-rose-100 text-rose-600 rounded-xl shrink-0 group-hover:scale-110 transition-transform">
                                <Eye size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-base text-slate-800 mb-1">Design Principles</h4>
                                <p className="text-sm text-slate-500 leading-snug">
                                    Epistemic notation, governance framework, and session debrief — how transparency and control work in InSites-CAA.
                                </p>
                            </div>
                        </button>

                        <button
                            onClick={() => handleNavigate('home')}
                            className="w-full flex items-start gap-4 p-4 bg-slate-50 hover:bg-amber-50 rounded-2xl border border-slate-100 hover:border-amber-200 transition-all group cursor-pointer text-left"
                        >
                            <div className="p-2 bg-amber-100 text-amber-600 rounded-xl shrink-0 group-hover:scale-110 transition-transform">
                                <BookOpen size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-base text-slate-800 mb-1 flex items-center gap-2">
                                    Resources
                                </h4>
                                <p className="text-sm text-slate-500 leading-snug">Links to the bot, the GitHub project, demos and inspiration.</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutView;
