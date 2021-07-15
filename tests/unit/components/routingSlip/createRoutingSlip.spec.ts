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
    expect(wrapper.find('[data-test="title"]').text()).toBe('Add Routing Slip')
  })

  it('create button validation', async () => {
    const stub = jest.fn().mockReturnValue(true)
    const wrapper: any = mount(CreateRoutingSlip, {
      store,
      localVue,
      vuetify,
      stubs: {
        CreateRoutingSlipPayment: MyStub,
        CreateRoutingSlipDetails: MyStub,
        displaySuccessNotification: MyStub
      },
      mocks: {
        create: stub
      }
    })
    expect(wrapper.find('[data-test="btn-create-routing-slip"]').exists()).toBeTruthy()
    wrapper.find('[data-test="btn-create-routing-slip"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(stub).toHaveBeenCalledTimes(1)
  })

  it('cancel button validation', async () => {
    const stub = jest.fn().mockReturnValue(true)
    const wrapper: any = mount(CreateRoutingSlip, {
      store,
      localVue,
      vuetify,
      stubs: {
        CreateRoutingSlipPayment: MyStub,
        CreateRoutingSlipDetails: MyStub,
        displaySuccessNotification: MyStub
      },
      mocks: {
        cancel: stub
      }
    })
    expect(wrapper.find('[data-test="btn-back"]').exists()).toBeTruthy()
    wrapper.find('[data-test="btn-back"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(stub).toHaveBeenCalledTimes(1)

    expect(wrapper.find('[data-test="btn-cancel-create-routing-slip"]').exists()).toBeTruthy()
    wrapper.find('[data-test="btn-cancel-create-routing-slip"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(stub).toHaveBeenCalledTimes(2)
  })
})
