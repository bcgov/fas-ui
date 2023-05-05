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

  it('removes item with code "REFUND_REJECTED"', async () => {
    // Define mock data
    const mockStatusList = [
      { code: 'STATUS_1', description: 'Status 1' },
      { code: 'STATUS_2', description: 'Status 2' },
      { code: 'STATUS_3', description: 'Status 3' },
      { code: 'REFUND_REJECTED', description: 'Refund Rejected' },
      { code: 'STATUS_4', description: 'Status 4' },
    ]
  
    // Mock the getRoutingSlipStatusList method to return the mock data
    const getRoutingSlipStatusList = jest.fn().mockResolvedValueOnce(mockStatusList)
  
    // Set the routingSlipStatusList array to the mock data
    routingSlipStatusList.value = mockStatusList
  
    // Remove the item with code "REFUND_REJECTED" from the list
    routingSlipStatusList.value = routingSlipStatusList.value.filter(
      code => code.code !== "REFUND_REJECTED"
    )
  
    // Call the getRoutingSlipStatusList method to update the list
    await getRoutingSlipStatusList()
  
    // Check that the removed item is no longer in the list
    expect(routingSlipStatusList.value.some(code => code.code === "REFUND_REJECTED")).toBeFalsy()
  
    // Reset the routingSlipStatusList array to its original state
    await getRoutingSlipStatusList()
  })
})
