"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import API_URL from '../config/api';

const DataContext = createContext({ galleryImages: [], videoList: [], blogList: [], testimonialList: [], loading: false });

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [galleryImages, setGalleryImages] = useState([]);
    const [videoList, setVideoList] = useState([]);
    const [testimonialList, setTestimonialList] = useState([]);
    const [blogList, setBlogList] = useState([
        {
            _id: 'initial-blog-1',
            title: 'Dental Implant Cost in Surat 2025 — Complete Guide',
            category: 'Dental Implants',
            date: '2025-01-15',
            image: 'https://res.cloudinary.com/dyc1drqpy/image/upload/f_auto,q_auto,w_800/v1768732107/implant_vxgxlc.jpg',
            content: `Searching for the best dental implant cost in Surat? In 2025, tooth replacement technology has reached new heights at Dentocare & Implant Centre. Led by Dr. Nimisha Modi, we provide robotic precision implants with a 99% success rate. 

Cost factors for dental implants in Surat include:
1. Brand of the implant (Korean, Swiss, or German)
2. Bone grafting requirements
3. Type of crown (Zirconia or PFM)

At Dentocare, single dental implants start from ₹18,000. Our clinic near Palanpur Road and Gaurav Path uses advanced 3D CBCT scanning to ensure perfect placement. Whether you need a <a href="/dental-implants" class="text-blue-500 underline font-bold">single tooth replacement</a> or full mouth rehabilitation, we offer the most transparent pricing and expert care in Adajan, Surat.`
        },
        {
            _id: 'initial-blog-2',
            title: 'Painless Root Canal Treatment in Surat — What to Expect',
            category: 'Oral Health',
            date: '2025-02-10',
            image: 'https://res.cloudinary.com/dyc1drqpy/image/upload/f_auto,q_auto,w_800/v1768732113/root_canal_kgicfn.jpg',
            content: `Most people fear the words "Root Canal," but at Dentocare Surat, we specialize in painless RCT (Root Canal Treatment). Using modern rotary endodontics and laser disinfection, Dr. Nimisha Modi ensures a comfortable experience.

Why choose Dentocare for RCT in Surat?
- Single-sitting Root Canal: Save time with appointments completed in under 60 minutes.
- Laser Disinfection: Reduces infection risk and ensures long-term success.
- Painless Anesthesia: We use computer-controlled local anesthesia for a zero-pain experience.

Save your natural teeth with the best <a href="/root-canal" class="text-blue-500 underline font-bold">painless RCT specialist</a> in Adajan and Simanagar.`
        },
        {
            _id: 'initial-blog-3',
            title: 'Best Dentist near Adajan Surat — Dr. Nimisha Modi',
            category: 'Cosmetic Dentistry',
            date: '2025-03-05',
            image: 'https://res.cloudinary.com/dyc1drqpy/image/upload/f_auto,q_auto,w_400/v1768734665/doctor_sr6xdx.png',
            content: `Finding a trusted dentist near Adajan, Surat is crucial for your family's oral health. Dr. Nimisha Modi (BDS, MDS) at Dentocare has over 12 years of experience in creating healthy, beautiful smiles.

Our two branches—Simanagar (Palanpur Road) and Gaurav Path—are equipped with the latest dental technology including digital X-rays and ergonomic chairs. From routine cleanings to complex smile makeovers with Porcelain Veneers, we provide personalized care for every resident of Adajan, Vesu, and Pal.`
        },
        {
            _id: 'initial-blog-4',
            title: 'Kids Dental Care Specialist in Surat — Pediatric Dentistry',
            category: 'Oral Health',
            date: '2025-03-08',
            image: 'https://res.cloudinary.com/dyc1drqpy/image/upload/f_auto,q_auto,w_800/v1768732107/dent3_vp24y8.png',
            content: `Your child's first dental visit should be a positive one! Dentocare provides the best pediatric dentistry in Surat. Our child-friendly environment is designed to make kids feel at ease.

Dr. Nimisha Modi and her team specialize in:
- Preventive fluoride treatments to stop cavities.
- Gentle milk-tooth extractions.
- Habit breaking appliances for thumb sucking.
- Dental sealants for children's molars.

If you are looking for a kids dentist in Surat near Palanpur Road, visit Dentocare for a stress-free experience for your little ones.`
        }
    ]);
    const [loading, setLoading] = useState(true);

    // Safe fetch helper — never throws, always returns fallback on any failure
    const safeFetch = async (url, options) => {
        try {
            const res = await fetch(url, options);
            if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
                const data = await res.json();
                return Array.isArray(data) ? data : [];
            }
            return [];
        } catch {
            // Silently return empty array on ANY error (network, abort, parse, etc.)
            return [];
        }
    };

    // Fetch Data from MongoDB with Timeout protection
    const fetchData = async (signal, isMountedRef = { current: true }) => {
        try {
            const fetchOptions = { signal };

            const results = await Promise.allSettled([
                safeFetch(`${API_URL}/api/gallery`, fetchOptions),
                safeFetch(`${API_URL}/api/videos`, fetchOptions),
                safeFetch(`${API_URL}/api/blogs`, fetchOptions),
                safeFetch(`${API_URL}/api/testimonials`, fetchOptions)
            ]);

            if (!isMountedRef.current) return;

            setGalleryImages(results[0].status === 'fulfilled' ? results[0].value : []);
            setVideoList(results[1].status === 'fulfilled' ? results[1].value : []);
            setBlogList(prev => {
                const fetched = results[2].status === 'fulfilled' ? results[2].value : [];
                return fetched.length > 0 ? fetched : prev;
            });
            setTestimonialList(results[3].status === 'fulfilled' ? results[3].value : []);
        } catch (err) {
            // Silently ignore
        } finally {
            if (isMountedRef.current) {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        const isMounted = { current: true };
        const controller = new AbortController();
        
        fetchData(controller.signal, isMounted);
        
        // Timeout protection
        const timeoutId = setTimeout(() => {
            if (isMounted.current) controller.abort();
        }, 15000); 

        return () => {
            isMounted.current = false;
            clearTimeout(timeoutId);
            controller.abort();
        };
    }, []);

    const addGalleryImage = (image) => {
        setGalleryImages(prev => [image, ...prev]);
    };

    const addVideoItem = (video) => {
        setVideoList(prev => [video, ...prev]);
    };

    const addBlogItem = (blog) => {
        setBlogList(prev => [blog, ...prev]);
    };

    const addTestimonial = (testimonial) => {
        setTestimonialList(prev => [testimonial, ...prev]);
    };

    const removeGalleryImage = async (id) => {
        try {
            await fetch(`${API_URL}/api/gallery/${id}`, { method: 'DELETE' });
            setGalleryImages(prev => prev.filter(img => img._id !== id));
        } catch (err) {
            console.error('Delete failed:', err);
        }
    };

    const removeVideoItem = async (id) => {
        try {
            await fetch(`${API_URL}/api/videos/${id}`, { method: 'DELETE' });
            setVideoList(prev => prev.filter(vid => vid._id !== id));
        } catch (err) {
            console.error('Delete failed:', err);
        }
    };

    const removeBlogItem = async (id) => {
        try {
            await fetch(`${API_URL}/api/blogs/${id}`, { method: 'DELETE' });
            setBlogList(prev => prev.filter(item => item._id !== id));
        } catch (err) {
            console.error('Delete failed:', err);
        }
    };

    const removeTestimonial = async (id) => {
        try {
            await fetch(`${API_URL}/api/testimonials/${id}`, { method: 'DELETE' });
            setTestimonialList(prev => prev.filter(item => item._id !== id));
        } catch (err) {
            console.error('Delete failed:', err);
        }
    };

    return (
        <DataContext.Provider value={{
            galleryImages,
            videoList,
            blogList,
            testimonialList,
            addGalleryImage,
            addVideoItem,
            addBlogItem,
            addTestimonial,
            removeGalleryImage,
            removeVideoItem,
            removeBlogItem,
            removeTestimonial,
            refreshData: fetchData,
            loading
        }}>
            {children}
        </DataContext.Provider>
    );
};
