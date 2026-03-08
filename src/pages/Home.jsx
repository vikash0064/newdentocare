import React, { Suspense } from 'react';
import Hero from '../components/Hero';
import TreatmentGrid from '../components/TreatmentGrid';
import HomeSEO from '../components/HomeSEO';
import SEO from '../components/SEO';
import StatsStrip from '../components/StatsStrip';
import ClinicPresence from '../components/ClinicPresence';
import WhyChoose from '../components/WhyChoose';
import MeetTheDoctor from '../components/MeetTheDoctor';
import ReviewCTA from '../components/ReviewCTA';
import DentalReels from '../components/DentalReels';
import PatientSpeaks from '../components/PatientSpeaks';
import LatestBlog from '../components/LatestBlog';
import TrustStrip from '../components/TrustStrip';
import { Link } from 'react-router-dom';

const LoadingSection = ({ height = "h-screen" }) => (
    <div className={`${height} flex items-center justify-center bg-[#0B1120]`}>
        <div className="w-8 h-8 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
);

const Home = () => {
    return (
        <main className="bg-[#0B1120] text-white overflow-x-hidden min-h-screen">
            <SEO
                title="Best Dentist in Surat | Dental Implants & RCT | DentoCare | Dr Nimisha Modi"
                description="Dentocare is Surat's trusted dental clinic led by Dr. Nimisha Modi. Offering dental implants, painless root canal, braces, teeth whitening and pediatric dentistry."
                faqData={[
                    {
                        question: "How much do dental implants cost at Dentocare in Surat?",
                        answer: "Dental implants at Dentocare start from ₹18,000 for Korean implants. Swiss and German implant systems are also available at competitive rates. The cost depends on bone density, implant type, and crown material. Book a free consultation for personalized pricing."
                    },
                    {
                        question: "Is root canal treatment at your clinic completely painless?",
                        answer: "Yes, root canal treatment at Dentocare is completely painless. We use topical anesthetic gel before injection, advanced rotary endodontic instruments, and electronic apex locators to precisely clean and seal the tooth canal without discomfort."
                    },
                    {
                        question: "What are the clinic hours and which days are you open?",
                        answer: "Both our branches are open Monday to Saturday from 10:00 AM to 1:30 PM and 4:30 PM to 8:00 PM. Sunday hours are 11:00 AM to 1:30 PM (by appointment). We also handle dental emergencies during clinic hours."
                    },
                    {
                        question: "Can elderly patients or senior citizens get dental implants safely?",
                        answer: "Absolutely. Dr. Nimisha Modi has extensive experience placing implants for patients above 60 years. We conduct a thorough assessment of bone density using digital X-rays and CBCT scans before recommending the right implant system for older patients."
                    },
                    {
                        question: "How long do professional teeth whitening results last?",
                        answer: "Professional in-office teeth whitening results typically last 1 to 3 years. We recommend avoiding tobacco, red wine, coffee, and dark-colored foods. A touch-up session every 12-18 months keeps your smile consistently bright."
                    },
                    {
                        question: "Is the first dental consultation free at Dentocare?",
                        answer: "Yes, we offer complimentary consultations for all major treatments including dental implants, root canal, braces, and smile makeover. The consultation includes a clinical examination and treatment plan discussion."
                    },
                    {
                        question: "How do I book an appointment at Dentocare?",
                        answer: "You can book an appointment by calling +91 63525 34650 (Palanpur Road branch) or +91 88492 20932 (Gaurav Path branch). You can also message us on WhatsApp for quick appointment scheduling."
                    },
                    {
                        question: "What payment methods does Dentocare accept?",
                        answer: "We accept cash, all major credit and debit cards, UPI payments (Google Pay, PhonePe, Paytm), and bank transfers. EMI options are available for treatments above ₹20,000 through partner financing."
                    }
                ]}
            />

            {/* Main Sections with natural height */}
            <Hero loading="eager" />
            <TrustStrip />
            <StatsStrip />
            <TreatmentGrid />
            <MeetTheDoctor />
            <WhyChoose />
            <PatientSpeaks />
            <LatestBlog />
            <DentalReels />
            <ReviewCTA />
            <ClinicPresence />
            <HomeSEO />
        </main>
    );
};

export default Home;
