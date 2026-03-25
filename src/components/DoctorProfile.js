"use client";
import React from 'react';
import { IMAGES } from '../constants';
import Link from 'next/link';

const DoctorProfile = () => {
    return (
        <section className="py-20 overflow-hidden bg-[#0B1120] text-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                    <div className="md:w-1/2 relative">
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/5">
                            <img
                                src={IMAGES.doctor}
                                alt="Dr. Nimisha Modi - Chief Dentist and Implantologist at Dentocare Surat"
                                className="w-full h-auto object-cover"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                        {/* Decorative pattern */}
                        <div className="absolute top-1/2 -right-12 transform -translate-y-1/2 translate-x-1/2">
                            <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <pattern id="dotPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                        <circle cx="2" cy="2" r="2" className="text-blue-500/20 fill-current" />
                                    </pattern>
                                </defs>
                                <rect width="200" height="200" fill="url(#dotPattern)" />
                            </svg>
                        </div>
                    </div>

                    <div className="md:w-1/2">
                        <div className="text-blue-400 font-bold uppercase tracking-wider mb-2 text-sm sm:text-base">Meet Our Lead Specialist</div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Dr. Nimisha Modi</h2>
                        <p className="text-xl text-gray-300 mb-6 font-medium">B.D.S. | MDS (Oral Surgery) | Fellow in Implantology</p>

                        <p className="text-gray-300 mb-6 leading-relaxed">
                            With over 12 years of experience in advanced dentistry, Dr. Nimisha Modi has transformed thousands of smiles. Her expertise lies in painless dental implants and cosmetic makeovers.
                        </p>

                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div className="bg-white/5 p-4 rounded-xl border border-white/5 shadow-inner">
                                <h3 className="text-3xl font-bold text-blue-400 mb-1">12+</h3>
                                <p className="text-gray-300 text-xs uppercase font-black tracking-widest opacity-80">Experience</p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-xl border border-white/5 shadow-inner">
                                <h3 className="text-3xl font-bold text-blue-400 mb-1">10k+</h3>
                                <p className="text-gray-300 text-xs uppercase font-black tracking-widest opacity-80">Patients</p>
                            </div>
                        </div>

                        <Link href="/doctors" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all active:scale-95 shadow-lg shadow-blue-900/20">
                            Read Full Profile
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DoctorProfile;
