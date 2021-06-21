// /// <reference no-default-lib="true"/>
// /// <reference lib="es2015" />
// /// <reference lib="webworker" />

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// const sw: ServiceWorkerGlobalScope & typeof globalThis = self as any;

// /**
//  * Cache files on install
//  */
// sw.addEventListener('install', (event) => {
//   event.waitUntil(async () => {
//     const cache = await caches.open('v1');
//     cache.addAll(['/index.html', '/tailwind.css', '/bundle.js']);
//   });
// });

// sw.addEventListener
// /**
//  * Delete outdated caches when activated
//  */
// sw.addEventListener('activate', (event) => {
//   sw.clients.claim();

//   event.waitUntil(async () => {
//     const cacheKeys = await caches.keys();
//     const clearCaches = cacheKeys.map(async (cache) => {
//       if (cache !== 'v1') {
//         await caches.delete(cache);
//       }
//     });

//     Promise.all(clearCaches);
//   });
// });

// /**
//  * Reply with cached data when possible
//  */
// sw.addEventListener('fetch', async (event) => {
//   if (event.request.method !== 'GET') {
//     return;
//   }

//   const cachedResponse = await caches.match(event.request, {
//     ignoreSearch: true,
//   });

//   event.respondWith(cachedResponse || fetch(event.request));
// });
