import { createLocalVue, mount } from '@vue/test-utils'

import { ReviewRoutingSlipCashPayment } from '@/components/ReviewRoutingSlip'
import Vuetify from 'vuetify'

import { cashPaymentMock } from '../../test-data/mock-routing-slip'

describe('ReviewRoutingSlipCashPayment.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuetify)
  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('renders component', () => {
    const wrapper: any = mount(ReviewRoutingSlipCashPayment, {
      localVue,
      propsData: {
        cashPayment: cashPaymentMock
      }
    })

    expect(wrapper.find('[data-test="txt-receipt-number"]').element.value).toEqual(cashPaymentMock.chequeReceiptNumber)
    expect(wrapper.find('[data-test="txt-paid-amount"]').element.value).toEqual(cashPaymentMock.paidAmount.toString())
  })
})
