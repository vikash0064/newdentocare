import React, { useState, useEffect } from 'react';
import { Star, Send, ExternalLink, Quote, Check } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const REVIEWS_POOL = [
    "Highly recommend Dr. Nimisha Modi for anyone looking for quality dental care. The clinic is equipped with all the latest and modified equipment, making the treatment very smooth and painless. Best doctor and staff in town!",
    "One of the best dental clinics I have visited. The staff is very professional and the hygiene levels are top-notch. Dr. Nimisha explains everything so well. Great experience and excellent service!",
    "Best treatment and very friendly staff. I was worried about my dental procedure, but Dr. Nimisha Modi made it so easy with her expertise and modern equipment. Totally satisfied with the results!",
    "Excellent service! Dr. Nimisha is highly skilled and the clinic has a very welcoming atmosphere. All the equipment is latest and the staff is very supportive. Highly recommended for family dental needs.",
    "Good experience with Dr. Nimisha Modi. The treatment was absolutely painless and quick. The clinic is clean, well-maintained, and uses modified dental technology. Best staff behavior!",
    "Had a wonderful experience at New DentoCare. Dr. Nimisha Modi is very patient and knowledgeable. The staff is well-trained and the equipment is state-of-the-art. 5-star service!",
    "Very impressed with the latest equipment and modified techniques used here. Dr. Nimisha and her staff ensure that the patient is comfortable throughout the treatment. Best place for dental care!",
    "Excellent treatment at an affordable price. Dr. Nimisha Modi is a brilliant dentist and the support staff is also very helpful. Clean clinic and modern facilities. Highly recommended!",
    "Best doctor, best staff, and best treatment! All facilities are modern and the clinic is very clean. Thank you Dr. Nimisha Modi for the great experience.",
    "Excellent dental clinic with highly professional staff. Dr. Nimisha Modi provides quality care and uses the latest technology for all procedures. Very happy with my treatment here!"
];

const ReviewCTA = () => {
    const GOOGLE_REVIEW_LINK = "https://g.page/r/CVyihSbmZCrcEBE/review";

    const handleRedirect = () => {
        window.open(GOOGLE_REVIEW_LINK, "_blank");
    };

    const [template, setTemplate] = useState('');

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * REVIEWS_POOL.length);
        setTemplate(REVIEWS_POOL[randomIndex]);
    }, []);

    return (
        <section className="py-6 md:py-20 relative overflow-hidden bg-[#0B1120]">
            {/* Background elements */}
            <div className="absolute top-0 inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.06),transparent_70%)]"></div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl">
                        <div className="flex flex-col lg:flex-row items-center">

                            {/* Left Side: Content */}
                            <div className="w-full lg:w-1/2 p-8 md:p-12 lg:border-r border-white/10 bg-gradient-to-br from-blue-600/5 to-transparent">
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-4 w-fit border border-emerald-500/20">
                                    <Star size={9} className="fill-current" /> Share Experience
                                </div>
                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-4 leading-tight tracking-tight">
                                    Love Our Service? <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Leave a Review!</span>
                                </h2>
                                <p className="text-gray-300 text-sm mb-6 leading-relaxed opacity-80">
                                    Your feedback helps us grow and helps others find the best dental care in Surat. It only takes a minute!
                                </p>

                                <div className="hidden lg:flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 italic text-gray-300 text-[11px] leading-relaxed">
                                    <Quote size={16} className="text-blue-500 shrink-0 mt-1" />
                                    "{template}"
                                </div>
                            </div>

                            {/* Right Side: Simple CTA Button */}
                            <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col items-center justify-center text-center">
                                <div className="w-full max-w-sm space-y-6">
                                    <div className="bg-yellow-500/10 p-4 rounded-2xl border border-yellow-500/20 mb-2">
                                        <div className="flex justify-center gap-1 mb-2">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={18} fill="currentColor" className="text-yellow-500" />
                                            ))}
                                        </div>
                                        <p className="text-[10px] text-yellow-500 font-black uppercase tracking-[0.2em]">Top Rated on Google</p>
                                    </div>

                                    <button
                                        onClick={handleRedirect}
                                        className="w-full bg-[#00a859] hover:bg-emerald-600 text-white font-black py-4 md:py-6 rounded-xl md:rounded-2xl shadow-xl shadow-emerald-900/20 flex items-center justify-center gap-3 group transition-all active:scale-[0.98] text-sm md:text-lg"
                                    >
                                        <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        Write a Review
                                        <ExternalLink size={16} className="opacity-40" />
                                    </button>

                                    <p className="text-[8px] md:text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                        Opens Google Maps Profile
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReviewCTA;
