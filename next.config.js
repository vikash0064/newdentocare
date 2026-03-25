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
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://elfsight.com https://*.elfsight.com https://elfsightcdn.com https://static.elfsight.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://res.cloudinary.com https://i.ytimg.com https://fonts.gstatic.com https://*.elfsight.com https://static.elfsight.com; connect-src 'self' https://www.google-analytics.com https://*.elfsight.com https://static.elfsight.com https://newdentocare.onrender.com; frame-src 'self' https://www.youtube.com https://*.elfsight.com https://static.elfsight.com;",
          },
        ],
      },
    ];
  },
}

export default nextConfig;
