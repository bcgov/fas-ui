/* eslint-disable no-undef */
// Kill the service worker.
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

self.addEventListener('activate', function (e) {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
      for (const registration of registrations) {
        registration.unregister()
      }
    })
  }
  caches.keys()
    .then(function (keyList) {
      return Promise.all(keyList.map(function(key) {
        return caches.delete(key)
      }))
    })
})
