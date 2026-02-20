import React, { useRef, useEffect } from 'react';
import { IMAGES } from '../constants';
import gsap from 'gsap';
import { Check } from 'lucide-react';

const WhyTrust = () => {
    const sectionRef = useRef(null);
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

    const galleryImages = [
        "https://res.cloudinary.com/dyc1drqpy/image/upload/v1768734850/dr-nimisha-modi-palanpur-patia-surat-dentists-l8zz3a59je_glhdvx.jpg",
        "https://res.cloudinary.com/dyc1drqpy/image/upload/v1768736707/-6o48ecgfmp-250_j0uvqw.jpg",
        "https://res.cloudinary.com/dyc1drqpy/image/upload/v1768732143/dr-nimisha-modi-palanpur-patia-surat-dentists-y5jv3ezypp_siu6kx.avif",
        "https://res.cloudinary.com/dyc1drqpy/image/upload/v1768732155/dr-nimisha-modi-palanpur-patia-surat-dentists-s2hw4zs0aa_kn395q.avif"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        gsap.fromTo(sectionRef.current.querySelectorAll('.trust-card'),
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
        );
    }, []);

    return (
        <section ref={sectionRef} className="py-6 md:py-8 bg-transparent">
            <div className="container mx-auto px-6">
                <div className="text-center mb-6 px-2">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 mb-2 text-[11px] font-semibold tracking-wide text-emerald-400 uppercase bg-emerald-400/10 rounded-lg border border-emerald-400/20 shadow-xl">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        Trusted by 10,000+ Families
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black mb-2 text-white tracking-tight leading-tight">
                        Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Dentocare?</span>
                    </h2>
                    <p className="text-gray-400 text-sm font-medium max-w-4xl mx-auto leading-relaxed">
                        Experience expert dental care and clinical excellence. We are Surat's trusted choice for a healthy, beautiful smile.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
                    {/* Left Image Section - Auto Scroll Carousel */}
                    <div className="lg:w-4/12 relative group h-[400px] lg:h-[500px]">
                        <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] border-4 border-gray-800">
                            {galleryImages.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Plus Dento Care (Dentocare) Clinic Environment ${index + 1} Surat - Expert Dental Care by Dr. Nimisha Modi`}
                                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                                        }`}
                                    loading="lazy"
                                    decoding="async"
                                />
                            ))}

                            {/* Overlay Content */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent flex items-end p-6 z-10">
                                <div className="text-white">
                                    <p className="font-extrabold text-xl mb-1">Clinic Excellence</p>
                                    <p className="text-blue-400 font-semibold text-[11px] tracking-wide uppercase">Certified Standards</p>
                                </div>
                            </div>

                            {/* Carousel Indicators */}
                            <div className="absolute bottom-6 right-6 flex gap-1.5 z-20">
                                {galleryImages.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`h-1 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'w-6 bg-blue-400' : 'w-2 bg-white/30'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                        {/* Decorative Glow */}
                        <div className="absolute -z-10 -top-6 -left-6 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all"></div>
                    </div>

                    {/* Right Grid - Compacted */}
                    <div className="lg:w-8/12 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            {/* Card 1 */}
                            <div className="trust-card bg-[#1e293b]/40 backdrop-blur-sm p-6 rounded-2xl border border-gray-800 hover:border-blue-500/30 transition-all duration-500 shadow-xl">
                                <h3 className="text-lg font-bold text-white mb-4 border-l-4 border-blue-500 pl-3 tracking-wide">World Class Tech</h3>
                                <ul className="space-y-3 text-gray-400">
                                    <li className="flex gap-2.5 items-start"><Check size={16} className="text-emerald-400 mt-0.5 shrink-0" /> <span className="text-xs font-medium">Advanced Laser Dental Tech</span></li>
                                    <li className="flex gap-2.5 items-start"><Check size={16} className="text-emerald-400 mt-0.5 shrink-0" /> <span className="text-xs font-medium">Globally certified materials</span></li>
                                    <li className="flex gap-2.5 items-start"><Check size={16} className="text-emerald-400 mt-0.5 shrink-0" /> <span className="text-xs font-medium">3D Intraoral Precision Scanning</span></li>
                                </ul>
                            </div>

                            {/* Card 2 */}
                            <div className="trust-card bg-[#1e293b]/40 backdrop-blur-sm p-6 rounded-2xl border border-gray-800 hover:border-emerald-500/30 transition-all duration-500 shadow-xl">
                                <h3 className="text-lg font-bold text-white mb-4 border-l-4 border-emerald-500 pl-3 tracking-wide">Patient Centric</h3>
                                <ul className="space-y-3 text-gray-400">
                                    <li className="flex gap-2.5 items-start"><Check size={16} className="text-emerald-400 mt-0.5 shrink-0" /> <span className="text-xs font-medium">Direct Doctor Consultation</span></li>
                                    <li className="flex gap-2.5 items-start"><Check size={16} className="text-emerald-400 mt-0.5 shrink-0" /> <span className="text-xs font-medium">Personalized Digital Planning</span></li>
                                    <li className="flex gap-2.5 items-start"><Check size={16} className="text-emerald-400 mt-0.5 shrink-0" /> <span className="text-xs font-medium">Proactive Post-Care Support</span></li>
                                </ul>
                            </div>

                            {/* Card 3 */}
                            <div className="trust-card bg-[#1e293b]/40 backdrop-blur-sm p-6 rounded-2xl border border-gray-800 hover:border-blue-500/30 transition-all duration-500 shadow-xl">
                                <h3 className="text-lg font-bold text-white mb-4 border-l-4 border-blue-500 pl-3 tracking-wide">Legacy & Scale</h3>
                                <ul className="space-y-3 text-gray-400">
                                    <li className="flex gap-2.5 items-start"><Check size={16} className="text-emerald-400 mt-0.5 shrink-0" /> <span className="text-xs font-medium">10,000+ Successful Smiles</span></li>
                                    <li className="flex gap-2.5 items-start"><Check size={16} className="text-emerald-400 mt-0.5 shrink-0" /> <span className="text-xs font-medium">Expertise in Complex Rehabs</span></li>
                                    <li className="flex gap-2.5 items-start"><Check size={16} className="text-emerald-400 mt-0.5 shrink-0" /> <span className="text-xs font-medium">5,000+ Dental Implants Placed</span></li>
                                </ul>
                            </div>

                            {/* Card 4 */}
                            <div className="trust-card bg-[#1e293b]/40 backdrop-blur-sm p-6 rounded-2xl border border-gray-800 hover:border-emerald-500/30 transition-all duration-500 shadow-xl">
                                <h3 className="text-lg font-bold text-white mb-4 border-l-4 border-emerald-500 pl-3 tracking-wide">Safety Unmatched</h3>
                                <ul className="space-y-3 text-gray-400">
                                    <li className="flex gap-2.5 items-start"><Check size={16} className="text-emerald-400 mt-0.5 shrink-0" /> <span className="text-xs font-medium">10X ISO Safety Protocols</span></li>
                                    <li className="flex gap-2.5 items-start"><Check size={16} className="text-emerald-400 mt-0.5 shrink-0" /> <span className="text-xs font-medium">Multi-Step Sterilization Cycle</span></li>
                                    <li className="flex gap-2.5 items-start"><Check size={16} className="text-emerald-400 mt-0.5 shrink-0" /> <span className="text-xs font-medium">Modern Hygienic Infrastructure</span></li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyTrust;
