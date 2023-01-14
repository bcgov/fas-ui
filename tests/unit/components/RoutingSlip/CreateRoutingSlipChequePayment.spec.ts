import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import CreateRoutingSlipChequePayment from '@/components/RoutingSlip/CreateRoutingSlipChequePayment.vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { chequePayment } from '@/composables/state'

describe('CreateRoutingSlipChequePayment.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuetify)
  const vuetify = new Vuetify({})
  const chequePaymentMock = [{ chequeReceiptNumber: '1234', paymentDate: '', paidAmount: 20 }]
  beforeEach(() => {
    chequePayment.value = chequePaymentMock
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('renders with 3 input', async () => {
    const wrapper = shallowMount(CreateRoutingSlipChequePayment, {
    })
    // to add first array of input on mount
    await wrapper.vm.$nextTick()

    const reciptNumber: any = wrapper.find('[data-test="number-0"]')
    const txtPaidAmount: any = wrapper.find('[data-test="paidAmount-0"]')
    const paymentDate: any = wrapper.find('[data-test="paymentDate-0"]')
    expect(reciptNumber.exists()).toBeTruthy()
    expect(txtPaidAmount.exists()).toBeTruthy()
    expect(paymentDate.exists()).toBeTruthy()
  })

  it('On click of add button it should add one row of input', async () => {
    const wrapper:any = mount(CreateRoutingSlipChequePayment, {
      localVue,
      vuetify
    })
    await wrapper.vm.$nextTick()
    // spying on method
    const addCheque = jest.spyOn(wrapper.vm, 'addCheque')

    wrapper.find('[data-test="add-cheque-button"]').trigger('click')

    await wrapper.vm.$nextTick()
    expect(addCheque).toHaveBeenCalled()
    expect(wrapper.vm.chequeList.length).toBe(2)
  })

  it('On  click of remove button it should remove one row of input', async () => {
    const wrapper:any = mount(CreateRoutingSlipChequePayment, {
      localVue,
      vuetify
    })
    await wrapper.vm.$nextTick()
    // spying on method
    const addCheque = jest.spyOn(wrapper.vm, 'addCheque')
    const removeCheque = jest.spyOn(wrapper.vm, 'removeCheque')

    // adding one more row
    wrapper.find('[data-test="add-cheque-button"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(addCheque).toHaveBeenCalled()
    // check array length
    expect(wrapper.vm.chequeList.length).toBe(2)

    // now removing
    wrapper.find('[data-test="removeChecque-1"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(removeCheque).toHaveBeenCalled()
    // check array length
    expect(wrapper.vm.chequeList.length).toBe(1)
  })
})
