import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Check, Shield, Award, Stethoscope } from 'lucide-react';
import { IMAGES } from '../constants';
import SEO from '../components/SEO';

const treatmentsList = [
    {
        id: "maxillofacial-prosthetics",
        title: "Maxillofacial Prosthetics",
        image: IMAGES.treatments.prosthetics,
        description: "Maxillofacial prosthetics is a specialty of dentistry that deals with the rehabilitation of patients with acquired and congenital defects of the head and neck. This ranges from restoring facial features to replacing missing teeth and bone.",
        pros: ["Restores normal function (chewing, speaking)", "Improves aesthetic appearance significantly", "Boosts patient confidence"],
        highlights: ["Custom precision fit", "Tailored to your facial structure", "Long-term structural support"]
    },
    {
        id: "restoration",
        title: "Discolored Tooth Restoration",
        image: IMAGES.treatments.restoration,
        description: "Restores the natural color and function of teeth that have been stained or discolored due to age, medication, or trauma. This often involves crowns, veneers, or composite bonding.",
        pros: ["Immediate aesthetic improvement", "Minimally invasive options available", "Long-lasting results"],
        highlights: ["Natural shade matching", "Stain-resistant materials", "Preserves tooth enamel"]
    },
    {
        id: "extraction",
        title: "Wisdom Tooth Extraction",
        image: IMAGES.treatments.extraction,
        description: "The removal of one or more wisdom teeth, the four permanent adult teeth located at the back corners of your mouth. It is often done to prevent future problems or correct an actual problem.",
        pros: ["Prevents overcrowding of teeth", "Relieves pain and discomfort", "Prevents potential cysts and tumors"],
        highlights: ["Painless atraumatic technique", "Quick healing protocols", "Prevents future infections"]
    },
    {
        id: "rct",
        title: "RCT (Root Canal Treatment)",
        image: IMAGES.treatments.rct,
        description: "A treatment used to repair and save a tooth that is badly decayed or becomes infected. The nerve and pulp are removed and the inside of the tooth is cleaned and sealed.",
        pros: ["Saves the natural tooth", "Relieves severe tooth pain", "Restores normal biting force"],
        highlights: ["Single-sitting convenience", "Advanced laser disinfection", "Highest success rates"]
    },
    {
        id: "straightening",
        title: "Straightening Teeth (Orthodontics)",
        image: IMAGES.showcase[3], // Fallback to a showcase image
        description: "Correction of crooked or crowded teeth using braces or clear aligners. This improves both the appearance and the function of your teeth.",
        pros: ["Better oral hygiene (easier to clean)", "Improved speech and chewing", "Beautiful smile"],
        highlights: ["Invisible aligner options", "Customized treatment plan", "Enhanced facial profile"]
    },
    {
        id: "implants",
        title: "Dental Implant Fixing",
        image: IMAGES.treatments.implants,
        description: "A surgical component that interfaces with the bone of the jaw or skull to support a dental prosthesis such as a crown, bridge, denture, or facial prosthesis.",
        pros: ["Permanent solution", "Looks and feels like natural teeth", "Prevents bone loss"],
        highlights: ["Lifetime durability", "Natural bone stimulation", "Restores full chewing power"]
    },
    {
        id: "dentures",
        title: "BPS Dentures Fixing",
        image: IMAGES.clinic,
        description: "Biofunctional Prosthetic System (BPS) dentures are high-quality dentures that provide the best fit, comfort, and function, designed to mimic the natural jaw movement.",
        pros: ["Superior fit and comfort", "Highly aesthetic and natural looking", "Durable and strong"],
        highlights: ["Premium Bio-functional design", "Precision jaw mapping", "Unmatched stability & grip"]
    },
    {
        id: "surgery",
        title: "Oral & Maxillofacial Surgery",
        image: IMAGES.treatments.surgery,
        description: "Surgical treatment of diseases, injuries and defects involving the functional and aesthetic aspects of the hard and soft tissues of the head, mouth, teeth, gums, jaws and neck.",
        pros: ["Resolves complex dental issues", "Corrects structural defects", "Improves long-term health"],
        highlights: ["Hospital-grade sterility", "Expert specialized care", "Rapid recovery guidance"]
    }
];

const Treatments = () => {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const element = document.getElementById(hash.replace('#', ''));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [hash]);

    return (
        <main className="bg-[#0B1120] min-h-screen text-white relative overflow-x-hidden">
            <SEO
                title="Best Dental Treatments in Surat | Dentocare Surat"
                description="Expert dental treatments in Surat: Dental Implants, RCT, Orthodontics, Smile Design, and Oral Surgery by Dr. Nimisha Modi at Plus Dento Care Dental & Implant Centre."
            />
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -z-0 pointer-events-none opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] -z-0 pointer-events-none opacity-50"></div>

            {/* Header */}
            <section className="relative pt-24 pb-8 md:pt-32 md:pb-16 overflow-hidden">
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-lg mb-5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                        <span className="text-[10px] md:text-[11px] font-semibold text-blue-400 tracking-wide">Clinical Catalog</span>
                    </div>
                    <h1 className="text-3xl md:text-7xl font-black mb-4 tracking-tight leading-tight md:leading-none">
                        Specialized <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Dental Treatments in Surat</span>
                    </h1>
                    <p className="text-gray-500 font-medium max-w-xl mx-auto tracking-wide text-[10px] md:text-sm leading-relaxed opacity-70">
                        Engineering advanced dental solutions with robotic precision and surgical excellence.
                    </p>
                </div>
            </section>

            {/* Treatments List */}
            <div className="container mx-auto px-4 sm:px-6 py-10 md:py-20 space-y-12 md:space-y-32">
                {treatmentsList.map((treatment, index) => (
                    <section
                        key={treatment.id}
                        id={treatment.id}
                        className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 md:gap-16 items-center scroll-mt-28`}
                    >
                        {/* Image Side */}
                        <div className="lg:w-1/2 w-full group">
                            <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-gray-800 transform transition-transform duration-700 hover:scale-[1.02]">
                                <img
                                    src={treatment.image}
                                    alt={`${treatment.title} Treatment at Plus Dento Care Surat | Best Dental Clinic in Surat`}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-[200px] md:h-[500px] object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-2"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent opacity-60"></div>
                                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 right-6 md:right-10">
                                    <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl inline-block">
                                        <h3 className="text-sm md:text-xl font-black text-white tracking-tight">{treatment.title}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content Side */}
                        <div className="lg:w-1/2 w-full">
                            <div className="bg-[#1e293b]/40 backdrop-blur-md p-5 sm:p-10 md:p-14 rounded-[2rem] md:rounded-[3rem] border border-gray-800 shadow-2xl hover:border-blue-500/30 transition-all duration-500">
                                <h2 className="text-2xl md:text-4xl font-black text-white mb-3 md:mb-6 tracking-tight leading-tight">{treatment.title}</h2>
                                <p className="text-gray-400 text-sm md:text-lg font-medium leading-relaxed mb-6 md:mb-10">
                                    {treatment.description}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
                                    {/* Pros */}
                                    <div>
                                        <h4 className="flex items-center gap-3 font-semibold text-emerald-400 mb-4 md:mb-6 text-[10px] md:text-[13px] tracking-wide uppercase">
                                            <span className="bg-emerald-500/20 p-1.5 rounded-lg border border-emerald-500/20"><Check size={16} /></span>
                                            Scientific Advantages
                                        </h4>
                                        <ul className="space-y-3 md:space-y-4">
                                            {treatment.pros.map((pro, i) => (
                                                <li key={i} className="text-gray-400 text-[12px] md:text-sm font-medium flex items-start gap-2 md:gap-3">
                                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 md:mt-2 shrink-0"></span>
                                                    {pro}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Highlights */}
                                    <div>
                                        <h4 className="flex items-center gap-3 font-semibold text-blue-400 mb-4 md:mb-6 text-[10px] md:text-[13px] tracking-wide uppercase">
                                            <span className="bg-blue-500/20 p-1.5 rounded-lg border border-blue-500/20"><Shield size={16} /></span>
                                            Patient Highlights
                                        </h4>
                                        <ul className="space-y-3 md:space-y-4">
                                            {treatment.highlights.map((highlight, i) => (
                                                <li key={i} className="text-gray-400 text-[12px] md:text-sm font-medium flex items-start gap-2 md:gap-3">
                                                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 md:mt-2 shrink-0"></span>
                                                    {highlight}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                ))}
            </div>
        </main>
    );
};

export default Treatments;
