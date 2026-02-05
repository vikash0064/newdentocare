import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Upload, Video, Image as ImageIcon, Trash2, Link, Check, AlertCircle, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import API_URL from '../config/api';

const AdminPanel = () => {
    const { addGalleryImage, addVideoItem, galleryImages, videoList, removeGalleryImage, removeVideoItem, loading } = useData();
    const [activeTab, setActiveTab] = useState('gallery'); // 'gallery' | 'videos'

    // Authentication States
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState('');

    // Admin Password (Hardcoded for simplicity as requested, but should ideally come from backend)
    const ADMIN_PASSWORD = 'dentocare@2026';

    // Form States
    const [videoUrl, setVideoUrl] = useState('');
    const [videoTitle, setVideoTitle] = useState('');
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
                showNotification('Image uploaded successfully to Cloudinary!', 'success');
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

        // Extract ID from youtube link
        let id = '';
        try {
            const url = new URL(videoUrl);
            if (url.hostname === 'youtu.be') {
                id = url.pathname.slice(1);
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
                    showNotification('Video added to reel!', 'success');
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

    const showNotification = (msg, type) => {
        setNotification({ msg, type });
        setTimeout(() => setNotification(null), 3000);
    };

    // Login Screen
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#0B1120] flex items-center justify-center px-4">
                <div className="w-full max-w-md">
                    <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                        <div className="flex justify-center mb-6">
                            <div className="bg-blue-500/20 p-4 rounded-full">
                                <Lock size={32} className="text-blue-400" />
                            </div>
                        </div>
                        <h1 className="text-2xl font-black text-white text-center mb-2">Admin Access</h1>
                        <p className="text-gray-400 text-sm text-center mb-8">Management Controls Only</p>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter admin password"
                                    className="w-full bg-[#0B1120] border border-gray-700/50 rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-all font-mono"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {loginError && <div className="text-red-400 text-xs text-center font-bold tracking-wide">{loginError}</div>}
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg active:scale-95"
                            >
                                Enter Dashboard
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0B1120] text-gray-200 pt-24 pb-12 px-3 sm:px-6">
            <div className="container mx-auto max-w-5xl">
                <div className="flex items-center justify-between mb-8 sm:mb-12">
                    <h1 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tighter">
                        Admin <span className="text-blue-500">Panel</span>
                    </h1>
                    <div className="text-[10px] sm:text-xs font-mono text-emerald-500 border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 rounded-full uppercase flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        MongoDB Connected
                    </div>
                </div>

                {/* Notifications */}
                {notification && (
                    <div className={`fixed top-24 right-8 z-50 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-3 animate-in fade-in slide-in-from-right duration-300 border ${notification.type === 'success' ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' : 'bg-red-500/20 border-red-500/40 text-red-400'}`}>
                        {notification.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
                        <span className="font-bold text-sm">{notification.msg}</span>
                    </div>
                )}

                {/* Tabs */}
                <div className="flex gap-4 mb-8 border-b border-white/10 pb-1 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('gallery')}
                        className={`pb-4 px-4 text-sm font-bold uppercase tracking-wider transition-all relative ${activeTab === 'gallery' ? 'text-blue-400' : 'text-gray-500 hover:text-white'}`}
                    >
                        Image Gallery
                        {activeTab === 'gallery' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"></span>}
                    </button>
                    <button
                        onClick={() => setActiveTab('videos')}
                        className={`pb-4 px-4 text-sm font-bold uppercase tracking-wider transition-all relative ${activeTab === 'videos' ? 'text-red-400' : 'text-gray-500 hover:text-white'}`}
                    >
                        Video Manager
                        {activeTab === 'videos' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500"></span>}
                    </button>
                </div>

                {/* Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* LEFT: Upload Form */}
                    <div className="lg:col-span-1 bg-[#1e293b]/50 border border-white/5 rounded-2xl p-6 sm:p-8 h-fit sticky top-28">
                        {activeTab === 'gallery' ? (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                        <Upload size={20} className="text-blue-500" /> Upload Photo
                                    </h3>
                                    <p className="text-xs text-gray-500 leading-relaxed mb-6">
                                        Add clinical results to your MongoDB gallery.
                                    </p>
                                </div>

                                <div className="relative border-2 border-dashed border-white/10 rounded-2xl p-8 text-center hover:border-blue-500/40 transition-all group overflow-hidden">
                                    {isUploading && (
                                        <div className="absolute inset-0 bg-blue-600/20 backdrop-blur-sm z-20 flex flex-col items-center justify-center gap-3">
                                            <Loader2 size={32} className="text-white animate-spin" />
                                            <p className="text-[10px] font-black uppercase text-white tracking-[0.2em]">Uploading...</p>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        id="img-upload"
                                        disabled={isUploading}
                                    />
                                    <label htmlFor="img-upload" className="cursor-pointer flex flex-col items-center justify-center gap-4">
                                        <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <ImageIcon size={32} className="text-blue-500" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="font-bold text-sm text-white">Select Clinic Image</p>
                                            <p className="text-[10px] text-gray-500 uppercase tracking-widest">Permanent Upload</p>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                        <Video size={20} className="text-red-500" /> Link Video
                                    </h3>
                                    <p className="text-xs text-gray-500 leading-relaxed mb-6">
                                        Reels will sync instantly across the site.
                                    </p>
                                </div>

                                <form onSubmit={handleVideoSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Patient Title</label>
                                        <input
                                            type="text"
                                            value={videoTitle}
                                            onChange={(e) => setVideoTitle(e.target.value)}
                                            placeholder="Transformation Story"
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500/50"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Video Link</label>
                                        <div className="relative">
                                            <Link size={16} className="absolute left-4 top-3.5 text-gray-500" />
                                            <input
                                                type="url"
                                                value={videoUrl}
                                                onChange={(e) => setVideoUrl(e.target.value)}
                                                placeholder="YouTube URL"
                                                className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none focus:border-red-500/50"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isUploading}
                                        className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2"
                                    >
                                        {isUploading ? <Loader2 size={18} className="animate-spin" /> : 'Confirm Video'}
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>

                    {/* RIGHT: List View */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-white">Database Records</h3>
                            <span className="text-[10px] sm:text-[11px] font-black px-3 py-1 bg-white/5 rounded-full text-blue-400">
                                {activeTab === 'gallery' ? `${galleryImages.length} IMAGES` : `${videoList.length} VIDEOS`}
                            </span>
                        </div>

                        {loading ? (
                            <div className="flex justify-center items-center py-20">
                                <Loader2 size={40} className="text-blue-500 animate-spin" />
                            </div>
                        ) : activeTab === 'gallery' ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {galleryImages.length === 0 ? (
                                    <div className="col-span-full py-12 text-center border border-dashed border-white/10 rounded-2xl opacity-50">
                                        <p className="text-gray-500 text-sm italic">Gallery is empty</p>
                                    </div>
                                ) : (
                                    galleryImages.map((img) => (
                                        <div key={img._id} className="group relative aspect-square bg-black rounded-2xl overflow-hidden border border-white/10">
                                            <img src={img.url} alt="Gallery" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                            <button
                                                onClick={() => removeGalleryImage(img._id)}
                                                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-xl shadow-xl transform translate-x-12 group-hover:translate-x-0 transition-transform hover:bg-red-600"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {videoList.length === 0 ? (
                                    <div className="py-12 text-center border border-dashed border-white/10 rounded-2xl opacity-50">
                                        <p className="text-gray-500 text-sm italic">No videos linked</p>
                                    </div>
                                ) : (
                                    videoList.map((vid) => (
                                        <div key={vid._id} className="flex gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl group active:scale-[0.98] transition-all">
                                            <div className="w-24 h-16 bg-black rounded-lg overflow-hidden shrink-0">
                                                <img src={vid.thumbnail} alt={vid.title || "Video Thumbnail"} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                                                <h4 className="text-sm font-bold text-white truncate">{vid.title}</h4>
                                                <p className="text-[10px] text-gray-500 uppercase font-bold">{vid.youtubeId}</p>
                                            </div>
                                            <button
                                                onClick={() => removeVideoItem(vid._id)}
                                                className="p-3 text-gray-500 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={18} />
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
