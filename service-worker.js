const CACHE_NAME = 'lowxxy-ar-v25-multi-fixed';
const APP_FILES = [
  './',
  './index.html',
  './manifest.webmanifest?v=25',
  './icons/lowxxy-character-192.png?v=25',
  './icons/lowxxy-character-512.png?v=25',
  './icons/lowxxy-logo-white.png',
  './assets/grounded-gains.mind?v=25',
  './assets/Lowxxy_AR_Scaled.glb?v=25',
  './assets/grounded-gains.glb?v=25'
];
self.addEventListener('install', event => { self.skipWaiting(); event.waitUntil(caches.open(CACHE_NAME).then(async cache => { await Promise.allSettled(APP_FILES.map(file => cache.add(file))); })); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).then(response => { const copy=response.clone(); caches.open(CACHE_NAME).then(cache => cache.put('./index.html', copy)); return response; }).catch(() => caches.match('./index.html')));
    return;
  }
  event.respondWith(caches.match(request).then(cached => {
    const network = fetch(request).then(response => { if (response && response.status === 200 && request.url.startsWith(self.location.origin)) { const copy=response.clone(); caches.open(CACHE_NAME).then(cache => cache.put(request, copy)); } return response; }).catch(() => cached);
    return cached || network;
  }));
});
