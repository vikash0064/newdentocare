import React from 'react';
import Hero from '../components/Hero';
import StatsStrip from '../components/StatsStrip';
import TreatmentGrid from '../components/TreatmentGrid';
import SEO from '../components/SEO';
const ClinicPresence = React.lazy(() => import('../components/ClinicPresence'));
const HomeSEO = React.lazy(() => import('../components/HomeSEO'));
const WhyChoose = React.lazy(() => import('../components/WhyChoose'));
const DentalReels = React.lazy(() => import('../components/DentalReels'));
const PatientSpeaks = React.lazy(() => import('../components/PatientSpeaks'));
const MeetTheDoctor = React.lazy(() => import('../components/MeetTheDoctor'));
const LatestBlog = React.lazy(() => import('../components/LatestBlog'));
const ReviewCTA = React.lazy(() => import('../components/ReviewCTA'));

import { Link } from 'react-router-dom';

const LoadingSection = () => (
    <div className="h-40 flex items-center justify-center bg-[#0B1120]">
        <div className="w-8 h-8 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
);

const Home = () => {
    return (
        <main className="bg-[#0B1120] text-white">
            <SEO
                title="Plus Dento Care | Dr. Nimisha Modi | Best Dentist in Surat"
                description="Best dental clinic in Surat: Plus Dento Care by Dr. Nimisha Modi. Painless treatments, affordable prices, expert dentist. Book now!"
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
            <Hero loading="lazy" />

            {/* Scrolling Stats Strip */}
            <StatsStrip />

            {/* Treatment section moved up for better flow */}
            <TreatmentGrid />

            <React.Suspense fallback={<LoadingSection />}>
                <MeetTheDoctor />
                <WhyChoose />
                <DentalReels />
                <ClinicPresence />
                <LatestBlog />
                <HomeSEO />
                <ReviewCTA />
                <PatientSpeaks />
            </React.Suspense>
        </main>
    );
};

export default Home;
