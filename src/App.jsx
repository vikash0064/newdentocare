import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import PageLoader from './components/PageLoader';
import { DataProvider } from './context/DataContext';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Contact = lazy(() => import('./pages/Contact'));
const Gallery = lazy(() => import('./pages/Gallery'));
const DoctorDetails = lazy(() => import('./pages/DoctorDetails'));
const Treatments = lazy(() => import('./pages/Treatments'));
const Videos = lazy(() => import('./pages/Videos'));
const Admin = lazy(() => import('./pages/Admin'));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    // Force manual scroll restoration to prevent browser from jumping back to old scroll position
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Always start at top on first load
    window.scrollTo(0, 0);

    // Force home page on first load/refresh EXCEPT for admin
    if (window.location.pathname !== '/' && !window.location.pathname.startsWith('/admin')) {
      navigate('/', { replace: true });
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#0B1120]">
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/doctors" element={<DoctorDetails />} />
            <Route path="/treatments" element={<Treatments />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

function App() {
  return (
    <DataProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </DataProvider>
  );
}

export default App;
