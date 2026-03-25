"use client";
import React, { useState, useRef, useEffect } from 'react';
import { 
    Upload, Video, Image as ImageIcon, Trash2, Link, Check, 
    AlertCircle, Lock, Eye, EyeOff, Loader2, FileText, 
    PenTool, LogOut, Star, User 
} from 'lucide-react';
import { useData } from '../context/DataContext';
import API_URL from '../config/api';

const AdminPanel = () => {
    const { 
        addGalleryImage, addVideoItem, addBlogItem, addTestimonial,
        galleryImages, videoList, blogList, testimonialList,
        removeGalleryImage, removeVideoItem, removeBlogItem, removeTestimonial,
        loading 
    } = useData();
    const [activeTab, setActiveTab] = useState('gallery'); // 'gallery' | 'videos' | 'blogs' | 'reviews'

    // Authentication States
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState('');

    // Admin Password
    const ADMIN_PASSWORD = 'dentocare@2026';

    // Video Form States
    const [videoUrl, setVideoUrl] = useState('');
    const [videoTitle, setVideoTitle] = useState('');

    // Blog Form States
    const [blogTitle, setBlogTitle] = useState('');
    const [blogContent, setBlogContent] = useState('');
    const [blogAuthor, setBlogAuthor] = useState('Dr. Nimisha Modi');
    const [blogCategory, setBlogCategory] = useState('Dental Health');
    const [blogImage, setBlogImage] = useState(null);
    const blogImageRef = useRef(null);

    // Testimonial Form States
    const [patientName, setPatientName] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [reviewRating, setReviewRating] = useState(5);
    const [reviewDate, setReviewDate] = useState(new Date().toISOString().split('T')[0]);
    const [reviewLocation, setReviewLocation] = useState('Surat');
    const [reviewTreatment, setReviewTreatment] = useState('Dental Care');

    const [notification, setNotification] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    // Handle Login
    const handleLogin = (e) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            setLoginError('');
            sessionStorage.setItem('admin_auth', 'true');
        } else {
            setLoginError('Incorrect password. Please try again.');
            setPassword('');
        }
    };

    // Handle Logout
    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('admin_auth');
    };

    // Check session on mount
    useEffect(() => {
        const isAuth = sessionStorage.getItem('admin_auth');
        if (isAuth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const showNotification = (msg, type) => {
        setNotification({ msg, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('image', file);
        formData.append('category', 'Gallery');

        try {
            const response = await fetch(`${API_URL}/api/gallery`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();

            if (response.ok) {
                addGalleryImage(data);
                showNotification('Image uploaded successfully!', 'success');
            } else {
                showNotification(data.error || 'Upload failed', 'error');
            }
        } catch (err) {
            showNotification('Server connection error', 'error');
        } finally {
            setIsUploading(false);
        }
    };

    const handleVideoSubmit = async (e) => {
        e.preventDefault();
        setIsUploading(true);

        let id = '';
        try {
            const url = new URL(videoUrl);
            if (url.hostname === 'youtu.be') {
                id = url.pathname.slice(1);
            } else if (url.pathname.includes('/shorts/')) {
                id = url.pathname.split('/shorts/')[1];
            } else {
                id = url.searchParams.get('v');
            }
        } catch (err) {
            showNotification('Invalid YouTube URL', 'error');
            setIsUploading(false);
            return;
        }

        if (id) {
            const videoData = {
                youtubeId: id,
                title: videoTitle || `Video ${new Date().toLocaleDateString()}`,
                thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
            };

            try {
                const response = await fetch(`${API_URL}/api/videos`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(videoData)
                });
                const data = await response.json();

                if (response.ok) {
                    addVideoItem(data);
                    setVideoUrl('');
                    setVideoTitle('');
                    showNotification('Video added successfully!', 'success');
                } else {
                    showNotification('Failed to save video', 'error');
                }
            } catch (err) {
                showNotification('Server error', 'error');
            }
        } else {
            showNotification('Could not parse YouTube ID', 'error');
        }
        setIsUploading(false);
    };

    const handleBlogSubmit = async (e) => {
        e.preventDefault();
        setIsUploading(true);

        const formData = new FormData();
        formData.append('title', blogTitle);
        formData.append('content', blogContent);
        formData.append('author', blogAuthor);
        formData.append('category', blogCategory);
        if (blogImage) {
            formData.append('image', blogImage);
        }

        try {
            const response = await fetch(`${API_URL}/api/blogs`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();

            if (response.ok) {
                addBlogItem(data);
                setBlogTitle('');
                setBlogContent('');
                setBlogCategory('Dental Health');
                setBlogImage(null);
                if (blogImageRef.current) blogImageRef.current.value = '';
                showNotification('Blog published successfully!', 'success');
            } else {
                showNotification(data.error || 'Failed to publish blog', 'error');
            }
        } catch (err) {
            showNotification('Server error', 'error');
        } finally {
            setIsUploading(false);
        }
    };

    const handleTestimonialSubmit = async (e) => {
        e.preventDefault();
        setIsUploading(true);

        const testimonialData = {
            patientName,
            reviewText,
            rating: reviewRating,
            date: reviewDate,
            location: reviewLocation,
            treatment: reviewTreatment
        };

        try {
            const response = await fetch(`${API_URL}/api/testimonials`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(testimonialData)
            });
            const data = await response.json();

            if (response.ok) {
                addTestimonial(data);
                setPatientName('');
                setReviewText('');
                setReviewRating(5);
                setReviewLocation('Surat');
                setReviewTreatment('Dental Care');
                showNotification('Review added successfully!', 'success');
            } else {
                showNotification(data.error || 'Failed to add review', 'error');
            }
        } catch (err) {
            showNotification('Server error', 'error');
        } finally {
            setIsUploading(false);
        }
    };

    const tabs = [
        { id: 'gallery', label: 'Gallery', icon: ImageIcon, color: 'blue', count: galleryImages.length },
        { id: 'videos', label: 'Videos', icon: Video, color: 'red', count: videoList.length },
        { id: 'blogs', label: 'Blogs', icon: FileText, color: 'purple', count: blogList.length },
        { id: 'reviews', label: 'Reviews', icon: Star, color: 'yellow', count: testimonialList?.length || 0 },
    ];

    const activeTabData = tabs.find(t => t.id === activeTab);
    const colorMap = {
        blue: { bg: 'bg-blue-500', bgLight: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20', ring: 'focus:ring-blue-500/20 focus:border-blue-500/40', hover: 'hover:bg-blue-600' },
        red: { bg: 'bg-red-500', bgLight: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20', ring: 'focus:ring-red-500/20 focus:border-red-500/40', hover: 'hover:bg-red-600' },
        purple: { bg: 'bg-purple-500', bgLight: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20', ring: 'focus:ring-purple-500/20 focus:border-purple-500/40', hover: 'hover:bg-purple-600' },
        yellow: { bg: 'bg-yellow-500', bgLight: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20', ring: 'focus:ring-yellow-500/20 focus:border-yellow-500/40', hover: 'hover:bg-yellow-600' },
    };
    const colors = colorMap[activeTabData?.color || 'blue'];

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#0B1120] flex items-center justify-center px-4 py-10">
                <div className="w-full max-w-95">
                    <div className="bg-[#0f172a]/80 backdrop-blur-2xl border border-white/6 rounded-3xl p-7 sm:p-9 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)]">
                        <div className="flex justify-center mb-7">
                            <div className="relative">
                                <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-15 animate-pulse"></div>
                                <div className="relative bg-linear-to-b from-blue-500/15 to-blue-600/10 p-4 rounded-2xl border border-blue-500/20">
                                    <Lock size={28} className="text-blue-400" />
                                </div>
                            </div>
                        </div>
                        <div className="text-center mb-8">
                            <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                                Admin <span className="text-blue-500">Access</span>
                            </h1>
                            <p className="text-gray-600 text-[9px] font-black uppercase tracking-[0.25em] mt-1.5">Dentocare Control Panel</p>
                        </div>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-0.5">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••••••"
                                        className="w-full bg-black/30 border border-white/6 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none transition-all font-mono"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-blue-400"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                            {loginError && (
                                <div className="bg-red-500/10 border border-red-500/20 rounded-xl py-2 px-3 flex items-center gap-2">
                                    <AlertCircle size={13} className="text-red-500" />
                                    <span className="text-red-400 text-[9px] font-black">{loginError}</span>
                                </div>
                            )}
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest py-4 rounded-xl transition-all shadow-lg text-sm mt-2"
                            >
                                Authenticate
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0B1120] text-gray-200 pt-16 sm:pt-20">
            <div className="sticky top-16 sm:top-20 z-40 bg-[#0B1120]/90 backdrop-blur-xl border-b border-white/4">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between py-3 sm:py-4">
                        <div className="min-w-0">
                            <h1 className="text-lg sm:text-xl md:text-2xl font-black text-white uppercase tracking-tight truncate">
                                Admin <span className={colors.text}>Panel</span>
                            </h1>
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span className="text-[8px] sm:text-[9px] font-black text-emerald-500/70 uppercase tracking-widest">Connected</span>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 bg-white/4 hover:bg-red-500/10 border border-white/6 rounded-xl text-gray-500 hover:text-red-400 transition-all text-[9px] font-black uppercase tracking-wider"
                        >
                            <LogOut size={13} />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>

                    <div className="flex gap-1 sm:gap-1.5 pb-0 -mb-px overflow-x-auto no-scrollbar">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.id;
                            const tabColors = colorMap[tab.color];
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`shrink-0 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 sm:py-3 text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all relative rounded-t-xl border-b-2 ${
                                        isActive
                                            ? `${tabColors.text} bg-white/4 ${tabColors.border.replace('border-', 'border-b-')}`
                                            : 'text-gray-600 hover:text-gray-300 border-b-transparent hover:bg-white/2'
                                    }`}
                                >
                                    <tab.icon size={13} />
                                    {tab.label}
                                    <span className={`ml-0.5 text-[8px] px-1.5 py-0.5 rounded-md ${isActive ? tabColors.bgLight : 'bg-white/4'}`}> 
                                        {tab.count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {notification && (
                <div className={`fixed top-3 left-3 right-3 sm:top-4 sm:left-auto sm:right-6 sm:max-w-sm z-100 px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-2.5 border text-sm font-bold ${
                    notification.type === 'success' ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400' : 'bg-red-500/15 border-red-500/30 text-red-400'
                }`}>
                    {notification.type === 'success' ? <Check size={16} /> : <AlertCircle size={16} />}
                    <span className="text-xs">{notification.msg}</span>
                </div>
            )}

            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 sm:py-8">
                <div className="flex flex-col lg:grid lg:grid-cols-3 gap-5 sm:gap-8">
                    <div className="lg:col-span-1">
                        <div className="bg-[#0f172a]/60 backdrop-blur-xl border border-white/5 rounded-2xl p-5 sm:p-6 lg:sticky lg:top-32">
                            {activeTab === 'gallery' && (
                                <div className="space-y-5">
                                    <div>
                                        <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                                            <div className={`p-1.5 rounded-lg ${colors.bgLight}`}><Upload size={16} className={colors.text} /></div>
                                            Upload Image
                                        </h3>
                                        <p className="text-[9px] text-gray-600 font-bold uppercase tracking-wider mt-1 ml-9">Direct to Cloudinary</p>
                                    </div>
                                    <div className="relative border-2 border-dashed border-white/6 rounded-2xl p-8 text-center hover:border-blue-500/20 transition-all group overflow-hidden bg-black/20">
                                        {isUploading && (
                                            <div className="absolute inset-0 bg-[#0B1120]/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center gap-2.5">
                                                <Loader2 size={28} className="text-blue-500 animate-spin" />
                                                <p className="text-[8px] font-black uppercase text-gray-400 tracking-[0.25em]">Uploading...</p>
                                            </div>
                                        )}
                                        <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" disabled={isUploading} />
                                        <div className="pointer-events-none">
                                            <div className="w-12 h-12 mx-auto mb-3 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/10 group-hover:border-blue-500/30">
                                                <Upload size={20} className="text-blue-400" />
                                            </div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tap to select image</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'videos' && (
                                <div className="space-y-5">
                                    <div>
                                        <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                                            <div className={`p-1.5 rounded-lg ${colors.bgLight}`}><Video size={16} className={colors.text} /></div>
                                            Link Video
                                        </h3>
                                        <p className="text-[9px] text-gray-600 font-bold uppercase tracking-wider mt-1 ml-9">YouTube Video or Shorts</p>
                                    </div>
                                    <form onSubmit={handleVideoSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-0.5">Title</label>
                                            <input type="text" value={videoTitle} onChange={(e) => setVideoTitle(e.target.value)} placeholder="e.g. Laser Treatment Story" className={`w-full bg-black/30 border border-white/6 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 ${colors.ring}`} required />
                                        </div>
                                        <div>
                                            <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-0.5">YouTube Link</label>
                                            <div className="relative">
                                                <Link size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-700" />
                                                <input type="url" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="Paste URL here" className={`w-full bg-black/30 border border-white/6 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:ring-1 ${colors.ring}`} required />
                                            </div>
                                        </div>
                                        <button type="submit" disabled={isUploading} className={`w-full py-3.5 bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-widest rounded-xl transition-all`}>
                                            {isUploading ? <Loader2 size={16} className="animate-spin" /> : 'Add Video'}
                                        </button>
                                    </form>
                                </div>
                            )}

                            {activeTab === 'blogs' && (
                                <div className="space-y-5">
                                    <div>
                                        <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                                            <div className={`p-1.5 rounded-lg ${colors.bgLight}`}><PenTool size={16} className={colors.text} /></div>
                                            New Article
                                        </h3>
                                        <p className="text-[9px] text-gray-600 font-bold uppercase tracking-wider mt-1 ml-9">Write & Publish</p>
                                    </div>
                                    <form onSubmit={handleBlogSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-0.5">Title</label>
                                            <input type="text" value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} placeholder="Article heading..." className={`w-full bg-black/30 border border-white/6 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 ${colors.ring}`} required />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-0.5">Category</label>
                                                <select value={blogCategory} onChange={(e) => setBlogCategory(e.target.value)} className="w-full bg-black/30 border border-white/6 rounded-xl px-3 py-3 text-xs text-gray-300 focus:outline-none appearance-none">
                                                    <option value="Dental Health">Dental Health</option>
                                                    <option value="Cosmetic Dentistry">Cosmetic</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-0.5">Image</label>
                                                <input type="file" accept="image/*" ref={blogImageRef} onChange={(e) => setBlogImage(e.target.files[0])} className="w-full bg-black/30 border border-white/6 rounded-xl px-2.5 py-2 text-[10px] text-gray-500" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-0.5">Content</label>
                                            <textarea value={blogContent} onChange={(e) => setBlogContent(e.target.value)} rows="5" className={`w-full bg-black/30 border border-white/6 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 ${colors.ring} resize-none`} required></textarea>
                                        </div>
                                        <button type="submit" disabled={isUploading} className="w-full py-3.5 bg-purple-600 hover:bg-purple-500 text-white font-black uppercase tracking-widest rounded-xl transition-all">
                                            {isUploading ? <Loader2 size={16} className="animate-spin" /> : 'Publish Now'}
                                        </button>
                                    </form>
                                </div>
                            )}

                            {activeTab === 'reviews' && (
                                <div className="space-y-5">
                                    <div>
                                        <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                                            <div className={`p-1.5 rounded-lg ${colors.bgLight}`}><Star size={16} className={colors.text} /></div>
                                            Patient Review
                                        </h3>
                                        <p className="text-[9px] text-gray-600 font-bold uppercase tracking-wider mt-1 ml-9">Local & Database</p>
                                    </div>
                                    <form onSubmit={handleTestimonialSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-0.5">Patient Name</label>
                                            <input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} placeholder="Full name..." className={`w-full bg-black/30 border border-white/6 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 ${colors.ring}`} required />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-0.5">Rating (1-5)</label>
                                                <select value={reviewRating} onChange={(e) => setReviewRating(Number(e.target.value))} className="w-full bg-black/30 border border-white/6 rounded-xl px-3 py-3 text-xs text-gray-300 focus:outline-none appearance-none">
                                                    <option value="5">5 Stars</option>
                                                    <option value="4">4 Stars</option>
                                                    <option value="3">3 Stars</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-0.5">Date</label>
                                                <input type="date" value={reviewDate} onChange={(e) => setReviewDate(e.target.value)} className="w-full bg-black/30 border border-white/6 rounded-xl px-2.5 py-2.5 text-[10px] text-gray-400" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-0.5">Review Snippet</label>
                                            <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} rows="4" className={`w-full bg-black/30 border border-white/6 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 ${colors.ring} resize-none`} required></textarea>
                                        </div>
                                        <button type="submit" disabled={isUploading} className="w-full py-3.5 bg-yellow-600 hover:bg-yellow-500 text-white font-black uppercase tracking-widest rounded-xl transition-all">
                                            {isUploading ? <Loader2 size={16} className="animate-spin" /> : 'Add Review'}
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-wider">Records</h3>
                            <span className={`text-[8px] sm:text-[9px] font-black px-2.5 py-1 rounded-lg ${colors.bgLight} ${colors.text} uppercase tracking-widest`}>
                                {activeTabData?.count || 0} Items
                            </span>
                        </div>

                        {loading ? (
                            <div className="flex flex-col justify-center items-center py-16 gap-3">
                                <Loader2 size={32} className={`${colors.text} animate-spin`} />
                                <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em]">Loading...</p>
                            </div>
                        ) : activeTab === 'gallery' ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                                {galleryImages.length === 0 ? (
                                    <div className="col-span-full py-16 text-center border border-dashed border-white/6 rounded-2xl bg-white/1">
                                        <ImageIcon className="mx-auto text-gray-800 mb-3" size={36} />
                                        <p className="text-gray-700 text-[9px] font-black uppercase tracking-widest">No images yet</p>
                                    </div>
                                ) : (
                                    galleryImages.map((img) => (
                                        <div key={img._id} className="group relative aspect-square bg-[#0B1120] rounded-xl overflow-hidden border border-white/4">
                                            <img src={img.url} alt="Gallery" className="w-full h-full object-cover transition-transform group-hover:scale-105" loading="lazy" />
                                            <button onClick={() => removeGalleryImage(img._id)} className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all active:scale-90"><Trash2 size={12} /></button>
                                        </div>
                                    ))
                                )}
                            </div>
                        ) : activeTab === 'videos' ? (
                            <div className="space-y-2 sm:space-y-3">
                                {videoList.length === 0 ? (
                                    <div className="py-16 text-center border border-dashed border-white/6 rounded-2xl bg-white/1">
                                        <Video className="mx-auto text-gray-800 mb-3" size={36} />
                                        <p className="text-gray-700 text-[9px] font-black uppercase tracking-widest">No videos linked</p>
                                    </div>
                                ) : (
                                    videoList.map((vid) => (
                                        <div key={vid._id} className="flex items-center gap-3 p-2.5 sm:p-4 bg-white/2 border border-white/4 rounded-xl transition-all hover:bg-white/4">
                                            <div className="w-20 h-14 bg-black rounded-lg overflow-hidden shrink-0">
                                                <img src={vid.thumbnail} alt="Video" className="w-full h-full object-cover" loading="lazy" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-[11px] sm:text-sm font-black text-white truncate">{vid.title}</h4>
                                                <p className="text-[8px] text-gray-600 uppercase font-bold tracking-wider mt-0.5 truncate">ID: {vid.youtubeId}</p>
                                            </div>
                                            <button onClick={() => removeVideoItem(vid._id)} className="shrink-0 p-2 text-gray-600 hover:text-red-500"><Trash2 size={14} /></button>
                                        </div>
                                    ))
                                )}
                            </div>
                        ) : activeTab === 'blogs' ? (
                            <div className="space-y-2 sm:space-y-3">
                                {blogList.length === 0 ? (
                                    <div className="py-16 text-center border border-dashed border-white/6 rounded-2xl bg-white/1">
                                        <FileText className="mx-auto text-gray-800 mb-3" size={36} />
                                        <p className="text-gray-700 text-[9px] font-black uppercase tracking-widest">No articles published</p>
                                    </div>
                                ) : (
                                    blogList.map((blog) => (
                                        <div key={blog._id} className="flex items-center gap-3 p-2.5 sm:p-4 bg-white/2 border border-white/4 rounded-xl transition-all hover:bg-white/4">
                                            <div className="w-16 h-16 bg-black rounded-lg overflow-hidden shrink-0">
                                                {blog.image ? <img src={blog.image} alt="Blog" className="w-full h-full object-cover" loading="lazy" /> : <div className="w-full h-full flex items-center justify-center bg-gray-900/50"><FileText size={14} className="text-gray-700" /></div>}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-[11px] sm:text-sm font-black text-white truncate">{blog.title}</h4>
                                                <p className="text-[8px] text-gray-600 uppercase font-bold tracking-wider mt-0.5">{blog.category} • {new Date(blog.date).toLocaleDateString()}</p>
                                            </div>
                                            <button onClick={() => removeBlogItem(blog._id)} className="shrink-0 p-2 text-gray-600 hover:text-red-500"><Trash2 size={14} /></button>
                                        </div>
                                    ))
                                )}
                            </div>
                        ) : (
                            <div className="space-y-2 sm:space-y-3">
                                {testimonialList?.length === 0 ? (
                                    <div className="py-16 text-center border border-dashed border-white/6 rounded-2xl bg-white/1">
                                        <Star className="mx-auto text-gray-800 mb-3" size={36} />
                                        <p className="text-gray-700 text-[9px] font-black uppercase tracking-widest">No reviews added</p>
                                    </div>
                                ) : (
                                    testimonialList?.map((rev) => (
                                        <div key={rev._id} className="p-3 sm:p-5 bg-white/2 border border-white/4 rounded-xl transition-all hover:bg-white/4">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20"><User size={14} className="text-yellow-500" /></div>
                                                    <div>
                                                        <h4 className="text-[11px] font-black text-white">{rev.patientName}</h4>
                                                        <div className="flex items-center gap-1.5">
                                                            <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={8} fill={i < rev.rating ? "currentColor" : "none"} className={i < rev.rating ? "text-yellow-500" : "text-gray-700"} />)}</div>
                                                            <span className="text-[7px] text-gray-600 font-bold">{new Date(rev.date).toLocaleDateString()}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button onClick={() => removeTestimonial(rev._id)} className="p-2 text-gray-600 hover:text-red-500"><Trash2 size={14} /></button>
                                            </div>
                                            <p className="text-[10px] text-gray-400 italic leading-relaxed">"{rev.reviewText}"</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
