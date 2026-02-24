import React, { useState } from 'react';
import { Star, MessageSquareLabel, Send, ExternalLink, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const ReviewCTA = () => {
    const [name, setName] = useState('');
    const [review, setReview] = useState('');

    const GOOGLE_REVIEW_LINK = "https://search.google.com/local/writereview?placeid=ChIJhYdRVsVN4DsRWaKFJuZkKtw"; // Placeholder Place ID for Dent O Care Surat

    const handleSubmit = (e) => {
        e.preventDefault();
        // Open Google Review Link in new tab
        window.open(GOOGLE_REVIEW_LINK, "_blank");

        // Clear form (optional)
        setName('');
        setReview('');
    };

    return (
        <section className="py-20 relative overflow-hidden bg-[#0B1120]">
            {/* Background elements */}
            <div className="absolute top-0 inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.1),transparent_70%)]"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl">
                        <div className="flex flex-col lg:flex-row">

                            {/* Left Side: Content */}
                            <div className="lg:w-1/2 p-8 sm:p-12 lg:border-r border-white/10 bg-gradient-to-br from-blue-600/10 to-transparent">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 border border-emerald-500/20">
                                    <Star size={12} className="fill-current" /> Share Your Experience
                                </div>
                                <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 leading-tight">
                                    Love Our Service? <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Leave a Review!</span>
                                </h2>
                                <p className="text-gray-300 text-base mb-8 leading-relaxed">
                                    Your feedback helps us grow and helps others find the best dental care in Surat. It only takes a minute!
                                </p>

                                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 italic text-gray-300 text-sm">
                                    <Quote size={20} className="text-blue-500 shrink-0" />
                                    "I had an amazing experience with Dr. Nimisha. Highly recommend!"
                                </div>
                            </div>

                            {/* Right Side: Form */}
                            <div className="lg:w-1/2 p-8 sm:p-12 bg-white/[0.02]">
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Your Full Name</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="e.g. Rahul Sharma"
                                                required
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full bg-[#1e293b]/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Your Feedback</label>
                                        <textarea
                                            placeholder="Tell us what you liked about your visit..."
                                            required
                                            value={review}
                                            onChange={(e) => setReview(e.target.value)}
                                            rows="3"
                                            className="w-full bg-[#1e293b]/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all resize-none"
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-[#00a859] hover:bg-emerald-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-emerald-900/20 flex items-center justify-center gap-3 group transition-all active:scale-95"
                                    >
                                        <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        Submit on Google
                                        <ExternalLink size={14} className="opacity-50" />
                                    </button>

                                    <p className="text-center text-[10px] text-gray-500 font-medium">
                                        Clicking submit will open our official Google Review page.
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
