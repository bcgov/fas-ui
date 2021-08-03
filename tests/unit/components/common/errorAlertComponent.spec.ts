import { createLocalVue, mount } from '@vue/test-utils'

import ErrorAlertComponent from '@/components/common/ErrorAlertComponent.vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

describe('ErrorAlertComponent.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const vuetify = new Vuetify({})
  let store

  beforeEach(() => {
    const indicatorModule = {
      namespaced: true,
      state: {
        hasCallFailed: false
      },
      mutations: {
        setHasCallFailed: jest.fn().mockImplementation(() => {
          indicatorModule.state.hasCallFailed = true
        })
      }
    }
    store = new Vuex.Store({
      strict: false,
      modules: {
        indicator: indicatorModule
      }
    })
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('renders component', async () => {
    const wrapper = mount(ErrorAlertComponent, {
      localVue,
      vuetify,
      store
    })
    expect(wrapper.find("[data-test='alert-error-alert']").exists()).toBeFalsy()
    store.commit('indicator/setHasCallFailed')
    await wrapper.vm.$nextTick()
    expect(wrapper.find("[data-test='alert-error-alert']").exists()).toBeTruthy()
  })
})
