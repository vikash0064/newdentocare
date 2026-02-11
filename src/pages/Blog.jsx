import React, { useEffect, useState } from 'react';
import { useData } from '../context/DataContext';
import { ChevronRight, Calendar, User, Clock, Search, Tag } from 'lucide-react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

const Blog = () => {
    const { blogList, loading } = useData();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [filteredBlogs, setFilteredBlogs] = useState([]);

    // Sample categories for now, can be dynamic later
    const categories = ['All', 'Cosmetic Dentistry', 'Dental Implants', 'Oral Health', 'Teeth Whitening'];

    useEffect(() => {
        if (blogList) {
            setFilteredBlogs(
                blogList.filter(blog => {
                    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        blog.content.toLowerCase().includes(searchTerm.toLowerCase());
                    const matchesCategory = selectedCategory === 'All' || (blog.category && blog.category === selectedCategory);
                    return matchesSearch && matchesCategory;
                })
            );
        }
    }, [blogList, searchTerm, selectedCategory]);

    // Function to calculate read time
    const calculateReadTime = (content) => {
        const wordsPerMinute = 200;
        const words = content.trim().split(/\s+/).length;
        return Math.ceil(words / wordsPerMinute);
    };

    // Format date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="bg-[#0B1120] min-h-screen font-sans">
            <SEO
                title="Dental Health Blog - Expert Tips & Insights"
                description="Stay updated with the latest in dental care, cosmetic dentistry, and oral health tips from our expert dentists at Dent O Care."
            />

            {/* Hero Section */}
            {/* Hero Section */}
            <div className="bg-[#0B1120] text-white pt-24 pb-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-3xl md:text-5xl font-black mb-3 tracking-tight">
                        Dental <span className="text-blue-500">Insights</span>
                    </h1>
                    <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Expert advice, dental care tips, and the latest trends in modern dentistry to keep your smile healthy and bright.
                    </p>
                </div>
            </div>

            {/* Search and Filter Section */}
            <div className="container mx-auto px-4 -mt-8 relative z-20 mb-16">
                <div className="bg-[#1e293b]/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center justify-between">
                    <div className="relative w-full md:w-1/3">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-[#0B1120] border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 transition-colors text-white placeholder-gray-500"
                        />
                    </div>

                    <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${selectedCategory === category
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent/Featured Post (First item) */}
            {filteredBlogs.length > 0 && !searchTerm && selectedCategory === 'All' && (
                <div className="container mx-auto px-4 mb-16">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                        <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                        Featured Article
                    </h2>
                    <Link to={`/blog/${filteredBlogs[0].slug}`} className="group block">
                        <div className="grid md:grid-cols-2 gap-6 items-center bg-[#1e293b]/50 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg border border-white/10 hover:border-blue-500/30 transition-all duration-300">
                            <div className="aspect-video md:h-full md:aspect-auto overflow-hidden relative">
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-10"></div>
                                <img
                                    src={filteredBlogs[0].image || "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"}
                                    alt={filteredBlogs[0].title}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            <div className="p-6 md:p-8">
                                <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                                    <span className="flex items-center gap-1 bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full font-medium border border-blue-500/20">
                                        <Tag size={12} /> {filteredBlogs[0].category || 'General'}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Calendar size={12} /> {formatDate(filteredBlogs[0].date)}
                                    </span>
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors leading-tight">
                                    {filteredBlogs[0].title}
                                </h3>
                                <p className="text-gray-400 text-sm md:text-base mb-4 line-clamp-2 leading-relaxed">
                                    {filteredBlogs[0].content.substring(0, 150)}...
                                </p>
                                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold border border-blue-500/30 text-xs">
                                            {filteredBlogs[0].author ? filteredBlogs[0].author[0] : 'D'}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-200">{filteredBlogs[0].author || 'Dr. Nimisha Modi'}</p>
                                            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Dental Specialist</p>
                                        </div>
                                    </div>
                                    <span className="flex items-center text-blue-400 font-bold text-xs uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                                        Read Article <ChevronRight size={14} />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            )}

            {/* Blog Grid */}
            <div className="container mx-auto px-4 mb-24">
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-white">
                    <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                    Latest Articles
                </h2>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-white/5 rounded-2xl overflow-hidden shadow-sm h-96 animate-pulse border border-white/5">
                                <div className="h-48 bg-white/10"></div>
                                <div className="p-6 space-y-4">
                                    <div className="h-4 bg-white/10 rounded w-1/4"></div>
                                    <div className="h-8 bg-white/10 rounded w-3/4"></div>
                                    <div className="h-4 bg-white/10 rounded w-full"></div>
                                    <div className="h-4 bg-white/10 rounded w-5/6"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredBlogs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {(searchTerm || selectedCategory !== 'All' ? filteredBlogs : filteredBlogs.slice(1)).map((blog) => (
                            <Link key={blog._id} to={`/blog/${blog.slug}`} className="group bg-[#1e293b]/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-white/5 hover:border-blue-500/30 transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={blog.image || "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"}
                                        alt={blog.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 left-4 bg-blue-600/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-white/10">
                                        {blog.category || 'Dental Care'}
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                                        <span className="flex items-center gap-1">
                                            <Calendar size={12} /> {formatDate(blog.date)}
                                        </span>
                                        <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                                        <span className="flex items-center gap-1">
                                            <Clock size={12} /> {calculateReadTime(blog.content)} min read
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                                        {blog.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed flex-1">
                                        {blog.content.substring(0, 150)}...
                                    </p>
                                    <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-xs font-bold text-blue-400 border border-blue-500/20">
                                                {blog.author ? blog.author[0] : 'D'}
                                            </div>
                                            <span className="text-sm font-medium text-gray-300">{blog.author || 'Dr. Nimisha Modi'}</span>
                                        </div>
                                        <span className="text-blue-400 p-2 rounded-full bg-blue-500/10 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                            <ChevronRight size={16} />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10 backdrop-blur-sm">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                            <Search size={24} className="text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No articles found</h3>
                        <p className="text-gray-400">Try adjusting your search or category filters.</p>
                        <button
                            onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/40"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>


        </div>
    );
};

export default Blog;
