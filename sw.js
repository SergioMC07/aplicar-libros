// Permite abrir la app sin conexión. Si cambias archivos, sube el número de versión.
const VERSION = "aplicar-libros-v1";
const ARCHIVOS = [
  "./", "index.html", "estilos.css", "manifest.json",
  "datos/carnegie.js", "datos/citas.js",
  "app/almacen.js", "app/futuro.js", "app/app.js",
  "iconos/icono-180.png", "iconos/icono-192.png", "iconos/icono-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ARCHIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(claves => Promise.all(claves.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// Primero intenta internet (para recibir mejoras); si no hay, usa la copia guardada
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request)
      .then(r => { const copia = r.clone(); caches.open(VERSION).then(c => c.put(e.request, copia)); return r; })
      .catch(() => caches.match(e.request))
  );
});
