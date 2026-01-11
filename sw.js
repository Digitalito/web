const CACHE_NAME = 'digital-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './contacto',
  './eventos-y-colaboraciones',
  './portafolio',
  './terms-of-service',
  './css/styles.css',
  './css/menu.css',
  './js/main.js',
  './js/menu.js',
  './js/stars.js',
  './assets/images/icon.png',
  './assets/images/icon-192.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});