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
                <div className="flex items-center justify-center gap-3 mt-4 text-gray-400 text-sm font-bold">
                    <span className="bg-white/5 px-3 py-1 rounded-lg border border-white/5">4.9/5 Rating</span>
                    <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#FACC15" className="text-yellow-400" />)}
                    </div>
                </div>
            </div>

            {/* Marquee Container */}
            <div className="relative w-full marquee-container">
                {/* Gradient Fades */}
                <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-[#0B1120] to-transparent z-20 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-[#0B1120] to-transparent z-20 pointer-events-none"></div>

                {/* Scrolling Track */}
                <div className="flex gap-4 md:gap-6 animate-marquee w-max px-4">
                    {reviews.map((review) => (
                        <div
                            key={review.uniqueId}
                            className="w-[250px] md:w-[320px] bg-[#111827]/80 backdrop-blur-sm rounded-[1.5rem] md:rounded-[1.8rem] p-4 md:p-6 border border-white/5 hover:border-blue-500/30 transition-all duration-500 group flex flex-col justify-between shadow-2xl"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-3 md:mb-4">
                                    <div className="flex flex-col gap-0.5">
                                        <h3 className="text-white font-black text-sm md:text-base tracking-tight group-hover:text-blue-400 transition-colors uppercase leading-tight">{review.name}</h3>
                                        <span className="text-[9px] md:text-[10px] text-gray-500 font-bold uppercase tracking-wider">{review.date}</span>
                                    </div>
                                    <div className="bg-blue-600/20 p-2 md:p-2 rounded-xl md:rounded-2xl text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                        <Quote size={14} fill="currentColor" />
                                    </div>
                                </div>
                                <div className="flex gap-0.5 mb-3 md:mb-4">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <Star key={i} size={10} className="text-yellow-500 fill-yellow-500" />
                                    ))}
                                </div>
                                <p className="text-gray-300 text-xs md:text-[13px] leading-relaxed italic font-medium">
                                    "{review.text}"
                                </p>
                            </div>

                            <div className="mt-4 md:mt-5 pt-4 md:pt-5 border-t border-white/5 flex flex-col gap-3 md:gap-4">
                                {/* Tags if present */}
                                {review.tags && (
                                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                                        {review.tags.slice(0, 3).map((tag, i) => (
                                            <span key={i} className="px-2 py-0.5 md:py-1 bg-blue-500/5 rounded-full text-[8px] md:text-[9px] text-blue-400/80 font-bold border border-blue-500/10">
                                                #{tag.replace(' ', '')}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1 md:gap-1.5 px-2.5 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                                        <BadgeCheck size={10} className="text-emerald-400" />
                                        <span className="text-[8px] md:text-[9px] font-black text-emerald-400 uppercase tracking-widest">Verified</span>
                                    </div>
                                    <span className="text-[8px] md:text-[9px] text-gray-600 font-bold italic tracking-wider">via {review.source}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 50s linear infinite;
                }
                .marquee-container:hover .animate-marquee {
                    animation-play-state: paused;
                }
                @media (max-width: 768px) {
                    .animate-marquee {
                        animation: marquee 35s linear infinite;
                    }
                }
            `}</style>
        </section>
    );
};

export default PatientSpeaks;
