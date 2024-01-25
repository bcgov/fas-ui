import StatusList from '@/components/common/StatusList.vue'
import axios from '@/util/http-util'
import { routingSlipStatusListMock } from '../../test-data/mock-code'
import sinon from 'sinon'
import { useCodes } from '@/composables/useCodes'
import { useRoutingSlip } from '@/composables/useRoutingSlip'
import { mount } from '@vue/test-utils'

const { routingSlipStatusList } = useCodes()
vi.mock('@/util/http-util')

describe('StatusList.vue', () => {
  let sandbox
  let get
  let wrapper

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
       props: {
        modelValue: 'ACTIVE'
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
    const descriptions = wrapper.vm.routingSlipStatusList.map(status => status.description)

    // Check if the "Refund Rejected" option is not in the status list
    expect(descriptions).toContain('Active')
    expect(descriptions).not.toContain('Refund Rejected')
  })
})
