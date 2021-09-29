import { createLocalVue, shallowMount } from '@vue/test-utils'

import { RoutingSlipInfo } from '@/components/ViewRoutingSlip'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { routingSlipStatusList } from '../../test-data/mock-code'
import statusList from '@/components/common/StatusList.vue'

describe('RoutingSlipInfo.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const vuetify = new Vuetify({})
  let store

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
        fasCodes: codesModule
      }
    })

    jest.resetModules()
    jest.clearAllMocks()
  })

  it('renders component', () => {
    const wrapper = shallowMount(RoutingSlipInfo, {
      store,
      localVue,
      vuetify,
      directives: {
        can () { /* stub */ }
      }
    })
    expect(wrapper.find('[data-test="title"]').text()).toBe('Routing Slip Information')
    expect(wrapper.find('[data-test="label-status"]').exists()).toBeTruthy()
  })

  it('On edit click should show status select box', async () => {
    const wrapper = shallowMount(RoutingSlipInfo, {
      store,
      localVue,
      vuetify,
      directives: {
        can () { /* stub */ }
      }
    })

    expect(wrapper.find('[data-test="label-status"]').exists()).toBeTruthy()
    expect(wrapper.findComponent(statusList).exists()).toBeFalsy()

    wrapper.find('[data-test="btn-edit"]').trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.findComponent(statusList).exists()).toBeTruthy()
    expect(wrapper.find('[data-test="label-status"]').exists()).toBeFalsy()
  })
})
