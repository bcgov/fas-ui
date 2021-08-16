import { createLocalVue, mount } from '@vue/test-utils'

import { ReviewRoutingSlipChequePayment } from '@/components/ReviewRoutingSlip'
import Vuetify from 'vuetify'
import { chequePayment } from '../../test-data/mock-routing-slip'

describe('ReviewRoutingSlipChequePayment.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuetify)
  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('renders component', () => {
    const wrapper: any = mount(ReviewRoutingSlipChequePayment, {
      localVue,
      propsData: {
        chequePayment: chequePayment
      }
    })

    expect(wrapper.find('[data-test="txtChequeReceiptNumber-0"]').element.value).toEqual(chequePayment[0].chequeReceiptNumber)
    expect(wrapper.find('[data-test="txtChequeDate-0"]').element.value).toEqual('-')
    expect(wrapper.find('[data-test="txtPaidAmount-0"]').element.value).toEqual(chequePayment[0].paidAmount.toString())

    expect(wrapper.find('[data-test="txtChequeReceiptNumber-1"]').element.value).toEqual(chequePayment[1].chequeReceiptNumber)
    expect(wrapper.find('[data-test="txtChequeDate-1"]').element.value).toEqual('-')
    expect(wrapper.find('[data-test="txtPaidAmount-1"]').element.value).toEqual(chequePayment[1].paidAmount.toString())
  })
})
