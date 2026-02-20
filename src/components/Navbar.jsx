import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, MessageCircle, ArrowRight, Zap, Video } from 'lucide-react';
import { IMAGES } from '../constants';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    const whatsappNumber = "916352534650";
    const whatsappMessage = "Hi Dent O Care, I have a query regarding dental treatments.";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
        document.body.style.overflow = 'auto';
    }, [location]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto';
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Treatments', path: '/treatments' },
        { name: 'Doctors', path: '/doctors' },
        { name: 'Videos', path: '/videos' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Blog', path: '/blog' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 w-full ${isScrolled || location.pathname !== '/'
                    ? 'py-2 bg-[#0B1120]/95 backdrop-blur-2xl border-b border-white/5 shadow-2xl'
                    : 'py-2.5 sm:py-3.5 bg-transparent'
                    }`}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
                    <div className="flex items-center justify-between gap-4">

                        {/* 1. Logo Section */}
                        <div className="flex-shrink-0 z-20">
                            <Link to="/" className="flex items-center group" aria-label="Dent O Care Home">
                                <img
                                    src={IMAGES.logo}
                                    alt="Plus Dento Care - Advanced Multi-speciality Implant Center in Surat Logo"
                                    className="h-7 sm:h-9 md:h-10 lg:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                                    loading="eager"
                                    decoding="async"
                                />
                            </Link>
                        </div>

                        {/* 2. Desktop Navigation Center Capsule */}
                        <div className="hidden lg:flex items-center bg-white/5 backdrop-blur-md border border-white/10 px-1 py-0.5 rounded-full shadow-inner">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`px-4 xl:px-5 py-2 rounded-full text-[12px] xl:text-[13px] font-bold tracking-wide transition-all duration-300 flex items-center gap-1.5 ${location.pathname === link.path
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
                                        : 'text-white/70 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>


                        {/* 3. WhatsApp Button Section */}
                        <div className="flex items-center gap-3 sm:gap-4 z-20">
                            {/* Desktop (XL+) Text Button */}
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative hidden xl:flex items-center gap-3 bg-emerald-500/10 hover:bg-emerald-500/20 px-6 py-2.5 rounded-full group transition-all duration-500 border border-emerald-500/30 overflow-hidden active:scale-95"
                            >
                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent -translate-x-full group-hover:animate-shimmer-fast pointer-events-none"></div>
                                <div className="relative flex items-center justify-center">
                                    <div className="absolute w-6 h-6 bg-emerald-500/40 rounded-full blur-md group-hover:scale-150 transition-transform animate-pulse"></div>
                                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-emerald-400 relative z-10" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471.148-.67.445-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-white/70 text-[9px] font-bold uppercase tracking-wide leading-none mb-0.5 group-hover:text-white transition-colors">Connect on</span>
                                    <span className="text-emerald-400 text-[12px] font-black uppercase tracking-widest group-hover:text-emerald-300 transition-colors leading-none">WhatsApp</span>
                                </div>
                            </a>

                            {/* Mobile/Tablet/Laptop (Icon Only) - Visible until XL */}
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="xl:hidden flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 active:scale-90 transition-all hover:bg-emerald-500/20 shadow-lg shadow-emerald-900/20"
                            >
                                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471.148-.67.445-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                            </a>

                            <button
                                onClick={toggleMenu}
                                aria-label={isMenuOpen ? "Close main navigation menu" : "Open main navigation menu"}
                                className="lg:hidden relative p-2 sm:p-2.5 bg-blue-600 text-white rounded-xl active:scale-90 transition-all shadow-lg shadow-blue-500/20 z-50"
                            >
                                <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
                                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </div>
                    </div>
                </div>
                <style>{`
                    @keyframes shimmer { 100% { transform: translateX(100%); } }
                    .animate-shimmer-fast { animation: shimmer 1.5s infinite; }
                `}</style>
            </nav>

            {/* Mobile Sidebar */}
            <div className={`fixed inset-0 z-[110] lg:hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'visible' : 'invisible'}`}>
                <div className={`absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={toggleMenu} />
                <div className={`absolute top-0 right-0 h-full w-[70%] max-w-[280px] bg-[#0B1120] p-5 transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) shadow-2xl flex flex-col border-l border-white/5 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex items-center justify-between mb-8">
                        <img src={IMAGES.logo} alt="Plus Dento Care Surat" className="h-7 w-auto" loading="eager" decoding="async" />
                        <button onClick={toggleMenu} className="p-1.5 text-white/40 bg-white/5 rounded-full hover:bg-white/10 hover:text-white transition-colors"><X size={18} /></button>
                    </div>
                    <nav className="flex-grow">
                        <ul className="space-y-1">
                            {navLinks.map((link, idx) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        onClick={toggleMenu}
                                        className={`flex items-center justify-between p-3.5 rounded-xl transition-all duration-300 ${location.pathname === link.path
                                            ? 'bg-blue-600/10 text-blue-400 font-black tracking-widest'
                                            : 'text-white/60 font-bold uppercase tracking-wider hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        <span className="text-sm">{link.name}</span>
                                        <ArrowRight size={14} className={`${location.pathname === link.path ? 'opacity-100' : 'opacity-0'}`} />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                </div>
            </div>
        </>
    );
};

export default Navbar;
