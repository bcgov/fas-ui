import { createLocalVue, mount } from '@vue/test-utils'
import { filingType, manualTransactionDetails } from '../../test-data/mock-routing-slip'

import AddManualTransactionDetails from '@/components/ViewRoutingSlip/AddManualTransactionDetails.vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

describe('addManualTransactionDetails.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const vuetify = new Vuetify({})
  let store
  beforeEach(() => {
    const routingSlipModule = {
      namespaced: true,
      state: {
        autoCompleteFilingTypes: filingType
      },
      actions: {
        getAutoCompleteFilingTypes: jest.fn(),
        getFeeByCorpTypeAndFilingType: jest.fn().mockResolvedValue(100)
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
    const wrapper: any = mount(AddManualTransactionDetails, {
      store,
      vuetify,
      localVue,
      propsData: {
        index: 0,
        manualTransaction: manualTransactionDetails
      }
    })
    // to add first array of input on mount
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.manualTransaction).not.toBeNull()
    expect(wrapper.find('[data-test="txt-quantity-0"]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test="txt-incorporation-0"]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test="txt-amount-0"]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test="btn-remove-0"]').exists()).toBeFalsy()
    expect(wrapper.find('[data-test="check-priority-0"]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test="check-future-effective-0"]').exists()).toBeTruthy()
  })

  it('behavior testing', async () => {
    const stub = jest.fn()
    const wrapper: any = mount(AddManualTransactionDetails, {
      store,
      vuetify,
      localVue,
      propsData: {
        index: 1,
        manualTransaction: manualTransactionDetails
      },
      mocks: {
        removeManualTransactionRowEventHandler: stub
      }
    })
    // to add first array of input on mount
    await wrapper.vm.$nextTick()
    expect(wrapper.find('[data-test="txt-quantity-1"]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test="txt-incorporation-1"]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test="txt-amount-1"]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test="btn-remove-1"]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test="check-priority-1"]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test="check-future-effective-1"]').exists()).toBeTruthy()

    const removeBtn = wrapper.find('[data-test="btn-remove-1"]')
    removeBtn.trigger('click')
    await wrapper.vm.$nextTick()
    expect(stub).toBeCalled()
  })

  it('calculate total', async () => {
    const wrapper: any = mount(AddManualTransactionDetails, {
      store,
      vuetify,
      localVue,
      propsData: {
        index: 0,
        manualTransaction: manualTransactionDetails
      }
    })
    // to add first array of input on mount
    await wrapper.vm.$nextTick()
    await wrapper.vm.calculateTotal()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.manualTransactionDetails.total).toBe(100)
  })
})
