import React, { useState } from 'react';
import { Copy, Check, Star } from 'lucide-react';

const REVIEWS_DATA = [
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

const ReviewGenerator = () => {
    const [copiedId, setCopiedId] = useState(null);

    const handleCopy = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="space-y-6">
            <div className="text-center lg:text-left mb-8">
                <h3 className="text-lg sm:text-xl font-black text-white mb-2 flex items-center justify-center lg:justify-start gap-2">
                    <Star size={20} className="text-yellow-500" /> Google Review Helper
                </h3>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Copy professional reviews to paste on Google</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {REVIEWS_DATA.map((review, index) => (
                    <div
                        key={index}
                        className="group relative bg-white/[0.03] border border-white/5 rounded-2xl p-4 transition-all hover:bg-white/[0.05] hover:border-blue-500/20"
                    >
                        <div className="flex justify-between items-start gap-4">
                            <div className="flex-1">
                                <div className="flex gap-1 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={10} fill="currentColor" className="text-yellow-500" />
                                    ))}
                                </div>
                                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed italic">
                                    "{review}"
                                </p>
                            </div>
                            <button
                                onClick={() => handleCopy(review, index)}
                                className={`shrink-0 p-3 rounded-xl transition-all ${copiedId === index
                                    ? 'bg-emerald-500 text-white'
                                    : 'bg-blue-600/10 text-blue-400 hover:bg-blue-600 hover:text-white'
                                    }`}
                                title="Copy to clipboard"
                            >
                                {copiedId === index ? <Check size={16} /> : <Copy size={16} />}
                            </button>
                        </div>

                        {copiedId === index && (
                            <div className="absolute top-2 right-14 animate-in fade-in slide-in-from-right-2 duration-300">
                                <span className="text-[8px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md">
                                    Copied!
                                </span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-8 p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-center">
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2">Pro Tip</p>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                    Always use a different review each time to maintain authenticity and avoid Google's spam filters.
                </p>
            </div>
        </div>
    );
};

export default ReviewGenerator;
