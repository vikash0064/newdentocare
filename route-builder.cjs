const fs = require('fs');
const path = require('path');

const routes = {
  '': 'Home',
  'dentocare-surat': 'Home',
  'best-dental-clinic-in-surat': 'Home',
  'contact': 'Contact',
  'gallery': 'Gallery',
  'videos': 'Videos',
  'testimonials': 'Videos',
  'doctors': 'DoctorDetails',
  'treatments': 'Treatments',
  'dental-implants': 'Treatments',
  'root-canal': 'Treatments',
  'teeth-whitening': 'Treatments',
  'braces': 'Treatments',
  'pediatric-dentistry': 'Treatments',
  'faq': 'Home',
  'about-us': 'Home',
  'locations': 'Contact',
  'dentist-near-adajan': 'Contact',
  'dental-clinic-simanagar-surat': 'Contact',
  'admin': 'Admin',
  'blog': 'Blog',
  'blog/[slug]': 'BlogPost'
};

const appDir = path.join(__dirname, 'src', 'app');
if (!fs.existsSync(appDir)) {
  fs.mkdirSync(appDir, { recursive: true });
}

for (const [routePath, component] of Object.entries(routes)) {
  const routeDir = path.join(appDir, routePath);
  if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
  }
  
  const pagePath = path.join(routeDir, 'page.js');
  // Handle component imports from pages assuming pages folder is in src/pages
  const depth = routePath ? routePath.split('/').length : 0;
  const relativePrefix = depth === 0 ? '../' : '../'.repeat(depth + 1);
  
  const content = `"use client";
import ${component} from '${relativePrefix}pages/${component}';

export default function Page(props) {
  return <${component} {...props} />;
}
`;
  
  fs.writeFileSync(pagePath, content);
}
console.log('App router structure generated');
