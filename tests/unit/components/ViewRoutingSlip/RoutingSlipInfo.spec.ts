import { createLocalVue, mount, shallowMount } from '@vue/test-utils'

import CommonUtils from '@/util/common-util'
import { RoutingSlipInfo } from '@/components/ViewRoutingSlip'
import { SlipStatus } from '@/util/constants'
import Vuetify from 'vuetify'
import StatusMenu from '@/components/common/StatusMenu.vue'
import ConfigHelper from '@/util/config-helper'

describe('RoutingSlipInfo.vue', () => {
  const localVue = createLocalVue()
  const vuetify = new Vuetify({})
  const MyStub = {
    template: '<div />'
  }
  const i18n = () => { return t => '' }

  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('renders component', () => {
    jest.spyOn(CommonUtils, 'isApproverRole').mockReturnValue(false)
    jest.spyOn(CommonUtils, 'isVoidRole').mockReturnValue(false)
    jest.spyOn(ConfigHelper, 'getFasWebUrl').mockReturnValue('test')
    jest.spyOn(ConfigHelper, 'getPayAPIURL').mockReturnValue('https://pay-api-dev.apps.silver.devops.gov.bc.ca/api/v1')
    const wrapper = shallowMount(RoutingSlipInfo, {
      localVue,
      vuetify,
      directives: {
        can () { /* stub */ }
      },
      stubs: {
        RefundRequestForm: MyStub
      },
      mocks: { i18n }
    })
    expect(wrapper.find('[data-test="title"]').text()).toBe('Routing Slip Information')
    expect(wrapper.find('[data-test="label-status"]').exists()).toBeTruthy()
  })

  it('should have StatusMenu component', async () => {
    jest.spyOn(CommonUtils, 'isApproverRole').mockReturnValue(false)
    jest.spyOn(CommonUtils, 'isVoidRole').mockReturnValue(false)
    jest.spyOn(ConfigHelper, 'getFasWebUrl').mockReturnValue('test')
    jest.spyOn(ConfigHelper, 'getPayAPIURL').mockReturnValue('https://pay-api-dev.apps.silver.devops.gov.bc.ca/api/v1')
    const wrapper = shallowMount(RoutingSlipInfo, {
      localVue,
      vuetify,
      directives: {
        can () { /* stub */ }
      }
    })

    expect(wrapper.find('[data-test="label-status"]').exists()).toBeTruthy()
    expect(wrapper.findComponent(StatusMenu).exists()).toBeTruthy()
  })

  it('Refund approval/cancel flow', async () => {
    jest.spyOn(CommonUtils, 'isApproverRole').mockReturnValue(false)
    jest.spyOn(CommonUtils, 'isVoidRole').mockReturnValue(false)
    jest.spyOn(ConfigHelper, 'getFasWebUrl').mockReturnValue('test')
    jest.spyOn(ConfigHelper, 'getPayAPIURL').mockReturnValue('https://pay-api-dev.apps.silver.devops.gov.bc.ca/api/v1')
    const wrapper: any = mount(RoutingSlipInfo, {
      localVue,
      vuetify,
      directives: {
        can () { /* stub */ }
      },
      data: {
        currentStatus: SlipStatus.REFUNDREQUEST,
        editMode: true,
        isAddressEditable: true
      },
      mocks: { i18n }
    })

    expect(wrapper.find('[data-test="label-status"]').exists()).toBeTruthy()
    expect(wrapper.findComponent(StatusMenu).exists()).toBeTruthy()

    // fix selected value by passing props
    // wrapper.find('[data-test="btn-edit"]').trigger('click')
    // await wrapper.vm.$nextTick()

    // expect(wrapper.findComponent(StatusMenu).exists()).toBeTruthy()
    // expect(wrapper.vm.showAddressEditMode).toBeTruthy()
  })
})
