import React, { createContext, useContext, useState, useEffect } from 'react';
import API_URL from '../config/api';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [galleryImages, setGalleryImages] = useState([]);
    const [videoList, setVideoList] = useState([]);
    const [blogList, setBlogList] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch Data from MongoDB
    const fetchData = async () => {
        try {
            const [reg, vres, bres] = await Promise.all([
                fetch(`${API_URL}/api/gallery`),
                fetch(`${API_URL}/api/videos`),
                fetch(`${API_URL}/api/blogs`)
            ]);
            const gData = await reg.json();
            const vData = await vres.json();
            const bData = await bres.json();

            setGalleryImages(Array.isArray(gData) ? gData : []);
            setVideoList(Array.isArray(vData) ? vData : []);
            setBlogList(Array.isArray(bData) ? bData : []);
        } catch (err) {
            console.error('Failed to fetch data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
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

    return (
        <DataContext.Provider value={{
            galleryImages,
            videoList,
            blogList,
            addGalleryImage,
            addVideoItem,
            addBlogItem,
            removeGalleryImage,
            removeVideoItem,
            removeBlogItem,
            refreshData: fetchData,
            loading
        }}>
            {children}
        </DataContext.Provider>
    );
};
