import { createLocalVue, mount, shallowMount } from '@vue/test-utils'

import { CreateRoutingSlip } from '@/components/RoutingSlip'
import Vue from 'vue'
import Vuetify from 'vuetify'
import initialize from '@/plugins/i18n'

describe('CreateRoutingSlip.vue', () => {
  const i18n = initialize(Vue)
  const vuetify = new Vuetify({})

  let store
  const MyStub = {
    template: '<div />'
  }

  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('renders component', () => {
    const wrapper = mount(CreateRoutingSlip, {
      vuetify,
      i18n,
      stubs: {
        CreateRoutingSlipPayment: MyStub,
        CreateRoutingSlipDetails: MyStub,
        ModalDialog: MyStub
      },
      mocks: {
        modalDialogDetails: {
          modalDialogTitle: 'Title'
        }
      }
    })
    expect(wrapper.find('[data-test="title"]').text()).toBe('Add Routing Slip')
  })

  it('create button validation', async () => {
    const stub = vi.fn().mockReturnValue(true)
    const wrapper: any = mount(CreateRoutingSlip, {
      store,
      vuetify,
      i18n,
      stubs: {
        CreateRoutingSlipPayment: MyStub,
        CreateRoutingSlipDetails: MyStub,
        displaySuccessNotification: MyStub
      },
      mocks: {
        createandReviewButtonEventHandler: stub
      }
    })
    expect(wrapper.find('[data-test="btn-create-routing-slip"]').exists()).toBeTruthy()
    wrapper.find('[data-test="btn-create-routing-slip"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(stub).toHaveBeenCalledTimes(1)
  })

  it('cancel button validation', async () => {
    const stub = vi.fn().mockReturnValue(true)
    const wrapper: any = mount(CreateRoutingSlip, {
      store,
      vuetify,
      i18n,
      stubs: {
        CreateRoutingSlipPayment: MyStub,
        CreateRoutingSlipDetails: MyStub,
        displaySuccessNotification: MyStub
      },
      mocks: {
        cancel: stub
      }
    })
    expect(wrapper.find('[data-test="btn-back"]').exists()).toBeTruthy()
    wrapper.find('[data-test="btn-back"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(stub).toHaveBeenCalledTimes(1)

    expect(wrapper.find('[data-test="btn-cancel-create-routing-slip"]').exists()).toBeTruthy()
    wrapper.find('[data-test="btn-cancel-create-routing-slip"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(stub).toHaveBeenCalledTimes(2)
  })
})
