import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { Search } from '@/components/Dashboard'
import { routingSlip } from '../../test-data/mock-routing-slip'

describe('Search.vue', () => {
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
  it('Should have h4 title', () => {
    const wrapper = shallowMount(Search, {
      store,
      localVue,
      vuetify
    })
    expect(wrapper.find('h4').exists()).toBeTruthy()
    expect(wrapper.find('h4').text()).toBe('Recent Routing Slip')
  })
})
