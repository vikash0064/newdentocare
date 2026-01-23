import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Users, Smile, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { icon: Star, label: "Google Rating", value: "4.9/5", color: "text-yellow-400", target: 4.9, suffix: "/5", isDecimal: true },
    { icon: Users, label: "Verified Patients", value: "10K+", color: "text-blue-400", target: 10, suffix: "K+" },
    { icon: Smile, label: "Satisfaction", value: "100%", color: "text-emerald-400", target: 100, suffix: "%" },
    { icon: MapPin, label: "Surat Branches", value: "02", color: "text-blue-400", target: 2, suffix: "" },
];

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

const StatsStrip = () => {
    const stripRef = useRef(null);
    const [startCounter, setStartCounter] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(stripRef.current, {
                opacity: 0,
                y: 10,
                duration: 1,
                scrollTrigger: {
                    trigger: stripRef.current,
                    start: "top 95%",
                    onEnter: () => setStartCounter(true),
                    once: true
                }
            });
        }, stripRef);
        return () => ctx.revert();
    }, []);

    // Duplicate stats for seamless looping
    const extendedStats = [...stats, ...stats, ...stats, ...stats];

    return (
        <div ref={stripRef} className="bg-[#0f172a] border-y border-white/5 py-8 overflow-hidden relative mt-8">
            {/* Soft Edge Fades */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0f172a] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0f172a] to-transparent z-10 pointer-events-none"></div>

            <div className="flex items-center gap-12 sm:gap-24 animate-marquee hover:[animation-play-state:paused] w-max px-12">
                {extendedStats.map((stat, i) => (
                    <div key={i} className="flex items-center gap-4 group cursor-pointer whitespace-nowrap">
                        <div className={`p-2.5 rounded-xl bg-gray-800/40 border border-white/5 shadow-lg group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 ${stat.color}`}>
                            <stat.icon size={20} strokeWidth={2} />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-white text-lg lg:text-xl leading-none tracking-tight">
                                {startCounter ? <AnimatedCounter target={stat.target} suffix={stat.suffix} duration={2} isDecimal={stat.isDecimal} /> : stat.value}
                            </span>
                            <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mt-1.5">{stat.label}</span>
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-50%)); }
                }
                .animate-marquee {
                    animation: marquee 40s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default StatsStrip;
