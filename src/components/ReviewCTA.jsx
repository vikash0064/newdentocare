import React, { useState } from 'react';
import { Star, Send, ExternalLink, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const ReviewCTA = () => {
    const [name, setName] = useState('');
    const [review, setReview] = useState('');

    const GOOGLE_REVIEW_LINK = "https://g.page/r/CVyihSbmZCrcEBE/review";

    const handleSubmit = (e) => {
        e.preventDefault();
        // Open Google Review Link in new tab
        window.open(GOOGLE_REVIEW_LINK, "_blank");

        // Clear form (optional)
        setName('');
        setReview('');
    };

    return (
        <section className="py-6 md:py-20 relative overflow-hidden bg-[#0B1120]">
            {/* Background elements */}
            <div className="absolute top-0 inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.06),transparent_70%)]"></div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl">
                        <div className="flex flex-col lg:flex-row">

                            {/* Left Side: Content - Centered and Compact */}
                            <div className="lg:w-1/2 p-5 md:p-12 lg:border-r border-white/10 bg-gradient-to-br from-blue-600/5 to-transparent flex flex-col justify-center">
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-3 md:mb-6 w-fit border border-emerald-500/20">
                                    <Star size={9} className="fill-current" /> Share Experience
                                </div>
                                <h2 className="text-xl md:text-3xl lg:text-4xl font-black text-white mb-2 md:mb-4 leading-tight tracking-tight">
                                    Love Our Service? <br className="hidden md:block" />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Leave a Review!</span>
                                </h2>
                                <p className="hidden md:block text-gray-300 text-base mb-8 leading-relaxed opacity-80">
                                    Your feedback helps us grow and helps others find the best dental care in Surat. It only takes a minute!
                                </p>

                                <div className="hidden lg:flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 italic text-gray-300 text-sm">
                                    <Quote size={20} className="text-blue-500 shrink-0" />
                                    "I had an amazing experience with Dr. Nimisha. Highly recommend!"
                                </div>
                            </div>

                            {/* Right Side: Form - Ultra Tight */}
                            <div className="lg:w-1/2 p-5 md:p-12 bg-white/[0.01]">
                                <form onSubmit={handleSubmit} className="space-y-3 md:space-y-5">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            placeholder="Rahul Sharma"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full bg-[#1e293b]/50 border border-white/10 rounded-xl px-4 py-2.5 md:py-4 text-xs md:text-base text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 transition-all font-medium"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Feedback</label>
                                        <textarea
                                            placeholder="Your experience..."
                                            required
                                            value={review}
                                            onChange={(e) => setReview(e.target.value)}
                                            rows="2"
                                            className="w-full bg-[#1e293b]/50 border border-white/10 rounded-xl px-4 py-2.5 md:py-4 text-xs md:text-base text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 transition-all resize-none font-medium"
                                        ></textarea>
                                    </div>

                                    <div className="pt-1">
                                        <button
                                            type="submit"
                                            className="w-full bg-[#00a859] hover:bg-emerald-600 text-white font-black py-3.5 md:py-5 rounded-xl md:rounded-2xl shadow-xl shadow-emerald-900/10 flex items-center justify-center gap-2 group transition-all active:scale-[0.98]"
                                        >
                                            <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            <span className="text-xs md:text-base">Submit Review</span>
                                            <ExternalLink size={12} className="opacity-40" />
                                        </button>
                                    </div>

                                    <p className="text-center text-[8px] md:text-[10px] text-gray-500 font-bold uppercase tracking-widest opacity-60">
                                        Opens Google Review Page
                                    </p>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReviewCTA;
