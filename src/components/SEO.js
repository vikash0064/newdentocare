"use client";
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * SEO Component focusing exclusively on JSON-LD Structured Data.
 * Metadata (Title, Description, Robots, Canonical) is now handled via the Next.js Metadata API
 * in layout.js and individual page.js files to prevent duplication and hydration errors.
 */
const SEO = ({
    description,
    image = "https://www.plusdentocare.in/favicon-512x512.png",
    faqData = [],
}) => {
    const pathname = usePathname();
    const siteUrl = "https://www.plusdentocare.in";
    const fullUrl = `${siteUrl}${pathname}${pathname.endsWith('/') ? '' : '/'}`;

    const defaultDescription = "Top dental clinic in Surat offering painless root canal, implants, and braces by Dr. Nimisha Modi. Advanced technology for a perfect smile.";
    const pageDescription = description || defaultDescription;

    useEffect(() => {
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
            "priceRange": "$$",
            "address": [
                {
                    "@type": "PostalAddress",
                    "streetAddress": "Shop No. 1, Tirupati Shopping Center, Tirupati Circle, near Mashal Circle, Palanpur Road",
                    "addressLocality": "Surat",
                    "addressRegion": "Gujarat",
                    "postalCode": "395009",
                    "addressCountry": "IN"
                },
                {
                    "@type": "PostalAddress",
                    "streetAddress": "Eden Square, near Mashal Circle, Palanpur Patia",
                    "addressLocality": "Surat",
                    "addressRegion": "Gujarat",
                    "postalCode": "395009",
                    "addressCountry": "IN"
                }
            ],
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": "21.2032",
                "longitude": "72.7669"
            },
            "openingHoursSpecification": [
                {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    "opens": "10:00",
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
                "reviewCount": "382",
                "bestRating": "5",
                "worstRating": "1"
            },
            "sameAs": [
                "https://www.facebook.com/dentocaresurat",
                "https://www.instagram.com/dentocaresurat"
            ]
        };

        // 2. Physician Schema (Dr. Nimisha Modi)
        const physicianSchema = {
            "@context": "https://schema.org",
            "@type": "Physician",
            "@id": `${siteUrl}/#doctor`,
            "name": "Dr. Nimisha Modi",
            "image": "https://res.cloudinary.com/dyc1drqpy/image/upload/f_auto,q_auto,w_400/v1768734665/doctor_sr6xdx.png",
            "medicalSpecialty": ["Dentistry", "Implantology", "Cosmetic Dentistry"],
            "description": "Chief Dental Surgeon and Implantologist with 12+ years experience in Surat.",
            "memberOf": { "@id": `${siteUrl}/#clinic` }
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

        // 4. FAQ Schema (Dynamic)
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

    }, [pageDescription, fullUrl, pathname, faqData]);

    return null;
};

export default SEO;
