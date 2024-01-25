import { accountInfoMock, cashPaymentMock, chequePaymentMock, routingSlipDetailsMock } from '../../test-data/mock-routing-slip'
import { ReviewRoutingSlip } from '@/components/ReviewRoutingSlip'
import Vuetify from 'vuetify'
import { useRoutingSlip } from '@/composables/useRoutingSlip'
import { mount } from '@vue/test-utils'

describe('ReviewRoutingSlip.vue', () => {
  

  const MyStub = {
    template: '<div />'
  }
  const { routingSlipDetails, chequePayment, accountInfo, cashPayment, isPaymentMethodCheque } = useRoutingSlip()

  beforeEach(() => {
    routingSlipDetails.value = routingSlipDetailsMock
    chequePayment.value = chequePaymentMock
    accountInfo.value = accountInfoMock
    cashPayment.value = cashPaymentMock
    isPaymentMethodCheque.value = true

    vi.resetModules()
    vi.clearAllMocks()
  })

  it('renders component', async () => {
    const wrapper: any = mount(ReviewRoutingSlip, {

      stubs: {
        ReviewRoutingSlipDetails: MyStub,
        ReviewRoutingSlipPayment: MyStub
      }
    })
    expect(wrapper.find('[data-test="review-routing-slip-details"]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test="review-routing-slip-payment"]').exists()).toBeTruthy()
    expect(wrapper.vm.routingSlipDetails).toStrictEqual(routingSlipDetailsMock)
    expect(wrapper.vm.chequePayment).toStrictEqual(chequePaymentMock)
    expect(wrapper.vm.accountInfo).toStrictEqual(accountInfoMock)
    expect(wrapper.vm.cashPayment).toStrictEqual(cashPaymentMock)
    expect(wrapper.vm.isPaymentMethodCheque).toBeTruthy()
    isPaymentMethodCheque.value = false
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isPaymentMethodCheque).toBeFalsy()
  })
})
