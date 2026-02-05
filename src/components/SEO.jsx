import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO = ({
    title,
    description,
    keywords,
    image = "https://www.plusdentocare.in/favicon-512x512.png",
    type = "website",
    author = "Dr. Nimisha Modi"
}) => {
    const location = useLocation();
    const siteUrl = "https://www.plusdentocare.in";
    const fullUrl = `${siteUrl}${location.pathname}`;

    const defaultTitle = "Best Dental Clinic in Surat | Dr Nimisha Modi – Plus Dento Care";
    const defaultDescription = "Plus Dento Care: Best Dental Clinic in Surat by Dr. Nimisha Modi. Specializing in Implants, RCT, Braces & Cosmetic Dentistry. 366+ 5-star reviews.";
    const defaultKeywords = "dental clinic surat, best dentist surat, dr nimisha modi, dental implants surat, root canal treatment surat, teeth whitening surat, braces surat, cosmetic dentistry surat, painless dentistry, kids dentist surat, emergency dental care surat";

    const pageTitle = title ? `${title} | Plus Dento Care` : defaultTitle;
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
        setMetaTag('name', 'description', pageDescription);
        setMetaTag('name', 'keywords', pageKeywords);
        setMetaTag('name', 'author', author);
        setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
        setMetaTag('name', 'googlebot', 'index, follow');

        // Language and Content Type
        setMetaTag('http-equiv', 'content-language', 'en');
        setMetaTag('name', 'language', 'English');

        // Mobile Optimization
        setMetaTag('name', 'theme-color', '#0B1120');
        setMetaTag('name', 'apple-mobile-web-app-capable', 'yes');
        setMetaTag('name', 'apple-mobile-web-app-status-bar-style', 'black-translucent');

        // Open Graph Tags (Facebook, LinkedIn)
        setMetaTag('property', 'og:title', pageTitle);
        setMetaTag('property', 'og:description', pageDescription);
        setMetaTag('property', 'og:url', fullUrl);
        setMetaTag('property', 'og:type', type);
        setMetaTag('property', 'og:image', image);
        setMetaTag('property', 'og:image:width', '1200');
        setMetaTag('property', 'og:image:height', '630');
        setMetaTag('property', 'og:site_name', 'Plus Dento Care');
        setMetaTag('property', 'og:locale', 'en_IN');

        // Twitter Card Tags
        setMetaTag('name', 'twitter:card', 'summary_large_image');
        setMetaTag('name', 'twitter:title', pageTitle);
        setMetaTag('name', 'twitter:description', pageDescription);
        setMetaTag('name', 'twitter:image', image);
        setMetaTag('name', 'twitter:site', '@plusdentocare');
        setMetaTag('name', 'twitter:creator', '@plusdentocare');

        // Geo Location Tags for Local SEO
        setMetaTag('name', 'geo.region', 'IN-GJ');
        setMetaTag('name', 'geo.placename', 'Surat');
        setMetaTag('name', 'geo.position', '21.2032;72.7669');
        setMetaTag('name', 'ICBM', '21.2032, 72.7669');

        // Business/Organization Tags
        setMetaTag('name', 'rating', '4.9');
        setMetaTag('name', 'coverage', 'Worldwide');
        setMetaTag('name', 'distribution', 'Global');
        setMetaTag('name', 'target', 'all');
        setMetaTag('name', 'HandheldFriendly', 'True');
        setMetaTag('name', 'MobileOptimized', '320');

        // Canonical Link
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
        }
        canonical.setAttribute('href', fullUrl);

        // Alternate for mobile
        let alternateMobile = document.querySelector('link[rel="alternate"][media]');
        if (!alternateMobile) {
            alternateMobile = document.createElement('link');
            alternateMobile.setAttribute('rel', 'alternate');
            alternateMobile.setAttribute('media', 'only screen and (max-width: 640px)');
            document.head.appendChild(alternateMobile);
        }
        alternateMobile.setAttribute('href', fullUrl);

        // Structured Data - Organization (JSON-LD)
        const organizationSchema = {
            "@context": "https://schema.org",
            "@type": "Dentist",
            "name": "Plus Dento Care",
            "image": image,
            "url": siteUrl,
            "telephone": "+91-6352534650",
            "priceRange": "₹₹",
            "address": [
                {
                    "@type": "PostalAddress",
                    "streetAddress": "2nd Floor, Tirupati Shopping Center, Beside Tapteshwar Mahadev Temple, Simanagar-2, Mashal Circle, Palanpur Road",
                    "addressLocality": "Surat",
                    "addressRegion": "Gujarat",
                    "postalCode": "395009",
                    "addressCountry": "IN"
                },
                {
                    "@type": "PostalAddress",
                    "streetAddress": "122, First Floor, Eden Square, Gaurav Path Road, Opp. Fire Station",
                    "addressLocality": "Palanpur, Surat",
                    "addressRegion": "Gujarat",
                    "postalCode": "395009",
                    "addressCountry": "IN"
                }
            ],
            "geo": [
                {
                    "@type": "GeoCoordinates",
                    "latitude": 21.2032023,
                    "longitude": 72.7669892
                },
                {
                    "@type": "GeoCoordinates",
                    "latitude": 21.2110523,
                    "longitude": 72.790154
                }
            ],
            "openingHoursSpecification": [
                {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    "opens": "10:00",
                    "closes": "13:30"
                },
                {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    "opens": "16:30",
                    "closes": "20:00"
                },
                {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": "Sunday",
                    "opens": "11:00",
                    "closes": "13:30"
                }
            ],
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "366",
                "bestRating": "5",
                "worstRating": "1"
            },
            "founder": {
                "@type": "Person",
                "name": "Dr. Nimisha Modi",
                "jobTitle": "Chief Dentist & Implantologist"
            },
            "sameAs": [
                "https://www.facebook.com/modi.nimisha.5",
                "https://www.instagram.com/dentocare_dental",
                "https://www.youtube.com/@dentocare_dental"
            ],
            "areaServed": {
                "@type": "City",
                "name": "Surat"
            },
            "medicalSpecialty": [
                "Dental Implants",
                "Root Canal Treatment",
                "Cosmetic Dentistry",
                "Orthodontics",
                "Pediatric Dentistry"
            ]
        };

        // WebSite Schema for Search Box
        const websiteSchema = {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Plus Dento Care",
            "alternateName": ["Plus Dento Care Surat", "PlusDentoCare"],
            "url": siteUrl,
            "potentialAction": {
                "@type": "SearchAction",
                "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": `${siteUrl}/treatments?q={search_term_string}`
                },
                "query-input": "required name=search_term_string"
            }
        };

        // BreadcrumbList Schema
        const pathSegments = location.pathname.split('/').filter(Boolean);
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
                    "name": segment.charAt(0).toUpperCase() + segment.slice(1),
                    "item": `${siteUrl}/${pathSegments.slice(0, index + 1).join('/')}`
                }))
            ]
        };

        // Insert or update JSON-LD scripts
        const updateJsonLd = (id, schema) => {
            let script = document.getElementById(id);
            if (!script) {
                script = document.createElement('script');
                script.id = id;
                script.type = 'application/ld+json';
                document.head.appendChild(script);
            }
            script.textContent = JSON.stringify(schema);
        };

        updateJsonLd('organization-schema', organizationSchema);
        updateJsonLd('website-schema', websiteSchema);
        updateJsonLd('breadcrumb-schema', breadcrumbSchema);

    }, [pageTitle, pageDescription, pageKeywords, fullUrl, image, type, author, location.pathname]);

    return null;
};

export default SEO;
