"use client";
import React from 'react';
import Link from 'next/link';
import { Home, Wrench, AlertCircle, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

const NotFound = () => {
    return (
        <main className="min-h-screen bg-[#0B1120] relative flex items-center justify-center overflow-hidden p-4">
            <SEO
                title="404 Page Not Found | Dentocare"
                description="The page you are looking for might have been moved or is under maintenance. Visit our home page for the best dental care in Surat."
            />

            {/* Premium Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/10 rounded-full blur-[120px] animate-pulse delay-700"></div>
            </div>

            <div className="relative z-10 max-w-2xl w-full text-center">
                {/* Icon Section */}
                <div className="mb-8 relative inline-block">
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-500/20 to-emerald-500/20 rounded-3xl border border-white/10 flex items-center justify-center backdrop-blur-xl animate-bounce-slow">
                        <Wrench size={48} className="text-blue-400" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full border-4 border-[#0B1120] flex items-center justify-center">
                        <AlertCircle size={14} className="text-white" />
                    </div>
                </div>

                {/* Content */}
                <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight uppercase">
                    We'll Be <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Right Back</span>
                </h1>

                <p className="text-gray-400 text-base md:text-lg mb-10 max-w-md mx-auto leading-relaxed">
                    We're currently updating our clinical systems to serve you better. This page might be temporarily unavailable or under maintenance.
                </p>

                {/* Maintenance Status Card */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-10 backdrop-blur-md max-w-sm mx-auto">
                    <div className="flex items-center gap-3 justify-center mb-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Maintenance in Progress</span>
                    </div>
                    <p className="text-xs text-blue-400/80 font-bold uppercase tracking-wider">Estimated completion: Within 24 Hours</p>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/"
                        className="group flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold px-8 py-3.5 rounded-xl hover:shadow-lg hover:shadow-blue-500/20 transition-all hover:-translate-y-1 w-full sm:w-auto"
                    >
                        <Home size={18} />
                        Back to Home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 bg-white/5 border border-white/10 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-all w-full sm:w-auto"
                    >
                        <ArrowLeft size={18} />
                        Go Back
                    </button>
                </div>

                {/* Support Info */}
                <div className="mt-12 text-gray-500 text-[11px] uppercase tracking-[0.2em] font-bold">
                    Need urgent help? <a href="tel:+916352534650" className="text-blue-400 hover:underline">Call Us Now</a>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 4s ease-in-out infinite;
                }
            ` }} />
        </main>
    );
};

export default NotFound;
