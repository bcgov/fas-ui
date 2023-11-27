import { createLocalVue, mount } from '@vue/test-utils'
import { linkedRoutingSlipsWithChequeChildren, linkedRoutingSlipsWithChildren, routingSlipMock } from '../../test-data/mock-routing-slip'

import { PaymentInformation } from '@/components/ViewRoutingSlip'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'

import { useRoutingSlip } from '@/composables/useRoutingSlip'

describe('PaymentInformation.vue', () => {
  const localVue = createLocalVue()
  const vuetify = new Vuetify({})
  const router = new VueRouter()
  const MyStub = {
    template: '<div />'
  }
  const { routingSlip, linkedRoutingSlips } = useRoutingSlip()

  beforeEach(() => {
    routingSlip.value = routingSlipMock
    linkedRoutingSlips.value = linkedRoutingSlipsWithChildren

    vi.resetModules()
    vi.clearAllMocks()
  })

  it('renders component', () => {
    const wrapper = mount(PaymentInformation, {
      localVue,
      vuetify,
      router,
      stubs: {
        ReviewRoutingSlipCashPayment: MyStub,
        ReviewRoutingSlipChequePayment: MyStub
      },
      directives: {
        can () { /* stub */ }
      }
    })
    expect(wrapper.find('[data-test="title"]').text()).toBe('Payment Information')
    expect(wrapper.find('[data-test="btn-view-payment-information"]').exists()).toBeTruthy()
  })
  it('populates correct value', async () => {
    const wrapper: any = mount(PaymentInformation, {
      localVue,
      vuetify,
      router,
      stubs: {
        ReviewRoutingSlipCashPayment: MyStub,
        ReviewRoutingSlipChequePayment: MyStub
      },
      directives: {
        can () { /* stub */ }
      }
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('[data-test="total"]').text()).toBe('$2000.00')
    expect(wrapper.find('[data-test="remaining-amount"]').text()).toBe('$1000.00')
  })

  it('renders cheque component properly', async () => {
    const wrapper: any = mount(PaymentInformation, {
      localVue,
      vuetify,
      router,
      stubs: {
        ReviewRoutingSlipCashPayment: MyStub,
        ReviewRoutingSlipChequePayment: MyStub
      },
      directives: {
        can () { /* stub */ }
      }
    })
    expect(wrapper.vm.isExpanded).toBeFalsy()
    expect(wrapper.vm.isPaymentCheque).toBeTruthy()
    wrapper.find('[data-test="btn-view-payment-information"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isExpanded).toBeTruthy()
    expect(wrapper.find('[data-test="review-routing-slip-cheque-payment"]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test="review-routing-slip-cash-payment"]').exists()).toBeFalsy()
  })

  it('renders cash component properly', async () => {
    routingSlip.value = {
      id: 4,
      number: '123',
      paymentAccount: { billable: true, name: 'test', paymentMethod: 'CASH' },
      payments: [{ chequeReceiptNumber: '123', createdBy: 'KRAMMOOR@IDIR', id: 7636, paymentMethod: 'CASH', paidAmount: 123 }],
      remainingAmount: 123,
      routingSlipDate: '2021-07-08',
      status: 'ACTIVE',
      total: 12345
    }

    const wrapper: any = mount(PaymentInformation, {
      localVue,
      vuetify,
      router,
      stubs: {
        ReviewRoutingSlipCashPayment: MyStub,
        ReviewRoutingSlipChequePayment: MyStub
      },
      directives: {
        can () { /* stub */ }
      }
    })
    expect(wrapper.vm.isExpanded).toBeFalsy()
    expect(wrapper.vm.isPaymentCheque).toBeFalsy()
    wrapper.find('[data-test="btn-view-payment-information"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isExpanded).toBeTruthy()
    expect(wrapper.find('[data-test="review-routing-slip-cheque-payment"]').exists()).toBeFalsy()
    expect(wrapper.find('[data-test="review-routing-slip-cash-payment"]').exists()).toBeTruthy()
  })

  it('renders linked cash routing slip payment info properly', async () => {
    const wrapper: any = mount(PaymentInformation, {
      localVue,
      vuetify,
      router,
      stubs: {
        ReviewRoutingSlipCashPayment: MyStub,
        ReviewRoutingSlipChequePayment: MyStub
      },
      directives: {
        can () { /* stub */ }
      }
    })
    expect(wrapper.vm.isExpanded).toBeFalsy()
    expect(wrapper.vm.isPaymentCheque).toBeTruthy()
    wrapper.find('[data-test="btn-view-payment-information"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isExpanded).toBeTruthy()
    expect(wrapper.find('[data-test="review-routing-slip-cheque-payment"]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test="review-routing-slip-cash-payment"]').exists()).toBeFalsy()

    // test children rendering
    expect(wrapper.find('[data-test="text-review-routing-slip-0"]').text()).toBe(linkedRoutingSlipsWithChildren.children[0].number)
    expect(wrapper.find('[data-test="cheque-child-payment-0"]').exists()).toBeFalsy()
    expect(wrapper.find('[data-test="cash-child-payment-0"]').exists()).toBeTruthy()
  })

  it('renders linked cheque routing slip payment info properly', async () => {
    routingSlip.value = routingSlipMock
    linkedRoutingSlips.value = linkedRoutingSlipsWithChequeChildren

    const wrapper: any = mount(PaymentInformation, {
      localVue,
      vuetify,
      router,
      stubs: {
        ReviewRoutingSlipCashPayment: MyStub,
        ReviewRoutingSlipChequePayment: MyStub
      },
      directives: {
        can () { /* stub */ }
      }
    })
    expect(wrapper.vm.isExpanded).toBeFalsy()
    expect(wrapper.vm.isPaymentCheque).toBeTruthy()
    wrapper.find('[data-test="btn-view-payment-information"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isExpanded).toBeTruthy()
    expect(wrapper.find('[data-test="review-routing-slip-cheque-payment"]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test="review-routing-slip-cash-payment"]').exists()).toBeFalsy()

    // test children rendering
    expect(wrapper.find('[data-test="text-review-routing-slip-0"]').text()).toBe(linkedRoutingSlipsWithChildren.children[0].number)
    expect(wrapper.find('[data-test="cheque-child-payment-0"]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test="cash-child-payment-0"]').exists()).toBeFalsy()
  })
})
