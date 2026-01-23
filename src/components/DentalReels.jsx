import React, { useState } from 'react';
import { Play, Youtube, X, Instagram, Facebook } from 'lucide-react';
import { useData } from '../context/DataContext';

const DentalReels = () => {
    const [playingReel, setPlayingReel] = useState(null);
    const [showVideoModal, setShowVideoModal] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const { videoList } = useData();

    // List of provided YouTube Shorts IDs
    const shortsIds = [
        "JQct9JOXQ34", "PdiSeGPyoQg", "Dqs_efUM4I4", "SQ7rcZNdc9E",
        "YiiplwDndYc", "vxLaBCdHSo4", "soWSu72X3Jc", "ObdG7LJO_Cc",
        "kRnJHFi92ao", "hVMjsr9NOPE", "WMgUEMFe-zQ", "zjP2nCyNqvk",
        "cyI1DZk7P5c", "bS_PCjL0uMs", "qP1ryI7ltKQ", "oFXA4A1NHpk", "xOedWVbnOG4"
    ];

    const titles = [
        "Smile Transformation", "Happy Patient", "Dental Implants", "Root Canal Success",
        "Teeth Whitening", "Clinic Tour", "Patient Story", "Expert Care",
        "Pain Free Dentistry", "Kids Dental Care", "Orthodontic Result", "Smile Design",
        "Full Mouth Rehab", "Emergency Care", "Advanced Tech", "Hygiene Standards", "Happy Smiles"
    ];

    const staticReels = shortsIds.map((id, index) => ({
        id: `static-${index + 1}`,
        title: titles[index] || `Patient Story ${index + 1}`,
        views: `${(Math.random() * 10 + 2).toFixed(1)}K`,
        thumbnail: `https://i.ytimg.com/vi/${id}/hq720.jpg`,
        youtubeId: id
    }));

    // Merge Admin Videos + Static Videos
    const allReels = [...(videoList || []), ...staticReels];

    // Double the array for smooth infinite scrolling
    const marqueeReels = [...allReels, ...allReels];

    const handleReelClick = (reel) => {
        setPlayingReel(reel);
        setShowVideoModal(true);
    };

    const closeVideoModal = () => {
        setShowVideoModal(false);
        setPlayingReel(null);
    };

    return (
        <section className="bg-[#0B1120] py-10 sm:py-12 md:py-20 overflow-hidden relative border-t border-white/5">
            <div className="container mx-auto px-4 relative z-10 text-center mb-10 sm:mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-lg mb-3 sm:mb-4 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                    <span className="text-[9px] sm:text-[10px] md:text-[11px] font-semibold text-red-500 uppercase tracking-wide">Real Patient Results</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-2 sm:mb-3 tracking-tight">
                    Dental <span className="text-red-500">Stories</span>
                </h2>
                <p className="text-gray-400 font-medium text-[11px] sm:text-xs md:text-sm italic mb-6 sm:mb-8 max-w-lg mx-auto px-4">
                    "Patient Proof is the only Trust we Earn"
                </p>

                <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                    <button
                        onClick={() => window.open('https://www.youtube.com/@dentocaredental2888', '_blank')}
                        className="group bg-red-600 hover:bg-red-700 text-white pl-2.5 sm:pl-3 pr-4 sm:pr-5 py-2 sm:py-2.5 rounded-full font-bold text-[9px] sm:text-[10px] md:text-xs tracking-wide transition-all flex items-center gap-1.5 sm:gap-2 shadow-lg shadow-red-900/20 hover:scale-105 active:scale-95 border border-white/10"
                    >
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white text-white group-hover:text-red-600 transition-colors">
                            <Youtube size={12} className="sm:w-[14px] sm:h-[14px]" fill="currentColor" />
                        </div>
                        Subscribe
                    </button>

                    <button
                        onClick={() => window.open('https://www.instagram.com/dentocare_dental', '_blank')}
                        className="group bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 text-white pl-2.5 sm:pl-3 pr-4 sm:pr-5 py-2 sm:py-2.5 rounded-full font-bold text-[9px] sm:text-[10px] md:text-xs tracking-wide transition-all flex items-center gap-1.5 sm:gap-2 shadow-lg shadow-pink-900/20 hover:scale-105 active:scale-95 border border-white/10"
                    >
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white text-white group-hover:text-pink-600 transition-colors">
                            <Instagram size={12} className="sm:w-[14px] sm:h-[14px]" />
                        </div>
                        Follow
                    </button>

                    <button
                        onClick={() => window.open('https://www.facebook.com/modi.nimisha.5', '_blank')}
                        className="group bg-[#1877F2] hover:bg-blue-700 text-white pl-2.5 sm:pl-3 pr-4 sm:pr-5 py-2 sm:py-2.5 rounded-full font-bold text-[9px] sm:text-[10px] md:text-xs tracking-wide transition-all flex items-center gap-1.5 sm:gap-2 shadow-lg shadow-blue-900/20 hover:scale-105 active:scale-95 border border-white/10"
                    >
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white text-white group-hover:text-[#1877F2] transition-colors">
                            <Facebook size={12} className="sm:w-[14px] sm:h-[14px]" fill="currentColor" />
                        </div>
                        Connect
                    </button>
                </div>
            </div>

            <div className="relative w-full marquee-container">
                <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 md:w-32 bg-gradient-to-r from-[#0B1120] to-transparent z-20 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 md:w-32 bg-gradient-to-l from-[#0B1120] to-transparent z-20 pointer-events-none"></div>

                <div className="flex gap-4 sm:gap-5 md:gap-6 animate-marquee w-max px-4">
                    {marqueeReels.map((reel, index) => (
                        <div
                            key={`${reel._id || reel.id}-${index}`}
                            onClick={() => handleReelClick(reel)}
                            onMouseEnter={() => setHoveredIndex(`${reel._id || reel.id}-${index}`)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className="relative w-[200px] sm:w-[230px] md:w-[250px] h-[350px] sm:h-[400px] md:h-[440px] rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden cursor-pointer group border border-white/10 hover:border-red-500/50 transition-all duration-300 bg-[#0f172a]"
                        >
                            {hoveredIndex === `${reel._id || reel.id}-${index}` ? (
                                <div className="absolute inset-0 z-0">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${reel.youtubeId}?autoplay=1&mute=0&controls=0&modestbranding=1&loop=1&playlist=${reel.youtubeId}&playsinline=1`}
                                        title={reel.title}
                                        className="w-full h-full pointer-events-none scale-150"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    ></iframe>
                                </div>
                            ) : (
                                <img
                                    src={reel.thumbnail}
                                    alt={reel.title}
                                    loading="lazy"
                                    decodings="async"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = `https://i.ytimg.com/vi/${reel.youtubeId}/mqdefault.jpg`;
                                    }}
                                />
                            )}

                            <div className={`absolute inset-0 flex items-center justify-center z-10 pointer-events-none transition-opacity duration-300 ${hoveredIndex === `${reel._id || reel.id}-${index}` ? 'opacity-0' : 'opacity-100'}`}>
                                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white transform scale-90 group-hover:scale-100 group-hover:bg-red-600 group-hover:border-red-500 transition-all duration-300 shadow-2xl">
                                    <Play size={24} fill="currentColor" className="ml-1" />
                                </div>
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-4 p-5 md:p-6">
                                <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="text-white font-bold text-base sm:text-lg md:text-xl leading-tight mb-1.5 line-clamp-2">{reel.title}</h3>
                                    <div className="flex items-center gap-1.5 text-white/80 text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-black/40 backdrop-blur-md px-2.5 py-1 sm:py-1.5 rounded-full w-fit">
                                        <Youtube size={11} className="sm:w-3 sm:h-3 text-red-500" />
                                        {reel.views || 'Dynamic'} views
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showVideoModal && playingReel && (
                <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={closeVideoModal}>
                    <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] aspect-[9/16] bg-black rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 shadow-2xl" onClick={e => e.stopPropagation()}>
                        <button
                            onClick={closeVideoModal}
                            className="absolute top-3 right-3 z-20 w-8 h-8 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-all"
                        >
                            <X size={16} />
                        </button>
                        <iframe
                            src={`https://www.youtube.com/embed/${playingReel.youtubeId}?autoplay=1&rel=0&controls=0&modestbranding=1&loop=1&playlist=${playingReel.youtubeId}&playsinline=1`}
                            title={playingReel.title}
                            className="w-full h-full"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 60s linear infinite;
                }
                .marquee-container:hover .animate-marquee {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
};

export default DentalReels;