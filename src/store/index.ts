import Vuex, { StoreOptions } from 'vuex'

import { RootState } from './types'
import Vue from 'vue'

Vue.use(Vuex)

const debug = import.meta.env.NODE_ENV !== 'production'

// Note: This is still required for sbc-common-components to work.
const storeOptions: StoreOptions<RootState> = {
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
export default new Vuex.Store<RootState>(storeOptions)
