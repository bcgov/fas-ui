import { cashPaymentMock, chequePaymentMock } from '../../test-data/mock-routing-slip'
import { createLocalVue, mount } from '@vue/test-utils'

import { ReviewRoutingSlipPayment } from '@/components/ReviewRoutingSlip'
import Vuetify from 'vuetify'

describe('ReviewRoutingSlipPayment.vue', () => {
  const localVue = createLocalVue()

  const vuetify = new Vuetify({})
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
    const routingSlipModule = {
      namespaced: true,
      state: {
        routingSlipDetails: {}
      },
      actions: {
        createRoutingSlip: vi.fn(),
        resetRoutingSlipDetails: vi.fn()
      }
    }
  })

  it('renders component', async () => {
    const wrapper: any = mount(ReviewRoutingSlipPayment, {
      localVue,
      vuetify,
      propsData: {
        chequePayment: chequePaymentMock,
        cashPayment: cashPaymentMock,
        isPaymentMethodCheque: true
      }
    })

    expect(wrapper.find('[data-test="payment-info"]').text()).toEqual('Cheque')
    expect(wrapper.find('[data-test="review-routing-slip-cheque-payment"]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test="review-routing-slip-cash-payment"]').exists()).toBeFalsy()
    expect(wrapper.find('[data-test="total"]').text()).toEqual('$200.00')
  })

  it('validates component behaviour', async () => {
    const wrapper: any = mount(ReviewRoutingSlipPayment, {
      localVue,
      vuetify,
      propsData: {
        chequePayment: chequePaymentMock,
        cashPayment: cashPaymentMock,
        isPaymentMethodCheque: false
      }
    })

    expect(wrapper.find('[data-test="payment-info"]').text()).toEqual('Cash')
    expect(wrapper.find('[data-test="review-routing-slip-cheque-payment"]').exists()).toBeFalsy()
    expect(wrapper.find('[data-test="review-routing-slip-cash-payment"]').exists()).toBeTruthy()
  })
})
