import { createLocalVue, mount } from '@vue/test-utils'
import { routingSlip, routingSlipRefundRequested, routingSlipWithCancelledInvoice } from '../../test-data/mock-routing-slip'

import { InvoiceDisplay } from '@/models/Invoice'
import { TransactionDataTable } from '@/components/ViewRoutingSlip'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

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
      store,
      directives: {
        can () { /* stub */ }
      }
    })
    expect(wrapper.find('[data-test="title"]').text()).toBe('Transactions')
  })

  it('transforms invoice data to display', async () => {
    const wrapper: any = mount(TransactionDataTable, {
      localVue,
      vuetify,
      store,
      directives: {
        can () { /* stub */ }
      }
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

  it('invoice cancel button behaviour', async () => {
    const cancelledRoutingSlipModule = {
      namespaced: true,
      state: {
        routingSlip: routingSlipWithCancelledInvoice
      }
    }
    store = new Vuex.Store({
      strict: false,
      modules: {
        routingSlip: cancelledRoutingSlipModule
      }
    })
    const stubConfirm = jest.fn()
    const stubCancel = jest.fn()
    const wrapper: any = mount(TransactionDataTable, {
      localVue,
      vuetify,
      store,
      mocks: {
        modalDialogConfirm: stubConfirm,
        modalDialogClose: stubCancel
      },
      directives: {
        can () { /* stub */ }
      }
    })
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    expect(wrapper.find('[data-test="text-cancel-0"]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test="btn-invoice-cancel-1"]').exists()).toBeTruthy()
    wrapper.find('[data-test="btn-invoice-cancel-1"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('[data-test="dialog-confirm-cancellation"]').exists()).toBeTruthy()
    await wrapper.find('[data-test="dialog-ok-button"]').trigger('click')
    expect(stubConfirm).toHaveBeenCalledTimes(1)
    await wrapper.find('[data-test="dialog-cancel-button"]').trigger('click')
    expect(stubCancel).toHaveBeenCalledTimes(1)
  })

  it('invoice cancel button disabled based on routingslip', async () => {
    const routingSlipModule = {
      namespaced: true,
      state: {
        routingSlip: routingSlipRefundRequested
      }
    }
    store = new Vuex.Store({
      strict: false,
      modules: {
        routingSlip: routingSlipModule
      }
    })
    const stubConfirm = jest.fn()
    const stubCancel = jest.fn()
    const wrapper: any = mount(TransactionDataTable, {
      localVue,
      vuetify,
      store,
      mocks: {
        modalDialogConfirm: stubConfirm,
        modalDialogClose: stubCancel
      },
      directives: {
        can () { /* stub */ }
      }
    })
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    expect(wrapper.find('[data-test="btn-invoice-cancel-0"]').element.disabled).toBe(true)
    expect(wrapper.find('[data-test="btn-invoice-cancel-1"]').element.disabled).toBe(true)
  })
})
