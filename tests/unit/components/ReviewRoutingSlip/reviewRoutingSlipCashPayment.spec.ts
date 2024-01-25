import { mount } from '@vue/test-utils'

import { ReviewRoutingSlipCashPayment } from '@/components/ReviewRoutingSlip'

import { cashPaymentMock } from '../../test-data/mock-routing-slip'

describe('ReviewRoutingSlipCashPayment.vue', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('renders component', () => {
    const wrapper: any = mount(ReviewRoutingSlipCashPayment, {
      props: {
        cashPayment: cashPaymentMock
      }
    })

    expect(wrapper.find('[data-test="txt-receipt-number"]').element.value).toEqual(cashPaymentMock.chequeReceiptNumber)
    expect(wrapper.find('[data-test="txt-paid-amount"]').element.value).toEqual(cashPaymentMock.paidAmount.toString())
  })
})
