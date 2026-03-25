import '../index.css';
import Script from 'next/script';
import { DataProvider } from '../context/DataContext';
import { ConditionalBreadcrumbs, ConditionalFooter, ConditionalNavbar } from '../components/ConditionalLayout';
import WhatsAppButton from '../components/WhatsAppButton';

export const viewport = {
  themeColor: '#0B1120',
};

export const metadata = {
  metadataBase: new URL('https://www.plusdentocare.in'),
  title: {
    default: 'Best Dentist in Surat | Dental Implants & RCT | DentoCare',
    template: '%s | Dentocare Surat'
  },
  description: 'Looking for the best dentist in Surat? Dentocare offers professional dental implants, painless root canal treatment (RCT), braces and cosmetic dentistry by Dr Nimisha Modi.',
  keywords: ['best dentist in Surat', 'dental clinic Surat', 'dental implants Surat', 'root canal treatment Surat', 'teeth whitening Surat', 'braces price Surat', 'painless dentistry Surat', 'dental hospital Adajan', 'dental clinic Palanpur Road'],
  authors: [{ name: 'Dr. Nimisha Modi' }],
  creator: 'Dr. Nimisha Modi',
  publisher: 'Dentocare & Implant Centre',
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-IN': '/',
      'x-default': '/'
    }
  },
  openGraph: {
    title: 'Best Dentist in Surat | Dentocare & Implant Centre | Dr Nimisha Modi',
    description: 'Surat\'s premier dental clinic specializing in painless treatments and high-success dental implants. Visit Dr. Nimisha Modi today.',
    url: 'https://www.plusdentocare.in/',
    siteName: 'Dentocare & Implant Centre',
    images: [
      {
        url: 'https://res.cloudinary.com/dyc1drqpy/image/upload/v1768732052/logo_cgdtgo.png',
        width: 1200,
        height: 630,
        alt: 'Dentocare Surat - Best Dentist Clinic',
      }
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Dentist in Surat | Dentocare & Implant Centre',
    description: 'Expert dental care by Dr Nimisha Modi at Dentocare Surat. Implants, RCT, Braces.',
    images: ['https://res.cloudinary.com/dyc1drqpy/image/upload/v1768732052/logo_cgdtgo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN">
      <head>
        <meta name="geo.region" content="IN-GJ" />
        <meta name="geo.placename" content="Surat" />
        <meta name="geo.position" content="21.2032;72.7669" />
        <meta name="ICBM" content="21.2032, 72.7669" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="true" />
        <link rel="dns-prefetch" href="https://elfsightcdn.com" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;800;900&family=Poppins:wght@400;700;900&display=swap" rel="stylesheet" />
        <Script id="structured-data-business" type="application/ld+json" strategy="afterInteractive">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Dentist",
              "name": "Dentocare & Implant Centre",
              "image": "https://www.plusdentocare.in/favicon-512x512.png",
              "@id": "https://www.plusdentocare.in",
              "url": "https://www.plusdentocare.in",
              "telephone": "+916352534650",
              "address": [
                {
                  "@type": "PostalAddress",
                  "streetAddress": "Shop No 1, Tirupati Shopping Center, Tirupati Circle, near Mashal Circle, Palanpur Road",
                  "addressLocality": "Surat",
                  "addressRegion": "GJ",
                  "postalCode": "395009",
                  "addressCountry": "IN"
                },
                {
                  "@type": "PostalAddress",
                  "streetAddress": "Eden Square, near Mashal Circle, Palanpur Patia",
                  "addressLocality": "Surat",
                  "addressRegion": "GJ",
                  "postalCode": "395009",
                  "addressCountry": "IN"
                }
              ],
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 21.2032,
                "longitude": 72.7669
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
              "sameAs": [
                "https://www.facebook.com/dentocaresurat",
                "https://www.instagram.com/dentocaresurat"
              ]
            }
          `}
        </Script>
        <Script id="structured-data-website" type="application/ld+json" strategy="afterInteractive">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": "https://www.plusdentocare.in",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.plusdentocare.in/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }
          `}
        </Script>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-97CH0NSLY4" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-97CH0NSLY4');
          `}
        </Script>
        <Script 
          id="elfsight-platform"
          src="https://elfsightcdn.com/platform.js" 
          strategy="afterInteractive" 
          defer 
        />
      </head>
      <body className="antialiased font-outfit">
        <DataProvider>
          <div className="flex flex-col min-h-screen bg-[#0B1120]">
            <a href="#main-content" className="skip-link" style={{ position: 'absolute', top: '-40px', left: 0, background: '#2563eb', color: 'white', padding: '8px', zIndex: 100, transition: 'top 0.3s' }}>
              Skip to main content
            </a>
            <ConditionalNavbar />
            <ConditionalBreadcrumbs />
            <main id="main-content" className="flex-grow">
              {children}
            </main>
            <ConditionalFooter />
            <WhatsAppButton />
          </div>
        </DataProvider>
      </body>
    </html>
  );
}

