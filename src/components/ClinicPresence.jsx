import React, { useRef, useEffect } from 'react';
import { MapPin, Phone, Clock, Navigation, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ClinicPresence = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".clinic-card",
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 90%",
                        once: true
                    }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const clinics = [
        {
            id: 1,
            name: "Palanpur Patia Branch",
            address: "Shop 113, Raj Point, Palanpur Patia Rd, beside McDonald's, TP-10, Palanpur, Surat, Gujarat 395009",
            phone: "+91 74053 59271",
            mapLink: "https://www.google.com/maps/place/Dent+O+Care+Advance+Multi-speciality+Implant+Center/@21.2110523,72.7875791,17z/data=!3m1!4b1!4m9!1m2!10m1!1e1!3m5!1s0x3be04dc957518685:0xdc2a64e62685a25c!8m2!3d21.2110523!4d72.790154!16s%2Fg%2F11vwgw6r6p?entry=ttu",
            iframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.565437890535!2d72.78465431533235!3d21.209356985901115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e59411d1563%3A0xfe4558290938b81e!2sPalanpur%20Patia%2C%20Surat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1675158654231!5m2!1sen!2sin",
            color: "blue"
        },
        {
            id: 2,
            name: "Gaurav Path Branch",
            address: "Shop 103, Palanpur Crossing, Gaurav Path, beside McDonald's, TP-10, Palanpur, Surat, Gujarat 395009",
            phone: "+91 74053 59271",
            mapLink: "https://www.google.com/maps/place/Dent+O+Care+Advance+Multi-speciality+Implant+Center/@21.2032023,72.7479348,15z/data=!4m10!1m2!2m1!1sDent+O+Care++Multi-speciality+Implant+Center!3m6!1s0x3be04d8a130a9c2f:0x7c07a48d5a66bf6e!8m2!3d21.2032023!4d72.7669892!15sCixEZW50IE8gQ2FyZSAgTXVsdGktc3BlY2lhbGl0eSBJbXBsYW50IENlbnRlclotIitkZW50IG8gY2FyZSBtdWx0aSBzcGVjaWFsaXR5IGltcGxhbnQgY2VudGVykgEHZGVudGlzdJoBRENpOURRVWxSUVVOdlpFTm9kSGxqUmpsdlQydEdiVmR0Vmt4VU1XaGhUbmt4V0ZnelZscFJiV016VDFkYVNWb3lZeEFC4AEA-gEECAAQLQ!16s%2Fg%2F11yn3xzfz5?entry=ttu",
            iframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.082536894567!2d72.779654115332!3d21.192134585906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04c2c5c645739%3A0xc3b9d62d0571d70!2sAdajan%2C%20Surat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1675158654231!5m2!1sen!2sin",
            color: "emerald"
        }
    ];

    return (
        <section ref={sectionRef} className="py-8 sm:py-10 bg-[#0B1120] relative border-t border-white/5 overflow-hidden">
            {/* Minimal Background */}
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-blue-500/5 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Compact Header */}
                <div className="text-center mb-6 z-10">
                    <h2 className="text-2xl font-black text-white tracking-tight flex items-center justify-center gap-2">
                        <MapPin size={20} className="text-blue-500" /> Visit Us
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                    {clinics.map((clinic) => (
                        <div key={clinic.id} className="clinic-card flex bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden hover:border-blue-500/30 transition-all p-1.5 h-[120px]">

                            {/* Map Thumbnail (Left side) */}
                            <div className="relative w-[120px] h-full rounded-lg overflow-hidden shrink-0">
                                <iframe
                                    src={clinic.iframe}
                                    className="w-full h-full grayscale-[0.8] group-hover:grayscale-0 opacity-80"
                                    allowFullScreen=""
                                    loading="lazy"
                                    title={clinic.name}
                                ></iframe>
                            </div>

                            {/* Content (Right side) */}
                            <div className="pl-3 py-1 flex flex-col justify-between flex-grow min-w-0">
                                <div>
                                    <h3 className="text-sm font-bold text-white leading-tight truncate">{clinic.name}</h3>
                                    <p className="text-[10px] text-gray-400 leading-tight mt-1 line-clamp-2">{clinic.address}</p>
                                </div>

                                <div className="flex gap-2 mt-2">
                                    <a
                                        href={clinic.mapLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/20 text-[10px] font-bold rounded py-1.5 flex items-center justify-center gap-1 transition-all"
                                    >
                                        <Navigation size={10} /> Directions
                                    </a>
                                    <a
                                        href={`tel:${clinic.phone}`}
                                        className="flex-1 bg-white/5 hover:bg-white/10 text-white border border-white/10 text-[10px] font-bold rounded py-1.5 flex items-center justify-center gap-1 transition-all"
                                    >
                                        <Phone size={10} /> Call
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ClinicPresence;
