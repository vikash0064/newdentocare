import React from 'react';

const PageLoader = () => {
    return (
        <div className="relative min-h-[80vh] bg-[#050810] flex flex-col items-center justify-center overflow-hidden">
            {/* Background Ambient Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse-slow"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[80px]"></div>

            <div className="relative">
                {/* Outermost Rotating Ring */}
                <div className="w-40 h-40 rounded-full border border-dashed border-blue-500/20 animate-spin-slow"></div>

                {/* Middle Scanning Ring */}
                <div className="absolute inset-2 rounded-full border-2 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent shadow-[0_0_15px_rgba(59,130,246,0.3)] animate-spin-reverse"></div>

                {/* Inner Pulse Ring */}
                <div className="absolute inset-8 rounded-full bg-gradient-to-br from-blue-600/20 to-cyan-500/20 border border-white/5 backdrop-blur-sm animate-pulse-scale"></div>

                {/* Central Icon Container */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative z-10 animate-float">
                        <svg width="50" height="50" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_15px_rgba(59,130,246,1)]">
                            <path
                                d="M25 35C25 25 35 20 50 20C65 20 75 25 75 35C75 42 72 48 70 54C68 60 68 70 70 78C70 82 68 85 64 85C60 85 58 82 56 74C54 66 52 64 50 64C48 64 46 66 44 74C42 82 40 85 36 85C32 85 30 82 30 78C32 70 32 60 30 54C28 48 25 42 25 35Z"
                                fill="white"
                                stroke="#3b82f6"
                                strokeWidth="2.5"
                                strokeLinejoin="round"
                            />
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
                            <circle cx="38" cy="35" r="3" fill="#eff6ff" opacity="0.8" />
                            <circle cx="62" cy="35" r="2.5" fill="#eff6ff" opacity="0.6" />
                        </svg>

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.8)] animate-pulse-fast"></div>
                    </div>
                </div>
            </div>

            {/* Content Text */}
            <div className="mt-12 text-center relative z-10">
                <h3 className="text-white font-black text-xs uppercase tracking-[0.4em] mb-2">
                    Dent~O~Care
                </h3>

                <div className="flex items-center justify-center gap-1">
                    <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-blue-500 animate-slide-left" />
                    <span className="text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] px-2">
                        Dr. Nimisha Modi
                    </span>
                    <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-blue-500 animate-slide-right" />
                </div>

                <div className="mt-6 flex gap-1 items-center justify-center">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce-dots"
                            style={{ animationDelay: `${i * 0.2}s` }}
                        />
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                @keyframes spin-reverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
                @keyframes pulse-slow { 0%, 100% { opacity: 0.1; transform: translate(-50%, -50%) scale(1); } 50% { opacity: 0.2; transform: translate(-50%, -50%) scale(1.1); } }
                @keyframes pulse-scale { 0%, 100% { transform: scale(1); opacity: 0.3; } 50% { transform: scale(1.2); opacity: 0.6; } }
                @keyframes pulse-fast { 0%, 100% { opacity: 0; } 50% { opacity: 1; } }
                @keyframes float { 0%, 100% { transform: translateY(0) scale(0.9); } 50% { transform: translateY(-5px) scale(1.1); } }
                @keyframes slide-left { 0%, 100% { transform: translateX(-10px); } 50% { transform: translateX(10px); } }
                @keyframes slide-right { 0%, 100% { transform: translateX(10px); } 50% { transform: translateX(-10px); } }
                @keyframes bounce-dots { 0%, 100% { transform: scale(1); opacity: 0.3; } 50% { transform: scale(1.5); opacity: 1; } }

                .animate-spin-slow { animation: spin-slow 8s linear infinite; }
                .animate-spin-reverse { animation: spin-reverse 15s linear infinite; }
                .animate-pulse-slow { animation: pulse-slow 4s infinite ease-in-out; }
                .animate-pulse-scale { animation: pulse-scale 2s infinite ease-in-out; }
                .animate-pulse-fast { animation: pulse-fast 1.5s infinite; }
                .animate-float { animation: float 2s infinite ease-in-out; }
                .animate-slide-left { animation: slide-left 3s infinite ease-in-out; }
                .animate-slide-right { animation: slide-right 3s infinite ease-in-out; }
                .animate-bounce-dots { animation: bounce-dots 1s infinite; }
            `}</style>

            {/* Bottom Versioning or Status */}
            <div className="absolute bottom-8 text-gray-700 text-[8px] font-black uppercase tracking-[0.3em]">
                Secure Protocol v4.2
            </div>
        </div>
    );
};

export default PageLoader;
