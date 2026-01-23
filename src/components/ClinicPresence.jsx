import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ClinicPresence = () => {
    const sectionRef = useRef(null);
    const [isFlipped, setIsFlipped] = useState(false);

    // Auto flip every 4 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setIsFlipped(prev => !prev);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".business-card-container",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 90%",
                        once: true
                    }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-10 sm:py-16 bg-[#0B1120] relative border-t border-white/5 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-blue-500/5 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">Clinic</span>
                    </h2>
                    <p className="text-gray-400 text-sm mt-2">Tap to flip the card</p>
                </div>

                {/* Flip Card Container */}
                <div className="business-card-container flex justify-center">
                    <div
                        className="relative w-full max-w-[600px] aspect-[3/2] cursor-pointer perspective-1000"
                        onClick={() => setIsFlipped(prev => !prev)}
                    >
                        {/* Card Inner - handles the flip */}
                        <div
                            className="relative w-full h-full transition-transform duration-700 ease-in-out"
                            style={{
                                transformStyle: 'preserve-3d',
                                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                            }}
                        >
                            {/* Front Card - Business Card 1 (Dr. Nimisha Modi) */}
                            <div
                                className="absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border border-white/10"
                                style={{ backfaceVisibility: 'hidden' }}
                            >
                                <img
                                    src="/business-card-1.jpg"
                                    alt="Dent O Care - Dr. Nimisha Modi Business Card"
                                    className="w-full h-full object-cover"
                                />
                                {/* Subtle overlay for better integration */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
                            </div>

                            {/* Back Card - Business Card 2 (Branch Details) */}
                            <div
                                className="absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border border-white/10"
                                style={{
                                    backfaceVisibility: 'hidden',
                                    transform: 'rotateY(180deg)'
                                }}
                            >
                                <img
                                    src="/business-card-2.jpg"
                                    alt="Dent O Care - Branch Locations and Timings"
                                    className="w-full h-full object-cover"
                                />
                                {/* Subtle overlay for better integration */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
                            </div>
                        </div>

                        {/* Flip indicator */}
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                            <span className={`w-2 h-2 rounded-full transition-colors duration-300 ${!isFlipped ? 'bg-teal-500' : 'bg-white/30'}`}></span>
                            <span className={`w-2 h-2 rounded-full transition-colors duration-300 ${isFlipped ? 'bg-teal-500' : 'bg-white/30'}`}></span>
                        </div>
                    </div>
                </div>

                {/* Quick Contact Buttons */}
                <div className="flex flex-wrap justify-center gap-3 mt-14">
                    <a
                        href="tel:+917405359271"
                        className="flex items-center gap-2 px-5 py-2.5 bg-teal-600/20 hover:bg-teal-600/30 text-teal-400 border border-teal-500/30 rounded-full text-sm font-bold transition-all hover:scale-105"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                        Call Now
                    </a>
                    <a
                        href="https://www.google.com/maps/place/Dent+O+Care+Advance+Multi-speciality+Implant+Center/@21.1783761,72.7373729,13z/data=!4m6!3m5!1s0x3be04dc957518685:0xdc2a64e62685a25c!8m2!3d21.2110523!4d72.790154!16s%2Fg%2F11vwgw6r6p?entry=ttu&g_ep=EgoyMDI2MDEyMS4wIKXMDSoASAFQAw%3D%3D"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full text-sm font-bold transition-all hover:scale-105"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
                        Get Directions
                    </a>
                </div>
            </div>

            {/* CSS for perspective */}
            <style jsx>{`
                .perspective-1000 {
                    perspective: 1000px;
                }
            `}</style>
        </section>
    );
};

export default ClinicPresence;
