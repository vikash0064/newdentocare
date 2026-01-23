import React, { useState, useEffect } from 'react';
import { MessageSquare, MapPin, Phone, Clock, Send, CheckCircle2, Loader2, ArrowRight, ChevronDown } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import confetti from 'canvas-confetti';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Default scroll to top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setIsSuccess(true);
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#3b82f6', '#10b981', '#ffffff']
        });
        toast.custom((t) => (
            <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-[#1e293b] shadow-lg rounded-xl pointer-events-auto flex ring-1 ring-white/10`}>
                <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0 pt-0.5">
                            <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                        </div>
                        <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-white">Message Sent Successfully!</p>
                            <p className="mt-1 text-sm text-gray-400">We'll get back to you shortly.</p>
                        </div>
                    </div>
                </div>
            </div>
        ));
        setFormData({ name: '', phone: '', subject: '', message: '' });

        // Reset success state after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000);
    };

    const contactInfo = [
        {
            icon: Phone,
            title: "Phone",
            details: "+91 74053 59271",
            sub: "Mon-Sat 9am to 6pm",
            link: "tel:+917405359271",
            color: "text-blue-400",
            bg: "bg-blue-500/10"
        },
        // Email contact removed as per request
        {
            icon: MapPin,
            title: "Palanpur Branch",
            details: "Raj Point",
            sub: "Palanpur Patia Rd, Surat",
            link: "https://maps.google.com",
            color: "text-purple-400",
            bg: "bg-purple-500/10"
        },
        {
            icon: MapPin,
            title: "Gaurav Path Branch",
            details: "Palanpur Crossing",
            sub: "Gaurav Path, Surat",
            link: "https://maps.google.com",
            color: "text-pink-400",
            bg: "bg-pink-500/10"
        }
    ];

    return (
        <main className="bg-[#0B1120] min-h-screen relative overflow-hidden text-white">
            <Toaster position="top-right" />

            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-0 pointer-events-none opacity-40"></div>
            <div className="absolute bottom-0 right-0 w-full h-[500px] bg-purple-600/10 rounded-full blur-[120px] -z-0 pointer-events-none opacity-40"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 relative z-10">

                {/* Header Section - COMPACT */}
                <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 mt-2 sm:mt-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-lg mb-3 animate-fade-in-up">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                        <span className="text-[10px] font-semibold text-blue-400 tracking-wide uppercase">Get In Touch</span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-2 sm:mb-3 tracking-tight leading-tight">
                        Let's Discuss Your <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Dental Health</span>
                    </h1>

                    <p className="text-gray-400 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
                        Have questions or need to book an appointment? We're here to help.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start max-w-6xl mx-auto">

                    {/* Contact Info Cards (Left Column) */}
                    <div className="lg:col-span-5 space-y-3 sm:space-y-4 lg:sticky lg:top-24">
                        <div className="grid grid-cols-1 gap-3">
                            {contactInfo.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.link}
                                    className="group bg-[#1e293b]/40 backdrop-blur-md p-4 rounded-xl border border-white/5 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 block"
                                >
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <div className={`${item.bg} p-2.5 rounded-lg text-white group-hover:scale-110 transition-transform duration-300`}>
                                            <item.icon size={18} className={item.color} />
                                        </div>
                                        <div>
                                            <h3 className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">{item.title}</h3>
                                            <p className="text-white font-bold text-sm sm:text-base leading-tight">{item.details}</p>
                                            {item.sub && <p className="text-gray-500 text-[10px] sm:text-xs mt-0.5">{item.sub}</p>}
                                        </div>
                                        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
                                            <ArrowRight size={16} className="text-gray-400" />
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* Working Hours - COMPACT */}
                        <div className="mt-4 bg-[#1e293b]/40 backdrop-blur-md p-4 sm:p-5 rounded-xl border border-white/5 text-center">
                            <Clock size={20} className="mx-auto text-blue-400 mb-2" />
                            <h3 className="text-white font-bold text-sm mb-2">Working Hours</h3>
                            <div className="space-y-1">
                                <p className="text-xs sm:text-sm text-gray-300 font-medium">10:00 AM – 1:30 PM</p>
                                <p className="text-xs sm:text-sm text-gray-300 font-medium">4:30 PM – 8:00 PM</p>
                                <p className="text-[10px] text-gray-400 mt-1.5 font-semibold">Sunday: 11:00 AM – 1:30 PM</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form (Right Column) - COMPACT */}
                    <div className="lg:col-span-7">
                        <div className="bg-[#1e293b]/30 backdrop-blur-xl p-5 sm:p-6 rounded-2xl border border-white/10 shadow-xl relative overflow-hidden">
                            {/* Decorative Form Background */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl -z-10"></div>

                            <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
                                <span className="bg-blue-500/20 p-1.5 rounded-md"><MessageSquare size={16} className="text-blue-400" /></span>
                                Send us a Message
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-gray-400 ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full bg-[#0B1120] border border-gray-700/50 rounded-lg px-3 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-xs sm:text-sm"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-gray-400 ml-1">Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full bg-[#0B1120] border border-gray-700/50 rounded-lg px-3 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-xs sm:text-sm"
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>
                                </div>

                                {/* Email field removed as per request */}

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-gray-400 ml-1">Subject</label>
                                    <div className="relative">
                                        <select
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full bg-[#0B1120] border border-gray-700/50 rounded-lg px-3 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-xs sm:text-sm appearance-none cursor-pointer"
                                        >
                                            <option value="" disabled>Select a Topic</option>
                                            <option value="consultation">General Consultation</option>
                                            <option value="emergency">Emergency Care</option>
                                            <option value="support">Help & Support</option>
                                            <option value="other">Other Inquiry</option>
                                        </select>
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                            <ChevronDown size={14} />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-gray-400 ml-1">Message</label>
                                    <textarea
                                        name="message"
                                        required
                                        rows="3"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full bg-[#0B1120] border border-gray-700/50 rounded-lg px-3 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-xs sm:text-sm resize-none"
                                        placeholder="How can we help you?"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 text-sm ${isSubmitting ? 'opacity-80 cursor-not-allowed' : 'hover:-translate-y-0.5'}`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 size={16} className="animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <Send size={16} />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Contact;