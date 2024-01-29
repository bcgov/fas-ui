// import Vue from 'vue'
// import VueI18n from 'vue-i18n'
// import VueRouter from 'vue-router'
// import VueTheMask from 'vue-the-mask'
// import Vuetify from 'vuetify'
// import { config } from '@vue/test-utils'
// import { can as vCan } from '@/directives/can'
// import { vi } from 'vitest'

// Vue.use(VueTheMask)
// Vue.use(Vuetify)
// Vue.use(VueRouter)
// Vue.use(VueI18n)
// Vue.directive('can', vCan)

// config.mocks.$t = () => {}

// (global as any).IntersectionObserver = class IntersectionObserver {
//   private observe () {
//     return vi.fn()
//   }

//   private disconnect () {
//     return vi.fn()
//   }

//   private unobserve () {
//     return vi.fn()
//   }
// }

// // Extend vitest with axe matchers
// expect.extend(matchers)

import { createPinia, setActivePinia } from 'pinia'
import { can } from '@/directives/can'
import { config } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { createVuetify } from 'vuetify'
import enLocals from '@/locales/en.json'

import { vi } from 'vitest'

function initializeI18n () {
  const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages: { en: enLocals }
  })
  return i18n
}

const vuetify = createVuetify()
const pinia = createPinia()
setActivePinia(createPinia())

config.global.mocks = {
  $t: (msg) => msg
}

config.global.directives = {
  can: can
}

config.global.plugins = [initializeI18n(), vuetify, pinia]

// Mock & Stub the global ResizeObserver
vi.stubGlobal('ResizeObserver', vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
})))
// Mock & Stub the global IntersectionObserver
vi.stubGlobal('IntersectionObserver', vi.fn(() => ({
  observe: vi.fn(),
  disconnect: vi.fn()
})))
