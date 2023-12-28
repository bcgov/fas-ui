import { createStore } from 'vuex'
import { createPinia } from 'pinia'
import { RootState } from './types'

const debug = import.meta.env.NODE_ENV !== 'production'

// Note: This is still required for sbc-common-components to work.
const vuexStoreOptions = {
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

export const vuexStore = createStore<RootState>(vuexStoreOptions)
export const piniaStore = createPinia()
