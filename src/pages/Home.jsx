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
                title="Best Dental Clinic in Surat | Dr Nimisha Modi"
                description="Expert dental care in Surat by Dr. Nimisha Modi. Specialized in Implants, Root Canal, Cosmetic Dentistry and Pain-free treatments. 5-Star rated clinic."
            />
            <Hero />

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
                <PatientSpeaks />
            </React.Suspense>
        </main>
    );
};

export default Home;
