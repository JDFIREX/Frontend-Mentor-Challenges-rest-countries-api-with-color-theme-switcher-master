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
    "/node_modules/gsap/all.js",
    "/node_modules/gsap/gsap-core.js",
    "/node_modules/gsap/CSSPlugin.js",
    "/node_modules/gsap/Draggable.js",
    "/node_modules/gsap/CSSRulePlugin.js",
    "/node_modules/gsap/EaselPlugin.js",
    "/node_modules/gsap/EasePack.js",
    "/node_modules/gsap/MotionPathPlugin.js",
    "/node_modules/gsap/PixiPlugin.js",
    "/node_modules/gsap/ScrollToPlugin.js",
    "/node_modules/gsap/ScrollTrigger.js",
    "/node_modules/gsap/TextPlugin.js",
    "/node_modules/gsap/utils/matrix.js",
    "/node_modules/gsap/utils/paths.js",
    "/node_modules/gsap/utils/strings.js",
    "https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;600;800&display=swap"
];
self.addEventListener("install", () => self.skipWaiting())
self.addEventListener("activate",() => self.clients.claim())

// cache size limit;
const limitCacheSize = (name,size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            let imgs = keys.filter(a => a.url.includes("/data/")).map(a => keys.indexOf(a));
            if(keys.length > size && imgs.length > 0){
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
        }).catch(() => {
            if(e.request.url.indexOf('.html') > -1){
                return caches.match('/src/offline.html');
            } ;
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
