"use client";
import { usePathname } from 'next/navigation';
import Footer from './Footer';
import Breadcrumbs from './Breadcrumbs';

export function ConditionalFooter() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;
  return <Footer />;
}

export function ConditionalBreadcrumbs() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;
  return <Breadcrumbs />;
}
