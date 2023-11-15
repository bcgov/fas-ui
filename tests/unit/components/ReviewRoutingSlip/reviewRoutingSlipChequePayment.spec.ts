import { createLocalVue, mount } from '@vue/test-utils'

import { ReviewRoutingSlipChequePayment } from '@/components/ReviewRoutingSlip'
import Vuetify from 'vuetify'

import { chequePaymentMock } from '../../test-data/mock-routing-slip'
import VueCompositionAPI from '@vue/composition-api'

describe('ReviewRoutingSlipChequePayment.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuetify)
  localVue.use(VueCompositionAPI)
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('renders component', () => {
    const wrapper: any = mount(ReviewRoutingSlipChequePayment, {
      localVue,
      propsData: {
        chequePayment: chequePaymentMock
      }
    })

    expect(wrapper.find('[data-test="txt-cheque-receipt-number-0"]').element.value).toEqual(chequePaymentMock[0].chequeReceiptNumber)
    expect(wrapper.find('[data-test="txt-cheque-date-0"]').element.value).toEqual('-')
    expect(wrapper.find('[data-test="txt-paid-amount-0"]').element.value).toEqual(chequePaymentMock[0].paidAmount.toString())

    expect(wrapper.find('[data-test="txt-cheque-receipt-number-1"]').element.value).toEqual(chequePaymentMock[1].chequeReceiptNumber)
    expect(wrapper.find('[data-test="txt-cheque-date-1"]').element.value).toEqual('-')
    expect(wrapper.find('[data-test="txt-paid-amount-1"]').element.value).toEqual(chequePaymentMock[1].paidAmount.toString())
  })
})
