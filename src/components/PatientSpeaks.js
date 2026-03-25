"use client";
import React from 'react';
import { Star, BadgeCheck, ArrowRight } from 'lucide-react';

const PatientSpeaks = () => {
    return (
        <section className="bg-[#0B1120] py-12 md:py-24 border-t border-white/[0.04] overflow-hidden reviews-section">
            <div className="container mx-auto px-6 mb-12 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] md:text-xs font-bold text-blue-400 mb-6 uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                    Patient Success Stories
                </div>
                
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
                    What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Patients Say</span>
                </h2>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8">
                    <div className="flex items-center gap-3 px-5 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-2xl shadow-xl">
                        <span className="text-yellow-500 font-black text-xl md:text-2xl">4.9/5</span>
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={16} fill="currentColor" className="text-yellow-500" />
                            ))}
                        </div>
                    </div>
                    <div className="h-6 w-[1px] bg-white/10 hidden md:block"></div>
                    <span className="text-gray-400 text-[10px] md:text-xs font-black uppercase tracking-[0.25em] flex items-center gap-2">
                        <BadgeCheck size={16} className="text-emerald-500" />
                        Trusted Google Rating
                    </span>
                </div>
            </div>

            {/* Elfsight Google Reviews Widget Container - With Exact requested Overlay */}
            <div className="container mx-auto px-4 sm:px-6 relative z-10 mb-20">
                <div className="text-center mb-10">
                    <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] mb-4">Syncing with Google Business</p>
                    <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-gray-800 to-transparent mx-auto"></div>
                </div>

                {/* THE SPECIFIC OVERLAY DIV REQUESTED BY USER */}
                <div className="Background__Overlay-sc-fd94690c-2 jtZZdl es-background-overlay" style={{ display: 'block', backgroundColor: 'rgba(255, 255, 255, 0)' }}></div>

                {/* Elfsight Widget */}
                <div className="elfsight-app-06768bba-2f23-49e4-ae8c-af01f872fbd9"></div>

                <div className="mt-16 flex flex-col items-center gap-6">
                    <a
                        href="https://g.page/r/CVyihSbmZCrcEBE/review"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-center gap-3 px-10 py-4 bg-blue-600 hover:bg-emerald-500 text-white rounded-2xl transition-all font-black text-xs uppercase tracking-[0.2em] shadow-[0_20px_40px_-15px_rgba(37,99,235,0.3)] active:scale-95 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        <Star size={16} fill="currentColor" />
                        Write your review on Google
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                    <p className="text-gray-600 text-[9px] font-black uppercase tracking-widest">Verification Status: Verified by Google Business Profiles</p>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .elfsight-app-06768bba-2f23-49e4-ae8c-af01f872fbd9 {
                    border-radius: 3rem;
                    overflow: hidden;
                    background: rgba(255,255,255,0.01);
                    min-height: 480px;
                }
                
                .es-background-overlay {
                    position: absolute;
                    inset: 0;
                    z-index: 10;
                    pointer-events: none;
                }
            ` }} />
        </section>
    );
};

export default PatientSpeaks;
