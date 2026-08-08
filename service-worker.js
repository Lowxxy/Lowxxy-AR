const CACHE_NAME = 'lowxxy-ar-v269-pwa-intro-photo';
const APP_SHELL = [
  './',
  './index.html?v=269',
  './manifest.webmanifest?v=269',
  './assets/targets.mind',
  './assets/chainmail.glb',
  './assets/grounded-gains.glb',
  './assets/hang-v77.glb',
  './assets/pop-art.glb',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/lowxxy-character-192.png?v=269',
  './icons/lowxxy-character-512.png?v=269',
  './icons/lowxxy-logo-white.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(() =>
        caches.match(event.request)
          .then(hit => hit || caches.match('./index.html?v=269') || caches.match('./index.html'))
      )
  );
});
