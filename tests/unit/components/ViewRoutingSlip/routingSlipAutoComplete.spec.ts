import { autoCompleteRoutingSlips, routingSlip } from '../../test-data/mock-routing-slip'
import { createLocalVue, mount } from '@vue/test-utils'

import { RoutingSlipAutoComplete } from '@/components/ViewRoutingSlip'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

describe('RoutingSlipAutoComplete.vue', () => {
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
        autoCompleteRoutingSlips: autoCompleteRoutingSlips,
        routingSlip: routingSlip
      },
      actions: {
        getAutoCompleteRoutingSlips: jest.fn(),
        saveLinkRoutingSlip: jest.fn(),
        getRoutingSlip: jest.fn(),
        getLinkedRoutingSlips: jest.fn()
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
    const wrapper: any = mount(RoutingSlipAutoComplete, {
      store,
      localVue,
      vuetify,
      stubs: {
        ReviewRoutingSlipDetails: MyStub,
        ReviewRoutingSlipPayment: MyStub
      }
    })
    expect(wrapper.find('[data-test="btn-link-rs"]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test="btn-cancel-link"]').exists()).toBeTruthy()
  })

  it('UI behaviour', async () => {
    const stub = jest.fn()
    const wrapper: any = mount(RoutingSlipAutoComplete, {
      store,
      localVue,
      vuetify,
      stubs: {
        ReviewRoutingSlipDetails: MyStub,
        ReviewRoutingSlipPayment: MyStub
      },
      mocks: {
        searchRS: stub
      }
    })
    wrapper.find('[data-test="btn-cancel-link"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('toggleSearch')).toBeTruthy()

    wrapper.find('[data-test="btn-link-rs"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(stub).toBeCalled()
  })
})
