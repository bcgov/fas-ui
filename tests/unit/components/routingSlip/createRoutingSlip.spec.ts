import { createLocalVue, mount, shallowMount } from '@vue/test-utils'

import { CreateRoutingSlip } from '@/components/RoutingSlip'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

describe('CreateRoutingSlip.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const vuetify = new Vuetify({})
  let store
  const MyStub = {
    template: '<div />'
  }

  beforeEach(() => {
    const routingSlipModule = {
      namespaced: true,
      state: {
        routingSlipDetails: {}
      },
      action: {
        createRoutingSlip: jest.fn(),
        resetRoutingSlipDetails: jest.fn()
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
    const wrapper = mount(CreateRoutingSlip, {
      store,
      localVue,
      vuetify,
      stubs: {
        CreateRoutingSlipPayment: MyStub,
        CreateRoutingSlipDetails: MyStub,
        ModalDialog: MyStub
      }
    })
    expect(wrapper.find('.title').text()).toBe('Add Routing Slip')
  })

  it('UI handlers validation', () => {
    const wrapper = mount(CreateRoutingSlip, {
      store,
      localVue,
      vuetify,
      stubs: {
        CreateRoutingSlipPayment: MyStub,
        CreateRoutingSlipDetails: MyStub,
        ModalDialog: MyStub
      }
    })
    expect(wrapper.find('.title').text()).toBe('Add Routing Slip')
  })
})
