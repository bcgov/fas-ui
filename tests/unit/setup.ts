import Vue from 'vue'
import VueRouter from 'vue-router'
import VueTheMask from 'vue-the-mask'
import Vuex from 'vuex'
import VueI18n from 'vue-i18n'
import can from '@/directives/can'
import VueCompositionApi from '@vue/composition-api'
import Vuetify from 'vuetify'
import { config } from '@vue/test-utils'
import { vi } from 'vitest'

Vue.use(VueCompositionApi)
Vue.use(VueTheMask)
Vue.use(Vuex)
Vue.use(Vuetify)
Vue.use(VueRouter)
Vue.use(VueI18n)
Vue.directive('can', can)

config.mocks.$t = () => {}

(global as any).IntersectionObserver = class IntersectionObserver {
  private observe () {
    return vi.fn()
  }

  private disconnect () {
    return vi.fn()
  }

  private unobserve () {
    return vi.fn()
  }
}
