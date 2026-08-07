const CACHE_NAME = 'lowxxy-ar-v228-finishing-touches';
const APP_SHELL = [
  './', './index.html?v=228', './selfie.html?v=228', './collection.html?v=228', './preview.html?v=228', './manifest.webmanifest?v=228',
  './assets/targets.mind?v=228', './assets/chainmail.glb?v=228',
  './assets/grounded-gains.glb?v=228', './assets/hang-v77.glb?v=228',
  './assets/pop-art.glb?v=228', './assets/lowxxy-shoulder.glb?v=228',
  './assets/chainmail.webp', './assets/popart.webp',
  './assets/grounded-gains.webp', './assets/hang.webp',
  './assets/royal-script.webp', './assets/crown-column.webp',
  './assets/double-vision.webp',
  './assets/lowxxy-wordmark.png?v=228',
  './assets/lowxxy-crown.png?v=228',
  './icons/lowxxy-character-192.png?v=228', './icons/lowxxy-character-512.png?v=228'
];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim())));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(fetch(event.request).then(response => {
    if (response && response.ok) caches.open(CACHE_NAME).then(cache => cache.put(event.request, response.clone()));
    return response;
  }).catch(() => caches.match(event.request).then(hit => hit || caches.match('./index.html?v=228'))));
});
