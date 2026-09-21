// Remy AI Hub — Service Worker
// Doel: hub installeerbaar maken als app + laatst geladen versie tonen zonder internet.
// Cache-strategie: network-first voor index.html (altijd nieuwste proberen),
// met fallback naar cache zodra er geen verbinding is. Icons/manifest: cache-first.

const CACHE_NAAM = 'ai-hub-v4';
const CACHE_BESTANDEN = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './art-skull.jpg',
  './art-skull-wide.jpg',
  './art-creature.jpg',
  './art-city.jpg'
  // Per-onderdeel beelden (art-builder/pipeline/council/dump/planner/lasten/
  // werk/toolkit.jpg) bewust NIET hier: een ontbrekend bestand laat cache.addAll
  // in zijn geheel falen, waardoor de service worker niet installeert. Ze worden
  // bij eerste gebruik alsnog gecachet door de fetch-handler hieronder.
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAAM).then((cache) => cache.addAll(CACHE_BESTANDEN))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((namen) =>
      Promise.all(namen.filter((n) => n !== CACHE_NAAM).map((n) => caches.delete(n)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Alleen GET-requests cachen — POST/PATCH naar Supabase nooit onderscheppen
  if (req.method !== 'GET') return;

  // Supabase-calls en externe API's altijd gewoon naar het netwerk — nooit cachen
  // (anders zie je verouderde weekplanner-data terwijl je wél online bent)
  if (req.url.includes('supabase.co') || req.url.includes('api.anthropic.com') || req.url.includes('open-meteo.com')) {
    return;
  }

  event.respondWith(
    fetch(req)
      .then((response) => {
        // Verse versie ophalen gelukt → cache bijwerken voor de volgende offline-keer
        const clone = response.clone();
        caches.open(CACHE_NAAM).then((cache) => cache.put(req, clone));
        return response;
      })
      .catch(() =>
        // Geen internet → pak wat we laatst hebben opgeslagen
        caches.match(req).then((cached) => cached || caches.match('./index.html'))
      )
  );
});
