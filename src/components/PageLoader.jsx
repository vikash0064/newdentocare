import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, HeartPulse, Activity } from 'lucide-react';

const PageLoader = () => {
    return (
        <div className="fixed inset-0 z-[9999] bg-[#050810] flex flex-col items-center justify-center overflow-hidden">
            {/* Background Ambient Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[80px]"></div>

            <div className="relative">
                {/* Outermost Rotating Ring */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="w-40 h-40 rounded-full border border-dashed border-blue-500/20"
                />

                {/* Middle Scanning Ring */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-2 rounded-full border-2 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                />

                {/* Inner Pulse Ring */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-8 rounded-full bg-gradient-to-br from-blue-600/20 to-cyan-500/20 border border-white/5 backdrop-blur-sm"
                />

                {/* Central Icon Container */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        animate={{
                            scale: [0.9, 1.1, 0.9],
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="relative z-10"
                    >
                        {/* Professional Molar Tooth Icon */}
                        <svg width="50" height="50" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_15px_rgba(59,130,246,1)]">
                            {/* Anatomical Molar Crown & Roots */}
                            <path
                                d="M25 35C25 25 35 20 50 20C65 20 75 25 75 35C75 42 72 48 70 54C68 60 68 70 70 78C70 82 68 85 64 85C60 85 58 82 56 74C54 66 52 64 50 64C48 64 46 66 44 74C42 82 40 85 36 85C32 85 30 82 30 78C32 70 32 60 30 54C28 48 25 42 25 35Z"
                                fill="white"
                                stroke="#3b82f6"
                                strokeWidth="2.5"
                                strokeLinejoin="round"
                            />
                            {/* Visual Depth Highlights */}
                            <path
                                d="M35 32C40 28 60 28 65 32"
                                stroke="#93c5fd"
                                strokeWidth="2"
                                strokeLinecap="round"
                                opacity="0.6"
                            />
                            <path
                                d="M50 35V55"
                                stroke="#dbeafe"
                                strokeWidth="1.5"
                                strokeDasharray="2 2"
                                opacity="0.3"
                            />
                            {/* Polished Shine */}
                            <circle cx="38" cy="35" r="3" fill="#eff6ff" opacity="0.8" />
                            <circle cx="62" cy="35" r="2.5" fill="#eff6ff" opacity="0.6" />
                        </svg>

                        {/* Little pulsing dot in the center */}
                        <motion.div
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.8)]"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Content Text */}
            <div className="mt-12 text-center relative z-10">
                <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-white font-black text-xs uppercase tracking-[0.4em] mb-2"
                >
                    Dent~O~Care
                </motion.h3>

                <div className="flex items-center justify-center gap-1">
                    <motion.div
                        animate={{ x: [-10, 10, -10] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="h-[1px] w-8 bg-gradient-to-r from-transparent to-blue-500"
                    />
                    <span className="text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] px-2">
                        Dr. Nimisha Modi
                    </span>
                    <motion.div
                        animate={{ x: [10, -10, 10] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="h-[1px] w-8 bg-gradient-to-l from-transparent to-blue-500"
                    />
                </div>

                <div className="mt-6 flex gap-1 items-center justify-center">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.3, 1, 0.3]
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.2
                            }}
                            className="w-1.5 h-1.5 rounded-full bg-blue-600"
                        />
                    ))}
                </div>
            </div>

            {/* Bottom Versioning or Status */}
            <div className="absolute bottom-8 text-gray-700 text-[8px] font-black uppercase tracking-[0.3em]">
                Secure Protocol v4.1
            </div>
        </div>
    );
};

export default PageLoader;
