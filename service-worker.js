const CACHE_NAME = 'lowxxy-ar-v212-ui-refresh';
const APP_SHELL = [
  './', './index.html?v=212', './selfie.html?v=212', './collection.html?v=212', './manifest.webmanifest?v=212',
  './assets/targets.mind?v=212', './assets/chainmail.glb?v=212',
  './assets/grounded-gains.glb?v=212', './assets/hang-v77.glb?v=212',
  './assets/pop-art.glb?v=212', './assets/lowxxy-shoulder.glb?v=212',
  './assets/chainmail.webp', './assets/popart.webp',
  './assets/grounded-gains.webp', './assets/hang.webp',
  './assets/royal-script.webp', './assets/crown-column.webp',
  './assets/double-vision.webp',
  './icons/lowxxy-character-192.png?v=212', './icons/lowxxy-character-512.png?v=212'
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
  }).catch(() => caches.match(event.request).then(hit => hit || caches.match('./index.html?v=212'))));
});
