import { createLocalVue, mount, shallowMount } from '@vue/test-utils'

import { CreateRoutingSlip } from '@/components/RoutingSlip'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import vuetify from '@/plugins/vuetify'

describe('CreateRoutingSlip.vue', () => {
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
      localVue,
      vuetify,
      store,
      stubs: {
        CreateRoutingSlipPayment: MyStub,
        CreateRoutingSlipDetails: MyStub,
        ModalDialog: MyStub
      }
    })
    expect(wrapper.find('.title').exists()).toBe('Add Routing Slip')
  })
})
