const staticCacheName = "site-static-v1";
const dynamicCache = "site-dynamic-v1";
const assets = [
    "/",
    "/index.html",
    "/node_modules",
    "/src/style.css",
    "/src/index.js",
    "/src/main.js",
    "/src/header.js",
    "/src/main/countriesList.js",
    "/src/main/detail.js",
    "/src/main/search.js",
    "/images/icons/manifest-icon-512.png",
    "/images/icons/manifest-icon-192.png",
    "https://restcountries.eu/rest/v2/all",
    "https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;600;800&display=swap"
];

self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(staticCacheName).then(cache => {
            return cache.addAll(assets);
        })
    );
});


self.addEventListener("activate", (e) => {
    e.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key != staticCacheName)
                .map(key => caches.delete(key)));
        })
    );
});


self.addEventListener("fetch", (e) => {
    e.respondWith(
        // static fetch 
        caches.match(e.request).then(response => {
            return response || fetch(e.request).then(fetchRes => {
                // dynamic fetch 
                return caches.open(dynamicCache).then(cache => {
                    cache.put(e.request.url, fetchRes.clone());
                    return fetchRes;
                })
            });
        })
    );
});

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());