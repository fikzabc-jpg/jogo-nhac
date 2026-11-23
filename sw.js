const V = "nhac-v6";
const BASE = ["./", "index.html", "manifest.json", "icon-180.png", "icon-192.png", "icon-512.png", "fotos/cachorro.jpg", "fotos/gato.jpg", "fotos/ovelha.jpg", "fotos/pato.jpg", "fotos/porco.jpg", "fotos/vaca.jpg", "img/arca.webp", "img/arcoiris.webp", "img/arvore.webp", "img/b-cachorro.webp", "img/b-gato.webp", "img/b-ovelha.webp", "img/b-pato.webp", "img/b-porco.webp", "img/b-vaca.webp", "img/biblia.webp", "img/coracao.webp", "img/estrela.webp", "img/jonas-barco.webp", "img/jonas.webp", "img/lua.webp", "img/menino.webp", "img/moita.webp", "img/nhac-come.webp", "img/nhac-dorme.webp", "img/nhac.webp", "img/passaro.webp", "img/pedra.webp", "img/peixao-aberto.webp", "img/peixao.webp", "img/peixe.webp", "img/rato-dorme.webp", "img/rato.webp", "img/sol.webp"];
self.addEventListener("install", e => { e.waitUntil(caches.open(V).then(c => c.addAll(BASE)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request).then(r => { const copia = r.clone(); caches.open(V).then(c => c.put(e.request, copia)); return r; })
      .catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match("index.html")))
  );
});
