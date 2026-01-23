import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Upload, Video, Image as ImageIcon, Trash2, Link, Check, AlertCircle, Lock, Eye, EyeOff } from 'lucide-react';

const AdminPanel = () => {
    const { addImage, addVideo, galleryImages, videoList, removeImage, removeVideo } = useData();
    const [activeTab, setActiveTab] = useState('gallery'); // 'gallery' | 'videos'

    // Authentication States
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState('');

    // Admin Password (Change this to your desired password)
    const ADMIN_PASSWORD = 'dentocare@2026';

    // Form States
    const [imageUrl, setImageUrl] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [videoTitle, setVideoTitle] = useState('');
    const [notification, setNotification] = useState(null);

    // Handle Login
    const handleLogin = (e) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            setLoginError('');
            sessionStorage.setItem('admin_auth', 'true'); // Store in session
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

    // Mock Upload for Cloudinary (Simulation)
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // In a real app, we would upload to Cloudinary here.
        // For this demo/frontend-only, we create a local URL.
        // User asked for Cloudinary: explaining in UI that this needs a backend key.
        const reader = new FileReader();
        reader.onloadend = () => {
            // This Base64 string might be large for LS, but it simulates the "upload"
            // Limits of LS are 5MB. If image is too big, it will fail.
            // Better to use a placeholder or assume success if just testing.
            // Let's try to store it.
            try {
                const result = reader.result;
                addImage({ url: result, category: 'Uploads', timestamp: Date.now() }); // Using Base64 as the "Cloudinary URL"
                showNotification('Image uploaded successfully (Simulated Cloud)', 'success');
            } catch (err) {
                showNotification('Image too large for local browser storage! Use smaller images for demo.', 'error');
            }
        };
        reader.readAsDataURL(file);
    };

    const handleVideoSubmit = (e) => {
        e.preventDefault();
        // Extract ID from youtube link
        let id = '';
        try {
            // Supports: https://youtu.be/ID, https://www.youtube.com/watch?v=ID
            const url = new URL(videoUrl);
            if (url.hostname === 'youtu.be') {
                id = url.pathname.slice(1);
            } else {
                id = url.searchParams.get('v');
            }
        } catch (err) {
            showNotification('Invalid YouTube URL', 'error');
            return;
        }

        if (id) {
            addVideo({
                id: Date.now(),
                youtubeId: id,
                title: videoTitle || `New Video ${new Date().toLocaleDateString()}`,
                views: '0',
                thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
            });
            setVideoUrl('');
            setVideoTitle('');
            showNotification('Video added to gallery!', 'success');
        } else {
            showNotification('Could not parse YouTube ID', 'error');
        }
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
                        {/* Lock Icon */}
                        <div className="flex justify-center mb-6">
                            <div className="bg-blue-500/20 p-4 rounded-full">
                                <Lock size={32} className="text-blue-400" />
                            </div>
                        </div>

                        <h1 className="text-2xl font-black text-white text-center mb-2">Admin Access</h1>
                        <p className="text-gray-400 text-sm text-center mb-8">Enter password to continue</p>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter admin password"
                                    className="w-full bg-[#0B1120] border border-gray-700/50 rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>

                            {loginError && (
                                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex items-center gap-2">
                                    <AlertCircle size={16} className="text-red-400" />
                                    <span className="text-red-400 text-sm">{loginError}</span>
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-900/20 hover:-translate-y-0.5"
                            >
                                Login
                            </button>
                        </form>

                        <p className="text-gray-500 text-xs text-center mt-6">
                            Authorized personnel only
                        </p>
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
                    <div className="text-[10px] sm:text-xs font-mono text-gray-500 border border-white/10 px-2 sm:px-3 py-1 rounded-full uppercase">
                        v1.0 (Local Storage)
                    </div>
                </div>

                {/* Notifications */}
                {notification && (
                    <div className={`fixed top-20 sm:top-24 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-8 z-50 w-[90%] sm:w-auto px-6 py-4 rounded-xl shadow-2xl backdrop-blur-md flex items-center justify-center sm:justify-start gap-3 animate-in slide-in-from-top-4 sm:slide-in-from-right duration-300 border ${notification.type === 'success' ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' : 'bg-red-500/20 border-red-500/40 text-red-400'}`}>
                        {notification.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
                        <span className="font-bold text-sm text-center sm:text-left">{notification.msg}</span>
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
                    <div className="lg:col-span-1 bg-[#1e293b]/50 border border-white/5 rounded-2xl p-5 sm:p-8 h-fit sticky top-28">
                        {activeTab === 'gallery' ? (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                        <Upload size={20} className="text-blue-500" /> Upload Image
                                    </h3>
                                    <p className="text-xs text-gray-500 leading-relaxed mb-6">
                                        Select photos to add to the public gallery. Images are simulated as uploaded to Cloudinary.
                                    </p>
                                </div>

                                <div className="border-2 border-dashed border-white/10 rounded-2xl p-6 sm:p-8 text-center hover:border-blue-500/40 hover:bg-blue-500/5 transition-all group">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        id="img-upload"
                                    />
                                    <label htmlFor="img-upload" className="cursor-pointer flex flex-col items-center justify-center gap-4">
                                        <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <ImageIcon size={32} className="text-blue-500" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="font-bold text-sm text-white">Click to Upload</p>
                                            <p className="text-[10px] text-gray-500 uppercase tracking-widest">SVG, PNG, JPG</p>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                        <Video size={20} className="text-red-500" /> Add Video
                                    </h3>
                                    <p className="text-xs text-gray-500 leading-relaxed mb-6">
                                        Paste a YouTube link to add it to the video reel. It will appear at the top of the Videos page.
                                    </p>
                                </div>

                                <form onSubmit={handleVideoSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Video Title</label>
                                        <input
                                            type="text"
                                            value={videoTitle}
                                            onChange={(e) => setVideoTitle(e.target.value)}
                                            placeholder="e.g. Patient Transformation"
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500/50 transition-colors"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">YouTube URL</label>
                                        <div className="relative">
                                            <Link size={16} className="absolute left-4 top-3.5 text-gray-500" />
                                            <input
                                                type="url"
                                                value={videoUrl}
                                                onChange={(e) => setVideoUrl(e.target.value)}
                                                placeholder="https://youtu.be/..."
                                                className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none focus:border-red-500/50 transition-colors"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-red-900/20 active:scale-95 text-xs"
                                    >
                                        Add to Reel
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>

                    {/* RIGHT: List View */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-white">
                                {activeTab === 'gallery' ? 'Live Gallery Preview' : 'Active Video Reel'}
                            </h3>
                            <span className="text-xs font-mono text-gray-500">
                                {activeTab === 'gallery' ? `${galleryImages.length} Items` : `${videoList.length} Videos`}
                            </span>
                        </div>

                        {activeTab === 'gallery' ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {galleryImages.length === 0 ? (
                                    <div className="col-span-full py-12 text-center border border-dashed border-white/10 rounded-2xl">
                                        <p className="text-gray-500 text-sm">No uploaded images yet.</p>
                                    </div>
                                ) : (
                                    galleryImages.map((img, idx) => (
                                        <div key={idx} className="group relative aspect-square bg-black rounded-xl overflow-hidden border border-white/10">
                                            <img src={img.url} alt="Upload" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                            <button
                                                onClick={() => removeImage(idx)}
                                                className="absolute top-2 right-2 p-1.5 bg-red-500/20 text-red-400 rounded-lg backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {videoList.length === 0 ? (
                                    <div className="py-12 text-center border border-dashed border-white/10 rounded-2xl">
                                        <p className="text-gray-500 text-sm">No videos added yet.</p>
                                    </div>
                                ) : (
                                    videoList.map((vid, idx) => (
                                        <div key={idx} className="flex gap-4 p-3 bg-white/5 border border-white/5 rounded-xl hover:border-white/10 transition-colors group">
                                            <div className="w-24 h-16 bg-black rounded-lg overflow-hidden shrink-0">
                                                <img src={vid.thumbnail} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                                                <h4 className="text-sm font-bold text-white truncate">{vid.title}</h4>
                                                <p className="text-[10px] text-gray-500 font-mono truncate">ID: {vid.youtubeId}</p>
                                            </div>
                                            <button
                                                onClick={() => removeVideo(idx)}
                                                className="p-2 sm:p-3 text-gray-500 hover:text-red-400 transition-colors"
                                            >
                                                <Trash2 size={16} />
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
