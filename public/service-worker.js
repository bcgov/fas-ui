/* eslint-disable no-undef */
// Import Workbox from a CDN, Since this file is in the public folder and not processed by Vite
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js')

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
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CURRENT_CACHE) {
            return caches.delete(cacheName)
          }
        })
      )
    }).then(() => {
      self.clients.claim()
    })
  )
})
