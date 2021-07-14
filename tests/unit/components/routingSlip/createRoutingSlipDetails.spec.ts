import { createLocalVue, shallowMount } from '@vue/test-utils'

import { CreateRoutingSlipDetails } from '@/components/RoutingSlip'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

describe('CreateRoutingSlipDetails.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  localVue.use(Vuetify)
  let store
  const MyStub = {
    template: '<div />'
  }

  beforeEach(() => {
    const routingSlipModule = {
      namespaced: true,
      state: {
        routingSlipDetails: {},
        accountInfo: {}
      },
      action: {
        checkRoutingNumber: jest.fn()
      },
      mutations: {
        setRoutingSlipDetails: jest.fn(),
        setAccountInfo: jest.fn()
      }
    }

    store = new Vuex.Store({
      strict: false,
      modules: {
        routingSlip: routingSlipModule
      }
    })

    jest.resetModules()
    jest.clearAllMocks()
  })

  it('renders component', () => {
    const wrapper = shallowMount(CreateRoutingSlipDetails, {
      store
    })
    expect(wrapper.find('p').exists()).toBeTruthy()
    expect(wrapper.find('p').text()).toBe('Routing slip')
    expect(wrapper.find("[data-test='txtNumberId']").exists()).toBeTruthy()
    expect(wrapper.find("[data-test='txtAccountName']").exists()).toBeTruthy()
    expect(wrapper.find("[data-test='txtRoutingSlipDate']").exists()).toBeTruthy()
  })
})
