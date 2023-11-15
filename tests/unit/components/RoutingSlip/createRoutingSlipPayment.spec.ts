import { createLocalVue, mount, shallowMount } from '@vue/test-utils'

import { CreateRoutingSlipPayment } from '@/components/RoutingSlip'
import Vuetify from 'vuetify'

describe('CreateRoutingSlipPayment.vue', () => {
  const localVue = createLocalVue()

  localVue.use(Vuetify)
  const vuetify = new Vuetify({})
  const MyStub = {
    template: '<div />'
  }

  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('renders component', () => {
    const wrapper = mount(CreateRoutingSlipPayment, {
      localVue,
      vuetify,
      stubs: {
        CreateRoutingSlipChequePayment: MyStub,
        CreateRoutingSlipCashPayment: MyStub
      }
    })
    expect(wrapper.find('p').exists()).toBeTruthy()
    expect(wrapper.find('p').text()).toBe('Payment Information')
  })

  it('change payment between cash and cheque', async () => {
    const stub = vi.fn().mockReturnValue(true)
    const wrapper: any = mount(CreateRoutingSlipPayment, {
      localVue,
      vuetify,
      stubs: {
        CreateRoutingSlipChequePayment: MyStub,
        CreateRoutingSlipCashPayment: MyStub
      }
    })
    expect(wrapper.find("[data-test='radio-cash']").exists()).toBeTruthy()
    expect(wrapper.find("[data-test='radio-cheque']").exists()).toBeTruthy()

    wrapper.find("[data-test='radio-cash']").trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.find("[data-test='create-routing-slip-cash-payment']").isVisible()).toBeTruthy()

    wrapper.find("[data-test='radio-cheque']").trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.find("[data-test='create-routing-slip-cheque-payment']").isVisible()).toBeTruthy()
  })
})
