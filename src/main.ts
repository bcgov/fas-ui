/* eslint-disable */
import '@mdi/font/css/materialdesignicons.min.css' // icon library (https://materialdesignicons.com/)
import 'core-js/stable' // to polyfill ECMAScript features
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import KeyCloakService from 'sbc-common-components/src/services/keycloak.services'
import VueCompositionAPI from '@vue/composition-api'
import ConfigHelper from '@/util/config-helper'
import i18n from './plugins/i18n'

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
}

function renderVue () {
  new Vue({
    router,
    store,
    vuetify,
    i18n,
    render: h => h(App)
  }).$mount('#app')
}
