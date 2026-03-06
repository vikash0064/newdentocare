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
                title="Best Dentist in Surat | Dental Implants & RCT | Plus Dento Care"
                description="Looking for the best dentist in Surat? Plus Dento Care offers dental implants, painless root canal treatment, braces and cosmetic dentistry."
                faqData={[
                    {
                        question: "How much do dental implants cost in Surat?",
                        answer: "Dental implants at Plus Dento Care start from ₹18,000. The final cost depends on individual requirements and the type of implant chosen. Book a free consultation for accurate pricing."
                    },
                    {
                        question: "Is root canal treatment painful?",
                        answer: "No! Root canal treatment at Plus Dento Care is completely painless. We use advanced anesthesia and modern rotary techniques to ensure your complete comfort."
                    },
                    {
                        question: "What are your clinic timings?",
                        answer: "We are open Monday to Saturday from 9:00 AM to 8:00 PM. We also offer emergency dental services for patients in pain."
                    },
                    {
                        question: "Do you offer dental implants for seniors?",
                        answer: "Yes! We provide dental implants for patients of all ages, including seniors. Our experienced team assesses each patient's bone density and health before proceeding."
                    },
                    {
                        question: "How long does teeth whitening last?",
                        answer: "Teeth whitening results can last 1-3 years with proper care. Avoiding smoking, coffee, and colored foods will help maintain the brightness longer."
                    },
                    {
                        question: "Do you provide free consultation?",
                        answer: "Yes! We offer free consultation for all major dental treatments. Book your appointment today!"
                    }
                ]}
            />

            {/* Main Sections with natural height */}
            <Hero loading="eager" />
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
