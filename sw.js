!function(){"use strict";function e(e,n){return caches.keys().then(function(t){t.forEach(function(t){var s=0===t.indexOf(e),a=t!==n;s&&a&&caches.delete(t)})})}self.addEventListener("install",function(e){return self.skipWaiting()}),self.addEventListener("activate",function(e){return self.clients.claim()});var n=["assets/running-log-aed3d0fa23afd791de737b1eabf141ac.js","assets/running-log-af6c568ea8b2ea1e3f56338e7511a4ab.css","assets/vendor-045a666e4a8dd115ef4b919501a15212.css","assets/vendor-4b5bc45fa9cfc6d825b0954b3634834b.js"],t=void 0,s="1",a="esw-asset-cache",i=a+"-"+s,c=n.map(function(e){return new URL(e,t||self.location).toString()}),r=function(){caches.open(i).then(function(e){return e.keys().then(function(n){n.forEach(function(n){c.indexOf(n.url)===-1&&e.delete(n)})})})};self.addEventListener("install",function(e){e.waitUntil(caches.open(i).then(function(e){return e.addAll(c)}))}),self.addEventListener("activate",function(n){n.waitUntil(Promise.all([e(a,i),r()]))}),self.addEventListener("fetch",function(e){var n="GET"===e.request.method,t=c.indexOf(e.request.url)!==-1;n&&t&&e.respondWith(caches.match(e.request,{cacheName:i}))});var f="4",o=["/","(.+)index.html(.+)","/(.+)assets(.+)","https://lexro.github.io/running-log/","https://fonts.googleapis.com/css(.+)"],u="esw-cache-first",l=u+"-"+f,d=o.map(function(e){var n=new URL(e,self.location).toString();return new RegExp("^"+n+"$")}),h=function(e){return!!d.find(function(n){return n.test(e)})};self.addEventListener("fetch",function(e){var n=e.request;"GET"===n.method&&/^https?/.test(n.url)&&h(n.url)&&e.respondWith(caches.open(l).then(function(e){return e.match(n).then(function(t){return t?t:fetch(n).then(function(t){return e.put(n,t.clone()),t})})}))}),self.addEventListener("activate",function(n){n.waitUntil(e(u,l))})}();