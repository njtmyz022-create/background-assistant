const C="bga-v2",F=["./","index.html","manifest.json","icon.svg"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(F)))});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x))))));
self.addEventListener("fetch",e=>{if(e.request.method!=="GET"||new URL(e.request.url).origin!==location.origin)return;
 e.respondWith(caches.match(e.request).then(m=>{const n=fetch(e.request).then(r=>{caches.open(C).then(c=>c.put(e.request,r.clone()));return r}).catch(()=>m);return m||n}))});
