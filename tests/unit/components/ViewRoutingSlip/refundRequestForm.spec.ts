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

  it('renders component with name and address', () => {
    const wrapper = mount(RefundRequestForm, {
      localVue,
      vuetify,
      propsData: {
        isEditing: true,
        inputRefundRequestDetails: {
          name: 'Test Name',
          mailingAddress: {
            street: '123 Test St',
            city: 'Test City',
            region: 'Test Region',
            postalCode: '12345',
            country: 'Test Country'
          }
        }
      }
    })
    expect(wrapper.find('[data-test="txtName"]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test="rsDetail"]').exists()).toBeTruthy()
    expect(wrapper.vm.name).toBe('Test Name')
    expect(wrapper.vm.address).toBe({
      street: '123 Test St',
      city: 'Test City',
      region: 'Test Region',
      postalCode: '12345',
      country: 'Test Country'
    })
    expect(wrapper.find('.col-3.font-weight-bold.pb-0').text()).toContain('Name of Person or Organization & Address')
  })

  it('renders component without name and address', () => {
    const wrapper = mount(RefundRequestForm, {
      localVue,
      vuetify,
      propsData: {
        isEditing: true,
        inputRefundRequestDetails: {} // Empty details
      }
    })
    expect(wrapper.find('[data-test="txtName"]').exists()).toBeTruthy()
    expect(wrapper.vm.name).toBe('')
    expect(wrapper.vm.address).toBe({})
    expect(wrapper.find('[data-test="rsDetail"]').exists()).toBeFalsy()
    expect(wrapper.find('.col-3.font-weight-bold.pb-0').exists()).toBeFalsy()
  })
})
