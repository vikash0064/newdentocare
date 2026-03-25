"use client";
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const SEO = ({
    title,
    description,
    keywords,
    image = "https://www.plusdentocare.in/favicon-512x512.png",
    type = "website",
    author = "Dr. Nimisha Modi",
    faqData = [],
    videoData = []
}) => {
    const pathname = usePathname();
    const siteUrl = "https://www.plusdentocare.in";
    const fullUrl = `${siteUrl}${pathname}`;

    const defaultTitle = "Best Dentist in Surat | Dental Implants & RCT | Dentocare";
    const defaultDescription = "Top dental clinic in Surat offering painless root canal, implants, and braces by Dr. Nimisha Modi. Advanced technology for a perfect smile.";
    const defaultKeywords = "best dentist in Surat, dental clinic Surat, dental implants Surat, root canal treatment Surat, teeth whitening Surat, braces price Surat, painless dentistry Surat, dental hospital Adajan, dental clinic Palanpur Road";

    const pageTitle = title ? title : defaultTitle;
    const pageDescription = description || defaultDescription;
    const pageKeywords = keywords || defaultKeywords;

    useEffect(() => {
        // Set document title
        document.title = pageTitle;

        // Helper function to set or create meta tags
        const setMetaTag = (attribute, attributeValue, content) => {
            let element = document.querySelector(`meta[${attribute}="${attributeValue}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(attribute, attributeValue);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        // Basic Meta Tags
        setMetaTag('name', 'description', pageDescription.substring(0, 155));
        setMetaTag('name', 'keywords', pageKeywords);
        setMetaTag('name', 'author', author);
        setMetaTag('name', 'robots', 'index, follow, max-image-preview:large');
        setMetaTag('name', 'googlebot', 'index, follow');

        // Language and Content Type
        setMetaTag('http-equiv', 'content-language', 'en-IN');
        setMetaTag('name', 'language', 'English');

        // Open Graph Tags
        setMetaTag('property', 'og:title', pageTitle);
        setMetaTag('property', 'og:description', pageDescription);
        setMetaTag('property', 'og:url', fullUrl);
        setMetaTag('property', 'og:type', type);
        setMetaTag('property', 'og:image', image);
        setMetaTag('property', 'og:site_name', 'Dentocare & Implant Centre');
        setMetaTag('property', 'og:locale', 'en_IN');

        // Twitter Card Tags
        setMetaTag('name', 'twitter:card', 'summary_large_image');
        setMetaTag('name', 'twitter:title', pageTitle);
        setMetaTag('name', 'twitter:description', pageDescription);
        setMetaTag('name', 'twitter:image', image);

        // Canonical Link
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
        }
        canonical.setAttribute('href', fullUrl);

        // Hreflang tags
        const setHreflang = (lang, url) => {
            let link = document.querySelector(`link[hreflang="${lang}"]`);
            if (!link) {
                link = document.createElement('link');
                link.setAttribute('rel', 'alternate');
                link.setAttribute('hreflang', lang);
                document.head.appendChild(link);
            }
            link.setAttribute('href', url);
        };
        setHreflang('en-IN', fullUrl);
        setHreflang('x-default', fullUrl);

        // --- STRUCTURED DATA (JSON-LD) ---

        // 1. DentalClinic Schema (Advanced LocalBusiness)
        const clinicSchema = {
            "@context": "https://schema.org",
            "@type": "DentalClinic",
            "@id": `${siteUrl}/#clinic`,
            "name": "Dentocare & Implant Centre",
            "alternateName": "Dentocare Surat",
            "url": siteUrl,
            "logo": "https://res.cloudinary.com/dyc1drqpy/image/upload/v1768732052/logo_cgdtgo.png",
            "image": "https://res.cloudinary.com/dyc1drqpy/image/upload/v1768732052/logo_cgdtgo.png",
            "description": pageDescription,
            "telephone": "+916352534650",
            "priceRange": "₹₹",
            "address": [
                {
                    "@type": "PostalAddress",
                    "streetAddress": "Shop No. 7-8, Tirupati Shopping Center, Near Mashal Circle, Palanpur Road",
                    "addressLocality": "Simanagar, Adajan",
                    "addressRegion": "Gujarat",
                    "postalCode": "395009",
                    "addressCountry": "IN"
                },
                {
                    "@type": "PostalAddress",
                    "streetAddress": "104, 1st Floor, Eden Square, Near Star Bazaar, Gaurav Path",
                    "addressLocality": "Adajan, Pal",
                    "addressRegion": "Gujarat",
                    "postalCode": "395009",
                    "addressCountry": "IN"
                }
            ],
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": "21.2110523",
                "longitude": "72.790154"
            },
            "openingHoursSpecification": [
                {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    "opens": "10:00",
                    "closes": "20:00"
                }
            ],
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "366",
                "bestRating": "5",
                "worstRating": "1"
            },
            "review": [
                {
                    "@type": "Review",
                    "author": { "@type": "Person", "name": "Rajesh Kumar" },
                    "reviewRating": { "@type": "Rating", "ratingValue": "5" },
                    "reviewBody": "Best dentist in Surat for implants. Dr. Nimisha is very professional."
                }
            ],
            "sameAs": [
                "https://www.facebook.com/plusdentocare/",
                "https://www.instagram.com/plusdentocare_surat/"
            ]
        };

        // 2. Physician Schema (Dr. Nimisha Modi)
        const physicianSchema = {
            "@context": "https://schema.org",
            "@type": "Physician",
            "@id": `${siteUrl}/#doctor`,
            "name": "Dr. Nimisha Modi",
            "image": "https://res.cloudinary.com/dyc1drqpy/image/upload/f_auto,q_auto,w_400/v1768734665/doctor_sr6xdx.png",
            "medicalSpecialty": ["Dentistry", "Implantology", "Orthodontics"],
            "description": "Chief Dental Surgeon and Implantologist with 12+ years experience in Surat.",
            "memberOf": { "@id": `${siteUrl}/#clinic` },
            "alumniOf": {
                "@type": "EducationalOrganization",
                "name": "Dental College"
            }
        };

        // 3. Breadcrumb Schema
        const pathSegments = pathname.split('/').filter(x => x);
        const breadcrumbSchema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": siteUrl
                },
                ...pathSegments.map((segment, index) => ({
                    "@type": "ListItem",
                    "position": index + 2,
                    "name": segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
                    "item": `${siteUrl}/${pathSegments.slice(0, index + 1).join('/')}`
                }))
            ]
        };

        // 4. FAQ Schema
        let faqSchema = null;
        if (faqData && faqData.length > 0) {
            faqSchema = {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": faqData.map(item => ({
                    "@type": "Question",
                    "name": item.question,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": item.answer
                    }
                }))
            };
        }

        // Helper to update JSON-LD
        const updateJsonLd = (id, schema) => {
            let script = document.getElementById(id);
            if (schema) {
                if (!script) {
                    script = document.createElement('script');
                    script.id = id;
                    script.type = 'application/ld+json';
                    document.head.appendChild(script);
                }
                script.textContent = JSON.stringify(schema);
            } else if (script) {
                script.remove();
            }
        };

        updateJsonLd('clinic-schema', clinicSchema);
        updateJsonLd('doctor-schema', physicianSchema);
        updateJsonLd('breadcrumb-schema', breadcrumbSchema);
        if (faqSchema) updateJsonLd('faq-schema', faqSchema);

        // Cleanup on unmount
        return () => {
            ['clinic-schema', 'doctor-schema', 'breadcrumb-schema', 'faq-schema'].forEach(id => {
                const script = document.getElementById(id);
                if (script) script.remove();
            });
        };

    }, [pageTitle, pageDescription, pageKeywords, fullUrl, image, type, author, pathname, faqData]);

    return null;
};

export default SEO;
