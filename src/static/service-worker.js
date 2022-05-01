window.self.addEventListener("install", function (event) {
    console.log("[Service Worker] Installing Service Worker.....", event);
  });
  
  window.self.addEventListener("activate", function (event) {
    console.log("[Service Worker] Activating Service Worker.....", event);
    return window.self.clients.claim();
  });
  
  window.self.addEventListener("fetch", function (event) {
    console.log("[Service Worker] Fetch initiated.....", event);
    event.respondWith(fetch(event.request));
  });
  