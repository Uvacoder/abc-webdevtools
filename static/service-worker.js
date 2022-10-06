//@ts-check
/// <reference lib="WebWorker" />

/** @type {ServiceWorkerGlobalScope}*/
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const worker = self;

const cacheName = "cache-v0.0.1";

worker.addEventListener("install", () => {
  worker.skipWaiting();
});

worker.addEventListener("activate", async () => {
  const cache = await caches.open(cacheName);
  cache.addAll(["/", "/offline"]);
  worker.clients.claim();
});

worker.addEventListener("fetch", async (ev) => {
  const responder = async () => {
    if (ev.request.method !== "GET") {
      return await fetch(ev.request);
    } else {
      const cache = await caches.open(cacheName);
      const cachedResponse = await cache.match(ev.request);
      const networkRequest = fetch(ev.request).catch((e) => {
        console.info("Failed Fetch", e);
      });

      ev.waitUntil(
        (async () => {
          const networkResponse = await networkRequest;
          if (!networkResponse) return;
          await cache.put(ev.request, networkResponse.clone());
        })(),
      );

      if (!cachedResponse) {
        return (
          (await networkRequest) ||
          (await cache.match("/offline")) ||
          new Response("You Are Offline", { status: 404 })
        );
      } else {
        return cachedResponse;
      }
    }
  };
  ev.respondWith(responder());
});
