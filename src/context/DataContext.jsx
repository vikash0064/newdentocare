import React, { createContext, useContext, useState, useEffect } from 'react';
import { IMAGES } from '../constants';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    // 1. Gallery Data
    const [galleryImages, setGalleryImages] = useState(() => {
        const saved = localStorage.getItem('admin_gallery_images');
        return saved ? JSON.parse(saved) : [];
    });

    // 2. Video Data
    const [videoList, setVideoList] = useState(() => {
        const saved = localStorage.getItem('admin_video_list');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('admin_gallery_images', JSON.stringify(galleryImages));
    }, [galleryImages]);

    useEffect(() => {
        localStorage.setItem('admin_video_list', JSON.stringify(videoList));
    }, [videoList]);

    const addImage = (image) => {
        setGalleryImages(prev => [image, ...prev]);
    };

    const addVideo = (video) => {
        setVideoList(prev => [video, ...prev]);
    };

    // Deletion support (optional for now but good to have)
    const removeImage = (index) => {
        setGalleryImages(prev => prev.filter((_, i) => i !== index));
    };

    const removeVideo = (index) => {
        setVideoList(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <DataContext.Provider value={{ galleryImages, videoList, addImage, addVideo, removeImage, removeVideo }}>
            {children}
        </DataContext.Provider>
    );
};
