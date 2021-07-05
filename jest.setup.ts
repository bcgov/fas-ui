import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

Vue.use(Vuetify)
Vue.use(Vuex);

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
