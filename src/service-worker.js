/* eslint-disable no-undef */

workbox.core.setCacheNameDetails({ prefix: 'fas' })

// Precache manifest
self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.suppressWarnings && workbox.precaching.suppressWarnings()
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

// Skip waiting on install
self.addEventListener('install', function (e) {
  self.skipWaiting()
})

// Unregister and reload on activation
self.addEventListener('activate', function (e) {
  self.registration.unregister()
    .then(function () {
      return self.clients.matchAll()
    })
    .then(function (clients) {
      clients.forEach(client => client.navigate(client.url))
    })
})
