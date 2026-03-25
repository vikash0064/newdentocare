"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = () => {
    const pathname = usePathname();
    const pathnames = pathname.split('/').filter((x) => x);

    if (pathname === '/' || pathname === '/dentocare-surat') return null;

    return (
        <nav aria-label="Breadcrumb" className="bg-[#0B1120] py-3 border-b border-white/5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
                <ol className="flex items-center space-x-2 text-[10px] sm:text-[11px] font-bold tracking-wider uppercase">
                    <li className="flex items-center">
                        <Link href="/" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1">
                            <Home size={12} />
                            <span>Home</span>
                        </Link>
                    </li>
                    {pathnames.map((name, index) => {
                        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                        const isLast = index === pathnames.length - 1;
                        const formattedName = name.replace(/-/g, ' ');

                        return (
                            <li key={name} className="flex items-center">
                                <ChevronRight size={12} className="text-gray-600 mx-1" />
                                {isLast ? (
                                    <span className="text-blue-400">{formattedName}</span>
                                ) : (
                                    <Link href={routeTo} className="text-gray-400 hover:text-white transition-colors">
                                        {formattedName}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </div>
        </nav>
    );
};

export default Breadcrumbs;
