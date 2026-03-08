import React from 'react';
import { ShieldCheck, Star, Award, Building2, CheckCircle, Search, Map } from 'lucide-react';

const TrustStrip = () => {
    const trustedBy = [
        { name: "Practo", icon: CheckCircle, label: "Verified Profile" },
        { name: "JustDial", icon: Star, label: "4.8 Rated" },
        { name: "Sulekha", icon: Award, label: "Top Dentist" },
        { name: "Google Maps", icon: Map, label: "366+ Reviews" },
        { name: "Gujarat Health", icon: ShieldCheck, label: "Regd. Clinic" }
    ];

    return (
        <div className="bg-[#0B1120] py-10 border-t border-b border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-emerald-600/5 pointer-events-none"></div>

            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-2">Our Digital Presence</h4>
                        <p className="text-white font-black text-xl tracking-tight">Trusted Across <span className="text-blue-500">Major Platforms</span></p>
                    </div>

                    <div className="flex flex-wrap justify-center md:justify-end gap-x-12 gap-y-8">
                        {trustedBy.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 group opacity-60 hover:opacity-100 transition-all cursor-default">
                                <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 group-hover:border-blue-500/50 group-hover:bg-blue-600/10 transition-all">
                                    <item.icon size={20} className="text-gray-400 group-hover:text-blue-400 transition-colors" />
                                </div>
                                <div>
                                    <p className="text-white font-black text-sm tracking-tight leading-none mb-1">{item.name}</p>
                                    <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest leading-none">{item.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrustStrip;
