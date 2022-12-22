import { precacheAndRoute } from 'workbox-precaching'
declare let self: ServiceWorkerGlobalScope
// @ts-ignore
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') { // @ts-ignore
    self.skipWaiting()
  }
})
// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST)
