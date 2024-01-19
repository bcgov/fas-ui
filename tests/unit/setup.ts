import Vue from 'vue'
import VueI18n from 'vue-i18n'
import VueRouter from 'vue-router'
import VueTheMask from 'vue-the-mask'
import Vuetify from 'vuetify'
import { config } from '@vue/test-utils'
import { can as vCan } from '@/directives/can'
import { vi } from 'vitest'

Vue.use(VueTheMask)
Vue.use(Vuetify)
Vue.use(VueRouter)
Vue.use(VueI18n)
Vue.directive('can', vCan)

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
