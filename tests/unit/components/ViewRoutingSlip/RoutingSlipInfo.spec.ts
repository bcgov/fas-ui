import { createLocalVue, mount, shallowMount } from '@vue/test-utils'

import CommonUtils from '@/util/common-util'
import { RoutingSlipInfo } from '@/components/ViewRoutingSlip'
import { SlipStatus } from '@/util/constants'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { routingSlip } from '../../test-data/mock-routing-slip'
import { routingSlipStatusList } from '../../test-data/mock-code'
import StatusMenu from '@/components/common/StatusMenu.vue'

describe('RoutingSlipInfo.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const vuetify = new Vuetify({})
  let store
  const MyStub = {
    template: '<div />'
  }
  const i18n = () => { return t => '' }

  beforeEach(() => {
    const routingSlipModule = {
      namespaced: true,
      state: {
        routingSlip: routingSlip
      }
    }

    const codesModule = {
      namespaced: true,
      state: {
        routingSlipStatusList
      },
      actions: {
        getRoutingSlipStatusList: jest.fn()
      }
    }

    store = new Vuex.Store({
      strict: false,
      modules: {
        routingSlip: routingSlipModule,
        fasCodes: codesModule
      }
    })

    jest.resetModules()
    jest.clearAllMocks()
  })

  it('renders component', () => {
    jest.spyOn(CommonUtils, 'isApproverRole').mockReturnValue(false)
    jest.spyOn(CommonUtils, 'isVoidRole').mockReturnValue(false)
    const wrapper = shallowMount(RoutingSlipInfo, {
      store,
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
    const wrapper = shallowMount(RoutingSlipInfo, {
      store,
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
    const wrapper: any = mount(RoutingSlipInfo, {
      store,
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
