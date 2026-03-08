import { Upload, Video, Image as ImageIcon, Trash2, Link, Check, AlertCircle, Lock, Eye, EyeOff, Loader2, FileText, PenTool, Star } from 'lucide-react';
import API_URL from '../config/api';
import ReviewGenerator from '../components/ReviewGenerator';

const AdminPanel = () => {
    const { addGalleryImage, addVideoItem, addBlogItem, galleryImages, videoList, blogList, removeGalleryImage, removeVideoItem, removeBlogItem, loading } = useData();
    const [activeTab, setActiveTab] = useState('gallery'); // 'gallery' | 'videos' | 'blogs' | 'reviews'

    // Authentication States
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState('');

    // Admin Password (Hardcoded for simplicity as requested, but should ideally come from backend)
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
                // Reset file input
                document.getElementById('blog-img-upload').value = '';
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

    // Login Screen
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#0B1120] flex items-center justify-center px-4 py-10">
                <div className="w-full max-w-[400px] animate-in fade-in zoom-in duration-500">
                    <div className="bg-[#1e293b]/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 sm:p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">
                        <div className="flex justify-center mb-8">
                            <div className="relative">
                                <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 animate-pulse"></div>
                                <div className="relative bg-gradient-to-b from-blue-500/20 to-blue-600/20 p-5 rounded-3xl border border-blue-500/30">
                                    <Lock size={32} className="text-blue-400" />
                                </div>
                            </div>
                        </div>

                        <div className="text-center mb-10">
                            <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tighter">
                                Restricted <span className="text-blue-500">Access</span>
                            </h1>
                            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Dentocare Admin</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-5">
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Terminal Password</label>
                                <div className="relative group">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••••••"
                                        className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 text-white placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all font-mono"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-blue-400 transition-colors p-1"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {loginError && (
                                <div className="bg-red-500/10 border border-red-500/20 rounded-xl py-3 px-4 flex items-center gap-3 animate-shake">
                                    <AlertCircle size={14} className="text-red-500 shrink-0" />
                                    <span className="text-red-400 text-[10px] font-black uppercase tracking-wider">{loginError}</span>
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-[0.2em] py-5 rounded-2xl transition-all shadow-xl shadow-blue-500/10 active:scale-[0.98] mt-4"
                            >
                                Authenticate
                            </button>
                        </form>
                    </div>

                    <p className="text-center text-gray-600 text-[9px] font-black uppercase tracking-widest mt-8 flex items-center justify-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                        Secure Session Encryption Active
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0B1120] text-gray-200 pt-20 sm:pt-24 pb-12 px-4 sm:px-6">
            <div className="container mx-auto max-w-5xl">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 sm:mb-12">
                    <div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tighter">
                            Admin <span className="text-blue-500">Panel</span>
                        </h1>
                        <p className="text-gray-500 text-[10px] sm:text-xs font-bold uppercase tracking-widest mt-1">Management Console</p>
                    </div>
                    <div className="w-full sm:w-auto text-[9px] sm:text-xs font-mono text-emerald-500 border border-emerald-500/20 bg-emerald-500/5 px-3 py-2 rounded-xl uppercase flex items-center justify-center sm:justify-start gap-2 backdrop-blur-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        Cloud Database Connected
                    </div>
                </div>

                {/* Notifications - Mobile Ready */}
                {notification && (
                    <div className={`fixed top-4 left-4 right-4 sm:top-24 sm:left-auto sm:right-8 z-[100] px-6 py-4 rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-3 animate-in fade-in slide-in-from-top sm:slide-in-from-right duration-300 border ${notification.type === 'success' ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' : 'bg-red-500/20 border-red-500/40 text-red-400'}`}>
                        {notification.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
                        <span className="font-bold text-sm">{notification.msg}</span>
                    </div>
                )}

                {/* Navigation Tabs - Horizontal Scroll on Mobile */}
                <div className="flex gap-2 sm:gap-4 mb-8 border-b border-white/10 pb-1 overflow-x-auto scrollbar-hide no-scrollbar">
                    {[
                        { id: 'gallery', label: 'Gallery', icon: ImageIcon, color: 'text-blue-400', border: 'bg-blue-500' },
                        { id: 'videos', label: 'Videos', icon: Video, color: 'text-red-400', border: 'bg-red-500' },
                        { id: 'blogs', label: 'Blogs', icon: FileText, color: 'text-purple-400', border: 'bg-purple-500' },
                        { id: 'reviews', label: 'Reviews', icon: Star, color: 'text-yellow-400', border: 'bg-yellow-500' }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-shrink-0 flex items-center gap-2 pb-4 px-4 text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all relative ${activeTab === tab.id ? tab.color : 'text-gray-500 hover:text-white'}`}
                        >
                            <tab.icon size={14} className="sm:w-4 sm:h-4" />
                            {tab.label}
                            {activeTab === tab.id && <span className={`absolute bottom-0 left-0 w-full h-0.5 ${tab.border}`}></span>}
                        </button>
                    ))}
                </div>

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-10">

                    {/* LEFT: Forms (Sticky on Desktop) */}
                    <div className="lg:col-span-1 order-1 lg:order-1">
                        <div className="bg-[#1e293b]/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 sm:p-8 lg:sticky lg:top-28 transition-all">
                            {activeTab === 'gallery' ? (
                                <div className="space-y-6">
                                    <div className="text-center lg:text-left">
                                        <h3 className="text-lg sm:text-xl font-black text-white mb-2 flex items-center justify-center lg:justify-start gap-2">
                                            <Upload size={20} className="text-blue-500" /> Upload Image
                                        </h3>
                                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Cloudinary Direct storage</p>
                                    </div>

                                    <div className="relative border-4 border-dashed border-white/5 rounded-3xl p-10 text-center hover:border-blue-500/20 transition-all group overflow-hidden bg-black/20">
                                        {isUploading && (
                                            <div className="absolute inset-0 bg-[#0B1120]/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center gap-3">
                                                <Loader2 size={32} className="text-blue-500 animate-spin" />
                                                <p className="text-[9px] font-black uppercase text-white tracking-[0.3em]">Processing...</p>
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
                                        <label htmlFor="img-upload" className="cursor-pointer flex flex-col items-center justify-center gap-5">
                                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-all duration-500 border border-blue-500/20 shadow-2xl">
                                                <ImageIcon size={32} className="text-blue-500" />
                                            </div>
                                            <div className="space-y-2">
                                                <p className="font-black text-xs sm:text-sm text-white uppercase tracking-wider">Select File</p>
                                                <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Max 10MB • JPG/PNG/WEBP</p>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            ) : activeTab === 'videos' ? (
                                <div className="space-y-6">
                                    <div className="text-center lg:text-left">
                                        <h3 className="text-lg sm:text-xl font-black text-white mb-2 flex items-center justify-center lg:justify-start gap-2">
                                            <Video size={20} className="text-red-500" /> Link Video
                                        </h3>
                                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Patient Transformation Reel</p>
                                    </div>

                                    <form onSubmit={handleVideoSubmit} className="space-y-5">
                                        <div>
                                            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2.5 ml-1">Title</label>
                                            <input
                                                type="text"
                                                value={videoTitle}
                                                onChange={(e) => setVideoTitle(e.target.value)}
                                                placeholder="e.g. Laser Treatment Story"
                                                className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500/50 transition-all"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2.5 ml-1">YouTube Link</label>
                                            <div className="relative">
                                                <Link size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                                                <input
                                                    type="url"
                                                    value={videoUrl}
                                                    onChange={(e) => setVideoUrl(e.target.value)}
                                                    placeholder="Shorts or Video URL"
                                                    className="w-full bg-black/40 border border-white/5 rounded-xl pl-12 pr-4 py-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500/50 transition-all font-mono placeholder:font-sans"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isUploading}
                                            className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95 disabled:opacity-50"
                                        >
                                            {isUploading ? <Loader2 size={18} className="animate-spin" /> : 'Confirm Upload'}
                                        </button>
                                    </form>
                                </div>
                            ) : activeTab === 'reviews' ? (
                                <ReviewGenerator />
                            ) : (
                                <div className="space-y-6">
                                    <div className="text-center lg:text-left">
                                        <h3 className="text-lg sm:text-xl font-black text-white mb-2 flex items-center justify-center lg:justify-start gap-2">
                                            <PenTool size={20} className="text-purple-500" /> New Article
                                        </h3>
                                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Dental Health Insight</p>
                                    </div>

                                    <form onSubmit={handleBlogSubmit} className="space-y-5">
                                        <div>
                                            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2.5 ml-1">Heading</label>
                                            <input
                                                type="text"
                                                value={blogTitle}
                                                onChange={(e) => setBlogTitle(e.target.value)}
                                                placeholder="..."
                                                className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50"
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
                                            <div>
                                                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2.5 ml-1">Category</label>
                                                <select
                                                    value={blogCategory}
                                                    onChange={(e) => setBlogCategory(e.target.value)}
                                                    className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-4 text-sm text-gray-300 focus:outline-none"
                                                >
                                                    <option value="Dental Health">Dental Health</option>
                                                    <option value="Cosmetic Dentistry">Cosmetic Dentistry</option>
                                                    <option value="Dental Implants">Dental Implants</option>
                                                    <option value="Oral Hygiene">Oral Hygiene</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2.5 ml-1">Featured Image</label>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    id="blog-img-upload"
                                                    onChange={(e) => setBlogImage(e.target.files[0])}
                                                    className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-gray-500"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2.5 ml-1">Content Body</label>
                                            <textarea
                                                value={blogContent}
                                                onChange={(e) => setBlogContent(e.target.value)}
                                                rows="6"
                                                className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 resize-none"
                                                required
                                            ></textarea>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isUploading}
                                            className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-black uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95 disabled:opacity-50"
                                        >
                                            {isUploading ? <Loader2 size={18} className="animate-spin" /> : 'Publish Now'}
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT: List View (Records) */}
                    <div className="lg:col-span-2 order-2 lg:order-2 space-y-6">
                        <div className="flex items-center justify-between px-2">
                            <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-wider">Cloud Records</h3>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black px-3 py-1 bg-white/5 border border-white/5 rounded-full text-blue-400 uppercase tracking-widest">
                                    {activeTab === 'gallery' ? `${galleryImages.length} Saved` : activeTab === 'videos' ? `${videoList.length} Linked` : activeTab === 'blogs' ? `${blogList.length} Live` : '10 Generated'}
                                </span>
                            </div>
                        </div>

                        {loading ? (
                            <div className="flex flex-col justify-center items-center py-20 gap-4">
                                <Loader2 size={40} className="text-blue-500 animate-spin" />
                                <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em]">Fetching Data...</p>
                            </div>
                        ) : activeTab === 'gallery' ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
                                {galleryImages.length === 0 ? (
                                    <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-3xl bg-white/[0.02]">
                                        <ImageIcon className="mx-auto text-gray-800 mb-4" size={48} />
                                        <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest">Repository is Empty</p>
                                    </div>
                                ) : (
                                    galleryImages.map((img) => (
                                        <div key={img._id} className="group relative aspect-square bg-[#0B1120] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
                                            <img
                                                src={img.url}
                                                alt="Gallery Result"
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                loading="lazy"
                                                decoding="async"
                                            />
                                            {/* Action Button - Touch Sensitive */}
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <button
                                                    onClick={() => removeGalleryImage(img._id)}
                                                    className="p-3 bg-red-600 text-white rounded-2xl shadow-2xl transform scale-75 group-hover:scale-100 transition-transform active:scale-90 hover:bg-red-500"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>
                                            {/* Mobile Delete Indicator */}
                                            <button
                                                onClick={() => removeGalleryImage(img._id)}
                                                className="absolute top-2 right-2 p-2 bg-red-600/80 backdrop-blur-md text-white rounded-xl sm:hidden"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        ) : activeTab === 'videos' ? (
                            <div className="space-y-3">
                                {videoList.length === 0 ? (
                                    <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl bg-white/[0.02]">
                                        <Video className="mx-auto text-gray-800 mb-4" size={48} />
                                        <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest">No Video Links</p>
                                    </div>
                                ) : (
                                    videoList.map((vid) => (
                                        <div key={vid._id} className="flex items-center gap-3 p-3 sm:p-5 bg-white/[0.03] border border-white/5 rounded-2xl sm:rounded-3xl group transition-all hover:bg-white/[0.05] relative overflow-hidden">
                                            <div className="w-16 h-12 sm:w-32 lg:w-40 sm:h-20 bg-black rounded-lg sm:rounded-xl overflow-hidden shrink-0 shadow-lg">
                                                <img src={vid.thumbnail} alt="Video Preview" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-[11px] sm:text-sm font-black text-white truncate group-hover:text-red-400 transition-colors tracking-tight">{vid.title}</h4>
                                                <p className="text-[8px] sm:text-[9px] text-gray-600 uppercase font-black tracking-widest mt-0.5 opacity-60 truncate">ID: {vid.youtubeId}</p>
                                            </div>
                                            <button
                                                onClick={() => removeVideoItem(vid._id)}
                                                className="p-2 sm:p-3 text-gray-600 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        ) : activeTab === 'reviews' ? (
                            <div className="bg-[#1e293b]/20 backdrop-blur-sm border border-white/5 rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-6">
                                <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center border border-yellow-500/20">
                                    <Star size={40} className="text-yellow-500" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-black text-white uppercase tracking-tighter mb-2">Review Management</h4>
                                    <p className="text-gray-500 text-xs font-bold leading-relaxed max-w-sm mx-auto uppercase tracking-widest">
                                        Select and copy these professional reviews from the left panel to use on your Google Business Profile.
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                        <p className="text-2xl font-black text-white">4.9</p>
                                        <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Avg Rating</p>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                        <p className="text-2xl font-black text-white">10</p>
                                        <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Templates</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {blogList.length === 0 ? (
                                    <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl bg-white/[0.02]">
                                        <FileText className="mx-auto text-gray-800 mb-4" size={48} />
                                        <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest">No Published Articles</p>
                                    </div>
                                ) : (
                                    blogList.map((blog) => (
                                        <div key={blog._id} className="flex items-center gap-3 p-3 sm:p-5 bg-white/[0.03] border border-white/5 rounded-2xl sm:rounded-3xl group transition-all hover:bg-white/[0.05] relative overflow-hidden">
                                            <div className="w-12 h-12 sm:w-20 lg:w-24 sm:h-20 bg-black rounded-lg sm:rounded-xl overflow-hidden shrink-0 shadow-lg">
                                                {blog.image ? (
                                                    <img src={blog.image} alt="Blog" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-gray-900 text-gray-700">
                                                        <FileText size={18} />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-[11px] sm:text-sm font-black text-white truncate group-hover:text-purple-400 transition-colors uppercase tracking-tight">{blog.title}</h4>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-[7px] sm:text-[9px] font-black text-purple-500/80 uppercase tracking-widest">{blog.category}</span>
                                                    <span className="w-0.5 h-0.5 rounded-full bg-gray-800"></span>
                                                    <span className="text-[7px] sm:text-[9px] text-gray-600 uppercase font-bold">{new Date(blog.date).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => removeBlogItem(blog._id)}
                                                className="p-2 sm:p-3 text-gray-600 hover:text-red-500 transition-colors"
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

            {/* Global Custom CSS for scrollbars */}
            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
};

export default AdminPanel;
