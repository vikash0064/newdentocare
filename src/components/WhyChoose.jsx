import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Monitor, Heart, Award, Zap, Building2, UserCheck, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Helper for Icons
const SmileIcon = ({ size, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
        <line x1="9" y1="9" x2="9.01" y2="9"></line>
        <line x1="15" y1="9" x2="15.01" y2="9"></line>
    </svg>
);

const WhyChoose = () => {
    const sectionRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    const images = [
        "https://res.cloudinary.com/dyc1drqpy/image/upload/v1768734850/dr-nimisha-modi-palanpur-patia-surat-dentists-l8zz3a59je_glhdvx.jpg",
        "https://res.cloudinary.com/dyc1drqpy/image/upload/v1768736707/-6o48ecgfmp-250_j0uvqw.jpg",
        "https://res.cloudinary.com/dyc1drqpy/image/upload/v1768732143/dr-nimisha-modi-palanpur-patia-surat-dentists-y5jv3ezypp_siu6kx.avif",
        "https://res.cloudinary.com/dyc1drqpy/image/upload/v1768732155/dr-nimisha-modi-palanpur-patia-surat-dentists-s2hw4zs0aa_kn395q.avif"
    ];

    // Simplified image hydration
    useEffect(() => {
        setImagesLoaded(true);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 4000);

        const ctx = gsap.context(() => {
            gsap.from(".fade-up-item", {
                y: 20,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                }
            });
        }, sectionRef);

        return () => {
            clearInterval(timer);
            ctx.revert();
        };
    }, [images.length]);

    const features = [
        {
            title: "World Class Tech",
            icon: Zap,
            color: "text-blue-400",
            borderColor: "border-l-blue-500",
            items: ["Advanced Laser Dental Tech", "Globally certified materials", "3D Intraoral Precision Scanning"]
        },
        {
            title: "Patient Centric",
            icon: UserCheck,
            color: "text-emerald-400",
            borderColor: "border-l-emerald-500",
            items: ["Direct Doctor Consultation", "Personalized Digital Planning", "Proactive Post-Care Support"]
        },
        {
            title: "Legacy & Scale",
            icon: SmileIcon,
            color: "text-blue-400",
            borderColor: "border-l-blue-500",
            items: ["10,000+ Successful Smiles", "Expertise in Complex Rehabs", "5,000+ Dental Implants Placed"]
        },
        {
            title: "Safety Unmatched",
            icon: ShieldCheck,
            color: "text-emerald-400",
            borderColor: "border-l-emerald-500",
            items: ["10X ISO Safety Protocols", "Multi-Step Sterilization Cycle", "Modern Hygienic Infrastructure"]
        }
    ];

    return (
        <section ref={sectionRef} id="why-choose" className="pt-20 pb-16 sm:pt-24 sm:pb-24 bg-[#0B1120] relative overflow-hidden z-10 border-t border-white/5">
            {/* Background Blur Decor */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[120px] -z-10 opacity-60"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-600/5 rounded-full blur-[120px] -z-10 opacity-60"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-20">
                {/* Header - Always Visible & Positioned Safely */}
                <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 px-2 fade-up-item">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4 group cursor-default">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                        <span className="text-[9px] sm:text-[10px] font-bold text-blue-400 uppercase tracking-widest">Trusted by 10,000+ Families</span>
                    </div>
                    <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-6 tracking-tight leading-tight">
                        Why Choose <span className="text-blue-500">Dent O Care?</span>
                    </h2>
                    <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
                        Experience expert dental care and clinical excellence. We are Surat's trusted choice for a healthy, beautiful smile.
                    </p>
                </div>

                {/* Main Content */}
                <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">

                    {/* Left: Premium Image Slider with Text Overlay */}
                    <div className="lg:col-span-5 order-1 w-full min-h-[350px] sm:min-h-[400px] lg:min-h-[500px] relative z-20 fade-up-item">
                        <div className="relative h-[350px] sm:h-[400px] lg:h-full w-full rounded-2xl lg:rounded-[2rem] overflow-hidden shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] border-4 border-gray-800 bg-[#0f172a]">

                            {/* Loading State Overlay */}
                            {!imagesLoaded && (
                                <div className="absolute inset-0 flex items-center justify-center bg-[#0f172a] z-50 transition-opacity duration-500">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                                        <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Loading Clinic...</span>
                                    </div>
                                </div>
                            )}

                            <div className="relative w-full h-full z-10">
                                {images.map((src, idx) => (
                                    <div
                                        key={idx}
                                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                                    >
                                        <img
                                            src={src}
                                            alt={`Plus Dento Care Clinic Environment ${idx + 1} Surat - Expert Care by Dr. Nimisha Modi`}
                                            className="w-full h-full object-cover"
                                            width="600"
                                            height="450"
                                            loading="lazy"
                                            decoding="async"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='%231e293b'%3E%3Crect width='400' height='300'/%3E%3Ctext x='200' y='150' font-family='Arial' font-size='16' fill='%2394a3b8' text-anchor='middle' dominant-baseline='middle'%3EImage Unavailable%3C/text%3E%3C/svg%3E";
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120]/90 via-[#0B1120]/20 to-transparent"></div>
                                    </div>
                                ))}
                            </div>

                            {/* Text Overlay */}
                            <div className="absolute inset-0 flex items-end p-5 sm:p-6 z-20 pointer-events-none">
                                <div className="text-left w-full">
                                    <p className="font-extrabold text-xl sm:text-2xl text-white mb-0.5">Clinic Excellence</p>
                                    <p className="text-blue-400 font-bold text-[10px] sm:text-xs tracking-widest uppercase">Certified Standards</p>
                                </div>
                            </div>

                            {/* Slider Progress Dots */}
                            <div className="absolute bottom-5 right-5 sm:bottom-6 sm:right-6 flex gap-1.5 z-30">
                                {images.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentIndex(i)}
                                        className={`h-1 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-6 bg-blue-500' : 'w-2 bg-white/30 hover:bg-white/50'}`}
                                        aria-label={`Go to slide ${i + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Feature Grid - Always Visible */}
                    <div className="lg:col-span-7 order-2 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                        {features.map((feature, idx) => (
                            <div key={idx} className={`fade-up-item bg-slate-900/40 backdrop-blur-xl p-5 sm:p-6 rounded-xl lg:rounded-2xl border-l-4 ${feature.borderColor} border border-white/5 transition-all duration-300 hover:bg-slate-900/60`}>
                                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                                    <div className="p-2 rounded-lg sm:rounded-xl bg-white/5">
                                        <feature.icon size={18} className={feature.color} />
                                    </div>
                                    <h3 className="text-base sm:text-lg font-black text-white">{feature.title}</h3>
                                </div>
                                <ul className="space-y-2.5 sm:space-y-3">
                                    {feature.items.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2.5 sm:gap-3">
                                            <CheckCircle2 size={12} className="text-emerald-500 mt-1 shrink-0" />
                                            <span className="text-xs sm:text-sm text-slate-300 font-medium leading-snug">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default WhyChoose;