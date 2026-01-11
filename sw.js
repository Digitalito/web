const CACHE_NAME = 'digital-cache-v2';
const urlsToCache = [
  './',
  './index.html',
  './css/styles.css',
  './css/menu.css',
  './js/main.js',
  './js/menu.js',
  './js/stars.js',
  './assets/images/icon.png',
  './assets/images/icon-192.png'
];

self.addEventListener('install', event => {
  // Force this new service worker to become the active one, bypassing the waiting state
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  // Claim any clients immediately, so they are controlled by this service worker
  event.waitUntil(clients.claim());

  // Clean up old caches
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  // Navigation requests (HTML pages) -> Network First, then Cache
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match(event.request)
            .then(response => {
              if (response) {
                return response;
              }
              // If not in cache and network fails, show offline page or index?
              // Fallback to index.html if it's a navigation to a known route
              return caches.match('./index.html');
            });
        })
    );
  } else {
    // Static assets (CSS, JS, Images) -> Stale-While-Revalidate
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          const fetchPromise = fetch(event.request).then(networkResponse => {
            // Update the cache with the new version
            if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
               const responseToCache = networkResponse.clone();
               caches.open(CACHE_NAME).then(cache => {
                 cache.put(event.request, responseToCache);
               });
            }
            return networkResponse;
          });
          
          // Return cached response immediately if available, otherwise wait for network
          return cachedResponse || fetchPromise;
        })
    );
  }
});