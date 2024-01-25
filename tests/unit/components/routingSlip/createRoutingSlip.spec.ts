import { CreateRoutingSlip } from '@/components/RoutingSlip'
import { mount } from '@vue/test-utils'

describe('CreateRoutingSlip.vue', () => {
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
      stubs: {
        CreateRoutingSlipPayment: MyStub,
        CreateRoutingSlipDetails: MyStub,
        displaySuccessNotification: MyStub
      },
      mocks: {
        createAndReviewButtonEventHandler: stub
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
