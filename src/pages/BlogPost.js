"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useData } from '../context/DataContext';
import { Calendar, ArrowLeft, Clock, Share2, Facebook, Twitter, Linkedin, Tag } from 'lucide-react';
import SEO from '../components/SEO';

const BlogPost = () => {
    const params = useParams();
    const slug = params?.slug;
    const router = useRouter();
    const { blogList, loading } = useData();
    const [post, setPost] = useState(null);

    useEffect(() => {
        if (blogList && blogList.length > 0) {
            const foundPost = blogList.find(b => b.slug === slug);
            if (foundPost) {
                setPost(foundPost);
            } else if (!loading) {
                // Redirect to blog if not found after loading
                router.push('/blog');
            }
        }
    }, [slug, blogList, loading, router]);

    if (loading) {
        return (
            <div className="bg-[#0B1120] min-h-screen text-white">
                <div className="pt-32 pb-20 container mx-auto px-4">
                    <div className="animate-pulse space-y-8 max-w-4xl mx-auto">
                        <div className="h-8 bg-white/10 rounded w-1/4"></div>
                        <div className="h-12 bg-white/10 rounded w-3/4"></div>
                        <div className="h-96 bg-white/10 rounded w-full"></div>
                        <div className="space-y-4">
                            <div className="h-4 bg-white/10 rounded w-full"></div>
                            <div className="h-4 bg-white/10 rounded w-full"></div>
                            <div className="h-4 bg-white/10 rounded w-5/6"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!post) return null;

    // Helper to format date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Calculate Read Time
    const calculateReadTime = (content) => {
        const wordsPerMinute = 200;
        const words = content.trim().split(/\s+/).length;
        return Math.ceil(words / wordsPerMinute);
    };

    return (
        <div className="bg-[#0B1120] min-h-screen font-sans text-gray-300">
            <SEO
                title={`${post.title} | Dentocare Surat Blog`}
                description={post.content.substring(0, 155)}
                image={post.image}
                type="article"
            />

            <article className="pt-32 pb-20" itemScope itemType="https://schema.org/Article">
                <meta itemProp="author" content={post.author || 'Dr. Nimisha Modi'} />
                <meta itemProp="datePublished" content={post.date} />
                <meta itemProp="publisher" content="Dentocare" />
                {/* Header */}
                <div className="container mx-auto px-4 max-w-4xl mb-12">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-400 transition-colors mb-8 font-medium">
                        <ArrowLeft size={18} /> Back to Blog
                    </Link>

                    <div className="flex flex-wrap gap-4 items-center text-sm text-gray-500 mb-6">
                        <span className="bg-blue-500/10 border border-blue-500/20 text-blue-400 px-3 py-1 rounded-full font-bold flex items-center gap-1">
                            <Tag size={14} /> {post.category || 'Dental Health'}
                        </span>
                        <span className="flex items-center gap-1">
                            <Calendar size={16} /> <time dateTime={post.date}>{formatDate(post.date)}</time>
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock size={16} /> {calculateReadTime(post.content)} min read
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-8" itemProp="headline">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-between border-b border-white/10 pb-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-lg">
                                {post.author ? post.author[0] : 'D'}
                            </div>
                            <div>
                                <p className="font-bold text-white">{post.author || 'Dr. Nimisha Modi'}</p>
                                <p className="text-sm text-gray-500">Chief Dentist</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-2 rounded-full bg-white/5 hover:bg-blue-600 hover:text-white text-gray-400 transition-all" aria-label="Share this article">
                                <Share2 size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Featured Image */}
                {post.image && (
                    <div className="container mx-auto px-4 max-w-5xl mb-16">
                        <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                            <img
                                src={post.image}
                                alt={`${post.title} - Dental health article by Dr. Nimisha Modi at Dentocare Surat`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                decoding="async"
                                width="1200"
                                height="675"
                                itemProp="image"
                            />
                        </div>
                    </div>
                )}

                {/* Content */}
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="prose prose-lg prose-invert max-w-none text-gray-300 leading-relaxed">
                        {post.content.split('\n').map((paragraph, idx) => (
                            paragraph.trim() && <p key={idx} className="mb-6 last:mb-0">{paragraph}</p>
                        ))}
                    </div>

                    {/* Tags / Footer of Post */}
                    <div className="mt-16 pt-8 border-t border-white/10">
                        <h4 className="font-bold text-white mb-4">Share this article:</h4>
                        <div className="flex gap-4">
                            <button className="flex items-center gap-2 px-4 py-2 bg-[#1877F2]/20 border border-[#1877F2]/40 text-[#1877F2] rounded-lg hover:bg-[#1877F2] hover:text-white transition-all">
                                <Facebook size={18} /> Facebook
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2]/20 border border-[#1DA1F2]/40 text-[#1DA1F2] rounded-lg hover:bg-[#1DA1F2] hover:text-white transition-all">
                                <Twitter size={18} /> Twitter
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-[#0A66C2]/20 border border-[#0A66C2]/40 text-[#0A66C2] rounded-lg hover:bg-[#0A66C2] hover:text-white transition-all">
                                <Linkedin size={18} /> LinkedIn
                            </button>
                        </div>
                    </div>
                </div>
            </article>

            {/* Related Posts */}
            {blogList.length > 1 && (
                <div className="bg-[#0B1120] py-20 border-t border-white/5 relative">
                    <div className="absolute inset-0 bg-[#0B1120] opacity-90"></div>
                    {/* Subtle background decoration */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>

                    <div className="container mx-auto px-4 relative z-10">
                        <h3 className="text-2xl font-bold mb-10 text-center text-white">More Articles</h3>
                        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {blogList.filter(b => b._id !== post._id).slice(0, 3).map(related => (
                                <Link key={related._id} href={`/blog/${related.slug}`} className="bg-[#1e293b]/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-lg hover:border-blue-500/40 hover:-translate-y-1 transition-all block group">
                                    <div className="h-40 bg-black/40 rounded-xl mb-4 overflow-hidden relative">
                                        {related.image ? (
                                            <img src={related.image} alt={`Related Dental Article: ${related.title} - Dentocare Surat`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-600 bg-white/5">
                                                No Image
                                            </div>
                                        )}
                                    </div>
                                    <h4 className="font-bold text-lg mb-2 line-clamp-2 text-white group-hover:text-blue-400 transition-colors">{related.title}</h4>
                                    <p className="text-sm text-gray-500">{formatDate(related.date)}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogPost;
