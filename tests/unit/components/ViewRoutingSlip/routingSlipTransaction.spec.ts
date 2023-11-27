import { createLocalVue, mount } from '@vue/test-utils'

import { RoutingSlipTransaction } from '@/components/ViewRoutingSlip'
import Vuetify from 'vuetify'

import { routingSlipMock } from '../../test-data/mock-routing-slip'
import { useRoutingSlip } from '@/composables/useRoutingSlip'

describe('RoutingSlipTransaction.vue', () => {
  const { routingSlip } = useRoutingSlip()
  const localVue = createLocalVue()

  const vuetify = new Vuetify({})
  const MyStub = {
    template: '<div />'
  }
  beforeEach(() => {
    routingSlip.value = routingSlipMock
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('renders component', () => {
    const wrapper: any = mount(RoutingSlipTransaction, {
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
    expect(wrapper.find('[data-test="title"]').text()).toBe('Routing Slip Transaction')
  })

  it('manual transactions list behavior', async () => {
    const wrapper: any = mount(RoutingSlipTransaction, {
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

  async function getWrapper (usedAmount:number) {
    const wrapper: any = mount(RoutingSlipTransaction, {
      localVue,
      vuetify,
      stubs: {
        TransactionDataTable: MyStub,
        AddManualTransactionDetails: MyStub
      },
      directives: {
        can () { /* stub */
        }
      }
    })
    wrapper.vm.showManualTransaction()
    expect(wrapper.vm.manualTransactionsList.length).toBe(1)
    wrapper.vm.manualTransactionsList[0].total = usedAmount
    await wrapper.vm.addManualTransactionRow()
    await wrapper.vm.$nextTick()
    return wrapper
  }

  it('manual transactions assert remaninig amount', async () => {
    const usedAmount1 = 100
    const wrapper: any = await getWrapper(usedAmount1)
    expect(wrapper.vm.manualTransactionsList.length).toBe(2)
    expect(wrapper.vm.manualTransactionsList[1].availableAmountForManualTransaction).toBe(routingSlipMock.remainingAmount - usedAmount1)
    const usedAmount2 = 200
    wrapper.vm.manualTransactionsList[1].total = usedAmount2
    await wrapper.vm.addManualTransactionRow()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.manualTransactionsList.length).toBe(3)
    expect(wrapper.vm.manualTransactionsList[2].availableAmountForManualTransaction).toBe(routingSlipMock.remainingAmount - (usedAmount1 + usedAmount2))
  })

  it('manual transactions assert saveManualTransactionsSpy is invoked', async () => {
    const wrapper = await getWrapper(100)
    await wrapper.vm.addManualTransactions()
    expect(wrapper.vm.status).toBe('')
  })
  it('manual transactions assert saveManualTransactionsSpy not invoked for large amounts', async () => {
    const wrapper = await getWrapper(10000)
    await wrapper.vm.addManualTransactions()
    expect(wrapper.vm.status).toBe('cantAddTransactions')
  })
})
