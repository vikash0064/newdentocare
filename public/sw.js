// Minimal Service Worker for PWA Installability
const CACHE_NAME = 'dentocare-v1';

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Skip intercepting Google Analytics and other 3rd party external scripts
    // This avoids breaking analytics if the SW has issues or network is unstable
    if (url.hostname.includes('google-analytics') || url.hostname.includes('googletagmanager')) {
        return;
    }

    event.respondWith(
        fetch(event.request).catch(async () => {
            const cacheResponse = await caches.match(event.request);
            if (cacheResponse) return cacheResponse;

            // If it's a navigation request and we're offline, return index.html
            if (event.request.mode === 'navigate') {
                return caches.match('/index.html');
            }

            return null; // Let the browser handle the network error naturally
        })
    );
});
