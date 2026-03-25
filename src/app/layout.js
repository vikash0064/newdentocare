import '../index.css';
import Script from 'next/script';
import { DataProvider } from '../context/DataContext';
import Navbar from '../components/Navbar';
import { ConditionalBreadcrumbs, ConditionalFooter } from '../components/ConditionalLayout';
import WhatsAppButton from '../components/WhatsAppButton';

export const viewport = {
  themeColor: '#0B1120',
};

export const metadata = {
  title: 'Best Dentist in Surat | Dental Implants & RCT | Dentocare | Dr Nimisha Modi',
  description: 'Looking for the best dentist in Surat? Dentocare offers dental implants, painless root canal treatment, braces and cosmetic dentistry.',
  keywords: 'best dentist in Surat, dental clinic Surat, dental implants Surat, root canal treatment Surat, teeth whitening Surat, braces price Surat, painless dentistry Surat, dental hospital Adajan, dental clinic Palanpur Road',
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://www.plusdentocare.in/',
    languages: {
      'en-IN': 'https://www.plusdentocare.in/',
      'x-default': 'https://www.plusdentocare.in/'
    }
  },
  openGraph: {
    title: 'Best Dentist in Surat | Dentocare & Implant Centre | Dr Nimisha Modi',
    description: 'Best dental clinic in Surat by Dr Nimisha Modi at Dentocare. Specializing in painless treatments, dental implants, RCT, and braces.',
    url: 'https://www.plusdentocare.in/',
    siteName: 'Dentocare & Implant Centre',
    images: [
      {
        url: 'https://res.cloudinary.com/dyc1drqpy/image/upload/f_auto,q_auto/v1768732052/logo_cgdtgo.png',
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Dentist in Surat | Dentocare & Implant Centre | Dr Nimisha Modi',
    description: 'Expert dental care by Dr Nimisha Modi at Dentocare Surat.',
    images: ['https://res.cloudinary.com/dyc1drqpy/image/upload/f_auto,q_auto/v1768732052/logo_cgdtgo.png'],
  }
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
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-97CH0NSLY4" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-97CH0NSLY4');
          `}
        </Script>
        <Script id="elfsight-loader" strategy="lazyOnload">
          {`
            (function () {
              var scriptLoaded = false;
              var loadScript = function() {
                if (scriptLoaded) return;
                scriptLoaded = true;
                var s = document.createElement('script');
                s.src = "https://elfsightcdn.com/platform.js";
                s.defer = true;
                document.head.appendChild(s);
              };
              var handleScroll = function() {
                if (window.scrollY > 500) loadScript();
              };
              window.addEventListener('scroll', handleScroll, { passive: true });
              window.addEventListener('click', loadScript, { once: true });
              if ('requestIdleCallback' in window) {
                requestIdleCallback(function() { setTimeout(loadScript, 5000); });
              } else {
                setTimeout(loadScript, 8000);
              }
            })();
          `}
        </Script>
      </head>
      <body className="antialiased font-outfit">
        <DataProvider>
          <div className="flex flex-col min-h-screen bg-[#0B1120]">
            <a href="#main-content" className="skip-link" style={{ position: 'absolute', top: '-40px', left: 0, background: '#2563eb', color: 'white', padding: '8px', zIndex: 100, transition: 'top 0.3s' }}>
              Skip to main content
            </a>
            <Navbar />
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

