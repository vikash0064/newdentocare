import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO = ({ title, description }) => {
    const location = useLocation();

    useEffect(() => {
        document.title = title ? `${title} | Dent O Care` : "Best Dental Clinic in Surat | Dr Nimisha Modi – Dent O Care";

        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', description || "Dent O Care is a trusted dental clinic in Surat led by Dr Nimisha Modi. Specializing in Implants, RCT, braces & cosmetic dentistry.");
        }

        // Canonical Link
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
        }
        canonical.setAttribute('href', `https://dentocare.in${location.pathname}`);

    }, [title, description, location]);

    return null;
};

export default SEO;
