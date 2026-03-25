"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Facebook, Phone, X } from 'lucide-react';
import gsap from 'gsap';

// Custom WhatsApp Outline Icon to match the reference
const WhatsAppOutlineIcon = ({ size = 24, className }) => (
    <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="currentColor"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471.148-.67.445-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
);

const WhatsAppButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const buttonsRef = useRef([]);
    const containerRef = useRef(null);

    const phoneNumber = "916352534650";
    const message = "Hi Dentocare, I have a query regarding dental treatments.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    const actions = [
        {
            id: 'whatsapp',
            icon: WhatsAppOutlineIcon,
            label: 'WhatsApp',
            color: 'bg-[#25D366]',
            href: whatsappUrl,
            delay: 0
        },
        {
            id: 'phone',
            icon: Phone,
            label: 'Call Us',
            color: 'bg-[#0ea5e9]',
            href: `tel:+${phoneNumber}`,
            delay: 0.05
        },
        {
            id: 'facebook',
            icon: Facebook,
            label: 'Facebook',
            color: 'bg-[#1877F2]',
            href: 'https://www.facebook.com/modi.nimisha.5',
            delay: 0.1
        }
    ];

    useEffect(() => {
        if (isOpen) {
            gsap.to(buttonsRef.current, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.4,
                stagger: 0.1,
                ease: "back.out(1.7)",
                display: "flex"
            });
        } else {
            gsap.to(buttonsRef.current, {
                y: 20,
                opacity: 0,
                scale: 0.8,
                duration: 0.3,
                stagger: 0.05,
                ease: "power2.in",
                onComplete: () => {
                    if (!isOpen) {
                        // hidden by opacity
                    }
                }
            });
        }
    }, [isOpen]);

    // Drag handlers for all devices
    const handleMouseDown = (e) => {
        setIsDragging(true);
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        setDragStart({
            x: clientX - position.x,
            y: clientY - position.y
        });
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const newX = clientX - dragStart.x;
        const newY = clientY - dragStart.y;

        // Constrain to viewport (approximate)
        const maxX = window.innerWidth - 60;
        const maxY = window.innerHeight - 60;

        setPosition({
            x: Math.max(-maxX, Math.min(60, newX)),
            y: Math.max(-maxY, Math.min(60, newY))
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('touchmove', handleMouseMove, { passive: false });
            window.addEventListener('touchend', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleMouseMove);
            window.removeEventListener('touchend', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleMouseMove);
            window.removeEventListener('touchend', handleMouseUp);
        };
    }, [isDragging, dragStart, position]);

    return (
        <div
            className="fixed bottom-28 right-4 md:bottom-8 md:right-8 z-50 flex flex-col-reverse items-center gap-3 md:gap-4"
            ref={containerRef}
            style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
                transition: isDragging ? 'none' : 'transform 0.3s ease',
                cursor: isDragging ? 'grabbing' : 'grab'
            }}
        >

            {/* Main Toggle Button */}
            <button
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
                onClick={(e) => {
                    // Only toggle if not dragging
                    if (!isDragging) {
                        setIsOpen(!isOpen);
                    }
                }}
                className={`relative w-12 h-12 md:w-16 md:h-16 rounded-[16px] md:rounded-[24px] shadow-2xl flex items-center justify-center transition-all duration-300 z-20 ${isOpen ? 'bg-slate-800 rotate-90 scale-90' : 'bg-[#25D366] hover:scale-105'} ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                aria-label="Contact Options"
            >
                {/* Pulse Effect only when closed */}
                {!isOpen && (
                    <span className="absolute inset-0 rounded-[16px] md:rounded-[24px] bg-[#25D366] animate-ping opacity-20 duration-1000"></span>
                )}

                {isOpen ? (
                    <X size={22} className="text-white md:size-[28px] transition-all duration-300 pointer-events-none" />
                ) : (
                    <WhatsAppOutlineIcon size={26} className="text-white md:size-[32px] pointer-events-none" />
                )}
            </button>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse gap-3 md:gap-4 pb-2">
                {actions.map((action, index) => (
                    <a
                        key={action.id}
                        href={action.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        ref={el => buttonsRef.current[index] = el}
                        className={`group relative w-11 h-11 md:w-12 md:h-12 rounded-[14px] md:rounded-[18px] shadow-lg flex items-center justify-center text-white transform transition-all hover:scale-110 opacity-0 translate-y-4 ${action.color}`}
                        style={{ display: 'none' }}
                        aria-label={action.label}
                    >
                        {/* Tooltip Label */}
                        <span className="absolute right-full mr-4 bg-slate-900/90 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none backdrop-blur-sm border border-white/10">
                            {action.label}
                        </span>

                        <action.icon size={20} fill="currentColor" className={`md:size-[20px] ${action.id === 'whatsapp' ? 'text-white' : ''}`} />
                    </a>
                ))}
            </div>

        </div>
    );
};

export default WhatsAppButton;
