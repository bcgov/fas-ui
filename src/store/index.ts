import Vuex, { StoreOptions } from 'vuex'

import { RootState } from './types'
import Vue from 'vue'
import codes from '@/store/modules/codes'
import loadingStatus from '@/store/modules/loadingStatus'
import routingSlip from '@/store/modules/routingSlip'

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
    loadingStatus,
    codes
  }
}

export default new Vuex.Store<RootState>(storeOptions)
