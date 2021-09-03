import { createLocalVue, mount } from '@vue/test-utils'
import { routingSlip } from '../../test-data/mock-routing-slip'

import { RoutingSlipTransaction } from '@/components/ViewRoutingSlip'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

describe('RoutingSlipTransaction.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const vuetify = new Vuetify({})
  const MyStub = {
    template: '<div />'
  }

  let store
  beforeEach(() => {
    const routingSlipModule = {
      namespaced: true,
      state: {
        routingSlip
      },
      actions: {
        saveManualTransactions: jest.fn(),
        getRoutingSlip: jest.fn()
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
    const wrapper: any = mount(RoutingSlipTransaction, {
      store,
      localVue,
      vuetify,
      stubs: {
        TransactionDataTable: MyStub,
        AddManualTransactionDetails: MyStub
      },
      directives: {
        can () { /* stub */ }
      }
    })
    expect(wrapper.find('[data-test="title"]').text()).toBe('04.Routing Slip Transaction')
  })

  it('manual transactions list behavior', async () => {
    const wrapper: any = mount(RoutingSlipTransaction, {
      store,
      localVue,
      vuetify,
      stubs: {
        TransactionDataTable: MyStub,
        AddManualTransactionDetails: MyStub
      },
      directives: {
        can () { /* stub */ }
      }
    })
    wrapper.vm.showManualTransaction()
    expect(wrapper.vm.manualTransactionsList.length).toBe(1)

    await wrapper.vm.addManualTransactionRow()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.manualTransactionsList.length).toBe(2)

    await wrapper.vm.removeManualTransactionRow()
    expect(wrapper.vm.manualTransactionsList.length).toBe(1)
  })
})
