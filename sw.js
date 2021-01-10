const staticCacheName = "site-static-v1";
const dynamicCache = "site-dynamic-v1";
const assets = [
    "/",
    "/index.html",
    "/manifest.json",
    "/src/style.css",
    "/src/index.js",
    "/src/main.js",
    "/src/header.js",
    "/src/offline.html",
    "/src/main/countriesList.js",
    "/src/main/detail.js",
    "/src/main/search.js",
    "/images/icons/manifest-icon-512.png",
    "/images/icons/manifest-icon-192.png",
    "/images/favicon-32x32.png",
    "https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;600;800&display=swap"
];
// cache size limit;
const limitCacheSize = (name,size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            let imgs = keys.filter(a => a.url.includes("/data/")).map(a => keys.indexOf(a));
            if(keys.length > size && imgs.length > 0){
                console.log(keys[imgs[0]])
                cache.delete(keys[imgs[0]]).then(limitCacheSize(name,size));
            }
            else if(keys.length > size){
                cache.delete(keys[0]).then(limitCacheSize(name,size));
            }
        })
    })
};


self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(staticCacheName).then(cache => {
            return cache.addAll(assets);
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
                    limitCacheSize(dynamicCache, 40);
                    return fetchRes;
                })
            });
        }).catch(() => caches.match('/src/offline.html'))
        // {
        //     if(e.request.url.indexOf('.html') > -1 || e.request.url.indexOf('.js') > -1){
        //         return 
        //     } 
        // })
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




self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());