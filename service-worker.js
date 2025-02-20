const CACHE_NAME = "pixelflip-cache-v1";

const urlsToCache = [
    "/aabhade/PixelFlip/index.html",
    "/aabhade/PixelFlip/src/css/styles.css",
    "/aabhade/PixelFlip/src/css/effects.css",
    "/aabhade/PixelFlip/src/js/script.js",
    "/aabhade/PixelFlip/src/images/background.jpg",
    "/aabhade/PixelFlip/public/assets/Pixel-Flip-192.png",
    "/aabhade/PixelFlip/public/assets/Pixel-Flip-512.png",
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