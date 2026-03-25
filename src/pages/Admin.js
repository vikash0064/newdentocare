"use client";
import React, { useState, useRef } from 'react';
import { Upload, Video, Image as ImageIcon, Trash2, Link, Check, AlertCircle, Lock, Eye, EyeOff, Loader2, FileText, PenTool, LogOut } from 'lucide-react';
import { useData } from '../context/DataContext';
import API_URL from '../config/api';

const AdminPanel = () => {
    const { addGalleryImage, addVideoItem, addBlogItem, galleryImages, videoList, blogList, removeGalleryImage, removeVideoItem, removeBlogItem, loading } = useData();
    const [activeTab, setActiveTab] = useState('gallery'); // 'gallery' | 'videos' | 'blogs'

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
    React.useEffect(() => {
        const isAuth = sessionStorage.getItem('admin_auth');
        if (isAuth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    // Actual Multi-step Image Upload to MongoDB/Cloudinary
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

    const showNotification = (msg, type) => {
        setNotification({ msg, type });
        setTimeout(() => setNotification(null), 3000);
    };

    // ═══════════════════════════════════════════
    // LOGIN SCREEN
    // ═══════════════════════════════════════════
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#0B1120] flex items-center justify-center px-4 py-10">
                <div className="w-full max-w-[380px]">
                    <div className="bg-[#0f172a]/80 backdrop-blur-2xl border border-white/[0.06] rounded-3xl p-7 sm:p-9 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)]">
                        {/* Lock Icon */}
                        <div className="flex justify-center mb-7">
                            <div className="relative">
                                <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-15 animate-pulse"></div>
                                <div className="relative bg-gradient-to-b from-blue-500/15 to-blue-600/10 p-4 rounded-2xl border border-blue-500/20">
                                    <Lock size={28} className="text-blue-400" />
                                </div>
                            </div>
                        </div>

                        {/* Title */}
                        <div className="text-center mb-8">
                            <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                                Admin <span className="text-blue-500">Access</span>
                            </h1>
                            <p className="text-gray-600 text-[9px] font-black uppercase tracking-[0.25em] mt-1.5">Dentocare Control Panel</p>
                        </div>

                        {/* Login Form */}
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-0.5">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password || ''}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••••••"
                                        className="w-full bg-black/30 border border-white/[0.06] rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500/30 focus:border-blue-500/40 transition-all font-mono"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-blue-400 transition-colors p-1.5 active:scale-90"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            {loginError && (
                                <div className="bg-red-500/10 border border-red-500/20 rounded-xl py-2.5 px-3.5 flex items-center gap-2.5">
                                    <AlertCircle size={13} className="text-red-500 shrink-0" />
                                    <span className="text-red-400 text-[9px] font-black uppercase tracking-wider">{loginError}</span>
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-[0.15em] py-4 rounded-xl transition-all shadow-lg shadow-blue-500/10 active:scale-[0.97] text-sm mt-2"
                            >
                                Authenticate
                            </button>
                        </form>
                    </div>

                    <p className="text-center text-gray-700 text-[8px] font-black uppercase tracking-widest mt-5 flex items-center justify-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-gray-700"></span>
                        Secure Session Active
                    </p>
                </div>
            </div>
        );
    }

    // ═══════════════════════════════════════════
    // MAIN DASHBOARD
    // ═══════════════════════════════════════════
    const tabs = [
        { id: 'gallery', label: 'Gallery', icon: ImageIcon, color: 'blue', count: galleryImages.length },
        { id: 'videos', label: 'Videos', icon: Video, color: 'red', count: videoList.length },
        { id: 'blogs', label: 'Blogs', icon: FileText, color: 'purple', count: blogList.length },
    ];

    const activeTabData = tabs.find(t => t.id === activeTab);
    const colorMap = {
        blue: { bg: 'bg-blue-500', bgLight: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20', ring: 'focus:ring-blue-500/20 focus:border-blue-500/40', hover: 'hover:bg-blue-600' },
        red: { bg: 'bg-red-500', bgLight: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20', ring: 'focus:ring-red-500/20 focus:border-red-500/40', hover: 'hover:bg-red-600' },
        purple: { bg: 'bg-purple-500', bgLight: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20', ring: 'focus:ring-purple-500/20 focus:border-purple-500/40', hover: 'hover:bg-purple-600' },
    };
    const colors = colorMap[activeTabData?.color || 'blue'];

    return (
        <div className="min-h-screen bg-[#0B1120] text-gray-200 pt-16 sm:pt-20">
            {/* ── STICKY HEADER ── */}
            <div className="sticky top-16 sm:top-20 z-40 bg-[#0B1120]/90 backdrop-blur-xl border-b border-white/[0.04]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    {/* Top bar */}
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
                            className="flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 bg-white/[0.04] hover:bg-red-500/10 border border-white/[0.06] hover:border-red-500/20 rounded-xl text-gray-500 hover:text-red-400 transition-all text-[9px] sm:text-[10px] font-black uppercase tracking-wider active:scale-95"
                        >
                            <LogOut size={13} />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex gap-1 sm:gap-1.5 pb-0 -mb-px overflow-x-auto no-scrollbar">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.id;
                            const tabColors = colorMap[tab.color];
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex-shrink-0 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 sm:py-3 text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all relative rounded-t-xl border-b-2 ${
                                        isActive
                                            ? `${tabColors.text} bg-white/[0.04] ${tabColors.border.replace('border-', 'border-b-')}`
                                            : 'text-gray-600 hover:text-gray-300 border-b-transparent hover:bg-white/[0.02]'
                                    }`}
                                >
                                    <tab.icon size={13} />
                                    {tab.label}
                                    <span className={`ml-0.5 text-[8px] px-1.5 py-0.5 rounded-md ${isActive ? tabColors.bgLight : 'bg-white/[0.04]'}`}>
                                        {tab.count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ── NOTIFICATION ── */}
            {notification && (
                <div className={`fixed top-3 left-3 right-3 sm:top-4 sm:left-auto sm:right-6 sm:max-w-sm z-[100] px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-2.5 border text-sm font-bold ${
                    notification.type === 'success'
                        ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                        : 'bg-red-500/15 border-red-500/30 text-red-400'
                }`}>
                    {notification.type === 'success' ? <Check size={16} /> : <AlertCircle size={16} />}
                    <span className="text-xs">{notification.msg}</span>
                </div>
            )}

            {/* ── MAIN CONTENT ── */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 sm:py-8">
                <div className="flex flex-col lg:grid lg:grid-cols-3 gap-5 sm:gap-8">

                    {/* ═══ LEFT: FORM PANEL ═══ */}
                    <div className="lg:col-span-1">
                        <div className="bg-[#0f172a]/60 backdrop-blur-xl border border-white/[0.05] rounded-2xl p-5 sm:p-6 lg:sticky lg:top-32">

                            {/* GALLERY FORM */}
                            {activeTab === 'gallery' && (
                                <div className="space-y-5">
                                    <div>
                                        <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                                            <div className={`p-1.5 rounded-lg ${colors.bgLight}`}>
                                                <Upload size={16} className={colors.text} />
                                            </div>
                                            Upload Image
                                        </h3>
                                        <p className="text-[9px] text-gray-600 font-bold uppercase tracking-wider mt-1 ml-9">Direct to Cloudinary</p>
                                    </div>

                                    <div className="relative border-2 border-dashed border-white/[0.06] rounded-2xl p-8 sm:p-10 text-center hover:border-blue-500/20 transition-all group overflow-hidden bg-black/20">
                                        {isUploading && (
                                            <div className="absolute inset-0 bg-[#0B1120]/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center gap-2.5">
                                                <Loader2 size={28} className="text-blue-500 animate-spin" />
                                                <p className="text-[8px] font-black uppercase text-gray-400 tracking-[0.25em]">Uploading...</p>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            disabled={isUploading}
                                        />
                                        <div className="pointer-events-none">
                                            <div className="w-12 h-12 mx-auto mb-3 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/10 group-hover:border-blue-500/30 transition-all">
                                                <Upload size={20} className="text-blue-400" />
                                            </div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tap to select image</p>
                                            <p className="text-[8px] text-gray-700 mt-1 font-bold">PNG, JPG, WEBP</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* VIDEO FORM */}
                            {activeTab === 'videos' && (
                                <div className="space-y-5">
                                    <div>
                                        <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                                            <div className={`p-1.5 rounded-lg ${colors.bgLight}`}>
                                                <Video size={16} className={colors.text} />
                                            </div>
                                            Link Video
                                        </h3>
                                        <p className="text-[9px] text-gray-600 font-bold uppercase tracking-wider mt-1 ml-9">YouTube Video or Shorts</p>
                                    </div>

                                    <form onSubmit={handleVideoSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-0.5">Title</label>
                                            <input
                                                type="text"
                                                value={videoTitle || ''}
                                                onChange={(e) => setVideoTitle(e.target.value)}
                                                placeholder="e.g. Laser Treatment Story"
                                                className={`w-full bg-black/30 border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 ${colors.ring} transition-all placeholder:text-gray-700`}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-0.5">YouTube Link</label>
                                            <div className="relative">
                                                <Link size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-700" />
                                                <input
                                                    type="url"
                                                    value={videoUrl || ''}
                                                    onChange={(e) => setVideoUrl(e.target.value)}
                                                    placeholder="Paste URL here"
                                                    className={`w-full bg-black/30 border border-white/[0.06] rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:ring-1 ${colors.ring} transition-all font-mono text-xs placeholder:font-sans placeholder:text-gray-700`}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isUploading}
                                            className={`w-full py-3.5 bg-red-600 ${colors.hover} text-white font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2.5 text-xs shadow-lg active:scale-[0.97] disabled:opacity-50`}
                                        >
                                            {isUploading ? <Loader2 size={16} className="animate-spin" /> : 'Add Video'}
                                        </button>
                                    </form>
                                </div>
                            )}

                            {/* BLOG FORM */}
                            {activeTab === 'blogs' && (
                                <div className="space-y-5">
                                    <div>
                                        <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                                            <div className={`p-1.5 rounded-lg ${colors.bgLight}`}>
                                                <PenTool size={16} className={colors.text} />
                                            </div>
                                            New Article
                                        </h3>
                                        <p className="text-[9px] text-gray-600 font-bold uppercase tracking-wider mt-1 ml-9">Write & Publish</p>
                                    </div>

                                    <form onSubmit={handleBlogSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-0.5">Title</label>
                                            <input
                                                type="text"
                                                value={blogTitle || ''}
                                                onChange={(e) => setBlogTitle(e.target.value)}
                                                placeholder="Article heading..."
                                                className={`w-full bg-black/30 border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 ${colors.ring} transition-all placeholder:text-gray-700`}
                                                required
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-0.5">Category</label>
                                                <select
                                                    value={blogCategory || 'Dental Health'}
                                                    onChange={(e) => setBlogCategory(e.target.value)}
                                                    className="w-full bg-black/30 border border-white/[0.06] rounded-xl px-3 py-3 text-xs text-gray-300 focus:outline-none appearance-none"
                                                >
                                                    <option value="Dental Health">Dental Health</option>
                                                    <option value="Cosmetic Dentistry">Cosmetic</option>
                                                    <option value="Dental Implants">Implants</option>
                                                    <option value="Oral Hygiene">Hygiene</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-0.5">Image</label>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    ref={blogImageRef}
                                                    onChange={(e) => setBlogImage(e.target.files[0] || null)}
                                                    className="w-full bg-black/30 border border-white/[0.06] rounded-xl px-2.5 py-2 text-[10px] text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-[9px] file:font-bold file:bg-white/[0.06] file:text-gray-400"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-0.5">Content</label>
                                            <textarea
                                                value={blogContent || ''}
                                                onChange={(e) => setBlogContent(e.target.value)}
                                                rows="5"
                                                className={`w-full bg-black/30 border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 ${colors.ring} transition-all resize-none placeholder:text-gray-700`}
                                                placeholder="Write article content..."
                                                required
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isUploading}
                                            className="w-full py-3.5 bg-purple-600 hover:bg-purple-500 text-white font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2.5 text-xs shadow-lg active:scale-[0.97] disabled:opacity-50"
                                        >
                                            {isUploading ? <Loader2 size={16} className="animate-spin" /> : 'Publish Now'}
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ═══ RIGHT: RECORDS ═══ */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* Records Header */}
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-wider">
                                Records
                            </h3>
                            <span className={`text-[8px] sm:text-[9px] font-black px-2.5 py-1 rounded-lg ${colors.bgLight} ${colors.text} uppercase tracking-widest`}>
                                {activeTabData?.count || 0} Items
                            </span>
                        </div>

                        {/* Loading State */}
                        {loading ? (
                            <div className="flex flex-col justify-center items-center py-16 gap-3">
                                <Loader2 size={32} className={`${colors.text} animate-spin`} />
                                <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em]">Loading...</p>
                            </div>

                        /* ── GALLERY RECORDS ── */
                        ) : activeTab === 'gallery' ? (
                            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                                {galleryImages.length === 0 ? (
                                    <div className="col-span-full py-16 text-center border border-dashed border-white/[0.06] rounded-2xl bg-white/[0.01]">
                                        <ImageIcon className="mx-auto text-gray-800 mb-3" size={36} />
                                        <p className="text-gray-700 text-[9px] font-black uppercase tracking-widest">No images yet</p>
                                    </div>
                                ) : (
                                    galleryImages.map((img) => (
                                        <div key={img._id} className="group relative aspect-square bg-[#0B1120] rounded-xl sm:rounded-2xl overflow-hidden border border-white/[0.04]">
                                            <img
                                                src={img.url}
                                                alt="Gallery"
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                loading="lazy"
                                            />
                                            {/* Delete button - always visible on mobile, hover on desktop */}
                                            <button
                                                onClick={() => removeGalleryImage(img._id)}
                                                className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 p-1.5 sm:p-2 bg-red-600/90 backdrop-blur-sm text-white rounded-lg sm:rounded-xl sm:opacity-0 sm:group-hover:opacity-100 transition-all active:scale-90 shadow-lg"
                                            >
                                                <Trash2 size={12} className="sm:w-3.5 sm:h-3.5" />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>

                        /* ── VIDEO RECORDS ── */
                        ) : activeTab === 'videos' ? (
                            <div className="space-y-2 sm:space-y-3">
                                {videoList.length === 0 ? (
                                    <div className="py-16 text-center border border-dashed border-white/[0.06] rounded-2xl bg-white/[0.01]">
                                        <Video className="mx-auto text-gray-800 mb-3" size={36} />
                                        <p className="text-gray-700 text-[9px] font-black uppercase tracking-widest">No videos linked</p>
                                    </div>
                                ) : (
                                    videoList.map((vid) => (
                                        <div key={vid._id} className="flex items-center gap-3 p-2.5 sm:p-4 bg-white/[0.02] border border-white/[0.04] rounded-xl sm:rounded-2xl group transition-all hover:bg-white/[0.04]">
                                            <div className="w-14 h-10 sm:w-28 sm:h-16 bg-black rounded-lg overflow-hidden shrink-0">
                                                <img src={vid.thumbnail} alt="Video" className="w-full h-full object-cover" loading="lazy" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-[11px] sm:text-sm font-black text-white truncate">{vid.title}</h4>
                                                <p className="text-[8px] sm:text-[9px] text-gray-600 uppercase font-bold tracking-wider mt-0.5 truncate">ID: {vid.youtubeId}</p>
                                            </div>
                                            <button
                                                onClick={() => removeVideoItem(vid._id)}
                                                className="shrink-0 p-2 sm:p-2.5 text-gray-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all active:scale-90"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>

                        /* ── BLOG RECORDS ── */
                        ) : (
                            <div className="space-y-2 sm:space-y-3">
                                {blogList.length === 0 ? (
                                    <div className="py-16 text-center border border-dashed border-white/[0.06] rounded-2xl bg-white/[0.01]">
                                        <FileText className="mx-auto text-gray-800 mb-3" size={36} />
                                        <p className="text-gray-700 text-[9px] font-black uppercase tracking-widest">No articles published</p>
                                    </div>
                                ) : (
                                    blogList.map((blog) => (
                                        <div key={blog._id} className="flex items-center gap-3 p-2.5 sm:p-4 bg-white/[0.02] border border-white/[0.04] rounded-xl sm:rounded-2xl group transition-all hover:bg-white/[0.04]">
                                            <div className="w-10 h-10 sm:w-16 sm:h-16 bg-black rounded-lg sm:rounded-xl overflow-hidden shrink-0">
                                                {blog.image ? (
                                                    <img src={blog.image} alt="Blog" className="w-full h-full object-cover" loading="lazy" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-gray-900/50">
                                                        <FileText size={14} className="text-gray-700" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-[11px] sm:text-sm font-black text-white truncate">{blog.title}</h4>
                                                <div className="flex items-center gap-1.5 mt-0.5">
                                                    <span className="text-[7px] sm:text-[9px] font-black text-purple-500/80 uppercase tracking-wider">{blog.category}</span>
                                                    <span className="w-0.5 h-0.5 rounded-full bg-gray-800"></span>
                                                    <span className="text-[7px] sm:text-[9px] text-gray-600 font-bold">{new Date(blog.date).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => removeBlogItem(blog._id)}
                                                className="shrink-0 p-2 sm:p-2.5 text-gray-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all active:scale-90"
                                            >
                                                <Trash2 size={14} />
                                            </button>
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
