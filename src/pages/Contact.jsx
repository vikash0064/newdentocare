import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import SEO from '../components/SEO';

const Contact = () => {
    const [hoveredBranch, setHoveredBranch] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const branches = [
        {
            id: 1,
            name: "Branch 1 (Palanpur Road)",
            address: "2nd Floor, Tirupati Shopping Center, Beside Tapteshwar Mahadev Temple, Simanagar-2, Mashal Circle, Palanpur Road, Surat",
            phone: "+91 63525 34650",
            hours: "10 AM – 1:30 PM | 4:30 PM – 8 PM",
            sunday: "11 AM – 1:30 PM",
            mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.4234567890123!2d72.7669892!3d21.2032023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04d8a130a9c2f%3A0x7c07a48d5a66bf6e!2sDent%20O%20Care%20Advance%20Multi-speciality%20Implant%20Center!5e0!3m2!1sen!2sin!4v1706096400000!5m2!1sen!2sin",
            directionsLink: "https://www.google.com/maps/place/Dent+O+Care+Advance+Multi-speciality+Implant+Center/@21.2032023,72.7669892,17z",
            color: "blue",
            gradient: "from-blue-600 to-cyan-600"
        },
        {
            id: 2,
            name: "Branch 2 (Gaurav Path)",
            address: "122, First Floor, Eden Square, Gaurav Path Road, Opp. Fire Station, Palanpur, Surat",
            phone: "+91 88492 20932",
            hours: "10 AM – 1:30 PM | 4:30 PM – 8 PM",
            sunday: "11 AM – 1:30 PM",
            mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.1234567890123!2d72.790154!3d21.2110523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04dc957518685%3A0xdc2a64e62685a25c!2sDent%20O%20Care%20Advance%20Multi-speciality%20Implant%20Center!5e0!3m2!1sen!2sin!4v1706096400000!5m2!1sen!2sin",
            directionsLink: "https://www.google.com/maps/place/Dent+O+Care+Advance+Multi-speciality+Implant+Center/@21.2110523,72.790154,17z",
            color: "emerald",
            gradient: "from-emerald-600 to-teal-600"
        }
    ];

    return (
        <main className="bg-[#0B1120] min-h-screen relative overflow-hidden text-white">
            <SEO
                title="Contact Us | Best Dentist in Surat | Dr. Nimisha Modi"
                description="Visit Plus Dento Care at our Palanpur Road (Simanagar) or Gaurav Path branches in Surat. Contact Dr. Nimisha Modi for expert dental care."
            />

            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-[400px] bg-blue-600/5 rounded-full blur-[100px] -z-0"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 pb-12 relative z-10">

                {/* Header Section */}
                <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full mb-3">
                        <span className="w-1 h-1 rounded-full bg-blue-400 animate-pulse"></span>
                        <span className="text-[9px] font-bold text-blue-400 tracking-widest uppercase">Get In Touch</span>
                    </div>

                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-black mb-3 tracking-tight">
                        Contact Plus Dento Care Dental Clinic in Surat
                    </h1>

                    <p className="text-gray-400 text-xs md:text-sm max-w-xl mx-auto">
                        Two convenient locations in Surat to serve you better
                    </p>
                </div>

                {/* Branches Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
                    {branches.map((branch) => (
                        <div
                            key={branch.id}
                            onMouseEnter={() => setHoveredBranch(branch.id)}
                            onMouseLeave={() => setHoveredBranch(null)}
                            className="group relative"
                        >
                            <div className="bg-[#111827]/50 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/5 hover:border-blue-500/20 transition-all duration-500 shadow-xl">

                                {/* Map Container */}
                                <div className="relative h-[220px] md:h-[280px] overflow-hidden bg-gray-900">
                                    <iframe
                                        src={branch.mapEmbed}
                                        className="w-full h-full"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="eager"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title={`${branch.name} Location`}
                                    ></iframe>


                                    {/* Location Ping Effect */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                        {/* Ping wave */}
                                        <span className="absolute inline-flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-40"></span>
                                        </span>
                                        {/* Center marker dot */}
                                        <span className="relative inline-flex rounded-full h-5 w-5 bg-red-600 border-2 border-white shadow-lg"></span>
                                    </div>

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120]/60 via-transparent to-transparent pointer-events-none"></div>
                                </div>

                                {/* Branch Info */}
                                <div className="p-5 md:p-6 space-y-4">
                                    <h2 className="text-lg md:text-xl font-black text-white group-hover:text-blue-400 transition-colors">
                                        {branch.name}
                                    </h2>

                                    <div className="space-y-3">
                                        {/* Address */}
                                        <div className="flex gap-3">
                                            <div className={`p-1.5 bg-${branch.color}-500/10 rounded-lg text-${branch.color}-400 shrink-0 h-fit`}>
                                                <MapPin size={14} />
                                            </div>
                                            <p className="text-gray-400 text-xs md:text-sm font-medium leading-relaxed">{branch.address}</p>
                                        </div>

                                        {/* Phone */}
                                        <div className="flex gap-3 items-center">
                                            <div className={`p-1.5 bg-${branch.color}-500/10 rounded-lg text-${branch.color}-400 shrink-0`}>
                                                <Phone size={14} />
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">Ph:</p>
                                                <a href={`tel:${branch.phone.replace(/\s/g, '')}`} className="text-white text-sm md:text-base font-black hover:text-blue-400 transition-colors">
                                                    {branch.phone}
                                                </a>
                                            </div>
                                        </div>

                                        {/* Working Hours */}
                                        <div className="flex gap-3">
                                            <div className={`p-1.5 bg-${branch.color}-500/10 rounded-lg text-${branch.color}-400 shrink-0 h-fit`}>
                                                <Clock size={14} />
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">Time:</p>
                                                <p className="text-gray-300 text-xs md:text-sm font-medium leading-snug">{branch.hours}</p>
                                                <p className="text-gray-400 text-[10px] md:text-xs font-semibold mt-1">Sun: {branch.sunday}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Get Directions Button */}
                                    <a
                                        href={branch.directionsLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex items-center justify-center gap-2 w-full bg-gradient-to-r ${branch.gradient} hover:shadow-lg text-white font-bold py-2.5 md:py-3 rounded-xl transition-all hover:-translate-y-0.5 text-xs md:text-sm`}
                                    >
                                        <Navigation size={14} />
                                        Get Directions
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-12 text-center max-w-2xl mx-auto">
                    <div className="bg-[#111827]/40 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/5">
                        <h3 className="text-lg md:text-xl font-black text-white mb-3">Need Assistance?</h3>
                        <p className="text-gray-400 text-xs md:text-sm mb-5">
                            Call us and we'll guide you to the nearest branch
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                            <a
                                href="tel:+916352534650"
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg flex items-center gap-2 text-xs md:text-sm"
                            >
                                <Phone size={16} />
                                Call Now
                            </a>
                            <a
                                href="https://wa.me/916352534650"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg flex items-center gap-2 text-xs md:text-sm"
                            >
                                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471.148-.67.445-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                                WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    );
};

export default Contact;