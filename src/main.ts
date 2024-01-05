/* eslint-disable */

import '@mdi/font/css/materialdesignicons.min.css' // icon library (https://materialdesignicons.com/)
import './shims-vue-composition-api'

import App from './App.vue'
import CommonUtils from '@/util/common-util'
import ConfigHelper from '@/util/config-helper'
import KeyCloakService from 'sbc-common-components/src/services/keycloak.services'
import { createApp } from 'vue'
import VueSanitize from 'vue-sanitize-directive'
import Vuelidate from 'vuelidate'
import can from '@/directives/can'
import initializeI18n from './plugins/i18n'
import router from './router'
import { piniaStore } from './store'
import vuetify from './plugins/vuetify'

/**
 * The server side configs are necessary for app to work , since they are reference in templates and all
 */
ConfigHelper.saveConfigToSessionStorage().then(async () => {
  // addressCompleteKey is for canada post address lookup, which is to be used in sbc-common-components
  (<any>window).addressCompleteKey = ConfigHelper.getAddressCompleteKey()
  await syncSession()
  renderVue()
})

async function syncSession () {
  const keycloakConfig: any = {
    url: `${ConfigHelper.getKeycloakAuthUrl()}`,
    realm: `${ConfigHelper.getKeycloakRealm()}`,
    clientId: `${ConfigHelper.getKeycloakClientId()}`
  }

  await KeyCloakService.setKeycloakConfigUrl(keycloakConfig)

  // Initialize the token to force login the user
  if (!CommonUtils.isSigningIn() && !CommonUtils.isSigningOut()) {
    await KeyCloakService.initializeToken(null, true, true).then(() => {}).catch(err => {
      if (err?.message !== 'NOT_AUTHENTICATED') {
        throw err
      }
    })
  }
}

// in Vite, it need to manually include Workbox in service worker.
function registerServiceWorker() {
  if ('serviceWorker' in navigator && import.meta.env.NODE_ENV === 'production') {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}service-worker.js`)
      .then(registration => {
        registration.onupdatefound = () => {
          const installingWorker = registration.installing
          installingWorker.onstatechange = () => {
            switch (installingWorker.state) {
              case 'installed':
                if (navigator.serviceWorker.controller) {
                  console.log('New content is available; please refresh.')
                } else {
                  console.log('Content is cached for offline use.')
                }
                break
              case 'redundant':
                console.error('The installing service worker became redundant.')
                break
            }
          };
          console.log('New content is downloading.')
        };
        console.log('Service worker has been registered.')
      })
      .catch(error => {
        console.error('Error during service worker registration:', error)
      })
  }

  // Check if the app is offline
  if (!navigator.onLine) {
    console.log('No internet connection found. App is running in offline mode.')
  }
}

function renderVue () {
  const app = createApp(App)
  app.use(router)
  app.use(piniaStore)
  app.use(vuetify)
  app.use(initializeI18n())
  app.use(VueSanitize)
  app.directive('can', can)
  app.mount('#app')
  registerServiceWorker()
}
