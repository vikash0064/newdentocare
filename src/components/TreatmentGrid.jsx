import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    CheckCircle2, ShieldCheck, Zap, Smile,
    Activity, Hammer, PenTool, Calendar,
    ArrowRight, ArrowUpRight, Star, Users, Phone, MapPin, Award
} from 'lucide-react';

import { IMAGES } from '../constants';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
    prosthetics: Activity,
    restoration: Zap,
    extraction: Hammer,
    rct: CheckCircle2,
    implants: PenTool,
    surgery: ShieldCheck,
    gum: Smile,
    checkup: Calendar
};

const treatments = IMAGES.TREATMENT_CONTENT.map(item => ({
    ...item,
    icon: iconMap[item.id] || Activity,
    image: IMAGES.treatments[item.imageKey]
}));

// Counter Animation Component
const AnimatedCounter = ({ target, suffix, duration = 2, isDecimal = false }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const obj = { value: 0 };
        gsap.to(obj, {
            value: target,
            duration: duration,
            ease: "power2.out",
            onUpdate: () => {
                if (isDecimal) {
                    setCount(obj.value.toFixed(1));
                } else {
                    setCount(Math.floor(obj.value));
                }
            }
        });
    }, [target, duration, isDecimal]);

    return <span>{count}{suffix}</span>;
};

const TreatmentGrid = () => {
    const navigate = useNavigate();
    const statsRef = useRef(null);
    const [startCounter, setStartCounter] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(statsRef.current, {
                opacity: 0,
                y: 20,
                duration: 0.8,
                scrollTrigger: {
                    trigger: statsRef.current,
                    start: "top 90%",
                    onEnter: () => setStartCounter(true),
                    once: true
                }
            });
        }, statsRef);
        return () => ctx.revert();
    }, []);

    const stats = [
        { value: "10K+", label: "Happy Patients", icon: Users, target: 10, suffix: "K+" },
        { value: "12+", label: "Years Experience", icon: Award, target: 12, suffix: "+" },
        { value: "02", label: "Modern Branches", icon: MapPin, target: 2, suffix: "" },
        { value: "4.9/5", label: "Google Rating", icon: Star, target: 4.9, suffix: "/5", isDecimal: true }
    ];

    return (
        <section className="py-10 sm:py-12 lg:py-12 bg-[#0B1120] text-white overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-16">

                {/* Header */}
                <div className="text-center mb-8 sm:mb-10">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-2 tracking-tight">
                        Our <span className="text-blue-500">Treatments</span>
                    </h2>
                    <p className="text-gray-300 text-xs sm:text-sm lg:text-base font-medium max-w-xl mx-auto leading-relaxed px-2 sm:px-4">
                        Expert dental care for all your needs
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
                    {treatments.map((t, i) => (
                        <Link
                            key={i}
                            to={t.link}
                            className="group relative p-3 sm:p-5 rounded-[1rem] sm:rounded-[1.5rem] bg-[#1e293b]/20 backdrop-blur-xl border border-white/5 overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl min-h-[180px] sm:h-[220px] flex flex-col"
                        >
                            {/* Shiny Effect Overlay */}
                            <div className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-150%] animate-shine"></div>
                            </div>

                            {/* Background Image/Pattern */}
                            <div className="absolute inset-0 z-0 opacity-50 group-hover:opacity-70 transition-opacity duration-500">
                                <img
                                    src={t.image}
                                    alt={`${t.name} - ${t.subtitle} at Plus Dento Care Surat`}
                                    title={`${t.name} Treatment`}
                                    itemProp="image"
                                    className="w-full h-full object-cover object-center"
                                    width="400"
                                    height="300"
                                    loading="lazy"
                                    decoding="async"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/60 to-transparent"></div>
                            </div>

                            {/* Top Info */}
                            <div className="relative z-10 flex justify-between items-start mb-auto">
                                <div className="p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl bg-[#0B1120]/60 backdrop-blur-md border border-white/10 text-white font-bold group-hover:bg-blue-600 transition-colors">
                                    <t.icon size={14} className="sm:w-[18px] sm:h-[18px]" />
                                </div>
                                <div className="p-1 sm:p-2 rounded-lg text-gray-400 bg-white/5 opacity-40 group-hover:opacity-100 group-hover:text-white transition-all">
                                    <ArrowUpRight size={12} className="sm:w-[14px] sm:h-[14px]" />
                                </div>
                            </div>

                            {/* Text Content - Compact */}
                            <div className="relative z-10 mt-2 sm:mt-4">
                                <div className="text-[9px] sm:text-[11px] font-semibold text-blue-400 tracking-wide mb-0.5 sm:mb-1">{t.subtitle}</div>
                                <h3 className="text-sm sm:text-lg font-bold text-white mb-0.5 sm:mb-1 leading-tight">{t.name}</h3>
                                <p className="text-[8px] sm:text-[10px] text-gray-300 leading-relaxed font-medium mb-1.5 sm:mb-3 line-clamp-2">
                                    {t.description}
                                </p>

                                <div className="flex items-center gap-1 sm:gap-2 text-[9px] sm:text-[11px] font-semibold tracking-wide text-blue-400 group-hover:gap-3 transition-all duration-300">
                                    <span>{t.name} Details</span> <ArrowRight size={10} className="sm:w-3 sm:h-3 mt-0.5" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Bottom Stats & Help Section */}
                <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-white/5">
                    {/* Stats Row */}
                    <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10 px-2 sm:px-4">
                        {stats.map((stat, i) => (
                            <div key={i} className="group relative p-3 sm:p-4 rounded-xl bg-[#1e293b]/20 border border-white/5 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg flex flex-col items-center text-center backdrop-blur-sm">
                                <div className="mb-1.5 sm:mb-2 p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-blue-500/10 text-blue-500 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                                    <stat.icon size={18} className="sm:w-5 sm:h-5" />
                                </div>
                                <div className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-0.5 sm:mb-1 tracking-tight">
                                    {startCounter ? <AnimatedCounter target={stat.target} suffix={stat.suffix} duration={2} isDecimal={stat.isDecimal} /> : stat.value}
                                </div>
                                <div className="text-[10px] sm:text-[11px] font-semibold text-gray-300 tracking-wide group-hover:text-blue-400 transition-colors uppercase">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Help CTA Block */}
                    <div className="bg-gradient-to-br from-[#141b2d] via-[#141b2d]/80 to-[#1e293b]/20 p-4 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border border-white/5 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 shadow-lg relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>

                        <div className="text-center md:text-left relative z-10 flex-1">
                            <h3 className="text-base sm:text-lg md:text-xl font-black text-white mb-1 tracking-tight">
                                Need expert advice?
                            </h3>
                            <p className="text-gray-300 text-[10px] sm:text-[11px] md:text-xs font-medium">
                                Contact us for clinical excellence and personalized dental care.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto relative z-10">
                            <Link
                                to="/contact"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-5 py-2.5 rounded-lg sm:rounded-xl font-bold text-[11px] sm:text-[12px] tracking-wide transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
                            >
                                <ArrowRight size={13} className="sm:w-[14px] sm:h-[14px]" />
                                Contact Us
                            </Link>
                            <a href="tel:+916352534650" className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 sm:px-5 py-2.5 rounded-lg sm:rounded-xl font-bold text-[11px] sm:text-[12px] tracking-wide transition-all flex items-center justify-center gap-2 active:scale-95 backdrop-blur-md">
                                <Phone size={13} className="sm:w-[14px] sm:h-[14px]" />
                                Call Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes shine {
                    0% { transform: translateX(-150%) skewX(-12deg); }
                    100% { transform: translateX(150%) skewX(-12deg); }
                }
                .group:hover .animate-shine {
                    animation: shine 1s;
                }
            ` }} />
        </section>
    );
};

export default TreatmentGrid;