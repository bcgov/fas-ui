import { createLocalVue, mount } from '@vue/test-utils'

import { PaymentInformation } from '@/components/ViewRoutingSlip'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

describe('PaymentInformation.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const vuetify = new Vuetify({})
  let store
  const MyStub = {
    template: '<div />'
  }

  beforeEach(() => {
    const routingSlipModule = {
      namespaced: true,
      state: {
        routingSlip: {
          id: 4,
          number: '123',
          paymentAccount: { billable: true, name: 'test', paymentMethod: 'CHEQUE' },
          payments: [{ chequeReceiptNumber: '123', createdBy: 'KRAMMOOR@IDIR', id: 7636, paymentMethod: 'CHEQUE', paidAmount: 123, paymentDate: '2021-07-15' }],
          remainingAmount: 123,
          routingSlipDate: '2021-07-08',
          status: 'ACTIVE',
          total: 12345
        }
      },
      mutations: {
        setChequePayment: jest.fn(),
        setCashPayment: jest.fn()
      }
    }

    store = new Vuex.Store({
      strict: false,
      modules: {
        routingSlip: routingSlipModule
      }
    })

    jest.resetModules()
    jest.clearAllMocks()
  })

  it('renders component', () => {
    const wrapper = mount(PaymentInformation, {
      store,
      localVue,
      vuetify,
      stubs: {
        CreateRoutingSlipCashPayment: MyStub,
        CreateRoutingSlipChequePayment: MyStub
      }
    })
    expect(wrapper.find('[data-test="title"]').text()).toBe('02.Payment Information')
    expect(wrapper.find('[data-test="btn-add-fund"]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test="btn-view-payment-information"]').exists()).toBeTruthy()
  })
  it('populates correct value', () => {
    const wrapper = mount(PaymentInformation, {
      store,
      localVue,
      vuetify,
      stubs: {
        CreateRoutingSlipCashPayment: MyStub,
        CreateRoutingSlipChequePayment: MyStub
      }
    })
    expect(wrapper.find('[data-test="total"]').text()).toBe('$12345')
    expect(wrapper.find('[data-test="remaining-amount"]').text()).toBe('$123')
  })

  it('renders cheque child properly', async () => {
    const wrapper: any = mount(PaymentInformation, {
      store,
      localVue,
      vuetify,
      stubs: {
        CreateRoutingSlipCashPayment: MyStub,
        CreateRoutingSlipChequePayment: MyStub
      }
    })
    expect(wrapper.vm.isExpanded).toBeFalsy()
    expect(wrapper.vm.isPaymentCheque).toBeTruthy()
    wrapper.find('[data-test="btn-view-payment-information"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isExpanded).toBeTruthy()
    expect(wrapper.find('[data-test="ref-create-routing-slip-cheque-payment"]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test="ref-create-routing-slip-cash-payment"]').exists()).toBeFalsy()
  })

  it('renders cash child properly', async () => {
    const routingSlipModule = {
      namespaced: true,
      state: {
        routingSlip: {
          id: 4,
          number: '123',
          paymentAccount: { billable: true, name: 'test', paymentMethod: 'CASH' },
          payments: [{ chequeReceiptNumber: '123', createdBy: 'KRAMMOOR@IDIR', id: 7636, paymentMethod: 'CASH', paidAmount: 123 }],
          remainingAmount: 123,
          routingSlipDate: '2021-07-08',
          status: 'ACTIVE',
          total: 12345
        }
      },
      mutations: {
        setChequePayment: jest.fn(),
        setCashPayment: jest.fn()
      }
    }

    store = new Vuex.Store({
      strict: false,
      modules: {
        routingSlip: routingSlipModule
      }
    })
    const wrapper: any = mount(PaymentInformation, {
      store,
      localVue,
      vuetify,
      stubs: {
        CreateRoutingSlipCashPayment: MyStub,
        CreateRoutingSlipChequePayment: MyStub
      }
    })
    expect(wrapper.vm.isExpanded).toBeFalsy()
    expect(wrapper.vm.isPaymentCheque).toBeFalsy()
    wrapper.find('[data-test="btn-view-payment-information"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isExpanded).toBeTruthy()
    expect(wrapper.find('[data-test="ref-create-routing-slip-cheque-payment"]').exists()).toBeFalsy()
    expect(wrapper.find('[data-test="ref-create-routing-slip-cash-payment"]').exists()).toBeTruthy()
  })
})
