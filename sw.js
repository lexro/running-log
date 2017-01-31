(function () {
  'use strict';

  self.addEventListener('install', function installEventListenerCallback(event) {
    return self.skipWaiting();
  });

  self.addEventListener('activate', function installEventListenerCallback(event) {
    return self.clients.claim();
  });

  var VERSION$1 = '2';
  var PATTERNS = ['/assets/(.+)', 'https://fonts.googleapis.com/css?family=Roboto:400,700'];

  /*
   * Deletes all caches that start with the `prefix`, except for the
   * cache defined by `currentCache`
   */
  function cleanupCaches (prefix, currentCache) {
    return caches.keys().then(function (cacheNames) {
      cacheNames.forEach(function (cacheName) {
        var isOwnCache = cacheName.indexOf(prefix) === 0;
        var isNotCurrentCache = cacheName !== currentCache;

        if (isOwnCache && isNotCurrentCache) {
          caches["delete"](cacheName);
        }
      });
    });
  }

  var CACHE_KEY_PREFIX = 'esw-cache-first';
  var CACHE_NAME = CACHE_KEY_PREFIX + '-' + VERSION$1;

  var PATTERN_REGEX = PATTERNS.map(function (pattern) {
    var normalized = new URL(pattern, self.location).toString();
    return new RegExp('^' + normalized + '$');
  });

  var MATCH = function MATCH(key) {
    return !!PATTERN_REGEX.find(function (pattern) {
      return pattern.test(key);
    });
  };

  self.addEventListener('fetch', function (event) {
    var request = event.request;
    if (request.method !== 'GET' || !/^https?/.test(request.url)) {
      return;
    }

    if (MATCH(request.url)) {
      event.respondWith(caches.open(CACHE_NAME).then(function (cache) {
        return cache.match(request).then(function (response) {
          if (response) {
            return response;
          }

          return fetch(request).then(function (response) {
            cache.put(request, response.clone());
            return response;
          });
        });
      }));
    }
  });

  self.addEventListener('activate', function (event) {
    event.waitUntil(cleanupCaches(CACHE_KEY_PREFIX, CACHE_NAME));
  });

}());