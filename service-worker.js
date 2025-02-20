const CACHE_NAME = "pixelflip-cache-v1";

const urlsToCache = [
    "/PixelFlip/index.html",
    "/PixelFlip/src/css/styles.css",
    "/PixelFlip/src/css/effects.css",
    "/PixelFlip/src/js/script.js",
    "/PixelFlip/src/images/background.jpg",
    "/PixelFlip/public/assets/Pixel-Flip-192.png",
    "/PixelFlip/public/assets/Pixel-Flip-512.png",
    "/PixelFlip/public/assets/favicon.ico",
];

// Install the service worker
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        }).catch((error) => {
            console.error("Failed to cache", error);
        })
    );
});

// Fetch from cache when offline
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request, {mode: "no-cors"});
        }).catch((error) => {
            console.error("Fetch failed:", error);
        })
    );
});
