import React from 'react';
import { Award, Shield, User, Star, CheckCircle2, Heart, Sparkles, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const doctors = [
    {
        name: "Dr. Ruchita Champaneria",
        role: "Dental Surgeon",
        qualifications: "B.D.S.",
        regNo: "A-23089",
        experience: "5 Years",
        image: "/assets/team/dentocare-dr-ruchita-surat.png",
        specialty: "General Dentistry",
        color: "blue",
        highlights: ["Restorative Expert", "Advanced Diagnostics"]
    },
    {
        name: "Dr. Jessica D Bale",
        role: "Associate Dentist",
        qualifications: "B.D.S.",
        regNo: "A-25134",
        experience: "3 Years",
        image: "/assets/team/dentocare-dr-jessica-surat.jpg",
        specialty: "Dental Surgery",
        color: "emerald",
        highlights: ["Aesthetic Enhancements", "Painless Procedures"]
    }
];

const DoctorTeam = () => {
    return (
        <section className="py-12 md:py-20 bg-[#0B1120] relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent"></div>

            <div className="container mx-auto px-6 max-w-7xl">
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center gap-2 mb-4"
                    >
                        <div className="h-[1px] w-6 bg-blue-500/50"></div>
                        <span className="text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em]">Dedicated Specialists</span>
                        <div className="h-[1px] w-6 bg-blue-500/50"></div>
                    </motion.div>

                    <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4 tracking-tight">
                        Our Specialized <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Experts</span>
                    </h2>

                    <p className="text-gray-300 max-w-xl mx-auto text-xs md:text-sm font-medium leading-relaxed opacity-80 italic">
                        Redefining dental excellence through collaborative expertise and international protocols.
                    </p>
                </div>

                {/* Team Layout - Static Grid (No Slider) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 max-w-7xl mx-auto">
                    {doctors.map((doc, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: index * 0.1 }}
                            className="w-full"
                        >
                            <div className="relative flex flex-col md:flex-row gap-6 md:gap-10 bg-gradient-to-br from-white/[0.05] to-transparent p-6 md:p-10 rounded-[3rem] border border-white/5 hover:border-blue-500/20 transition-all duration-500 backdrop-blur-xl shadow-2xl h-full group/card overflow-hidden">

                                {/* Image Side - Optimized for mobile height */}
                                <div className="w-full md:w-[50%] relative shrink-0">
                                    <div className="relative aspect-[4/5] md:aspect-[4.5/6] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl z-10 transition-transform duration-500 group-hover/card:scale-[1.03]">
                                        <img
                                            src={doc.image}
                                            alt={`${doc.name} - ${doc.role} at Plus Dento Care Surat | Best Dental Clinic in Surat`}
                                            width="400"
                                            height="500"
                                            loading="lazy"
                                            decoding="async"
                                            className="w-full h-full object-cover transition-all duration-1000 grayscale-[20%] group-hover/card:grayscale-0"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120]/80 via-transparent to-transparent"></div>

                                        {/* Experience Overlay */}
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2 w-fit">
                                                <Star size={12} className="text-yellow-400 fill-yellow-400" />
                                                <span className="text-[10px] font-black text-white uppercase tracking-wider">{doc.experience}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Decorative Blur */}
                                    <div className={`absolute -top-4 -right-4 w-24 h-24 rounded-full ${doc.color === 'blue' ? 'bg-blue-500/10' : 'bg-emerald-500/10'} blur-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700`}></div>
                                </div>

                                {/* Info Side - Compact & Professional */}
                                <div className="flex flex-col justify-between py-1 w-full">
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className={`h-[2px] w-6 ${doc.color === 'blue' ? 'bg-blue-500' : 'bg-emerald-500'}`}></span>
                                            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{doc.role}</span>
                                        </div>

                                        <h3 className="text-2xl md:text-3xl font-black text-white mb-1.5 tracking-tight group-hover/card:text-blue-400 transition-colors">
                                            {doc.name}
                                        </h3>
                                        <p className="text-blue-400 text-[11px] font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                                            <CheckCircle2 size={12} /> {doc.specialty}
                                        </p>

                                        <div className="space-y-3 mb-8">
                                            {doc.highlights.map((h, i) => (
                                                <div key={i} className="flex items-center gap-4 text-sm text-gray-300 font-medium">
                                                    <Sparkles size={12} className={doc.color === 'blue' ? 'text-blue-500' : 'text-emerald-500'} />
                                                    {h}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Stats Grid - Fixed Layout */}
                                    <div className="grid grid-cols-2 gap-3 mb-6">
                                        <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                                            <span className="block text-[8px] font-bold text-gray-300 uppercase tracking-widest mb-1">Qual</span>
                                            <span className="text-xs font-black text-white">{doc.qualifications}</span>
                                        </div>
                                        <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                                            <span className="block text-[8px] font-bold text-gray-300 uppercase tracking-widest mb-1">Reg No</span>
                                            <span className="text-xs font-black text-white">{doc.regNo}</span>
                                        </div>
                                    </div>

                                    {/* Footer Info */}
                                    <div className="flex items-center justify-between border-t border-white/5 pt-4">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-8 h-8 rounded-full ${doc.color === 'blue' ? 'bg-blue-500/10 text-blue-400' : 'bg-emerald-500/10 text-emerald-400'} flex items-center justify-center border border-white/5`}>
                                                <Shield size={14} />
                                            </div>
                                            <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">Verified Practitioner</span>
                                        </div>
                                        <div className="flex gap-4 opacity-30">
                                            <Heart size={14} />
                                            <TrendingUp size={14} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DoctorTeam;
