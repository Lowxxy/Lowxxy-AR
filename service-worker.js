const CACHE_NAME = 'lowxxy-ar-v236-github-cache-fix';
const ASSET_CACHE = [
  './assets/targets.mind?v=236',
  './assets/chainmail.glb?v=236',
  './assets/grounded-gains.glb?v=236',
  './assets/hang-v77.glb?v=236',
  './assets/pop-art.glb?v=236',
  './assets/lowxxy-shoulder.glb?v=236',
  './assets/chainmail.webp', './assets/popart.webp',
  './assets/grounded-gains.webp', './assets/hang.webp',
  './assets/royal-script.webp', './assets/crown-column.webp',
  './assets/double-vision.webp',
  './assets/lowxxy-wordmark.png?v=236',
  './assets/lowxxy-crown.png?v=236',
  './icons/lowxxy-character-192.png?v=236',
  './icons/lowxxy-character-512.png?v=236'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSET_CACHE))
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

  const isHtmlNavigation = event.request.mode === 'navigate' ||
    url.pathname.endsWith('.html') ||
    url.pathname.endsWith('/Lowxxy-AR/') ||
    url.pathname.endsWith('/Lowxxy-AR');

  if (isHtmlNavigation) {
    event.respondWith(
      fetch(event.request, { cache: 'reload' })
        .then(response => response)
        .catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response && response.ok) {
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, response.clone()));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
