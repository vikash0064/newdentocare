"use client";
import React, { useEffect, useRef } from 'react';
import { IMAGES } from '../constants';
import { MapPin, Clock, Star, Award, Stethoscope, ChevronRight, CheckCircle2, Phone, Calendar, Users, Trophy, Shield, Heart, Camera } from 'lucide-react';
import Link from 'next/link';
import gsap from 'gsap';
import SEO from '../components/SEO';
import DoctorTeam from '../components/DoctorTeam';
import TeamSlider from '../components/TeamSlider';

const DoctorDetails = () => {
    const heroRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const tl = gsap.timeline();
        tl.fromTo(heroRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
        )
            .fromTo(contentRef.current?.children || [],
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power2.out" },
                "-=0.5"
            );
    }, []);

    const whatsappNumber = "916352534650";
    const whatsappMessage = "Hi Dentocare, I have a query regarding dental treatments.";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <main className="bg-[#0B1120] text-white selection:bg-blue-500 selection:text-white">
            <SEO description="Meet Dr. Nimisha Modi, a smile architect with 12+ years of clinical excellence in complex implantology and aesthetic design at Dentocare Surat." />
            {/* Profile Hero - Enhanced & Mobile Optimized */}
            <section ref={heroRef} className="relative pt-24 sm:pt-28 pb-16 md:pt-32 md:pb-24 overflow-hidden">
                {/* Subtle Background Glows */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0f172a] to-[#0B1120] z-0"></div>
                <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-blue-600/5 to-transparent z-0"></div>
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/[0.03] rounded-full blur-[100px] z-0"></div>
                <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-500/[0.03] rounded-full blur-[100px] z-0"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20">

                        {/* Image Section - Compact & Balanced */}
                        <div className="w-full lg:w-[30%] relative order-1 lg:order-1">
                            <div className="relative group max-w-[280px] md:max-w-sm mx-auto transition-transform duration-500">
                                {/* Ultra-Subtle Glow Effects */}
                                <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/10 to-transparent rounded-[3rem] rotate-3 blur-2xl group-hover:rotate-6 transition-all duration-700"></div>
                                <div className="absolute -inset-4 bg-gradient-to-bl from-cyan-400/10 to-transparent rounded-[3rem] -rotate-3 blur-2xl group-hover:-rotate-6 transition-all duration-700"></div>

                                {/* Main Image */}
                                <div className="relative rounded-[2.5rem] overflow-hidden border-2 border-white/5 shadow-2xl z-10 group-hover:border-blue-500/20 transition-colors">
                                    <img
                                        src={IMAGES.doctor}
                                        alt="Dr. Nimisha Modi - Chief Dental Surgeon and Implantologist at Dentocare Surat"
                                        title="Dr. Nimisha Modi - Best Dentist in Surat"
                                        loading="lazy"
                                        decoding="async"
                                        width="400"
                                        height="550"
                                        className="w-full aspect-[4/5.5] object-cover transform transition-all duration-1000 group-hover:scale-[1.05]"
                                    />
                                    {/* Vignette */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                                </div>

                                {/* Experience Badge (Responsive) */}
                                <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 bg-emerald-600 p-3 md:p-4 rounded-2xl shadow-2xl z-20 border border-white/10">
                                    <div className="text-center">
                                        <span className="block font-black text-white text-lg md:text-xl">12+</span>
                                        <span className="text-[10px] md:text-xs text-white/90 font-semibold tracking-wide">Years Exp</span>
                                    </div>
                                </div>

                                {/* Rating Badge (Responsive) */}
                                <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-[#1e293b]/90 backdrop-blur-xl p-3 md:p-5 rounded-2xl shadow-2xl z-20 border border-white/10 flex items-center gap-2 md:gap-3">
                                    <div className="bg-blue-600/20 p-1.5 md:p-2.5 rounded-xl text-blue-400">
                                        <Star size={16} fill="currentColor" className="md:w-5 md:h-5" />
                                    </div>
                                    <div>
                                        <span className="block font-black text-white text-base md:text-xl leading-none">4.9/5.0</span>
                                        <span className="text-[10px] md:text-xs text-gray-500 font-semibold tracking-wide">Patient Choice</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Text Section - Mobile Centered Content */}
                        <div className="w-full lg:w-[70%] space-y-8 text-center lg:text-left order-2 lg:order-2">
                            <div className="space-y-4">
                                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 md:gap-3">
                                    <span className="inline-flex items-center gap-1.5 bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-[11px] md:text-[13px] font-semibold tracking-wide border border-blue-500/20 shadow-sm">
                                        <Award size={12} /> Clinical Director
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-[11px] md:text-[13px] font-semibold tracking-wide border border-emerald-500/20 shadow-sm">
                                        <Shield size={12} /> Certified Specialist
                                    </span>
                                </div>

                                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                                    Dr. Nimisha <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 font-black">Modi</span>
                                </h1>

                                <p className="text-sm md:text-lg text-gray-400 font-semibold tracking-wide uppercase">
                                    B.D.S. | Dental Sergeon | Followship in implantology
                                </p>
                            </div>

                            <p className="text-gray-400 leading-relaxed text-sm md:text-lg font-medium max-w-2xl mx-auto lg:mx-0 opacity-90">
                                With over 12 years of surgical excellence, Dr. Nimisha Modi combines precision dentistry with a patient-first philosophy to create transformative dental experiences in Gujarat.
                            </p>

                            {/* Stats Grid - 2x2 on Mobile */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-6 pt-4">
                                {[
                                    { icon: Users, val: "10k+", label: "Patients", color: "blue" },
                                    { icon: Trophy, val: "50+", label: "Awards", color: "emerald" },
                                    { icon: Heart, val: "98%", label: "Satisfaction", color: "cyan" },
                                    { icon: Shield, val: "100%", label: "Sterile", color: "purple" }
                                ].map((s, i) => (
                                    <div key={i} className="bg-white/5 p-4 md:p-5 rounded-2xl border border-white/5 hover:border-blue-500/20 transition-all group">
                                        <s.icon size={18} className={`text-${s.color}-400 mb-2 mx-auto lg:mx-0`} />
                                        <h4 className="text-xl md:text-2xl font-black text-white leading-none mb-1">{s.val}</h4>
                                        <span className="text-[10px] md:text-[12px] text-gray-500 font-semibold tracking-wide">{s.label}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Buttons - Full Width on Mobile */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-[13px] md:text-sm tracking-wide shadow-xl shadow-emerald-900/40 flex items-center justify-center gap-2 hover:translate-y-[-2px] transition-all"
                                >
                                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471.148-.67.445-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z\" /></svg>
                                    Connect on WhatsApp
                                </a>
                                <Link
                                    href="/contact"
                                    className="flex-1 bg-[#1e293b] text-white px-8 py-4 rounded-xl font-bold text-[13px] md:text-sm tracking-wide flex items-center justify-center gap-2 border border-white/5 hover:bg-[#2d3a4f] transition-all"
                                >
                                    <MapPin size={14} /> Clinic Tour
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Doctor Team Section */}
            <DoctorTeam />

            {/* Full Team Slider Section */}
            <TeamSlider />

            {/* Detailed Info Grid */}
            <section ref={contentRef} className="py-12 md:py-20 bg-transparent">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">

                        {/* Left Column: Treatments & Bio */}
                        <div className="lg:col-span-2 space-y-8 md:space-y-12">

                            {/* Treatments */}
                            <div className="bg-[#111827]/60 backdrop-blur-xl rounded-3xl md:rounded-[2.5rem] p-6 md:p-12 border border-white/5 shadow-2xl">
                                <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                                    <div className="p-2 md:p-3 bg-blue-500/10 rounded-xl text-blue-400"><Stethoscope size={20} className="md:w-6 md:h-6" /></div>
                                    <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">Specialized Treatments</h2>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 md:gap-3">
                                    {[
                                        { name: "Maxillofacial Prosthetics", icon: "🎭" },
                                        { name: "Discolored Tooth Restoration", icon: "✨" },
                                        { name: "Wisdom Tooth Extraction", icon: "⚡" },
                                        { name: "Root Canal Treatment (RCT)", icon: "🔬" },
                                        { name: "Teeth Straightening", icon: "🦷" },
                                        { name: "Dental Implant Fixing", icon: "💎" },
                                        { name: "BPS Dentures Fixing", icon: "👑" },
                                        { name: "Oral & Maxillofacial Surgery", icon: "🩺" },
                                        { name: "Smile Makeovers", icon: "⭐" },
                                        { name: "Kids Dentistry", icon: "🧒" }
                                    ].map((service, i) => (
                                        <div key={i} className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-white/[0.02] rounded-xl md:rounded-2xl border border-white/5 hover:border-blue-500/20 transition-all cursor-default group">
                                            <span className="text-lg md:text-xl group-hover:scale-110 transition-transform shrink-0">{service.icon}</span>
                                            <span className="text-gray-400 font-bold text-xs md:text-sm group-hover:text-white transition-colors leading-tight">{service.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Narrative */}
                            <div className="bg-[#111827]/60 backdrop-blur-xl rounded-3xl md:rounded-[2.5rem] p-6 md:p-12 border border-white/5 shadow-2xl">
                                <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                                    <div className="p-2 md:p-3 bg-emerald-500/10 rounded-xl text-emerald-400"><Award size={20} className="md:w-6 md:h-6" /></div>
                                    <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">Professional Background</h2>
                                </div>
                                <div className="space-y-3 md:space-y-4 text-gray-400 font-medium leading-relaxed text-xs md:text-base">
                                    <p>Dr. Nimisha Modi is a smile architect with 12+ years of clinical excellence in complex implantology and aesthetic design.</p>
                                    <p>Strictly adhering to international protocols, she ensures every surgery is executed with robotic precision and deep patient empathy.</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Contact info */}
                        <div className="space-y-6 md:space-y-8">
                            <div className="bg-gradient-to-b from-[#1e293b] to-[#0f172a] p-6 md:p-10 rounded-3xl md:rounded-[3rem] border border-white/10 shadow-3xl sticky top-28">
                                <h3 className="text-lg md:text-xl font-black text-white mb-6 md:mb-8 flex items-center gap-2">
                                    <MapPin size={18} className="md:w-5 md:h-5 text-blue-400" /> Clinic Hub
                                </h3>

                                <div className="space-y-6 md:space-y-8">
                                    <div className="flex gap-3 md:gap-4">
                                        <div className="p-1.5 md:p-2 bg-blue-500/10 rounded-lg text-blue-400 h-fit"><Phone size={14} className="md:w-4 md:h-4" /></div>
                                        <div>
                                            <p className="text-[10px] md:text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1">Direct Line</p>
                                            <p className="text-base md:text-lg font-black text-white tracking-tight">+91 63525 34650</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 md:gap-4">
                                        <div className="p-1.5 md:p-2 bg-emerald-500/10 rounded-lg text-emerald-400 h-fit"><Clock size={14} className="md:w-4 md:h-4" /></div>
                                        <div>
                                            <p className="text-[10px] md:text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1">Working Log</p>
                                            <p className="text-xs md:text-sm font-bold text-white tracking-tight leading-snug">Mon - Sat: 10:00 AM - 1:30 PM | 4:30 PM - 8:00 PM</p>
                                            <p className="text-[9px] md:text-[10px] text-gray-500 font-semibold mt-1 tracking-wide">Sunday By Appointment</p>
                                        </div>
                                    </div>
                                    <div className="pt-3 md:pt-4">
                                        <Link href="/contact" className="block w-full bg-white/5 hover:bg-white/10 text-white text-center py-3 md:py-4 rounded-xl font-semibold text-[10px] md:text-[11px] uppercase tracking-wide border border-white/5 transition-all">
                                            Visit Clinic
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default DoctorDetails;