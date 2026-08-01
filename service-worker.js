const CACHE_NAME = 'lowxxy-ar-clean-v200';
const APP_SHELL = [
  './', './index.html?v=200', './selfie.html?v=200', './manifest.webmanifest',
  './assets/targets.mind?v=200', './assets/chainmail.glb?v=200',
  './assets/grounded-gains.glb?v=200', './assets/hang-v77.glb?v=200',
  './assets/pop-art.glb?v=200', './assets/lowxxy-shoulder.glb?v=200',
  './icons/lowxxy-character-192.png?v=200', './icons/lowxxy-character-512.png?v=200'
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
  }).catch(() => caches.match(event.request).then(hit => hit || caches.match('./index.html?v=200'))));
});
