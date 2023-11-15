import { createLocalVue, mount } from '@vue/test-utils'

import { RefundRequestForm } from '@/components/ViewRoutingSlip'
import Vuetify from 'vuetify'

import { refundRequestDetails } from '../../test-data/mock-routing-slip'

describe('RefundRequestForm.vue', () => {
  const localVue = createLocalVue()

  const vuetify = new Vuetify({})
  const MyStub = {
    template: '<div />'
  }

  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('renders component', () => {
    const wrapper: any = mount(RefundRequestForm, {
      localVue,
      vuetify,
      stubs: {
        AddressForm: MyStub
      },
      propsData: {
        isEditing: true,
        inputRefundRequestDetails: refundRequestDetails
      }
    })
    expect(wrapper.find('[data-test="txtName"]').exists()).toBeTruthy()
    expect(wrapper.vm.name).toBe(refundRequestDetails.name)
    expect(wrapper.vm.address).toStrictEqual(refundRequestDetails.mailingAddress)
  })
})
