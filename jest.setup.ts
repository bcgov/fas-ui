import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import VueCompositionApi from '@vue/composition-api'

Vue.use(VueCompositionApi)

Vue.use(Vuetify)
Vue.use(Vuex)
Vue.use(VueRouter);

(global as any).IntersectionObserver = class IntersectionObserver {
  private observe () {
    return jest.fn()
  }

  private disconnect () {
    return jest.fn()
  }

  private unobserve () {
    return jest.fn()
  }
}
