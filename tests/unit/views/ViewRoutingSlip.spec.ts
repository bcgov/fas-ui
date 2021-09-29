
import ViewRoutingSlip from '@/views/ViewRoutingSlip.vue'
import { RoutingSlipInfo, PaymentInformation } from '@/components/ViewRoutingSlip'

import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { routingSlip } from './../test-data/mock-routing-slip'

describe('ViewRoutingSlip.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const vuetify = new Vuetify({})
  let store
  beforeEach(() => {
    const routingSlipModule = {
      namespaced: true,
      state: {
        routingSlip: routingSlip
      },
      mutations: {
        setChequePayment: jest.fn(),
        setCashPayment: jest.fn()
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
  it('Should have PrintRoutingSlip, RoutingSlipInfo and PaymentInformation component', () => {
    const wrapper = shallowMount(ViewRoutingSlip, {
      store,
      localVue,
      vuetify
    })
    expect(wrapper.findComponent(RoutingSlipInfo).exists()).toBe(true)
    expect(wrapper.findComponent(PaymentInformation).exists()).toBe(true)
  })
})
