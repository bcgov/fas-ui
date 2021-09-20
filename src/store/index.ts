import Vuex, { StoreOptions } from 'vuex'

import { RootState } from './types'
import Vue from 'vue'
import codes from '@fas/store/modules/codes'
import indicator from '@fas/store/modules/indicator'
import routingSlip from '@fas/store/modules/routingSlip'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

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
    routingSlip,
    indicator,
    fasCodes: codes
  }
}
export const store = new Vuex.Store<RootState>(storeOptions)
export default store
