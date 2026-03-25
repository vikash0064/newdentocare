export default function sitemap() {
  const baseUrl = 'https://www.plusdentocare.in';
  
  const routes = [
    '',
    '/dental-implants',
    '/root-canal',
    '/braces',
    '/teeth-whitening',
    '/pediatric-dentistry',
    '/doctors',
    '/gallery',
    '/blog',
    '/contact',
    '/locations',
    '/faq',
    '/dentocare-surat',
    '/best-dental-clinic-in-surat',
    '/dentist-near-adajan',
    '/dental-clinic-simanagar-surat'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}
