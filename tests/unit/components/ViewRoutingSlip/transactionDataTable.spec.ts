import { createLocalVue, mount } from '@vue/test-utils'

import { InvoiceDto } from '@/models/Invoice'
import RoutingSlipModule from '@/store/modules/routingSlip'
import { TransactionDataTable } from '@/components/ViewRoutingSlip'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

describe('TransactionDataTable.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const vuetify = new Vuetify({})
  let store
  const invoiceData = [
    {
      businessIdentifier: 'CP0001405',
      corpTypeCode: 'CP',
      createdBy: 'SERVICE-ACCOUNT-ENTITY-SERVICE-ACCOUNT',
      createdOn: '2021-07-15T17:57:32.432827',
      id: 1,
      lineItems: [
        {
          description: 'Annual Report'
        },
        {
          description: '2.0 Version1'
        }
      ],
      references: [
        {
          id: 8427,
          invoiceNumber: 'REGD00010652',
          statusCode: 'ACTIVE'
        }
      ],
      total: 1000
    },
    {
      businessIdentifier: 'CP000140135',
      corpTypeCode: 'CP',
      createdName: 'testIDIR',
      createdOn: '2021-07-15T17:57:32.432827',
      id: 1,
      lineItems: [
        {
          description: 'Annual Report'
        }
      ],
      references: [
        {
          id: 8427,
          invoiceNumber: 'REGD00010652',
          statusCode: 'COMPLETED'
        }
      ],
      total: 10000
    }
  ]

  beforeEach(() => {
    const routingSlipModule = {
      namespaced: true,
      state: {
        routingSlip: {}
      },
      getters: RoutingSlipModule.getters
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
      store,
      propsData:
      {
        invoices: invoiceData
      }
    })
    expect(wrapper.find('[data-test="title"]').text()).toBe('Transactions')
  })

  it('transforms invoice data to display', async () => {
    const wrapper: any = mount(TransactionDataTable, {
      localVue,
      vuetify,
      store,
      propsData:
      {
        invoices: invoiceData
      }
    })
    await wrapper.vm.$nextTick()
    wrapper.vm.transformInvoices()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.invoiceDto).not.toBeNull()
    const invoiceDto: InvoiceDto[] = wrapper.vm.invoiceDto
    expect(invoiceDto[0].description).toBe('Annual Report2.0 Version1')
    expect(invoiceDto[1].description).toBe('Annual Report')
    expect(invoiceDto[0].total).toBe(1000)
    expect(invoiceDto[1].total).toBe(10000)
    expect(invoiceDto[0].createdName).toBe('SERVICE-ACCOUNT-ENTITY-SERVICE-ACCOUNT')
    expect(invoiceDto[1].createdName).toBe('testIDIR')
    expect(invoiceDto[0].invoiceNumber).toBe(undefined)
    expect(invoiceDto[1].invoiceNumber).toBe('REGD00010652')
  })
})
