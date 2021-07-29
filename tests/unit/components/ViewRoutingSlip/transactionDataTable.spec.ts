import { createLocalVue, mount } from '@vue/test-utils'

import { InvoiceDisplay } from '@/models/Invoice'
import RoutingSlipModule from '@/store/modules/routingSlip'
import { TransactionDataTable } from '@/components/ViewRoutingSlip'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { routingSlip } from '../../test-data/mock-routing-slip'

describe('TransactionDataTable.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const vuetify = new Vuetify({})
  let store

  beforeEach(() => {
    const routingSlipModule = {
      namespaced: true,
      state: {
        routingSlip: routingSlip
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
    const wrapper = mount(TransactionDataTable, {
      localVue,
      vuetify,
      store
    })
    expect(wrapper.find('[data-test="title"]').text()).toBe('Transactions')
  })

  it('transforms invoice data to display', async () => {
    const wrapper: any = mount(TransactionDataTable, {
      localVue,
      vuetify,
      store
    })
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.invoiceDisplay).not.toBeNull()
    const invoiceDisplay: InvoiceDisplay[] = wrapper.vm.invoiceDisplay
    let description = ['Annual Report', '2.0 Version1']
    expect(invoiceDisplay[0].description).toStrictEqual(description)
    description = ['Annual Report']
    expect(invoiceDisplay[1].description).toStrictEqual(description)
    expect(invoiceDisplay[0].total).toBe(1000.00)
    expect(invoiceDisplay[1].total).toBe(10000.00)
    expect(invoiceDisplay[0].createdName).toBe('SERVICE-ACCOUNT-ENTITY-SERVICE-ACCOUNT')
    expect(invoiceDisplay[1].createdName).toBe('testIDIR')
    expect(invoiceDisplay[0].invoiceNumber).toBe(undefined)
    expect(invoiceDisplay[1].invoiceNumber).toBe('REGD00010652')
  })
})
