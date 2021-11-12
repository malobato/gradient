const CACHE_NAME = "v1_cache_gradient";
const urlsToCache = [
    "./",
    "./?umt_source=web_app_manifest",
    "./pages/fallback.html",
    "./images/favicon.png",
    "./images/gradient32.png",
    "./images/gradient64.png",
    "./images/gradient128.png",
    "./images/maskable.png",
    "./images/gradient192.png",
    "./images/gradient256.png",
    "./images/gradient512.png",
    "./images/gradient1024.png",
    "./js/main.js",
    "./js/mountApp.js",
    "./css/style.css",
    "./manifest.json",
    "https://unpkg.com/vue@next",
    "https://fonts.googleapis.com/css2?family=Roboto&display=swap",
    "https://fonts.googleapis.com/css2?family=Dancing+Script&family=Roboto&display=swap"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) =>
            cache
                .addAll(urlsToCache)
                .then(() => self.skipWaiting())
                .catch((error) => console.error(error))
        )
    );
});

self.addEventListener("activate", event => {
    const cacheWhiteList = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then(
            cacheNames => {
                console.log(cacheNames);
                return Promise.all(
                    cacheNames.map(
                        cacheName => {
                            if (cacheWhiteList.indexOf(cacheName) === -1) {
                                return caches.delete(cacheName);
                            }
                        }
                    )
                )
            }
        ).then(
            () => self.clients.claim()
        )
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(
            response => {
                if (response) {
                    return response;
                }

                return fetch(event.request);
            }
        )
        .catch(
            () => caches.match("./pages/fallback.html")
        )
    )
});
