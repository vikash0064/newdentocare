import React, { useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { IMAGES } from '../constants';

// Use centralized images for scrolling showcase
const scrollingImages = IMAGES.showcase;

const ClinicShowcase = () => {
    const scrollerRef = useRef(null);

    useEffect(() => {
        // Infinite scroll animation
        const scrollerContent = Array.from(scrollerRef.current.children);

        // Clone items for seamless loop
        scrollerContent.forEach(item => {
            const clone = item.cloneNode(true);
            scrollerRef.current.appendChild(clone);
        });

        gsap.to(scrollerRef.current, {
            x: "-50%",
            duration: 30, // Slower for premium feel
            ease: "none",
            repeat: -1,
        });
    }, []);

    return (
        <section className="py-24 md:py-32 bg-[#0B1120] overflow-hidden border-t border-gray-800/30">
            <div className="container mx-auto px-6 mb-16 text-center space-y-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-lg text-[11px] font-semibold text-blue-400">
                    Clinic Environment
                </span>
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none uppercase tracking-[-0.02em]">
                    Our World Class <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Clinic</span>
                </h2>
                <p className="text-gray-500 font-medium text-[11px] md:text-sm tracking-wide opacity-70">A state-of-the-art facility engineered for surgical precision.</p>
            </div>

            <div className="relative w-full overflow-hidden mb-16 px-4">
                <div ref={scrollerRef} className="flex gap-8 w-max">
                    {scrollingImages.map((img, i) => (
                        <div key={i} className="w-[300px] md:w-[450px] h-[250px] md:h-[300px] rounded-[2.5rem] overflow-hidden shrink-0 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.6)] border border-gray-800 group relative">
                            <img
                                src={img}
                                alt="Clinic Interior"
                                loading="lazy"
                                className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                    ))}
                </div>

                {/* Gradients for smooth edges */}
                <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#0B1120] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#0B1120] to-transparent z-10 pointer-events-none"></div>
            </div>

            <div className="text-center">
                <Link to="/gallery" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-[13px] tracking-wide transition-all inline-flex items-center gap-3 group border border-white/10 shadow-2xl shadow-blue-900/40">
                    <span>Explore Gallery Collection</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </section>
    );
};

export default ClinicShowcase;
