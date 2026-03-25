"use client";
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight, Activity, Award, Heart, ShieldCheck, Star, Users, Clock, Video, ArrowRight } from 'lucide-react';
import { IMAGES } from '../constants';

import { useData } from '../context/DataContext';

const DEFAULT_SLIDES = [
    { src: IMAGES.slides.slide1, label: "Modern Clinic View", sub: "Advanced facilities for all treatments" },
    { src: IMAGES.slides.slide2, label: "Surgical Suite", sub: "Sterile & high-tech environment" },
    { src: IMAGES.slides.slide3, label: "Consultation Hub", sub: "Where your transformation begins" },
    { src: IMAGES.slides.slide4, label: "Digital Workflow", sub: "Precision diagnostics & mapping" }
];

const stats = [
    { value: "10K+", label: "Happy Patients", icon: Users, target: 10, suffix: "K+" },
    { value: "12+", label: "Years Experience", icon: Award, target: 12, suffix: "+" },
    { value: "98%", label: "Success Rate", icon: Heart, target: 98, suffix: "%" },
    { value: "24/7", label: "Emergency Care", icon: Clock, target: 24, suffix: "/7" }
];

const AnimatedCounter = ({ target, suffix, duration = 2 }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        const obj = { value: 0 };
        gsap.to(obj, {
            value: target,
            duration: duration,
            ease: "power2.out",
            onUpdate: () => setCount(Math.floor(obj.value))
        });
    }, [target, duration]);
    return <span className="tabular-nums">{count}{suffix}</span>;
};

const Hero = () => {
    const context = useData();
    const { galleryImages = [] } = context || {};
    
    const dynamicSlides = galleryImages
        .filter(img => img.category === 'Hero')
        .map(img => ({
            src: img.url,
            label: img.title || "Dentocare Excellence",
            sub: img.author || "Advanced Dental Care"
        }));

    const activeGallery = dynamicSlides.length > 0 ? dynamicSlides : DEFAULT_SLIDES;

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const containerRef = useRef(null);
    const rightSectionRef = useRef(null);
    const headingRef = useRef(null);
    const descRef = useRef(null);
    const buttonsRef = useRef(null);
    const statsContainerRef = useRef(null);

    const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % activeGallery.length);
    const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + activeGallery.length) % activeGallery.length);

    useEffect(() => {
        const interval = setInterval(nextImage, 6000);
        return () => clearInterval(interval);
    }, [activeGallery.length]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

            tl.fromTo(".status-badge", { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
                .fromTo(headingRef.current.children, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power4.out" }, "-=0.4")
                .fromTo(descRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.6")
                .fromTo(buttonsRef.current.children, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.7)" }, "-=0.6")
                .fromTo(statsContainerRef.current.children, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 }, "-=0.5")
                .from(rightSectionRef.current, { x: 60, opacity: 0, duration: 1.2, ease: "power3.out" }, "-=1.2");

            gsap.to(".floating-badge", { y: -15, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: 0.5 });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative min-h-screen bg-[#0B1120] pt-20 sm:pt-28 lg:pt-32 pb-20 overflow-hidden flex items-center">
            <div className="absolute top-0 inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(37,99,235,0.05),transparent_50%)]"></div>
            <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-blue-600/[0.02] rounded-full blur-[150px]"></div>

            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

            <div className="container mx-auto px-6 lg:px-16 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    <div className="w-full lg:w-1/2 text-left">
                        <div className="status-badge inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 backdrop-blur-md rounded-full mb-6 border border-white/10 shadow-2xl">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-400">Advanced & Painless</span>
                        </div>

                        <div ref={headingRef} className="mb-6 md:mb-8 font-outfit" style={{ fontFamily: 'var(--font-outfit)' }}>
                            <h1 className="font-black text-white leading-[1.1] tracking-tighter relative inline-block text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem]">
                                Best Dental Clinic in Surat
                                <span className="absolute -bottom-1 md:-bottom-2 left-0 w-[70%] h-[4px] md:h-[6px] bg-gradient-to-r from-blue-600 via-blue-400 to-transparent rounded-full shadow-[0_4px_12px_-2px_rgba(37,99,235,0.5)]"></span>
                            </h1>
                        </div>

                        <div ref={descRef} className="bg-white/5 backdrop-blur-xl p-5 sm:p-6 rounded-[1.5rem] border border-white/5 mb-8 max-w-lg shadow-inner group transition-all hover:bg-white/[0.08]">
                            <p className="text-gray-300 text-xs sm:text-base md:text-lg leading-relaxed font-medium">
                                Get professional dental care with the latest technology in Surat.
                                From AI smile design to painless laser treatments, we ensure a perfect smile.
                            </p>
                        </div>

                        <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 mb-10 w-full px-2 sm:px-0">
                            <Link href="/gallery" aria-label="Open clinic gallery" className="w-full sm:w-auto bg-[#2563eb] hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-xs sm:text-sm tracking-wide shadow-[0_15px_30px_-10px_rgba(37,99,235,0.4)] transition-all flex items-center justify-center gap-2.5 group">
                                <Video size={16} className="text-blue-200" /> View Gallery
                            </Link>
                            <Link href="/treatments" aria-label="Explore dental treatments" className="w-full sm:w-auto bg-[#1e293b]/50 hover:bg-[#1e293b] text-white border border-white/10 px-8 py-4 rounded-full font-bold text-xs sm:text-sm tracking-wide transition-all flex items-center justify-center gap-2.5 group">
                                Explore Services <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
                            </Link>
                        </div>

                        <div ref={statsContainerRef} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {stats.map((stat, i) => (
                                <div key={i} className="flex flex-col items-center sm:items-start p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                                    <div className="text-2xl font-black text-white mb-1"><AnimatedCounter target={stat.target} suffix={stat.suffix} /></div>
                                    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div ref={rightSectionRef} className="w-full lg:w-1/2 relative">
                        <div className="relative group perspective-1000">
                            <div className="relative rounded-[3rem] sm:rounded-[4rem] overflow-hidden border-[12px] border-[#1e293b] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)] bg-[#1e293b] aspect-[4/5] sm:aspect-[4/5] lg:h-[650px] w-full max-w-[500px] mx-auto lg:mx-0">
                                {activeGallery.map((img, idx) => (
                                     <div key={idx}
                                         className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
                                         style={{ willChange: 'opacity' }}>
                                         <Image
                                             src={img.src}
                                             alt={img.label}
                                             title={img.label}
                                             className="w-full h-full object-cover object-center"
                                             width={500}
                                             height={625}
                                             priority={idx === 0}
                                             loading={idx === 0 ? undefined : "lazy"}
                                         />
                                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>

                                         <div className="absolute bottom-10 left-10 right-10">
                                             <h3 className="text-3xl font-black text-white mb-2 tracking-tight">{img.label}</h3>
                                             <p className="text-gray-300 font-bold text-sm tracking-wide">{img.sub}</p>
                                         </div>
                                     </div>
                                 ))}

                                 <div className="absolute top-1/2 -translate-y-1/2 left-6">
                                     <button onClick={prevImage} aria-label="Previous image" className="w-12 h-12 bg-black/40 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-all border border-white/10">
                                         <ChevronLeft size={24} />
                                     </button>
                                 </div>
                                 <div className="absolute top-1/2 -translate-y-1/2 right-6">
                                     <button onClick={nextImage} aria-label="Next image" className="w-12 h-12 bg-black/40 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-all border border-white/10">
                                         <ChevronRight size={24} />
                                     </button>
                                 </div>

                                 <div className="absolute bottom-10 right-10 bg-black/40 backdrop-blur-xl px-4 py-2 rounded-xl border border-white/10">
                                     <span className="text-white font-black tracking-widest text-sm">{currentImageIndex + 1} / {activeGallery.length}</span>
                                 </div>
                            </div>

                            <div className="floating-badge absolute -top-8 -right-8 z-20 bg-[#1e293b] p-5 rounded-3xl border border-white/10 shadow-3xl hidden md:flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-blue-600/20 flex items-center justify-center text-blue-400">
                                    <Activity size={24} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 leading-none">Featured</p>
                                    <p className="text-white font-black text-base leading-none">Latest Tech</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
