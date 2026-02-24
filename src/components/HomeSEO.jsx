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
                    <div className="max-w-2xl text-center lg:text-left">
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-3 sm:mb-4 tracking-tight">
                            Best Dental Clinic <span className="text-blue-500">in Surat – Dentocare Surat</span>
                        </h2>
                        <p className="text-[11px] sm:text-xs lg:text-sm text-gray-300 leading-relaxed mx-auto lg:mx-0">
                            Looking for the <strong>top dentist in Surat</strong>? Plus Dento Care (Dentocare), led by <strong>Dr. Nimisha Modi</strong>, is your trusted partner for a healthy smile.
                            Rated as the <strong>best dental hospital in Adajan and Palanpur</strong> for our ethical approach, we specialize in high-tech, <strong>painless dental treatments</strong>,
                            Root Canals, and Implants at Simanagar (Palanpur Road) and Gaurav Path. We are the most <strong>affordable dental clinic in Surat</strong> with 5-star facilities.
                        </p>
                    </div>
                    <div className="flex gap-3 sm:gap-4 justify-center lg:justify-end shrink-0">
                        <div className="px-3 sm:px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-center min-w-[80px] sm:min-w-[100px]">
                            <div className="text-base sm:text-lg font-black text-white leading-none">366+</div>
                            <div className="text-[7px] sm:text-[8px] uppercase tracking-tighter text-gray-300 mt-1 font-bold">Google Reviews</div>
                        </div>
                        <div className="px-3 sm:px-4 py-2 bg-blue-600/10 rounded-xl border border-blue-500/20 text-center min-w-[80px] sm:min-w-[100px]">
                            <div className="text-base sm:text-lg font-black text-blue-400 leading-none">15+</div>
                            <div className="text-[7px] sm:text-[8px] uppercase tracking-tighter text-blue-400 mt-1 font-bold">Years Expert</div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start">

                    {/* Column 1: Specialties */}
                    <div className="space-y-5 sm:space-y-6">
                        <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                            <Shield size={14} className="text-blue-500" /> Key Expertise
                        </h3>
                        <div className="space-y-4 text-center sm:text-left">
                            <div className="group">
                                <h4 className="text-[11px] sm:text-xs font-bold text-gray-300 mb-1 group-hover:text-blue-400 transition-colors">Dental Implant Center in Surat</h4>
                                <p className="text-[10px] sm:text-[11px] text-gray-300 leading-snug font-medium">Permanent tooth replacement using premium materials and digital mapping for 99% success rates.</p>
                            </div>
                            <div className="group">
                                <h4 className="text-[11px] sm:text-xs font-bold text-gray-200 mb-1 group-hover:text-blue-400 transition-colors uppercase tracking-wide">Root Canal Treatment (RCT)</h4>
                                <p className="text-[10px] sm:text-[11px] text-gray-300 leading-snug font-medium">Painless rotary endodontics to save natural teeth near Simanagar and Adajan area.</p>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Trust Factors */}
                    <div className="space-y-5 sm:space-y-6">
                        <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                            <Award size={14} className="text-emerald-500" /> Patient Trust
                        </h3>
                        <div className="grid grid-cols-1 gap-2.5 sm:gap-3">
                            {[
                                "Advanced Sterilization Protocols",
                                "Kids-Friendly Dental Environment",
                                "Invisalign & Clear Aligners",
                                "Smile Makeovers & Veneers"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-2 text-[10px] sm:text-[11px] text-gray-200 font-bold">
                                    <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white/5 p-5 sm:p-6 rounded-2xl border border-white/10 sm:col-span-2 lg:col-span-1">
                        <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-widest mb-2">Essential FAQ Guide</h3>
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
                                question="Do you offer dental implants for seniors?"
                                answer="Yes! We provide dental implants for patients of all ages, including seniors. Our experienced team assesses each patient's health before proceeding."
                            />
                            <FAQItem
                                question="Do you treat children?"
                                answer="Yes, we are a specialized kids dentist in Surat with a dedicated approach for pediatric dental comfort and stress-free treatments."
                            />
                            <FAQItem
                                question="Do you provide free consultation?"
                                answer="Yes! We offer free consultation for all major dental treatments. Book your appointment today!"
                            />
                        </div>
                    </div>

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
