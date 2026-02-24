import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Activity, Award, Heart, ShieldCheck, Star, Users, Clock, Calendar, MousePointer2, MessageCircle, Sparkles, Video } from 'lucide-react';
import { IMAGES } from '../constants';

const galleryImages = [
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
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const containerRef = useRef(null);
    const rightSectionRef = useRef(null);
    const headingRef = useRef(null);
    const descRef = useRef(null);
    const buttonsRef = useRef(null);
    const statsContainerRef = useRef(null);

    const whatsappNumber = "916352534650";
    const whatsappMessage = "Hi Dent O Care, I have a query regarding dental treatments.";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

    useEffect(() => {
        const interval = setInterval(nextImage, 6000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();
            tl.fromTo(".status-badge", { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
                .fromTo(headingRef.current.children, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power4.out" }, "-=0.4")
                .fromTo(descRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.6")
                .fromTo(buttonsRef.current.children, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.7)" }, "-=0.6")
                .fromTo(statsContainerRef.current.children, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 }, "-=0.5")
                .fromTo(rightSectionRef.current, { x: 100, opacity: 0, rotateY: 20 }, { x: 0, opacity: 1, rotateY: 0, duration: 1.5, ease: "power3.out" }, "-=1.5");

            gsap.to(".floating-badge", { y: -15, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: 0.5 });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative min-h-screen bg-[#0B1120] pt-20 sm:pt-28 lg:pt-32 pb-20 overflow-hidden flex items-center">
            {/* Background elements */}
            <div className="absolute top-0 inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(37,99,235,0.05),transparent_50%)]"></div>
            <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-blue-600/[0.02] rounded-full blur-[150px]"></div>

            {/* Fine Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

            <div className="container mx-auto px-6 lg:px-16 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* LEFT CONTENT */}
                    <div className="w-full lg:w-1/2 text-left">
                        <div className="status-badge inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 backdrop-blur-md rounded-full mb-6 border border-white/10 shadow-2xl">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-400">Advanced & Painless</span>
                        </div>

                        <div ref={headingRef} className="mb-6 md:mb-8 font-outfit" style={{ fontFamily: 'var(--font-outfit)' }}>
                            <h1 className="font-black text-white leading-[1.1] tracking-tighter relative inline-block">
                                <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] relative">
                                    Best Dental Clinic
                                    <span className="absolute -bottom-1 md:-bottom-2 left-0 w-[70%] h-[4px] md:h-[6px] bg-gradient-to-r from-blue-600 via-blue-400 to-transparent rounded-full shadow-[0_4px_12px_-2px_rgba(37,99,235,0.5)]"></span>
                                    <span className="absolute -bottom-1 md:-bottom-2 left-0 w-[40%] h-[2px] md:h-[3px] bg-white/40 rounded-full blur-[1px]"></span>
                                </span>
                                <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] mt-1 md:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                                    in Surat
                                </span>
                            </h1>
                        </div>

                        <div ref={descRef} className="bg-white/5 backdrop-blur-xl p-5 sm:p-6 rounded-[1.5rem] border border-white/5 mb-8 max-w-lg shadow-inner group transition-all hover:bg-white/[0.08]">
                            <p className="text-gray-300 text-xs sm:text-base md:text-lg leading-relaxed font-medium">
                                Experience revolutionary dental care with our cutting-edge technology.
                                From <span className="text-blue-400 font-bold">AI-smile design</span> to <span className="text-emerald-400 font-bold">pain-free laser</span>.
                            </p>
                        </div>

                        <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 mb-10 w-full px-2 sm:px-0">
                            <Link to="/gallery" aria-label="Open clinical results and photo gallery" className="w-full sm:w-auto bg-[#2563eb] hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-xs sm:text-sm tracking-wide shadow-[0_15px_30px_-10px_rgba(37,99,235,0.4)] transition-all flex items-center justify-center gap-2.5 active:scale-95 group" style={{ fontFamily: 'var(--font-outfit)' }}>
                                <Video size={16} className="text-blue-200" /> View Gallery
                            </Link>
                            <Link to="/treatments" aria-label="Explore dental treatments and services" className="w-full sm:w-auto bg-[#1e293b]/50 hover:bg-[#1e293b] text-white border border-white/10 px-8 py-4 rounded-full font-bold text-xs sm:text-sm tracking-wide transition-all flex items-center justify-center gap-2.5 active:scale-95 hover:border-white/30 group" style={{ fontFamily: 'var(--font-outfit)' }}>
                                Explore Services <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
                            </Link>
                        </div>

                        <div ref={statsContainerRef} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {stats.map((stat, i) => (
                                <div key={i} className="flex flex-col items-center sm:items-start p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors cursor-default">
                                    <div className="text-2xl font-black text-white mb-1"><AnimatedCounter target={stat.target} suffix={stat.suffix} /></div>
                                    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT VISUAL - MATCHING SCREENSHOT */}
                    <div ref={rightSectionRef} className="w-full lg:w-1/2 relative">
                        <div className="relative group perspective-1000">
                            {/* Main Frame */}
                            <div className="relative rounded-[3rem] sm:rounded-[4rem] overflow-hidden border-[12px] border-[#1e293b] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)] bg-[#1e293b] aspect-[4/5] sm:aspect-auto sm:h-[650px]">
                                {galleryImages.map((img, idx) => (
                                    <div key={idx} className={`absolute inset-0 transition-all duration-1000 ${idx === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}>
                                        <img
                                            src={img.src}
                                            alt={`${img.label} - ${img.sub} at Plus Dento Care Surat`}
                                            className={`w-full h-full ${idx === 3 ? 'object-contain p-6 sm:p-12 bg-[#1e293b]' : 'object-cover object-[center_20%]'}`}
                                            width="800"
                                            height="1000"
                                            loading={idx === 0 ? "eager" : "lazy"}
                                            fetchPriority={idx === 0 ? "high" : "low"}
                                            decoding="async"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>

                                        {/* Bottom Label */}
                                        <div className="absolute bottom-10 left-10 right-10">
                                            <h3 className="text-3xl font-black text-white mb-2 tracking-tight">{img.label}</h3>
                                            <p className="text-gray-300 font-bold text-sm tracking-wide">{img.sub}</p>
                                        </div>
                                    </div>
                                ))}

                                {/* Arrows */}
                                <div className="absolute top-1/2 -translate-y-1/2 left-6">
                                    <button onClick={prevImage} aria-label="Previous clinic image" className="w-12 h-12 bg-black/40 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-all border border-white/10 active:scale-90 shadow-2xl">
                                        <ChevronLeft size={24} />
                                    </button>
                                </div>
                                <div className="absolute top-1/2 -translate-y-1/2 right-6">
                                    <button onClick={nextImage} aria-label="Next clinic image" className="w-12 h-12 bg-black/40 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-all border border-white/10 active:scale-90 shadow-2xl">
                                        <ChevronRight size={24} />
                                    </button>
                                </div>

                                {/* Slide Indicator */}
                                <div className="absolute bottom-10 right-10 bg-black/40 backdrop-blur-xl px-4 py-2 rounded-xl border border-white/10">
                                    <span className="text-white font-black tracking-widest text-sm">{currentImageIndex + 1} / {galleryImages.length}</span>
                                </div>
                            </div>

                            {/* Floating Badges */}
                            <div className="floating-badge absolute -top-8 -right-8 z-20 bg-[#1e293b] p-5 rounded-3xl border border-white/10 shadow-3xl hidden md:flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-blue-600/20 flex items-center justify-center text-blue-400">
                                    <Activity size={24} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 leading-none">Featured</p>
                                    <p className="text-white font-black text-base leading-none">Latest Tech</p>
                                </div>
                            </div>

                            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex flex-row gap-2 sm:gap-4 w-[95%] sm:w-[85%] z-20">
                                <div className="floating-badge flex-1 bg-[#1e293b]/90 backdrop-blur-xl p-3 sm:p-5 rounded-2xl sm:rounded-3xl border border-white/10 shadow-3xl flex items-center gap-2 sm:gap-4">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400 shrink-0">
                                        <ShieldCheck size={16} className="sm:size-[20px]" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[8px] sm:text-[9px] font-black text-blue-400 uppercase tracking-widest mb-0.5 sm:mb-1 leading-none">Certified</p>
                                        <p className="text-white font-black text-[10px] sm:text-sm leading-none truncate">JCI Accredited</p>
                                    </div>
                                </div>
                                <div className="floating-badge flex-1 bg-[#1e293b]/90 backdrop-blur-xl p-3 sm:p-5 rounded-2xl sm:rounded-3xl border border-white/10 shadow-3xl flex items-center gap-2 sm:gap-4">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                                        <Star size={16} className="sm:size-[20px]" fill="currentColor" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[8px] sm:text-[9px] font-black text-amber-500 uppercase tracking-widest mb-0.5 sm:mb-1 leading-none">Top Rated</p>
                                        <p className="text-white font-black text-[10px] sm:text-sm leading-none truncate">4.9/5 Reviews</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Mouse Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-3 opacity-30">
                <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
                    <div className="w-1 h-2 bg-white rounded-full animate-bounce"></div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
