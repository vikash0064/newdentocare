/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {},
  reactStrictMode: true,
  // output: 'export' removed to support dynamic Web Service deployment on Render
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://elfsight.com https://*.elfsight.com https://elfsightcdn.com https://static.elfsight.com https://universe-static.elfsightcdn.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: http://localhost:5000 https://res.cloudinary.com https://i.ytimg.com https://fonts.gstatic.com https://*.elfsight.com https://static.elfsight.com; connect-src 'self' ws: wss: http://localhost:5000 https://www.google-analytics.com https://www.googletagmanager.com https://*.elfsight.com https://static.elfsight.com https://universe-static.elfsightcdn.com https://newdentocare.onrender.com; frame-src 'self' https://www.google.com https://www.youtube.com https://*.elfsight.com https://static.elfsight.com;",
          },
        ],
      },
    ];
  },
}

export default nextConfig;
