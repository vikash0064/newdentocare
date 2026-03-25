"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Play, Youtube, X, Heart } from 'lucide-react';
import gsap from 'gsap';
import SEO from '../components/SEO';
import { useData } from '../context/DataContext';

const VideoCard = ({ reel, onPlay }) => {
    const [isHovered, setIsHovered] = useState(false);
    const hoverTimeout = useRef(null);

    const handleMouseEnter = () => {
        hoverTimeout.current = setTimeout(() => {
            setIsHovered(true);
        }, 300);
    };

    const handleMouseLeave = () => {
        if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
        setIsHovered(false);
    };

    return (
        <div
            className="video-card group relative w-full aspect-[9/16] rounded-2xl sm:rounded-[2rem] overflow-hidden cursor-pointer border border-white/5 bg-black shadow-2xl"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => onPlay(reel)}
        >
            {isHovered ? (
                <div className="absolute inset-0 z-10 w-full h-full bg-black">
                    <iframe
                        src={`https://www.youtube.com/embed/${reel.youtubeId}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${reel.youtubeId}&playsinline=1`}
                        title={reel.title}
                        className="w-full h-full object-cover pointer-events-none"
                        frameBorder="0"
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                </div>
            ) : (
                <div className="w-full h-full relative bg-black">
                    <img
                        src={reel.thumbnail}
                        alt={reel.title}
                        className="w-full h-full object-cover bg-black"
                        loading="lazy"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://i.ytimg.com/vi/${reel.youtubeId}/mqdefault.jpg`;
                        }}
                    />
                </div>
            )}

            <div className="absolute inset-x-0 bottom-0 z-20 p-3 sm:p-5 flex flex-col justify-end">
                <div className="bg-black/60 backdrop-blur-md p-2 sm:p-3 rounded-lg sm:rounded-xl border border-white/10 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-white font-bold text-[10px] sm:text-sm leading-tight mb-1 sm:mb-2 line-clamp-2 text-shadow-sm">
                        {reel.title}
                    </h3>
                    <div className="flex items-center gap-2">
                        <Youtube size={10} className="text-red-500 sm:w-3 sm:h-3" />
                        <span className="text-[8px] sm:text-[10px] font-bold text-white/90 uppercase tracking-wider">{reel.views} Views</span>
                    </div>
                </div>
            </div>

            {!isHovered && (
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/20 text-white shadow-xl transition-transform duration-500 group-hover:scale-110">
                        <Play size={18} fill="currentColor" className="ml-1 sm:w-6 sm:h-6" />
                    </div>
                </div>
            )}
        </div>
    );
};

const Videos = () => {
    const [playingReel, setPlayingReel] = useState(null);
    const [showVideoModal, setShowVideoModal] = useState(false);
    const { videoList } = useData();

    const shortsIds = [
        "JQct9JOXQ34", "PdiSeGPyoQg", "Dqs_efUM4I4", "SQ7rcZNdc9E",
        "YiiplwDndYc", "vxLaBCdHSo4", "soWSu72X3Jc", "ObdG7LJO_Cc",
        "kRnJHFi92ao", "hVMjsr9NOPE", "WMgUEMFe-zQ", "zjP2nCyNqvk",
        "cyI1DZk7P5c", "bS_PCjL0uMs", "qP1ryI7ltKQ", "oFXA4A1NHpk", "xOedWVbnOG4"
    ];

    const titles = [
        "Advanced Smile Design", "Full Patient Recovery", "Dental Implant Magic", "Root Canal Excellence",
        "Teeth Whitening Transformation", "360° Clinic Tour", "Patient Story - Part 1", "Expert Dental Care",
        "Painless Extraction Tech", "Kid Friendly Dentistry", "Invisalign Transformations", "AI Smile Mapping",
        "Emergency Oral Surgery", "State-of-the-art Tech", "Surgical Precision", "Hygiene & Sterilization", "Final Smile Result"
    ];

    const staticReels = shortsIds.map((id, index) => ({
        id: `static-${index + 1}`,
        title: titles[index] || `Clinical Story ${index + 1}`,
        views: `${(12.4 + (index * 0.5) % 8).toFixed(1)}K`,
        thumbnail: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
        youtubeId: id
    }));

    const reels = [...(videoList || []), ...staticReels];

    useEffect(() => {
        const preconnectLinks = [
            "https://www.youtube.com",
            "https://i.ytimg.com",
            "https://googleads.g.doubleclick.net",
            "https://static.doubleclick.net"
        ];

        preconnectLinks.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = url;
            link.crossOrigin = "anonymous";
            document.head.appendChild(link);
        });

        const ctx = gsap.context(() => {
            gsap.from(".header-anim", { y: -20, opacity: 0, duration: 0.8, stagger: 0.1 });
            gsap.from(".video-card", {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.05,
                ease: "power2.out",
                delay: 0.3
            });
        });

        return () => {
            ctx.revert();
        };
    }, []);

    const handlePlay = (reel) => {
        setPlayingReel(reel);
        setShowVideoModal(true);
    };

    return (
        <main className="bg-[#050811] min-h-screen w-full flex flex-col relative">
            <SEO description="Watch our latest dental transformations, patient testimonials, and clinical highlights by Dr. Nimisha Modi in our video gallery at Dentocare Surat." />
            <div className="absolute inset-0 bg-[#050811] -z-20"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_10%,rgba(37,99,235,0.08),transparent_50%)] pointer-events-none -z-10"></div>
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_90%,rgba(239,68,68,0.05),transparent_50%)] pointer-events-none -z-10"></div>

            <div className="container mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-2 sm:pb-4 flex-shrink-0 z-10">
                <div className="flex items-end justify-between gap-6 video-header">
                    <div className="space-y-2 sm:space-y-3">
                        <div className="header-anim inline-flex items-center gap-2 px-2.5 py-1 bg-[#1e293b]/50 border border-white/10 rounded-full backdrop-blur-md">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                            <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-blue-400">Video Gallery</span>
                        </div>
                        <h1 className="header-anim text-2xl sm:text-5xl font-black text-white leading-none tracking-tight uppercase">
                            Patient Stories and Dental Results in Surat
                        </h1>
                    </div>
                </div>
            </div>

            <div className="w-full relative z-10 px-3 sm:px-6 pb-20">
                <div className="container mx-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-x-6 sm:gap-y-8 pt-2 sm:pt-4 pb-32">
                        {reels.map((reel) => (
                            <VideoCard key={reel.id} reel={reel} onPlay={handlePlay} />
                        ))}
                    </div>
                </div>
            </div>

            {showVideoModal && playingReel && (
                <div
                    className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[2000] flex items-center justify-center p-4 animate-in fade-in zoom-in duration-300"
                    onClick={() => setShowVideoModal(false)}
                >
                    <button
                        onClick={() => setShowVideoModal(false)}
                        className="absolute top-6 right-6 w-12 h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all z-[2010]"
                    >
                        <X size={24} />
                    </button>
                    <div
                        className="relative w-full max-w-sm md:max-w-md aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <iframe
                            src={`https://www.youtube.com/embed/${playingReel.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                            title={playingReel.title}
                            className="w-full h-full"
                            frameBorder="0"
                            loading="eager"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}

            <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </main>
    );
};

export default Videos;
