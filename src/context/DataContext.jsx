import React, { createContext, useContext, useState, useEffect } from 'react';
import API_URL from '../config/api';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [galleryImages, setGalleryImages] = useState([]);
    const [videoList, setVideoList] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch Data from MongoDB
    const fetchData = async () => {
        try {
            const [reg, vres] = await Promise.all([
                fetch(`${API_URL}/api/gallery`),
                fetch(`${API_URL}/api/videos`)
            ]);
            const gData = await reg.json();
            const vData = await vres.json();

            setGalleryImages(Array.isArray(gData) ? gData : []);
            setVideoList(Array.isArray(vData) ? vData : []);
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

    return (
        <DataContext.Provider value={{
            galleryImages,
            videoList,
            addGalleryImage,
            addVideoItem,
            removeGalleryImage,
            removeVideoItem,
            refreshData: fetchData,
            loading
        }}>
            {children}
        </DataContext.Provider>
    );
};
