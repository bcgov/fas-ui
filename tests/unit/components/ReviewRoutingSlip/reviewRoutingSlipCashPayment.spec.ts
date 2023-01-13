import { createLocalVue, mount } from '@vue/test-utils'

import { ReviewRoutingSlipCashPayment } from '@/components/ReviewRoutingSlip'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { cashPayment } from '../../test-data/mock-routing-slip'

describe('ReviewRoutingSlipCashPayment.vue', () => {
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
    const wrapper: any = mount(ReviewRoutingSlipCashPayment, {
      localVue,
      store,
      propsData: {
        cashPayment: cashPayment
      }
    })

    expect(wrapper.find('[data-test="txt-receipt-number"]').element.value).toEqual(cashPayment.chequeReceiptNumber)
    expect(wrapper.find('[data-test="txt-paid-amount"]').element.value).toEqual(cashPayment.paidAmount.toString())
  })
})
