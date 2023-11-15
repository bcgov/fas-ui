import { createLocalVue, mount, shallowMount, Wrapper } from '@vue/test-utils'
import StatusList from '@/components/common/StatusList.vue'
import Vuetify from 'vuetify'

import { routingSlipStatusListMock } from '../../test-data/mock-code'
import { useCodes } from '@/composables/useCodes'
import { useRoutingSlip } from '@/composables/useRoutingSlip'
import sinon from 'sinon'
import axios from '@/util/http-util'

const { routingSlipStatusList } = useCodes()

describe('StatusList.vue', () => {
  let wrapper: Wrapper<StatusList, Element>
  let sandbox
  let get

  const localVue = createLocalVue()

  const vuetify = new Vuetify({})
  beforeEach(async () => {
    routingSlipStatusList.value = []
    vi.spyOn(useRoutingSlip(), 'getFeeByCorpTypeAndFilingType').mockResolvedValue(0)
    vi.resetModules()
    vi.clearAllMocks()
    sandbox = sinon.createSandbox()
    get = sandbox.stub(axios, 'get')
    get.returns(new Promise(resolve => resolve({ data: { codes: routingSlipStatusListMock }, status: 200 })))

    // Render the StatusList component
    wrapper = mount(StatusList, {
      localVue,
      vuetify,
      propsData: {
        value: 'ACTIVE'
      }
    })

    // Wait for the component to finish rendering
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
  })

  afterEach(() => {
  // Clean up the sinon sandbox
    sandbox.restore()
  })

  it('renders status list', () => {
    expect(wrapper.find('[data-test="select-status"]').exists()).toBeTruthy()
  })

  it('removes Refund Rejected option', async () => {
    expect(get.getCall(0)).not.toBeNull()
    // Get all of the descriptions from the rendered status list
    const descriptions = wrapper.vm.$data.routingSlipStatusList.map(status => status.description)

    // Check if the "Refund Rejected" option is not in the status list
    expect(descriptions).toContain('Active')
    expect(descriptions).not.toContain('Refund Rejected')
  })
})
