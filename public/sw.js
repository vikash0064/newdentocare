// Minimal Service Worker for PWA Installability
const CACHE_NAME = 'dentocare-v1';

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
    // Basic Passthrough for network-first/online-only
    // Required for "Installable" status in Chrome/Lighthouse
    event.respondWith(fetch(event.request).catch(() => {
        return caches.match(event.request);
    }));
});
