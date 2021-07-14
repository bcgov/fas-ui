import { mount, shallowMount } from '@vue/test-utils'
import CreateRoutingSlipCashPayment from '@/components/RoutingSlip/CreateRoutingSlipCashPayment.vue'
import Vuex from 'vuex'

describe('CreateRoutingSlipCashPayment.vue', () => {
  let store
  const cashPayment = { chequeReceiptNumber: '1234', paidAmount: '20' }
  beforeEach(() => {
    const routingSlip: any = {
      namespaced: true,
      state: {
        cashPayment
      },
      actions: {},
      mutations: { setCashPayment: jest.fn() },
      getters: {}
    }
    store = new Vuex.Store({
      state: {},
      strict: false,
      modules: {
        routingSlip: routingSlip
      }
    })

    jest.resetModules()
    jest.clearAllMocks()
  })

  it('renders with 2 input', () => {
    const wrapper = shallowMount(CreateRoutingSlipCashPayment, {
      store
    })
    const reciptNumber: any = wrapper.find('[data-test="txtReceiptNumber"]')
    const txtPaidAmount: any = wrapper.find('[data-test="txtPaidAmount"]')
    expect(reciptNumber.exists()).toBeTruthy()
    expect(txtPaidAmount.exists()).toBeTruthy()
  })

  it('Should have Receipt Number input field and inital value from store', () => {
    const wrapper = mount(CreateRoutingSlipCashPayment, {
      store
    })

    const reciptNumber: any = wrapper.find('[data-test="txtReceiptNumber"]')
    const txtPaidAmount: any = wrapper.find('[data-test="txtPaidAmount"]')
    expect(reciptNumber.element.value).toBe(cashPayment.chequeReceiptNumber)
    expect(txtPaidAmount.element.value).toBe(cashPayment.paidAmount)
  })

  it('Should update Receipt Number on change', () => {
    const wrapper = mount(CreateRoutingSlipCashPayment, {
      store
    })

    const reciptNumber: any = wrapper.find('[data-test="txtReceiptNumber"]')
    const txtPaidAmount: any = wrapper.find('[data-test="txtPaidAmount"]')

    reciptNumber.setValue('456')
    txtPaidAmount.setValue('40')
    expect(reciptNumber.element.value).toBe('456')
    expect(txtPaidAmount.element.value).toBe('40')
  })
})
