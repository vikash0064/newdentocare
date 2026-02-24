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
            text: "I had an excellent experience with Dr. Nimisha Modi at Dent O Care. The treatment I received was top-notch, and the care and attention to detail were exceptional. Dr. Modi is a skilled professional who made me feel comfortable throughout the entire process. I highly recommend her for anyone in need of dental care.",
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
                    <div className="flex items-center gap-2.5 px-4 py-1.5 bg-yellow-500/10 rounded-full transition-transform hover:scale-105 cursor-default">
                        <span className="text-yellow-500 font-black text-base md:text-lg">4.9/5</span>
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={16} fill="currentColor" className="text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.4)]" />
                            ))}
                        </div>
                    </div>
                    <div className="h-4 w-[1px] bg-white/10 hidden md:block"></div>
                    <span className="text-gray-400 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Trusted Google Rating
                    </span>
                </div>
            </div>

            {/* Elfsight Google Reviews Widget */}
            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="elfsight-app-06768bba-2f23-49e4-ae8c-af01f872fbd9"></div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .elfsight-app-06768bba-2f23-49e4-ae8c-af01f872fbd9 {
                    border-radius: 1.5rem;
                    overflow: hidden;
                }
            ` }} />
        </section>
    );
};

export default PatientSpeaks;
