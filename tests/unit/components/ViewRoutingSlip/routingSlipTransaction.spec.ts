import { createLocalVue, mount } from '@vue/test-utils'

import { RoutingSlipTransaction } from '@/components/ViewRoutingSlip'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

describe('RoutingSlipTransaction.vue', () => {
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
        routingSlip: {
          id: 4,
          number: '123',
          paymentAccount: { billable: true, name: 'test', paymentMethod: 'CHEQUE' },
          payments: [{ chequeReceiptNumber: '123', createdBy: 'test@IDIR', id: 7636, paymentMethod: 'CHEQUE', paidAmount: 123, paymentDate: '2021-07-15' }],
          remainingAmount: 123,
          routingSlipDate: '2021-07-08',
          status: 'ACTIVE',
          total: 12345,
          invoices: invoiceData
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
    const wrapper: any = mount(RoutingSlipTransaction, {
      localVue,
      vuetify,
      store
    })
    expect(wrapper.find('[data-test="title"]').text()).toBe('03.Routing Slip Transaction')
    expect(wrapper.vm.invoices).toBe(invoiceData)
  })
})
