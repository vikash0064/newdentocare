import React, { useState } from 'react';
import { CheckCircle2, Star, Shield, Award, MapPin, Phone, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-white/5 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-4 flex items-center justify-between text-left group transition-all"
            >
                <span className={`text-sm font-bold transition-colors ${isOpen ? 'text-blue-400' : 'text-gray-300 group-hover:text-white'}`}>
                    {question}
                </span>
                {isOpen ? <ChevronUp size={16} className="text-blue-400" /> : <ChevronDown size={16} className="text-gray-400" />}
            </button>
            {isOpen && (
                <div className="pb-4 text-[13px] leading-relaxed text-gray-300 animate-fade-in font-medium">
                    {answer}
                </div>
            )}
        </div>
    );
};

const HomeSEO = () => {
    return (
        <section className="py-12 sm:py-20 bg-[#0B1120] relative border-t border-white/5">
            <div className="container mx-auto px-4 sm:px-6 max-w-6xl">

                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
                    <div className="max-w-3xl text-center lg:text-left">
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-3 sm:mb-4 tracking-tight">
                            Best Dental Clinic <span className="text-blue-500">in Surat | Plus Dento Care</span>
                        </h2>
                        <p className="text-[11px] sm:text-xs lg:text-sm text-gray-300 leading-relaxed mx-auto lg:mx-0">
                            Looking for the <strong>top dentist in Surat</strong>? Plus Dento Care (Dentocare), led by <strong>Dr. Nimisha Modi</strong>, is your trusted partner for a healthy smile.
                            Rated as the <strong>best dental hospital in Adajan and Palanpur</strong> for our ethical approach, we specialize in high-tech, <strong>painless dental treatments</strong>,
                            Root Canals, and Implants at Simanagar (Palanpur Road) and Gaurav Path. We are the most <strong>affordable dental clinic in Surat</strong> with 5-star facilities.
                        </p>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start mb-12">

                    {/* Column 1: Specialties */}
                    <div className="space-y-5 sm:space-y-6">
                        <h2 className="text-sm sm:text-base font-black text-white uppercase tracking-widest flex items-center gap-2">
                            <Shield size={16} className="text-blue-500" /> Professional Dental Services
                        </h2>
                        <div className="space-y-4">
                            <div className="group">
                                <h3 className="text-[12px] sm:text-sm font-bold text-blue-400 mb-1">Advanced Dental Implant Center in Surat</h3>
                                <p className="text-[10px] sm:text-[11px] text-gray-300 leading-snug font-medium">
                                    We provide bridge and <strong>permanent tooth replacement</strong> using premium materials and digital mapping for 99% success rates.
                                </p>
                            </div>
                            <div className="group">
                                <h3 className="text-[12px] sm:text-sm font-bold text-blue-400 mb-1">Painless Root Canal Treatment (RCT)</h3>
                                <p className="text-[10px] sm:text-[11px] text-gray-300 leading-snug font-medium">
                                    Our clinic uses <strong>painless rotary endodontics</strong> to save natural teeth near Simanagar and Adajan area, ensuring a stress-free experience.
                                </p>
                            </div>
                            <div className="group">
                                <h3 className="text-[12px] sm:text-sm font-bold text-blue-400 mb-1">Smile Correction & Clear Aligners</h3>
                                <p className="text-[10px] sm:text-[11px] text-gray-300 leading-snug font-medium">
                                    Get the perfect smile with <strong>Invisalign clear aligners</strong> and traditional braces at the most <strong>affordable price in Surat</strong>.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Trust Factors */}
                    <div className="space-y-5 sm:space-y-6">
                        <h2 className="text-sm sm:text-base font-black text-white uppercase tracking-widest flex items-center gap-2">
                            <Award size={16} className="text-emerald-500" /> Why Choose Dentocare?
                        </h2>
                        <div className="grid grid-cols-1 gap-3">
                            <p className="text-[11px] text-gray-300 mb-2">Our commitment to <strong>ethical dentistry</strong> and patient comfort makes us the <strong>best dentist in Surat</strong>.</p>
                            <ul className="space-y-2.5">
                                {[
                                    "International Advanced Sterilization Protocols",
                                    "Specialized Kids-Friendly Dental Environment",
                                    "High-Precision Digital Dental Mapping",
                                    "Aesthetic Smile Makeovers & Veneers",
                                    "Emergency Dentist Services Available"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 text-[10px] sm:text-[11px] text-gray-200 font-bold">
                                        <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Column 3: FAQ */}
                    <div className="bg-white/5 p-5 sm:p-6 rounded-2xl border border-white/10">
                        <h2 className="text-sm sm:text-base font-black text-white uppercase tracking-widest flex items-center gap-2 mb-4">
                            <HelpCircle size={16} className="text-blue-500" /> Dental FAQ Guide
                        </h2>
                        <div className="divide-y divide-white/5">
                            <FAQItem
                                question="How much do dental implants cost in Surat?"
                                answer="Dental implants at Plus Dento Care start from ₹18,000. The final cost depends on individual requirements and the type of implant chosen. Book a free consultation for accurate pricing."
                            />
                            <FAQItem
                                question="Is root canal treatment painful?"
                                answer="No! Root canal treatment at Plus Dento Care is completely painless. We use advanced anesthesia and modern rotary techniques to ensure your complete comfort."
                            />
                            <FAQItem
                                question="Where are your clinic branches in Surat?"
                                answer="We are at Tirupati Shopping Center (Simanagar) and Eden Square (Gaurav Path), both conveniently located to serve patients across Surat."
                            />
                            <FAQItem
                                question="Do you treat children?"
                                answer="Yes, we are a specialized kids dentist in Surat with a dedicated approach for pediatric dental comfort and stress-free treatments."
                            />
                        </div>
                    </div>
                </div>

                {/* Additional Content for SEO density */}
                <div className="mt-12 text-center max-w-4xl mx-auto">
                    <h2 className="text-lg sm:text-xl font-bold text-white mb-4">The Most Trusted Dental Hospital in Adajan & Palanpur</h2>
                    <p className="text-[11px] sm:text-xs text-gray-400 leading-relaxed">
                        At <strong>Plus Dento Care Surat</strong>, we aim to provide a holistic approach to oral health.
                        Our team, led by <strong>Dr. Nimisha Modi</strong>, ensures that every patient receives
                        personalized care. From <strong>teeth whitening</strong> and <strong>dentures</strong> to
                        complex <strong>full mouth rehabilitation</strong>, we use state-of-the-art equipment to
                        deliver the best results. Visit us today at our <strong>painless dental clinic in Surat</strong>
                        for a free consultation.
                    </p>
                </div>

                {/* Ultra-compact Local Tag */}
                <div className="mt-10 sm:mt-12 flex items-center justify-center gap-3">
                    <div className="h-[1px] flex-grow max-w-[40px] bg-white/10"></div>
                    <p className="text-[7px] sm:text-[8px] text-gray-300 font-black tracking-[0.2em] uppercase text-center opacity-70">
                        Serving Adajan • Palanpur • Gaurav Path • Surat
                    </p>
                    <div className="h-[1px] flex-grow max-w-[40px] bg-white/10"></div>
                </div>
            </div>
        </section>
    );
};

export default HomeSEO;
