import React, { useEffect, useState } from 'react';
import { useData } from '../context/DataContext';
import { ChevronRight, Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const LatestBlog = () => {
    const { blogList } = useData();
    const [latestBlog, setLatestBlog] = useState(null);

    // Filter and find the latest blog
    useEffect(() => {
        if (blogList && blogList.length > 0) {
            // Sort by date descending and pick the first one
            const sortedBlogs = [...blogList].sort((a, b) => new Date(b.date) - new Date(a.date));
            setLatestBlog(sortedBlogs[0]);
        }
    }, [blogList]);

    // Format date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (!latestBlog) return null;

    return (
        <section className="py-20 bg-[#0B1120] relative border-t border-white/5">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid md:grid-cols-2 gap-12 items-center">

                    {/* Left Content */}
                    <div className="order-2 md:order-1 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Latest Insight</span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                            {latestBlog.title}
                        </h2>

                        <div className="flex items-center gap-4 text-sm text-gray-200 font-bold">
                            <span className="flex items-center gap-1.5">
                                <User size={16} className="text-blue-500" />
                                {latestBlog.author || 'Dr. Nimisha Modi'}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-gray-700"></span>
                            <span className="flex items-center gap-1.5">
                                <Calendar size={16} className="text-blue-500" />
                                {formatDate(latestBlog.date)}
                            </span>
                        </div>

                        <p className="text-gray-300 text-lg leading-relaxed line-clamp-3">
                            {latestBlog.content.substring(0, 200)}...
                        </p>

                        <div className="pt-4">
                            <Link
                                to={`/blog/${latestBlog.slug}`}
                                className="inline-flex items-center gap-2 text-white font-bold group border-b border-blue-500 pb-1 hover:text-blue-400 transition-colors"
                            >
                                Read Full Article
                                <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="order-1 md:order-2">
                        <Link to={`/blog/${latestBlog.slug}`} className="block relative group rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/3]">
                            <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-blue-600/0 transition-colors z-10"></div>
                            <img
                                src={latestBlog.image || "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"}
                                alt={`${latestBlog.title} - Dental Health Article by Plus Dento Care Surat`}
                                width="600"
                                height="450"
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                            />

                            {/* Floating Badge */}
                            <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider z-20 shadow-lg">
                                {latestBlog.category || 'Dental Health'}
                            </div>
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default LatestBlog;
