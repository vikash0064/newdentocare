import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGES } from '../constants';
import { ShieldCheck, Calendar, Phone, MapPin, Clock, Facebook, Instagram, Twitter, Linkedin, Youtube, ArrowRight, Heart, Lock } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="relative bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0B1120] text-gray-400 py-4 sm:py-6 border-t border-white/5 overflow-hidden min-h-[500px]">
            {/* Enhanced Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(6,182,212,0.08),transparent_50%)]"></div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Main Footer Content */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8 sm:mb-10">
                    {/* Column 4: Contact Info (Order 1, Full Width on Mobile) */}
                    <div className="order-1 col-span-2 lg:col-span-1 lg:order-4 space-y-3">
                        <h4 className="text-white font-semibold text-xs sm:text-sm uppercase tracking-wider relative inline-block">
                            Get In Touch
                            <span className="absolute -bottom-1 left-0 w-6 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500"></span>
                        </h4>

                        <div className="space-y-3">
                            {/* Branch 1: Palanpur */}
                            <div className="bg-white/5 p-2.5 rounded-xl border border-white/10 space-y-1.5 relative group hover:border-blue-500/30 transition-all">
                                <h5 className="text-blue-400 font-bold text-[10px] sm:text-xs uppercase tracking-wide flex items-center justify-between">
                                    Branch 1 (Palanpur Road)
                                    <MapPin size={12} className="text-blue-500" />
                                </h5>
                                <p className="text-gray-300 text-[10px] leading-tight font-medium">2nd Floor, Tirupati Shopping Center, Beside Tapteshwar Mahadev Temple, Simanagar-2, Mashal Circle, Palanpur Road, Surat</p>

                                <div className="space-y-1 pt-1.5 border-t border-white/5 text-[10px] text-gray-400">
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold text-white/40">Ph:</span>
                                        <a href="tel:+916352534650" className="hover:text-blue-400 transition-colors text-[11px]">+91 63525 34650</a>
                                    </div>
                                    <div className="flex items-start justify-between">
                                        <span className="font-semibold text-white/40 mt-0.5">Time:</span>
                                        <div className="text-right text-[9px] leading-tight text-gray-300">
                                            <div>10 AM – 1:30 PM | 4:30 PM – 8 PM</div>
                                            <div className="text-blue-400 font-semibold mt-0.5">Sun: 11 AM – 1:30 PM</div>
                                        </div>
                                    </div>
                                </div>

                                <a
                                    href="https://www.google.com/maps/place/Dent+O+Care+Advance+Multi-speciality+Implant+Center/@21.2110523,72.7875791,17z/data=!3m1!4b1!4m9!1m2!10m1!1e1!3m5!1s0x3be04dc957518685:0xdc2a64e62685a25c!8m2!3d21.2110523!4d72.790154!16s%2Fg%2F11vwgw6r6p?entry=ttu"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block text-center bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white text-[10px] font-bold py-2 rounded-lg transition-all mt-1.5 border border-blue-500/20 hover:border-transparent"
                                    aria-label="Get directions to Plus Dento Care Palanpur Road Branch"
                                >
                                    Directions (Palanpur Road)
                                </a>
                            </div>

                            {/* Branch 2: Gaurav Path */}
                            <div className="bg-white/5 p-2.5 rounded-xl border border-white/10 space-y-1.5 relative group hover:border-emerald-500/30 transition-all">
                                <h5 className="text-emerald-400 font-bold text-[10px] sm:text-xs uppercase tracking-wide flex items-center justify-between">
                                    Branch 2 (Gaurav Path)
                                    <MapPin size={12} className="text-emerald-500" />
                                </h5>
                                <p className="text-gray-300 text-[10px] leading-tight font-medium">122, First Floor, Eden Square, Gaurav Path Road, Opp. Fire Station, Palanpur, Surat</p>

                                <div className="space-y-1 pt-1.5 border-t border-white/5 text-[10px] text-gray-400">
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold text-white/40">Ph:</span>
                                        <a href="tel:+918849220932" className="hover:text-emerald-400 transition-colors text-[11px]">+91 88492 20932</a>
                                    </div>
                                    <div className="flex items-start justify-between">
                                        <span className="font-semibold text-white/40 mt-0.5">Time:</span>
                                        <div className="text-right text-[9px] leading-tight text-gray-300">
                                            <div>10 AM – 1:30 PM | 4:30 PM – 8 PM</div>
                                            <div className="text-emerald-400 font-semibold mt-0.5">Sun: 11 AM – 1:30 PM</div>
                                        </div>
                                    </div>
                                </div>

                                <a
                                    href="https://www.google.com/maps/place/Dent+O+Care+Advance+Multi-speciality+Implant+Center/@21.2032023,72.7479348,15z/data=!4m10!1m2!2m1!1sDent+O+Care++Multi-speciality+Implant+Center!3m6!1s0x3be04d8a130a9c2f:0x7c07a48d5a66bf6e!8m2!3d21.2032023!4d72.7669892!15sCixEZW50IE8gQ2FyZSAgTXVsdGktc3BlY2lhbGl0eSBJbXBsYW50IENlbnRlclotIitkZW50IG8gY2FyZSBtdWx0aSBzcGVjaGFsaWx0eSBpbXBsYW50IGNlbnRlclkgEHZlbnRpc3RoBRENpOURRVWxSUVVOdlpFTm9kSGxqUmpsdlQydEdiVmR0Vmt4VU1XaGhUbmt4V0ZnelZscFJiV016VDFkYVNWb3lZeEFC4AEA-gEECAAQLQ!16s%2Fg%2F11yn3xzfz5?entry=ttu"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block text-center bg-emerald-600/10 hover:bg-emerald-600 text-emerald-400 hover:text-white text-[10px] font-bold py-2 rounded-lg transition-all mt-1.5 border border-emerald-500/20 hover:border-transparent"
                                    aria-label="Get directions to Plus Dento Care Gaurav Path Branch"
                                >
                                    Directions (Gaurav Path)
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Column 1: Brand (Order 2, Full Width on Mobile) */}
                    <div className="order-2 col-span-2 lg:col-span-1 lg:order-1 space-y-4">
                        <div className="flex items-center gap-2 group">
                            <img
                                src={IMAGES.logo}
                                alt="Best dentist clinic in Surat - Plus Dento Care Logo"
                                title="Dentocare Surat & Implant Centre"
                                className="h-10 sm:h-12 w-[130px] sm:w-[160px] object-contain transition-transform duration-500 group-hover:scale-110"
                                width="160"
                                height="48"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                        <p className="leading-relaxed text-gray-300 text-xs sm:text-sm font-medium max-w-sm">
                            Revolutionary dental care with Surat's finest clinical excellence and personalized journeys.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-3">
                            {[
                                { Icon: Facebook, label: "Facebook Page", href: "https://www.facebook.com/modi.nimisha.5", color: "hover:bg-blue-600 hover:border-blue-500" },
                                { Icon: Instagram, label: "Instagram Profile", href: "https://www.instagram.com/dentocare_dental", color: "hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 hover:border-pink-500" },
                                { Icon: Youtube, label: "Youtube Channel", href: "https://www.youtube.com/@dentocare_dental", color: "hover:bg-red-600 hover:border-red-500" }
                            ].map((social, i) => (
                                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className={`group bg-white/5 p-3.5 rounded-xl transition-all border border-white/10 ${social.color} min-w-[44px] min-h-[44px] flex items-center justify-center`}>
                                    <social.Icon size={18} className="text-gray-300 group-hover:text-white transition-colors" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Patient Hub (Order 3, Half Width on Mobile) */}
                    <div className="order-3 col-span-1 lg:col-span-1 lg:order-2 space-y-4">
                        <h4 className="text-white font-semibold text-xs sm:text-sm uppercase tracking-widest relative inline-block">
                            Patient Hub
                            <span className="absolute -bottom-1 left-0 w-6 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500"></span>
                        </h4>
                        <ul className="space-y-3 pt-1">
                            {[
                                { to: "/", label: "Home" },
                                { to: "/treatments", label: "Treatments" },
                                { to: "/doctors", label: "Doctors" },
                                { to: "/gallery", label: "Gallery" },
                                { to: "/contact", label: "Contact" }
                            ].map((link, idx) => (
                                <li key={idx}>
                                    <Link to={link.to} className="group flex items-center gap-1.5 text-gray-300 hover:text-blue-400 transition-all text-xs sm:text-sm font-bold tracking-tight">
                                        <ArrowRight size={10} className="text-blue-500/30 group-hover:text-blue-400" />
                                        <span className="group-hover:translate-x-1 transition-transform uppercase">{link.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Expertise (Order 4, Half Width on Mobile) */}
                    <div className="order-4 col-span-1 lg:col-span-1 lg:order-3 space-y-4">
                        <h4 className="text-white font-semibold text-xs sm:text-sm uppercase tracking-widest relative inline-block">
                            Expertise
                            <span className="absolute -bottom-1 left-0 w-6 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500"></span>
                        </h4>
                        <ul className="space-y-3 pt-1">
                            {[
                                { to: "/treatments#implants", label: "Implants" },
                                { to: "/treatments#rct", label: "Root Canal" },
                                { to: "/treatments#straightening", label: "Braces" },
                                { to: "/treatments#restoration", label: "Restoration" },
                                { to: "/treatments#extraction", label: "Extraction" },
                                { to: "/treatments#surgery", label: "Surgery" }
                            ].map((link, idx) => (
                                <li key={idx}>
                                    <Link to={link.to} className="group flex items-center gap-1.5 text-gray-300 hover:text-emerald-400 transition-all text-xs sm:text-sm font-bold tracking-tight">
                                        <ArrowRight size={10} className="text-emerald-500/30 group-hover:text-emerald-400" />
                                        <span className="group-hover:translate-x-1 transition-transform uppercase">{link.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar - Enhanced & Centered Credits */}
                <div className="border-t border-white/10 pt-8 mt-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-8">
                        {/* Copyright - Left on Desktop */}
                        <div className="text-center lg:text-left order-2 lg:order-1">
                            <p className="text-[10px] text-gray-300 font-medium flex items-center justify-center lg:justify-start gap-1.5 uppercase tracking-widest">
                                © {new Date().getFullYear()} Dent O Care SURAT. <Heart size={10} className="text-red-500 fill-current" />
                            </p>
                        </div>

                        {/* Centered & Eye-Catching Credit - Center */}
                        <div className="flex justify-center order-1 lg:order-2">
                            <a
                                href="https://webnginx.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative"
                            >
                                {/* Glowing Background Effect */}
                                <div className="absolute inset-0 bg-blue-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-full"></div>

                                <div className="relative bg-[#0B1120]/80 backdrop-blur-xl border border-white/10 px-8 py-2.5 rounded-full flex items-center gap-4 transition-all duration-500 group-hover:border-blue-500/50 group-hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]">
                                    <span className="text-[8px] font-black text-gray-400 uppercase tracking-[0.4em] mb-0.5">Developed By</span>
                                    <div className="h-4 w-[1px] bg-white/10 group-hover:bg-blue-500/30 transition-colors"></div>
                                    <span className="text-xs font-black bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent uppercase tracking-tight group-hover:tracking-widest transition-all duration-700">
                                        webnginx
                                    </span>
                                </div>
                            </a>
                        </div>

                        {/* Secondary Links - Right on Desktop */}
                        <div className="flex justify-center lg:justify-end gap-6 text-[9px] font-black uppercase tracking-[0.2em] text-gray-300 order-3 lg:order-3">
                            <Link to="#" className="hover:text-blue-400 transition-colors">Privacy</Link>
                            <Link to="#" className="hover:text-blue-400 transition-colors">Emergency</Link>
                            <Link to="/admin" className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 group/admin">
                                <Lock size={10} className="group-hover/admin:scale-110 transition-transform" />
                                Admin
                            </Link>
                        </div>
                    </div>
                </div>
            </div >
        </footer >
    );
};

export default Footer;
