import { createLocalVue, mount } from '@vue/test-utils'
import { filingType, manualTransactionDetails as manualTransactionDetailsMock } from '../../test-data/mock-routing-slip'
import RoutingSlipService from '@/services/routingSlip.services'
import AddManualTransactionDetails from '@/components/ViewRoutingSlip/AddManualTransactionDetails.vue'
import Vuetify from 'vuetify'
import { useRoutingSlip } from '@/composables/useRoutingSlip'

describe('addManualTransactionDetails.vue', () => {
  const { autoCompleteRoutingSlips } = useRoutingSlip()
  const localVue = createLocalVue()
  const vuetify = new Vuetify({})
  beforeEach(() => {
    autoCompleteRoutingSlips.value = filingType
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('renders component', async () => {
    const wrapper: any = mount(AddManualTransactionDetails, {
      vuetify,
      localVue,
      propsData: {
        index: 0,
        manualTransaction: manualTransactionDetailsMock
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
    const stub = vi.fn()
    const wrapper: any = mount(AddManualTransactionDetails, {
      vuetify,
      localVue,
      propsData: {
        index: 1,
        manualTransaction: manualTransactionDetailsMock
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
      vuetify,
      localVue,
      propsData: {
        index: 0,
        manualTransaction: manualTransactionDetailsMock
      }
    })
    const mockedResponse = { data: { total: 100 }, status: 200, statusText: '', headers: {}, config: {} }
    vi.spyOn(RoutingSlipService, 'getFeeByCorpTypeAndFilingType').mockResolvedValue(mockedResponse)
    // to add first array of input on mount
    await wrapper.vm.$nextTick()
    await wrapper.vm.calculateTotal()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.manualTransactionDetails.total).toBe(100)
  })
})
