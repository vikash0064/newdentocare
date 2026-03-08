import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IMAGES } from '../constants';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, Award, Users, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const MeetTheDoctor = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
            }
        });

        tl.fromTo(contentRef.current,
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
        )
            .fromTo(imageRef.current,
                { x: 50, opacity: 0 },
                { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
                "-=0.6"
            );
    }, []);

    const qualities = [
        "12+ Years Clinical Excellence",
        "Expert in Painless Dentistry",
        "Advanced Cosmetic & Implant Care",
        "Personalized Patient Approach"
    ];

    return (
        <section ref={sectionRef} className="py-16 md:py-20 bg-transparent overflow-hidden relative">
            <div className="container mx-auto px-6 relative z-10 max-w-7xl">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Left: Content */}
                    <div ref={contentRef} className="lg:w-1/2">
                        <div className="inline-flex items-center gap-2 bg-[#1e293b] text-blue-300 px-3 py-1.5 rounded-lg text-[11px] font-semibold tracking-wide uppercase mb-6 border border-gray-800 shadow-xl">
                            <Award size={14} /> Meet Our Lead Specialist at Dentocare
                        </div>

                        {/* Updated Name to Single Line */}
                        <h2 className="text-4xl lg:text-5xl font-black text-white mb-3 leading-tight tracking-tight">
                            Dr. Nimisha Modi
                        </h2>
                        <h3 className="text-lg text-gray-300 mb-8 font-semibold tracking-wide">
                            B.D.S. | Implantologist | Cosmetic Dentist
                        </h3>

                        <div className="relative mb-8">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-emerald-500 rounded-full"></div>
                            <p className="text-gray-300 text-base lg:text-lg leading-relaxed pl-6 italic">
                                "With over 12 years of experience, my mission is to provide world-class dental care that is not only effective but also completely painless and comfortable for every patient."
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mb-10">
                            <div className="bg-[#1e293b]/30 p-5 rounded-2xl border border-gray-800/50">
                                <span className="block text-3xl lg:text-4xl font-black text-white mb-1">12+</span>
                                <span className="text-[10px] lg:text-[11px] font-semibold text-gray-300 uppercase tracking-widest">Years Experience</span>
                            </div>
                            <div className="bg-[#1e293b]/30 p-5 rounded-2xl border border-gray-800/50">
                                <span className="block text-3xl lg:text-4xl font-black text-blue-400 mb-1">10k+</span>
                                <span className="text-[10px] lg:text-[11px] font-semibold text-gray-300 uppercase tracking-widest">Happy Patients</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <Link to="/doctors" className="bg-[#2563eb] text-white px-8 py-3.5 rounded-full font-bold text-sm shadow-xl shadow-blue-900/20 flex items-center gap-2 transform hover:-translate-y-1 transition-all">
                                View Qualifications <ChevronRight size={18} />
                            </Link>
                            <Link to="/contact" className="bg-transparent border border-white/20 text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-white/5 transition-all shadow-sm">
                                Contact Clinic
                            </Link>
                        </div>
                    </div>

                    {/* Right: Image - Slightly Larger Box */}
                    <div ref={imageRef} className="lg:w-1/2 relative flex justify-center lg:justify-end">
                        <div className="relative z-10 w-full max-w-md"> {/* Increased from max-w-sm to max-w-md */}
                            {/* Decorative Elements */}
                            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/20 to-emerald-500/20 blur-3xl rounded-full -z-10 animate-pulse"></div>

                            <div className="relative bg-[#1e293b] p-3 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] border border-gray-800 ring-4 ring-gray-800/50 overflow-hidden group">
                                <img
                                    src={IMAGES.doctor}
                                    alt="Best Dentist in Surat - Dr. Nimisha Modi at Dentocare"
                                    title="Dr. Nimisha Modi - Best Dentist in Surat"
                                    itemProp="image"
                                    width="450"
                                    height="560"
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full aspect-[4/5] object-cover rounded-[2.5rem] grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                />
                                {/* Glass Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                            </div>

                            {/* Floating Stats */}
                            <div className="absolute -bottom-6 -left-6 bg-[#0f172a]/90 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-gray-700 z-20 flex items-center gap-4 animate-bounce-slow">
                                <div className="bg-blue-600/20 p-2.5 rounded-xl text-blue-400 shadow-inner">
                                    <Users size={20} />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm">Patient's Choice</p>
                                    <p className="text-[10px] text-gray-300 font-semibold uppercase tracking-wide">Trusted Leader</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default MeetTheDoctor;
