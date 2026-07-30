const CACHE_NAME = "lowxxy-ar-v16-canvas-frames";
const APP_SHELL = [
  "./", "./index.html", "./manifest.webmanifest", "./service-worker.js",
  "./icons/icon-192.png", "./icons/icon-512.png", "./icons/lowxxy-logo-white.png",
  ...Array.from({length: 11}, (_, i) => `./assets/frames/sheet-${String(i).padStart(2, "0")}.webp`)
];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(APP_SHELL))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(fetch(e.request).then(r => { const copy=r.clone(); caches.open(CACHE_NAME).then(c=>c.put(e.request,copy)); return r; }).catch(()=>caches.match(e.request)));
});
