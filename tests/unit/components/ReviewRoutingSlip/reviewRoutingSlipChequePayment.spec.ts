import { createLocalVue, mount } from '@vue/test-utils'

import { ReviewRoutingSlipChequePayment } from '@/components/ReviewRoutingSlip'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { chequePayment } from '../../test-data/mock-routing-slip'

describe('ReviewRoutingSlipChequePayment.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuetify)
  let store
  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
    const routingSlipModule = {
      namespaced: true,
      state: {
        routingSlipDetails: {}
      },
      actions: {
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
  })

  it('renders component', () => {
    const wrapper: any = mount(ReviewRoutingSlipChequePayment, {
      localVue,
      store,
      propsData: {
        chequePayment: chequePayment
      }
    })

    expect(wrapper.find('[data-test="txt-cheque-receipt-number-0"]').element.value).toEqual(chequePayment[0].chequeReceiptNumber)
    expect(wrapper.find('[data-test="txt-cheque-date-0"]').element.value).toEqual('-')
    expect(wrapper.find('[data-test="txt-paid-amount-0"]').element.value).toEqual(chequePayment[0].paidAmount.toFixed(2).toString())

    expect(wrapper.find('[data-test="txt-cheque-receipt-number-1"]').element.value).toEqual(chequePayment[1].chequeReceiptNumber)
    expect(wrapper.find('[data-test="txt-cheque-date-1"]').element.value).toEqual('-')
    expect(wrapper.find('[data-test="txt-paid-amount-1"]').element.value).toEqual(chequePayment[1].paidAmount.toFixed(2).toString())
  })
})
