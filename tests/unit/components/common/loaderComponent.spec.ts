import { createLocalVue, mount, shallowMount } from '@vue/test-utils'

import LoaderComponent from '@/components/common/LoaderComponent.vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

describe('LoaderComponent.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const vuetify = new Vuetify({})
  let store

  beforeEach(() => {
    const loadingStatusModule = {
      namespaced: true,
      state: {
        isLoading: false
      },
      actions: {
        showLoadingState: jest.fn().mockImplementation(() => {
          loadingStatusModule.state.isLoading = true
        }),
        closeLoadingState: jest.fn().mockImplementation(() => {
          loadingStatusModule.state.isLoading = false
        })
      }
    }

    store = new Vuex.Store({
      strict: false,
      modules: {
        loadingStatus: loadingStatusModule
      }
    })

    jest.resetModules()
    jest.clearAllMocks()
  })

  it('renders component', () => {
    const wrapper = mount(LoaderComponent, {
      store,
      localVue,
      vuetify
    })
    expect(wrapper.find("[data-test='div-loading-container").exists()).toBeFalsy()
  })

  it('show/hide progress', async () => {
    const wrapper: any = mount(LoaderComponent, {
      store,
      localVue,
      vuetify
    })
    expect(wrapper.find("[data-test='div-loading-container").exists()).toBeFalsy()
    expect(wrapper.vm.$store.state.loadingStatus.isLoading).toBeFalsy()
    store.dispatch('loadingStatus/showLoadingState')
    await wrapper.vm.$nextTick()
    expect(wrapper.find("[data-test='div-loading-container").exists()).toBeTruthy()
    expect(wrapper.vm.$store.state.loadingStatus.isLoading).toBeTruthy()
  })
})
