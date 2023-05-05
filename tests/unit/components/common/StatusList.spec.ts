import { createLocalVue, shallowMount } from '@vue/test-utils'
import StatusList from '@/components/common/StatusList.vue'
import Vuetify from 'vuetify'

import { routingSlipStatusListMock } from '../../test-data/mock-code'
import { useCodes } from '@/composables/useCodes'
import CodesService from '@/services/codes.service'
import { useRoutingSlip } from '@/composables/useRoutingSlip'

const { routingSlipStatusList, getRoutingSlipStatusList } = useCodes()

describe('StatusList.vue', () => {
  const localVue = createLocalVue()

  const vuetify = new Vuetify({})
  beforeEach(() => {
    routingSlipStatusList.value = routingSlipStatusListMock
    jest.spyOn(useRoutingSlip(), 'getFeeByCorpTypeAndFilingType').mockResolvedValue(0)
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('renders status list', () => {
    const wrapper = shallowMount(StatusList, {
      localVue,
      vuetify,
      propsData: {
        value: 'ACTIVE'
      }
    })
    expect(wrapper.find('[data-test="select-status"]').exists()).toBeTruthy()
  })

  it('does not render Refund Rejected option', () => {
    const wrapper = shallowMount(StatusList, {
      localVue,
      vuetify,
      propsData: {
        value: 'ACTIVE'
      }
    })
    // Check if the "Refund Rejected" option is not in the status list
    expect(wrapper.text()).not.toContain('Refund Rejected')
  })
})
