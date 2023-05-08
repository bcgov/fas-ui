import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import StatusList from '@/components/common/StatusList.vue'
import Vuetify from 'vuetify'

import { routingSlipStatusListMock } from '../../test-data/mock-code'
import { useCodes } from '@/composables/useCodes'
import CodesService from '@/services/codes.service'
import { useRoutingSlip } from '@/composables/useRoutingSlip'
import sinon from 'sinon'

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

  it('removes Refund Rejected option', async () => {
    // Mock the API call to return the list of routing slip statuses
    const sandbox = sinon.createSandbox()
    const get = sandbox.stub(CodesService, 'getCodes')
    get.returns(new Promise(resolve => resolve({ data: { codes: routingSlipStatusListMock } })))

    // Render the StatusList component
    const wrapper = mount(StatusList, {
      localVue,
      vuetify,
      propsData: {
        value: 'ACTIVE'
      }
    })

    // Wait for the component to finish rendering
    await wrapper.vm.$nextTick()

    // taking all of the descriptions
    const descriptions = wrapper.vm.routingSlipStatusList.map(status => status.description)
    // Check if the "Refund Rejected" option is not in the status list
    expect(descriptions).toContain('Active')
    expect(descriptions).not.toContain('Refund Rejected')
  })
})
