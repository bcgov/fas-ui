/* eslint-disable */

import '@mdi/font/css/materialdesignicons.min.css' // icon library (https://materialdesignicons.com/)
import 'core-js/stable' // to polyfill ECMAScript features
import './registerServiceWorker'

import App from './App.vue'
import CommonUtils from '@/util/common-util'
import ConfigHelper from '@/util/config-helper'
import KeyCloakService from 'sbc-common-components/src/services/keycloak.services'
import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import can from '@/directives/can'
import i18n from './plugins/i18n'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.use(VueCompositionAPI)

/**
 * The server side configs are necessary for app to work , since they are reference in templates and all
 */
ConfigHelper.saveConfigToSessionStorage().then(async () => {
  await syncSession()
  renderVue()
})

async function syncSession () {
  const random = new Date().toISOString().substring(0, 10)
  KeyCloakService.setKeycloakConfigUrl(`${process.env.VUE_APP_PATH}config/kc/keycloak.json?${random}`)
  // Initialize the token to force login the user
  if (!CommonUtils.isSigningIn() && !CommonUtils.isSigningOut()) {
    await KeyCloakService.initializeToken(null, true, true).then(() => {}).catch(err => {
      if (err?.message !== 'NOT_AUTHENTICATED') {
        throw err
      }
    })
  }
}

function renderVue () {
  new Vue({
    router,
    store,
    vuetify,
    i18n,
    render: h => h(App)
  }).$mount('#app')
  Vue.directive('can', can)
}
