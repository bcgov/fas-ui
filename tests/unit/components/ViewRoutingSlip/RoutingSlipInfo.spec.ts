import { createLocalVue, shallowMount } from '@vue/test-utils'

import { RoutingSlipInfo } from '@/components/ViewRoutingSlip'
import statusList from '@/components/common/StatusList.vue'
import { routingSlipStatusList } from '../../mocks/code'

import Vuetify from 'vuetify'
import Vuex from 'vuex'

describe('RoutingSlipInfo.vue', () => {
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
          payments: [],
          remainingAmount: 123,
          routingSlipDate: '2021-07-08',
          status: 'ACTIVE',
          total: 12345
        }
      },
      mutations: {
        // setChequePayment: jest.fn(),
        // setCashPayment: jest.fn()
      }
    }

    const codesModule = {
      namespaced: true,
      state: {
        routingSlipStatusList
      },
      actions: {
        getRoutingSlipStatusList: jest.fn()
      }
    }

    store = new Vuex.Store({
      strict: false,
      modules: {
        routingSlip: routingSlipModule,
        codes: codesModule
      }
    })

    jest.resetModules()
    jest.clearAllMocks()
  })

  it('renders component', () => {
    const wrapper = shallowMount(RoutingSlipInfo, {
      store,
      localVue,
      vuetify
    })
    expect(wrapper.find('[data-test="title"]').text()).toBe('01.Routing Slip Information')
    expect(wrapper.find('[data-test="label-status"]').exists()).toBeTruthy()
  })

  it('On edit click should show status select box', async () => {
    const wrapper = shallowMount(RoutingSlipInfo, {
      store,
      localVue,
      vuetify

    })

    expect(wrapper.find('[data-test="label-status"]').exists()).toBeTruthy()
    expect(wrapper.findComponent(statusList).exists()).toBeFalsy()

    wrapper.find('[data-test="btn-edit"]').trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.findComponent(statusList).exists()).toBeTruthy()
    expect(wrapper.find('[data-test="label-status"]').exists()).toBeFalsy()
  })
})
