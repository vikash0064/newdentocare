"use client";
import React, { useState } from 'react';
import { CheckCircle2, Star, Shield, Award, MapPin, Phone, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-white/5 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-4 flex items-center justify-between text-left group transition-all"
                aria-expanded={isOpen}
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
        <section className="py-12 sm:py-20 bg-[#0B1120] relative border-t border-white/5" aria-label="Dental clinic information and frequently asked questions">
            <div className="container mx-auto px-4 sm:px-6 max-w-6xl">

                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
                    <div className="max-w-3xl text-center lg:text-left">
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-3 sm:mb-4 tracking-tight">
                            Comprehensive Dental Care at Dentocare, Surat
                        </h2>
                        <p className="text-[11px] sm:text-xs lg:text-sm text-gray-300 leading-relaxed mx-auto lg:mx-0">
                            Searching for a reliable dental clinic in Surat? <strong>Dentocare</strong>, led by <strong>Dr. Nimisha Modi</strong>, offers
                            comprehensive oral healthcare in a comfortable, modern environment. Our two branches near <strong>Adajan</strong> and <strong>Palanpur Road</strong> are
                            equipped with digital X-ray systems, laser sterilization units, and ergonomic patient chairs for a genuinely <strong>comfortable dental experience</strong>.
                        </p>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start mb-12">

                    {/* Column 1: Specialties */}
                    <div className="space-y-5 sm:space-y-6">
                        <div className="flex items-center gap-2">
                            <Shield size={16} className="text-blue-500" />
                            <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-widest">Clinical Dental Services</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="group">
                                <h4 className="text-[12px] sm:text-sm font-bold text-blue-400 mb-1">Permanent Tooth Replacement with Implants</h4>
                                <p className="text-[10px] sm:text-[11px] text-gray-300 leading-snug font-medium">
                                    Our dental implant procedures use titanium posts and <strong>3D-guided placement technology</strong> for long-lasting results with minimal recovery time.
                                </p>
                            </div>
                            <div className="group">
                                <h4 className="text-[12px] sm:text-sm font-bold text-blue-400 mb-1">Single-Visit Root Canal Treatment</h4>
                                <p className="text-[10px] sm:text-[11px] text-gray-300 leading-snug font-medium">
                                    Using <strong>rotary endodontic instruments</strong> and apex locators, our RCT procedures at the Simanagar clinic are completed efficiently in one appointment.
                                </p>
                            </div>
                            <div className="group">
                                <h4 className="text-[12px] sm:text-sm font-bold text-blue-400 mb-1">Orthodontics: Braces & Clear Aligners</h4>
                                <p className="text-[10px] sm:text-[11px] text-gray-300 leading-snug font-medium">
                                    Correct misaligned teeth with customized <strong>metal braces, ceramic braces, or Invisalign</strong> clear aligners — treatment plans tailored to your dental structure.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Trust Factors */}
                    <div className="space-y-5 sm:space-y-6">
                        <div className="flex items-center gap-2">
                            <Award size={16} className="text-emerald-500" />
                            <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-widest">Why Patients Choose Us</h3>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                            <p className="text-[11px] text-gray-300 mb-2">With 366+ five-star reviews, patients across Surat trust our clinic for <strong>transparent pricing, gentle care, and lasting results</strong>.</p>
                            <ul className="space-y-2.5">
                                {[
                                    "Class B Autoclave Sterilization Protocol",
                                    "Child-Friendly Dental Environment with Play Area",
                                    "Digital Impressions — No Messy Molds",
                                    "Porcelain Veneers & Smile Makeover Planning",
                                    "Same-Day Emergency Dental Treatment Available"
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
                        <div className="flex items-center gap-2 mb-4">
                            <HelpCircle size={16} className="text-blue-500" />
                            <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-widest">Common Dental Questions</h3>
                        </div>
                        <div className="divide-y divide-white/5">
                            <FAQItem
                                question="What is the cost range for dental implants at your clinic?"
                                answer="Single dental implants at Dentocare start from ₹18,000 depending on the implant brand (Korean, Swiss, or German). Full-mouth rehabilitation costs vary based on bone grafting needs. Visit for a free assessment."
                            />
                            <FAQItem
                                question="How long does a root canal treatment take?"
                                answer="Most root canal procedures at our clinic are completed in a single sitting of 45-60 minutes. Complex cases involving multiple canals may require two appointments. We use advanced rotary instruments for faster, more precise treatment."
                            />
                            <FAQItem
                                question="Which areas of Surat do your two branches serve?"
                                answer="Branch 1 near Mashal Circle (Tirupati Shopping Center, Palanpur Road) serves Simanagar, Adajan, and Pal areas. Branch 2 at Eden Square (Gaurav Path) serves Palanpur Patia, City Light, and surrounding localities."
                            />
                            <FAQItem
                                question="Are Invisalign clear aligners available at your clinic?"
                                answer="Yes, we offer certified Invisalign treatment plans with 3D digital scanning for accurate alignment preview. Treatment duration ranges from 6 to 18 months depending on case complexity."
                            />
                            <FAQItem
                                question="Do you provide emergency dental services?"
                                answer="Absolutely. We handle dental emergencies including broken teeth, severe toothache, and post-accident trauma. Call us directly at +91 63525 34650 for immediate assistance during clinic hours."
                            />
                        </div>
                    </div>
                </div>

                {/* Additional Content Section */}
                <div className="mt-12 text-center max-w-4xl mx-auto">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Trusted by Families Across Surat Since 2014</h3>
                    <p className="text-[11px] sm:text-xs text-gray-400 leading-relaxed">
                        At <strong>Dentocare</strong>, we combine clinical expertise with genuine patient empathy.
                        Dr. Nimisha Modi and our team of specialists ensure that every procedure — from routine <strong>dental cleanings</strong>
                        and <strong>cavity fillings</strong> to advanced <strong>full-mouth rehabilitation</strong> and <strong>zirconia crown placement</strong> — is
                        performed with meticulous attention to detail using calibrated digital instruments.
                        We welcome patients from across Surat including Adajan, Vesu, Pal, Piplod, and Athwa for consultations.
                    </p>
                </div>

                {/* Local Tag */}
                <div className="mt-10 sm:mt-12 flex items-center justify-center gap-3">
                    <div className="h-[1px] flex-grow max-w-[40px] bg-white/10"></div>
                    <p className="text-[7px] sm:text-[8px] text-gray-300 font-black tracking-[0.2em] uppercase text-center opacity-70">
                        Serving Adajan • Palanpur • Gaurav Path • Vesu • Pal • Surat
                    </p>
                    <div className="h-[1px] flex-grow max-w-[40px] bg-white/10"></div>
                </div>
            </div>
        </section>
    );
};

export default HomeSEO;
