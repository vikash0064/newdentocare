"use client";
import React, { useState, useRef, useEffect } from 'react';
import { 
    Upload, Video, Image as ImageIcon, Trash2, Link as LinkIcon, Check, 
    AlertCircle, Lock, Eye, EyeOff, Loader2, FileText, 
    PenTool, LogOut, Star, User, Home, Menu, X, ChevronRight, Settings,
    PlusCircle, List, Layout, Edit
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { IMAGES } from '../constants';
const API_URL = '';
import Link from 'next/link';

const AdminPanel = () => {
    // Destructure data from context
    const context = useData();
    const { 
        addGalleryImage, addVideoItem, addBlogItem,
        galleryImages = [], videoList = [], blogList = [],
        removeGalleryImage, removeVideoItem, removeBlogItem,
        loading = false 
    } = context || {};
    
    // Tab states
    const [activeTab, setActiveTab] = useState('gallery'); 
    const [showUploadModal, setShowUploadModal] = useState(false);

    // Authentication States
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState('');

    // Admin Password
    const ADMIN_PASSWORD = 'dentocare@2026';

    // Form States
    const [videoUrl, setVideoUrl] = useState('');
    const [videoTitle, setVideoTitle] = useState('');
    const [blogTitle, setBlogTitle] = useState('');
    const [blogContent, setBlogContent] = useState('');
    const [blogAuthor, setBlogAuthor] = useState('Dr. Nimisha Modi');
    const [blogCategory, setBlogCategory] = useState('Dental Health');
    const [blogImage, setBlogImage] = useState(null);
    const [imageCategory, setImageCategory] = useState('Gallery');
    
    // Slide Specific States
    const [slideLabel, setSlideLabel] = useState('');
    const [slideSub, setSlideSub] = useState('');
    const [editingSlide, setEditingSlide] = useState(null);

    const [notification, setNotification] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    // Logo update locations state
    const [logoLocations, setLogoLocations] = useState({ navbar: true, footer: true, seo: true });

    // Handle logo location checkbox change
    const handleLogoLocationChange = (loc) => {
        setLogoLocations(prev => ({ ...prev, [loc]: !prev[loc] }));
    };

    // Modified image upload handler for logo
    const handleLogoImageUpload = async (e) => {
        setImageCategory('Logo');
        // Only proceed if at least one location is selected
        if (!logoLocations.navbar && !logoLocations.footer && !logoLocations.seo) {
            showNotification('Select at least one location to update.', 'error');
            return;
        }
        // Pass selected locations as part of the upload (e.g., in FormData or API call)
        // You may need to update your backend to handle this if not already
        const file = e.target.files ? e.target.files[0] : null;
        if (!file) return;
        setIsUploading(true);
        const formData = new FormData();
        formData.append('image', file);
        formData.append('category', 'Logo');
        formData.append('updateNavbar', logoLocations.navbar);
        formData.append('updateFooter', logoLocations.footer);
        formData.append('updateSEO', logoLocations.seo);
        try {
            const response = await fetch(`${API_URL}/api/gallery`, { method: 'POST', body: formData });
            const data = await response.json();
            if (response.ok) {
                addGalleryImage(data);
                showNotification(`Logo updated in: ${[logoLocations.navbar ? 'Navbar' : '', logoLocations.footer ? 'Footer' : '', logoLocations.seo ? 'SEO' : ''].filter(Boolean).join(', ')}`, 'success');
                setShowUploadModal(false);
            } else {
                showNotification(data.error || 'Operation failed', 'error');
            }
        } catch (err) {
            showNotification('Connection error', 'error');
        } finally {
            setIsUploading(false);
        }
    };
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

    const isMounted = useRef(true);

    // Check session on mount
    useEffect(() => {
        isMounted.current = true;
        const isAuth = sessionStorage.getItem('admin_auth');
        if (isAuth === 'true') {
            setIsAuthenticated(true);
        }
        return () => { isMounted.current = false; };
    }, []);

    const showNotification = (msg, type) => {
        if (!isMounted.current) return;
        setNotification({ msg, type });
        setTimeout(() => {
            if (isMounted.current) setNotification(null);
        }, 3000);
    };

    // API Handlers
    const handleImageUpload = async (e) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (!file && !editingSlide) return;
        
        setIsUploading(true);
        const formData = new FormData();
        if (file) formData.append('image', file);
        formData.append('category', imageCategory);
        
        if (imageCategory === 'Hero') {
            formData.append('title', slideLabel || 'Clinic View');
            formData.append('author', slideSub || 'Surat Branch');
        }

        try {
            const endpoint = editingSlide 
                ? `${API_URL}/api/gallery/${editingSlide._id}` 
                : `${API_URL}/api/gallery`;
            
            const response = await fetch(endpoint, { 
                method: editingSlide ? 'PUT' : 'POST', 
                body: formData 
            });
            const data = await response.json();
            
            if (response.ok) {
                if (editingSlide) {
                    context.refreshData();
                    showNotification('Slide updated!', 'success');
                } else {
                    addGalleryImage(data);
                    showNotification(`${imageCategory} uploaded!`, 'success');
                }
                setShowUploadModal(false);
                setEditingSlide(null);
                setSlideLabel(''); setSlideSub('');
            } else {
                showNotification(data.error || 'Operation failed', 'error');
            }
        } catch (err) { showNotification('Connection error', 'error'); }
        finally { setIsUploading(false); }
    };

    const handleEditHero = (slide) => {
        setEditingSlide(slide);
        setSlideLabel(slide.title || '');
        setSlideSub(slide.author || '');
        setImageCategory('Hero');
        setShowUploadModal(true);
    };

    const handleVideoSubmit = async (e) => {
        e.preventDefault();
        setIsUploading(true);
        let id = '';
        try {
            const url = new URL(videoUrl);
            if (url.hostname === 'youtu.be') id = url.pathname.slice(1);
            else if (url.pathname.includes('/shorts/')) id = url.pathname.split('/shorts/')[1];
            else id = url.searchParams.get('v');
        } catch (err) { showNotification('Invalid URL', 'error'); setIsUploading(false); return; }

        if (id) {
            try {
                const response = await fetch(`${API_URL}/api/videos`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ youtubeId: id, title: videoTitle, thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg` })
                });
                if (response.ok) {
                    addVideoItem(await response.json());
                    setVideoUrl(''); setVideoTitle('');
                    showNotification('Video added!', 'success');
                    setShowUploadModal(false);
                }
            } catch (err) { showNotification('Error saving video', 'error'); }
        }
        setIsUploading(false);
    };

    const handleBlogSubmit = async (e) => {
        e.preventDefault();
        setIsUploading(true);
        const formData = new FormData();
        formData.append('title', blogTitle); formData.append('content', blogContent);
        formData.append('author', blogAuthor); formData.append('category', blogCategory);
        if (blogImage) formData.append('image', blogImage);
        try {
            const response = await fetch(`${API_URL}/api/blogs`, { method: 'POST', body: formData });
            if (response.ok) {
                addBlogItem(await response.json());
                setBlogTitle(''); setBlogContent(''); setBlogImage(null);
                showNotification('Blog published!', 'success');
                setShowUploadModal(false);
            }
        } catch (err) { showNotification('Error publishing', 'error'); }
        finally { setIsUploading(false); }
    };

    // Configuration for tabs
    const tabs = [
        { id: 'gallery', label: 'Gallery', icon: ImageIcon, color: 'blue', count: galleryImages?.filter(i => i.category === 'Gallery').length || 0 },
        { id: 'hero', label: 'Home Slides', icon: Layout, color: 'emerald', count: galleryImages?.filter(i => i.category === 'Hero').length || 0 },
        { id: 'videos', label: 'Videos', icon: Video, color: 'red', count: videoList?.length || 0 },
        { id: 'blogs', label: 'Blogs', icon: FileText, color: 'purple', count: blogList?.length || 0 },
        { id: 'offers', label: 'Offers/Campaigns', icon: Star, color: 'yellow', count: 0 },
        { id: 'branding', label: 'Logo', icon: Settings, color: 'amber', count: 0 },
    ];

    const activeTabData = tabs.find(t => t.id === activeTab);
    const colorMap = {
        blue: { bg: 'bg-blue-600', text: 'text-blue-400', light: 'bg-blue-600/10 shadow-blue-500/20' },
        red: { bg: 'bg-red-600', text: 'text-red-400', light: 'bg-red-600/10 shadow-red-500/20' },
        purple: { bg: 'bg-purple-600', text: 'text-purple-400', light: 'bg-purple-600/10 shadow-purple-500/20' },
        emerald: { bg: 'bg-emerald-600', text: 'text-emerald-400', light: 'bg-emerald-600/10 shadow-emerald-500/20' },
        amber: { bg: 'bg-amber-600', text: 'text-amber-400', light: 'bg-amber-600/10 shadow-amber-500/20' },
        cyan: { bg: 'bg-cyan-500', text: 'text-cyan-400', light: 'bg-cyan-500/10 shadow-cyan-500/20' },
        yellow: { bg: 'bg-yellow-400', text: 'text-yellow-400', light: 'bg-yellow-400/10 shadow-yellow-400/20' },
    };
    // Always use a valid color object
    const colors = colorMap[activeTabData && colorMap[activeTabData.color] ? activeTabData.color : 'blue'];

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#0B1120] flex items-center justify-center p-6 text-white font-outfit">
                <div className="w-full max-w-sm bg-[#111827] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-blue-600/10 border border-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Lock className="text-blue-500" size={32} />
                        </div>
                        <h1 className="text-2xl font-black uppercase tracking-tighter">Dento<span className="text-blue-500">care</span></h1>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Admin Security Portal</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Pin code"
                            className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-blue-500/50 transition-all text-center tracking-widest font-mono"
                            required
                        />
                        {loginError && <p className="text-red-500 text-[10px] font-bold text-center uppercase">{loginError}</p>}
                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl active:scale-95">Verify Access</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0B1120] text-gray-200 font-outfit pb-24 lg:pb-0">
            {/* Desktop Sidebar */}
            <aside className="fixed top-0 left-0 h-full w-72 bg-[#111827] border-r border-white/5 hidden lg:flex flex-col p-6 pt-24 z-50 overflow-y-auto no-scrollbar">
                <div className="mb-10 px-4">
                    <h1 className="text-xl font-black text-white uppercase tracking-tighter">Dento<span className="text-blue-500">care</span></h1>
                    <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.4em] mt-1">Master Dashboard</p>
                </div>
                <nav className="flex-1 space-y-2">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${
                                activeTab === tab.id ? 'bg-white/5 border border-white/5 text-white shadow-lg' : 'text-gray-500 hover:bg-white/2'
                            }`}
                        >
                            <tab.icon size={18} className={activeTab === tab.id ? colorMap[tab.color].text : ''} />
                            <span className="text-xs font-black uppercase tracking-widest flex-1 text-left">{tab.label}</span>
                            {tab.count > 0 && <span className="text-[10px] font-bold opacity-30">{tab.count}</span>}
                        </button>
                    ))}
                </nav>
                <div className="pt-6 border-t border-white/5 space-y-2">
                    <Link href="/" className="flex items-center gap-4 px-5 py-4 text-gray-500 hover:text-white transition-all"><Home size={18}/><span className="text-xs font-black uppercase tracking-widest">Back to site</span></Link>
                    <button onClick={handleLogout} className="w-full flex items-center gap-4 px-5 py-4 text-gray-500 hover:text-red-400 transition-all"><LogOut size={18}/><span className="text-xs font-black uppercase tracking-widest">Logout</span></button>
                </div>
            </aside>

            {/* Main Content Pane */}
            <main className="lg:ml-72 min-h-screen pt-16 lg:pt-0">
                <div className="max-w-5xl mx-auto p-6 sm:p-10 pt-10 sm:pt-20 space-y-8">
                    {/* Header Section */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
                        <div className="flex-1 w-full sm:w-auto">
                            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tighter shrink-0">Manage <span className={colors.text}>{activeTab === 'hero' ? 'Home Slides' : activeTab}</span></h2>
                            <div className="flex items-center gap-3 mt-1">
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none">Surat's Premium Clinic Panel</p>
                                <span className="text-gray-800 text-[10px] sm:hidden">•</span>
                                <button onClick={handleLogout} className="sm:hidden text-[9px] font-black uppercase text-red-500 hover:text-red-400 flex items-center gap-1 transition-colors">
                                    <LogOut size={10} strokeWidth={3} /> Logout
                                </button>
                            </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                            <button onClick={handleLogout} className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                                <LogOut size={14} /> Logout
                            </button>
                            
                            {(activeTab === 'gallery' || activeTab === 'videos' || activeTab === 'blogs' || activeTab === 'hero') && (
                                <button 
                                    onClick={() => {
                                        setImageCategory(activeTab === 'hero' ? 'Hero' : 'Gallery');
                                        setShowUploadModal(true);
                                    }}
                                    className={`flex items-center justify-center gap-3 px-6 py-4 rounded-2xl text-white font-black uppercase tracking-widest text-[10px] shadow-lg transition-all active:scale-95 ${colors.bg}`}
                                >
                                    <PlusCircle size={18} />
                                    <span>Add New {activeTab === 'gallery' ? 'Image' : activeTab === 'hero' ? 'Slide' : activeTab.slice(0, -1)}</span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Content View */}
                    <div className="min-h-[60vh]">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-40 gap-4">
                                <Loader2 size={48} className={`${colors.text} animate-spin`} />
                                <p className="text-[10px] text-white uppercase tracking-[0.5em]">Synchronizing...</p>
                            </div>
                        ) : activeTab === 'gallery' ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                                {galleryImages?.filter(i => i.category === 'Gallery').length === 0 ? (
                                    <div className="col-span-full py-40 text-center border-2 border-dashed border-white/5 rounded-[3rem] text-gray-700 font-black uppercase tracking-widest text-xs">No Gallery Assets</div>
                                ) : (
                                    galleryImages?.filter(i => i.category === 'Gallery').map(img => (
                                        <div key={img._id} className="group relative aspect-square bg-[#111827] rounded-3xl overflow-hidden border border-white/5 shadow-xl transition-all hover:-translate-y-1">
                                            <img src={img.url} className="w-full h-full object-cover transition-all duration-500" />
                                            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 via-black/40 to-transparent flex items-center justify-between p-4 sm:opacity-0 group-hover:opacity-100 transition-all">
                                                <span className="text-[8px] font-black text-white/50 uppercase tracking-widest">{img.category}</span>
                                                <button onClick={() => removeGalleryImage(img._id)} className="p-2.5 bg-red-600/90 rounded-xl text-white shadow-lg active:scale-95 transition-all"><Trash2 size={14} /></button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        ) : activeTab === 'hero' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* System Defaults - Always visible if they are the current active ones */}
                                {galleryImages?.filter(i => i.category === 'Hero').length === 0 && [
                                    { src: IMAGES.slides.slide1, label: "Modern Clinic View", sub: "Standard Clinic Visual" },
                                    { src: IMAGES.slides.slide2, label: "Surgical Suite", sub: "Standard Clinic Visual" },
                                    { src: IMAGES.slides.slide3, label: "Consultation Hub", sub: "Standard Clinic Visual" },
                                    { src: IMAGES.slides.slide4, label: "Digital Workflow", sub: "Standard Clinic Visual" }
                                ].map((img, idx) => (
                                    <div key={`default-${idx}`} className="group bg-[#111827] border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl transition-all hover:border-blue-500/30">
                                        <div className="aspect-video w-full relative">
                                            <img src={img.src} className="w-full h-full object-cover grayscale opacity-50 transition-all group-hover:grayscale-0 group-hover:opacity-100" />
                                            <div className="absolute inset-x-0 bottom-4 flex justify-center px-4 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                                                <button 
                                                    onClick={() => {
                                                        setSlideLabel(img.label);
                                                        setSlideSub(img.sub);
                                                        setImageCategory('Hero');
                                                        setShowUploadModal(true);
                                                    }}
                                                    className="w-full py-3 bg-blue-600/90 backdrop-blur-md rounded-2xl text-white font-black uppercase text-[9px] tracking-widest shadow-xl flex items-center justify-center gap-2 hover:bg-blue-600 transition-all"
                                                >
                                                    <Edit size={14} /> Customize Slide
                                                </button>
                                            </div>
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-blue-600/20 text-blue-400 text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-blue-500/20 backdrop-blur-md">System Default</span>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h4 className="text-white/50 font-black uppercase tracking-tighter text-lg">{img.label}</h4>
                                            <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest mt-1">Starting Template</p>
                                        </div>
                                    </div>
                                ))}

                                {galleryImages?.filter(i => i.category === 'Hero').map(img => (
                                        <div key={img._id} className="group bg-[#111827] border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl transition-all hover:border-emerald-500/30">
                                            <div className="aspect-video w-full relative">
                                                <img src={img.url} className="w-full h-full object-cover" />
                                                <div className="absolute top-4 right-4 flex gap-2 sm:opacity-0 group-hover:opacity-100 transition-all">
                                                    <button onClick={() => handleEditHero(img)} className="p-3 bg-blue-600 rounded-2xl text-white shadow-xl hover:scale-110 active:scale-90 transition-all"><Edit size={16} /></button>
                                                    <button onClick={() => removeGalleryImage(img._id)} className="p-3 bg-red-600 rounded-2xl text-white shadow-xl hover:scale-110 active:scale-90 transition-all"><Trash2 size={16} /></button>
                                                </div>
                                            </div>
                                            <div className="p-6">
                                                <h4 className="text-white font-black uppercase tracking-tighter text-lg">{img.title || 'No Title'}</h4>
                                                <p className="text-[10px] text-emerald-400 font-black uppercase tracking-widest mt-1">{img.author || 'No Subtitle'}</p>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        ) : activeTab === 'videos' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {videoList?.length === 0 ? (
                                    <div className="col-span-full py-40 border-2 border-dashed border-white/5 rounded-[3rem] text-center text-gray-700 font-black uppercase tracking-widest text-xs">No Videos Linked</div>
                                ) : (
                                    videoList?.map(vid => (
                                        <div key={vid._id} className="bg-[#111827] border border-white/5 rounded-3xl p-4 flex gap-4 items-center group">
                                            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-black shrink-0 relative">
                                                <img src={vid.thumbnail} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all" />
                                                <Video size={20} className="absolute inset-0 m-auto text-white opacity-40" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-black text-white truncate">{vid.title}</h4>
                                                <p className="text-[10px] text-gray-600 font-bold uppercase mt-1">ID: {vid.youtubeId}</p>
                                            </div>
                                            <button onClick={() => removeVideoItem(vid._id)} className="p-2 text-gray-600 hover:text-red-500 transition-colors"><Trash2 size={20} /></button>
                                        </div>
                                    ))
                                )}
                            </div>
                        ) : activeTab === 'blogs' ? (
                            <div className="space-y-4">
                                {blogList?.length === 0 ? (
                                    <div className="py-40 border-2 border-dashed border-white/5 rounded-[3rem] text-center text-gray-700 font-black uppercase tracking-widest text-xs">No Articles Written</div>
                                ) : (
                                    blogList?.map(blog => (
                                        <div key={blog._id} className="bg-[#111827] border border-white/5 rounded-3xl p-5 flex gap-5 items-center group hover:bg-white/2 transition-colors">
                                            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-900 shrink-0">
                                                {blog.image && <img src={blog.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[10px] text-purple-400 font-bold uppercase tracking-widest mb-1">{blog.category}</p>
                                                <h4 className="text-sm sm:text-lg font-black text-white leading-tight truncate">{blog.title}</h4>
                                                <p className="text-[10px] text-gray-600 font-medium line-clamp-1 mt-1">{new Date(blog.date).toLocaleDateString()}</p>
                                            </div>
                                            <button onClick={() => removeBlogItem(blog._id)} className="p-3 text-gray-600 hover:text-red-500 transition-colors"><Trash2 size={20} /></button>
                                        </div>
                                    ))
                                )}
                            </div>
                        ) : activeTab === 'offers' ? (
                            <OffersCampaignsSection API_URL={API_URL} />
                        ) : (
                            // Logo Management Section
                            <div className="flex flex-col items-center justify-center py-20 gap-6 border-2 border-dashed border-white/5 rounded-[3rem] bg-white/1 max-w-md mx-auto">
                                <Settings size={48} className="text-amber-400 mb-2" />
                                <div className="w-full flex flex-col items-center gap-4">
                                    <p className="text-lg font-black text-white uppercase tracking-widest mb-1">Current Clinic Logo</p>
                                    {/* Preview current logo */}
                                    {galleryImages?.find(i => i.category === 'Logo') ? (
                                        <div className="flex flex-col items-center gap-2 mb-2">
                                            <img
                                                src={galleryImages.find(i => i.category === 'Logo').url}
                                                alt="Current Logo"
                                                className="w-36 h-36 object-contain bg-white/10 border-2 border-amber-400/60 rounded-2xl shadow-xl"
                                            />
                                            <button
                                                className="mt-1 px-4 py-1 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-lg transition-all"
                                                onClick={async () => {
                                                    const logoImg = galleryImages.find(i => i.category === 'Logo');
                                                    if (!logoImg) return;
                                                    setIsUploading(true);
                                                    try {
                                                        const response = await fetch(`${API_URL}/api/gallery/${logoImg._id}`, { method: 'DELETE' });
                                                        if (response.ok) {
                                                            context.refreshData && context.refreshData();
                                                            showNotification('Logo deleted!', 'success');
                                                        } else {
                                                            showNotification('Failed to delete logo.', 'error');
                                                        }
                                                    } catch {
                                                        showNotification('Connection error', 'error');
                                                    } finally {
                                                        setIsUploading(false);
                                                    }
                                                }}
                                                disabled={isUploading}
                                            >
                                                Delete Logo
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="w-36 h-36 flex items-center justify-center bg-white/5 border-2 border-amber-400/20 rounded-2xl text-amber-400 font-black text-xs uppercase mb-2">No Logo</div>
                                    )}
                                    <div className="w-full bg-amber-500/10 border border-amber-400/20 rounded-xl p-3 sm:p-4 text-[11px] text-amber-300 font-bold text-center mb-2">
                                        <span className="block mb-1">Choose where to update the logo:</span>
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 sm:gap-6 text-amber-200 text-[10px] mx-auto max-w-xs sm:max-w-none">
                                            <label className="flex items-center gap-2 cursor-pointer py-1 px-2 rounded-lg hover:bg-amber-400/10 transition-all w-full sm:w-auto">
                                                <input type="checkbox" checked={logoLocations.navbar} onChange={() => handleLogoLocationChange('navbar')} className="accent-amber-500 w-4 h-4" />
                                                <span className="text-left">Navbar<br className="sm:hidden" /><span className="hidden sm:inline"> (Top of every page)</span></span>
                                            </label>
                                            <label className="flex items-center gap-2 cursor-pointer py-1 px-2 rounded-lg hover:bg-amber-400/10 transition-all w-full sm:w-auto">
                                                <input type="checkbox" checked={logoLocations.footer} onChange={() => handleLogoLocationChange('footer')} className="accent-amber-500 w-4 h-4" />
                                                <span className="text-left">Footer<br className="sm:hidden" /><span className="hidden sm:inline"> (Bottom of every page)</span></span>
                                            </label>
                                            <label className="flex items-center gap-2 cursor-pointer py-1 px-2 rounded-lg hover:bg-amber-400/10 transition-all w-full sm:w-auto">
                                                <input type="checkbox" checked={logoLocations.seo} onChange={() => handleLogoLocationChange('seo')} className="accent-amber-500 w-4 h-4" />
                                                <span className="text-left">SEO<br className="sm:hidden" /><span className="hidden sm:inline"> & Social Sharing</span></span>
                                            </label>
                                        </div>
                                        <span className="block mt-2 text-amber-300 text-[10px] sm:text-[11px]">Only selected places will be updated when you upload a new logo.</span>
                                    </div>
                                    <label className="w-full flex flex-col items-center justify-center py-8 border-4 border-dashed border-amber-400/20 rounded-2xl bg-black/20 group cursor-pointer hover:border-amber-400/40 transition-all">
                                        {isUploading ? <Loader2 size={32} className="animate-spin text-amber-400" /> : <Upload size={32} className="text-amber-400 opacity-40 group-hover:opacity-100 transition-all" />}
                                        <p className="text-[10px] font-black uppercase text-gray-500 mt-3 tracking-[0.2em]">
                                            {isUploading ? 'Uploading...' : 'Click to Upload New Logo'}
                                        </p>
                                        <input
                                            type="file"
                                            className="hidden"
                                            onChange={handleLogoImageUpload}
                                            disabled={isUploading}
                                        />
                                    </label>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )

            {/* Notifications */}
            {notification && (
                <div className={`fixed bottom-32 left-6 right-6 sm:left-auto sm:right-10 sm:max-w-xs z-100 p-4 rounded-3xl shadow-2xl backdrop-blur-2xl flex items-center gap-3 border animate-slide-up ${
                    notification.type === 'success' ? 'bg-emerald-600/10 border-emerald-500/20 text-emerald-400' : 'bg-red-600/10 border-red-500/20 text-red-400'
                }`}>
                    <Check size={16} />
                    <span className="text-[10px] font-black uppercase tracking-wider">{notification.msg}</span>
                    <button onClick={() => setNotification(null)} className="ml-auto p-1 hover:bg-white/5 rounded-full"><X size={14} /></button>
                </div>
            )}

            <style jsx global>{`
                @keyframes slide-up { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
                .animate-slide-up { animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                body { overflow-x: hidden; }
            `}</style>
        </main>
        </div>
    );
};

export default AdminPanel;
