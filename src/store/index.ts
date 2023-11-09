import Vuex, { StoreOptions } from 'vuex'

import { RootState } from './types'
import Vue from 'vue'
import { PiniaVuePlugin, createPinia } from 'pinia'

Vue.use(Vuex)

const debug = import.meta.env.NODE_ENV !== 'production'

// Note: This is still required for sbc-common-components to work.
const vuexStore: StoreOptions<RootState> = {
  strict: debug,
  state: () => ({
    refreshKey: 0,
    loading: true
  }),
  getters: {
    loading: (state) => state.loading
  },
  mutations: {
    updateHeader (state) {
      state.refreshKey++
    },
    loadComplete (state) {
      state.loading = false
    }
  },
  modules: {
  }
}
export const getVuexStore = new Vuex.Store<RootState>(vuexStore)

/**
 * Configures and returns Pinia Store.
 */
export function getPiniaStore () {
  Vue.use(PiniaVuePlugin)

  return createPinia()
}
