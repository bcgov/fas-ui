import { cashPayment, chequePayment } from '../../test-data/mock-routing-slip'
import { createLocalVue, mount } from '@vue/test-utils'

import { ReviewRoutingSlipPayment } from '@/components/ReviewRoutingSlip'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

describe('ReviewRoutingSlipPayment.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const vuetify = new Vuetify({})

  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('renders component', async () => {
    const wrapper: any = mount(ReviewRoutingSlipPayment, {
      localVue,
      vuetify,
      propsData: {
        chequePayment: chequePayment,
        cashPayment: cashPayment,
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
        chequePayment: chequePayment,
        cashPayment: cashPayment,
        isPaymentMethodCheque: false
      }
    })

    expect(wrapper.find('[data-test="payment-info"]').text()).toEqual('Cash')
    expect(wrapper.find('[data-test="review-routing-slip-cheque-payment"]').exists()).toBeFalsy()
    expect(wrapper.find('[data-test="review-routing-slip-cash-payment"]').exists()).toBeTruthy()
  })
})
