import React, { useState } from 'react';
import { Star, Quote, BadgeCheck } from 'lucide-react';

const PatientSpeaks = () => {
    // Real Reviews provided by user
    const sourceReviews = [
        {
            id: 1,
            name: "Patel Chiragkumar Vishnubhai",
            date: "12 Apr 2024",
            rating: 5,
            text: "I had an excellent experience with Dr. Nimisha Modi at Dentocare. The treatment I received was top-notch, and the care and attention to detail were exceptional. Dr. Modi is a skilled professional who made me feel comfortable throughout the entire process. I highly recommend her for anyone in need of dental care.",
            source: "Justdial",
            verified: true
        },
        {
            id: 2,
            name: "Husain Khan",
            date: "21 Sep 2024",
            rating: 5,
            text: "I can recommend Dr Nimisha Modi. Am very happy with the care and patience shown with my dental checkup, cleaning and filling. Thank you Dr Nimisha Modi and support team.",
            tags: ["Professional counselling", "Sterilised equipment", "Quick service"],
            source: "Justdial",
            verified: true
        }
    ];

    // Duplicate reviews to create a smooth marquee effect (creating 8 items)
    const reviews = [...sourceReviews, ...sourceReviews, ...sourceReviews, ...sourceReviews].map((review, index) => ({
        ...review,
        uniqueId: `${review.id}-${index}`
    }));

    return (
        <section className="bg-[#0B1120] py-8 md:py-20 border-t border-white/5 overflow-hidden">
            <div className="container mx-auto px-6 mb-6 md:mb-12 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[9px] md:text-xs font-bold text-blue-400 mb-2 md:mb-4 uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                    Patient Success Stories
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                    What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Patients Say</span>
                </h2>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
                    <a
                        href="https://g.page/r/CVyihSbmZCrcEBE/review"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 px-4 py-1.5 bg-yellow-500/10 rounded-full transition-all hover:scale-105 hover:bg-yellow-500/20 cursor-pointer border border-yellow-500/20"
                    >
                        <span className="text-yellow-500 font-black text-base md:text-lg">4.9/5</span>
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={16} fill="currentColor" className="text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.4)]" />
                            ))}
                        </div>
                    </a>
                    <div className="h-4 w-[1px] bg-white/10 hidden md:block"></div>
                    <span className="text-gray-300 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Trusted Google Rating
                    </span>
                </div>
            </div>

            {/* Elfsight Google Reviews Widget */}
            <div className="container mx-auto px-4 sm:px-6 relative z-10 min-h-[400px]">
                <div className="elfsight-app-06768bba-2f23-49e4-ae8c-af01f872fbd9"></div>

                {/* Secondary CTA for Google Reviews */}
                <div className="mt-12 flex justify-center">
                    <a
                        href="https://g.page/r/CVyihSbmZCrcEBE/review"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-center gap-2 px-8 py-3.5 bg-white/5 hover:bg-emerald-500 rounded-2xl border border-white/10 transition-all font-bold text-sm text-white overflow-hidden active:scale-95 shadow-2xl"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        <Star size={18} className="text-yellow-500 group-hover:text-white" fill="currentColor" />
                        Write your review on Google
                    </a>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .elfsight-app-06768bba-2f23-49e4-ae8c-af01f872fbd9 {
                    border-radius: 2rem;
                    overflow: hidden;
                    background: rgba(255,255,255,0.01);
                }
                [class*="Header__Container"], [class*="Header__Title"], .eapps-google-reviews-header {
                    display: none !important;
                }
            ` }} />
        </section>
    );
};

export default PatientSpeaks;
