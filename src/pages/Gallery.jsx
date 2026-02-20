import React, { useState, useEffect, useMemo, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, Loader2, Camera } from 'lucide-react';
import { IMAGES } from '../constants';
import gsap from 'gsap';
import { useData } from '../context/DataContext';

import SEO from '../components/SEO';

const galleryImages = import.meta.glob('../assets/gallery/*.(png|jpe?g|svg|webp|avif)', { eager: true, as: 'url' });
const localImages = Object.values(galleryImages);

const ClinicGallery = () => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [activeFilter, setActiveFilter] = useState('All');
    const [visibleCount, setVisibleCount] = useState(9);
    const containerRef = useRef(null);
    const { galleryImages: adminImages } = useData();

    // Photo Data
    const allImages = useMemo(() => {
        const localFormatted = localImages.map(url => ({ url, category: 'Uploads' }));
        // Combine Admin Images + Local Folder Images + Static Constants
        return [...(adminImages || []), ...localFormatted, ...IMAGES.gallery];
    }, [adminImages]);

    const filteredImages = useMemo(() => {
        if (activeFilter === 'All') return allImages;
        return allImages.filter(img => img.category === activeFilter);
    }, [activeFilter, allImages]);

    const categories = useMemo(() => {
        const cats = new Set(allImages.map(img => img.category));
        return ['All', ...Array.from(cats)];
    }, [allImages]);

    useEffect(() => {
        window.scrollTo(0, 0);
        const ctx = gsap.context(() => {
            gsap.from(".gallery-header", { y: 30, opacity: 0, duration: 1 });
            gsap.from(".filter-tabs", { y: 20, opacity: 0, duration: 0.8, delay: 0.2 });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        gsap.fromTo(".gallery-item",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "power2.out" }
        );
    }, [activeFilter]);

    const handleLoadMore = () => setVisibleCount(prev => prev + 6);
    const handleNext = (e) => { e.stopPropagation(); setSelectedImageIndex(prev => (prev + 1) % filteredImages.length); };
    const handlePrev = (e) => { e.stopPropagation(); setSelectedImageIndex(prev => (prev - 1 + filteredImages.length) % filteredImages.length); };

    return (
        <main ref={containerRef} className="pt-24 md:pt-36 pb-24 bg-[#0B1120] min-h-screen text-white overflow-hidden relative selection:bg-blue-500">
            <SEO
                title="Clinical Gallery | Plus Dento Care Surat | Dr. Nimisha Modi"
                description="Explore our clinical cases, surgical protocols, and real patient smile transformations at Plus Dento Care Surat under Dr. Nimisha Modi."
            />
            {/* Background Glows */}
            <div className="absolute top-0 inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.08),transparent_50%)]"></div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">

                {/* Header Section */}
                <div className="gallery-header text-center mb-10 md:mb-12 max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-blue-400 mb-6">
                        <Camera size={12} className="animate-pulse md:w-3.5 md:h-3.5" /> Unified Visual Registry
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-none mb-6">
                        Clinical Gallery & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Smile Transformations in Surat</span>
                    </h1>
                    <p className="text-gray-400 font-medium text-xs md:text-lg leading-relaxed opacity-70 mb-8 md:mb-10 px-4">
                        Explore our clinical cases, surgical protocols, and real patient stories through high-fidelity visual documentation.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="filter-tabs flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => { setActiveFilter(cat); setVisibleCount(9); }}
                            className={`px-4 py-2 md:px-6 md:py-2.5 rounded-lg md:rounded-xl text-[9px] md:text-[11px] font-black uppercase tracking-widest transition-all ${activeFilter === cat
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-white/5 text-white/40 border border-white/5 hover:text-white'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Masonry Grid */}
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 md:gap-8 space-y-4 sm:space-y-6 md:space-y-8">
                    {filteredImages.slice(0, visibleCount).map((img, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedImageIndex(index)}
                            className="gallery-item break-inside-avoid relative group cursor-pointer rounded-xl md:rounded-[2.5rem] overflow-hidden border border-white/5 bg-white/[0.02] shadow-2xl hover:border-blue-500/30 transition-all duration-500"
                        >
                            <img
                                src={img.url}
                                alt={`Plus Dento Care Gallery - ${img.category} - ${index + 1} - Best Dental Clinic in Surat by Dr. Nimisha Modi`}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-auto transform group-hover:scale-110 transition-all duration-[1.5s] ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-3 md:p-8">
                                <div className="flex items-center justify-between w-full">
                                    <span className="bg-blue-600/20 backdrop-blur-md px-2 py-0.5 md:px-3 md:py-1 rounded md:rounded-lg text-[8px] md:text-[10px] font-black text-blue-400 border border-blue-500/20 uppercase tracking-widest">{img.category}</span>
                                    <div className="p-1.5 md:p-3 bg-white/10 backdrop-blur-xl rounded-lg md:rounded-2xl border border-white/20 text-white"><ZoomIn size={14} className="md:w-5 md:h-5" /></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Load More */}
                {visibleCount < filteredImages.length && (
                    <div className="text-center mt-12 md:mt-20">
                        <button
                            onClick={handleLoadMore}
                            className="inline-flex items-center gap-2 md:gap-3 bg-white/5 text-white border border-white/10 px-6 py-3 md:px-10 md:py-4 rounded-full font-black text-[10px] md:text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500 shadow-3xl active:scale-95"
                        >
                            Expand Collection <Loader2 size={14} className="animate-spin text-blue-500 md:w-4 md:h-4" />
                        </button>
                    </div>
                )}
            </div>

            {/* LIGHTBOX FOR PHOTOS */}
            {selectedImageIndex !== null && (
                <div className="fixed inset-0 bg-[#0B1120]/98 z-[500] flex items-center justify-center p-4 backdrop-blur-2xl" onClick={() => setSelectedImageIndex(null)}>
                    <button className="absolute top-6 right-6 md:top-10 md:right-10 text-white/40 hover:text-white transition-all transform hover:rotate-90 z-[510]" onClick={() => setSelectedImageIndex(null)}>
                        <X size={32} className="md:w-12 md:h-12" />
                    </button>
                    <button className="absolute left-4 md:left-8 w-10 h-10 md:w-16 md:h-16 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl hidden md:flex items-center justify-center text-white/40 hover:text-white transition-all z-[510]" onClick={handlePrev}>
                        <ChevronLeft size={24} className="md:w-10 md:h-10" />
                    </button>
                    <button className="absolute right-4 md:right-8 w-10 h-10 md:w-16 md:h-16 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl hidden md:flex items-center justify-center text-white/40 hover:text-white transition-all z-[510]" onClick={handleNext}>
                        <ChevronRight size={24} className="md:w-10 md:h-10" />
                    </button>
                    <div className="relative max-w-[95vw] md:max-w-[90vw] max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
                        <img src={filteredImages[selectedImageIndex].url} alt={`Full View - ${filteredImages[selectedImageIndex].category}`} className="max-w-full max-h-[85vh] object-contain rounded-xl md:rounded-[2rem] shadow-3xl border border-white/10" />
                    </div>
                </div>
            )}
        </main>
    );
};

export default ClinicGallery;
