/// <reference lib="WebWorker" />
export declare const self: ServiceWorkerGlobalScope;

const cacheName = "cache-v0.0.2";

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", async () => {
  const cache = await caches.open(cacheName);
  cache.addAll(["/", "/offline"]);
  self.clients.claim();
});

self.addEventListener("fetch", async (ev) => {
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
