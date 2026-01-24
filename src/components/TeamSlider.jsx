import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Users } from 'lucide-react';

const teamSlides = [
    {
        url: "/assets/team/team-1.jpg",
        title: "Our Clinical Experts",
        description: "A team dedicated to providing compassionate and professional dental care."
    },
    {
        url: "/assets/team/team-2.jpg",
        title: "Excellence in Action",
        description: "Ongoing training and advanced technology ensure the best results for our patients."
    }
];

const TeamSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % teamSlides.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + teamSlides.length) % teamSlides.length);
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="pb-20 pt-4 bg-transparent relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-6 md:mb-10">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-3">
                        <Users size={12} className="text-emerald-400" />
                        <span className="text-[9px] md:text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Our Collective Strength</span>
                    </div>
                    <h2 className="text-xl md:text-5xl font-black text-white mb-2 md:mb-4">The <span className="text-emerald-400">Dent O Care</span> Team</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto font-medium text-xs md:text-base">Coming together is a beginning; keeping together is progress; working together is success.</p>
                </div>

                <div className="relative max-w-6xl mx-auto aspect-[4/3] md:aspect-[21/9] rounded-2xl md:rounded-[2.5rem] overflow-hidden group shadow-2xl border border-white/5">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="absolute inset-0"
                        >
                            <img
                                src={teamSlides[currentIndex].url}
                                alt={teamSlides[currentIndex].title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/20 to-transparent"></div>

                            <div className="absolute bottom-6 left-6 right-6 md:bottom-16 md:left-16">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <h3 className="text-lg md:text-4xl font-black text-white mb-1 md:mb-2">{teamSlides[currentIndex].title}</h3>
                                    <p className="text-gray-300 text-xs md:text-lg max-w-xl font-medium">{teamSlides[currentIndex].description}</p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white hover:bg-emerald-500 transition-all opacity-0 group-hover:opacity-100 z-10"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white hover:bg-emerald-500 transition-all opacity-0 group-hover:opacity-100 z-10"
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {teamSlides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentIndex(i)}
                                className={`w-2 h-2 rounded-full transition-all ${currentIndex === i ? 'w-8 bg-emerald-400' : 'bg-white/30'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TeamSlider;
