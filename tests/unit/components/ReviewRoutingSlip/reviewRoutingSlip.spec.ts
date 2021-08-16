import { accountInfo, cashPayment, chequePayment, routingSlipDetails } from '../../test-data/mock-routing-slip'
import { createLocalVue, mount } from '@vue/test-utils'

import { ReviewRoutingSlip } from '@/components/ReviewRoutingSlip'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

describe('ReviewRoutingSlip.vue', () => {
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
        routingSlipDetails: routingSlipDetails,
        chequePayment: chequePayment,
        accountInfo: accountInfo,
        cashPayment: cashPayment,
        isPaymentMethodCheque: true
      },
      mutations: {
        setIsPaymentMethodCheque: jest.fn().mockImplementation(() => {
          routingSlipModule.state.isPaymentMethodCheque = !routingSlipModule.state.isPaymentMethodCheque
        })
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

  it('renders component', async () => {
    const wrapper: any = mount(ReviewRoutingSlip, {
      store,
      localVue,
      vuetify,
      stubs: {
        ReviewRoutingSlipDetails: MyStub,
        ReviewRoutingSlipPayment: MyStub
      }
    })
    expect(wrapper.find('[data-test="reviewRoutingSlipDetails"]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test="reviewRoutingSlipPayment"]').exists()).toBeTruthy()
    expect(wrapper.vm.routingSlipDetails).toStrictEqual(routingSlipDetails)
    expect(wrapper.vm.chequePayment).toStrictEqual(chequePayment)
    expect(wrapper.vm.accountInfo).toStrictEqual(accountInfo)
    expect(wrapper.vm.cashPayment).toStrictEqual(cashPayment)
    expect(wrapper.vm.isPaymentMethodCheque).toBeTruthy()
    await store.commit('routingSlip/setIsPaymentMethodCheque')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isPaymentMethodCheque).toBeFalsy()
  })
})
