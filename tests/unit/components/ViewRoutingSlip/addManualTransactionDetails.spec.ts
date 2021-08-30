import { createLocalVue, mount } from '@vue/test-utils'

import AddManualTransactionDetails from '@/components/ViewRoutingSlip/AddManualTransactionDetails.vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

describe('addManualTransactionDetails.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const vuetify = new Vuetify({})
  it('renders component', async () => {
    const wrapper: any = mount(AddManualTransactionDetails, {
      vuetify,
      localVue,
      propsData: {
        value: []
      }
    })
    // to add first array of input on mount
    await wrapper.vm.$nextTick()
    expect(wrapper.find('[data-test="form-manual-transaction-details"]').exists()).toBeTruthy()
    expect(wrapper.vm.manualTransactionsList.length).toBe(1)
    expect(wrapper.find('[data-test="txt-quantity-0"]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test="txt-incorporation-0"]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test="txt-amount-0"]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test="btn-remove-0"]').exists()).toBeFalsy()
    expect(wrapper.find('[data-test="check-priority-0"]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test="check-future-effective-0"]').exists()).toBeTruthy()
  })

  it('add/remove manual transaction row', async () => {
    const wrapper: any = mount(AddManualTransactionDetails, {
      vuetify,
      localVue,
      propsData: {
        value: []
      }
    })

    await wrapper.vm.$nextTick()
    await wrapper.vm.addManualTransactionRow()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.manualTransactionsList.length).toBe(2)
    expect(wrapper.find('[data-test="txt-quantity-0"]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test="txt-quantity-1"]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test="btn-remove-0"]').exists()).toBeFalsy()
    expect(wrapper.find('[data-test="btn-remove-1"]').exists()).toBeTruthy()

    wrapper.find('[data-test="btn-remove-1"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.manualTransactionsList.length).toBe(1)
  })
})
