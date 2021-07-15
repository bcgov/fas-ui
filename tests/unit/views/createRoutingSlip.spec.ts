import { CreateRoutingSlip } from '@/components/RoutingSlip'
import CreateRoutingSlipView from '@/views/CreateRoutingSlipView.vue'
import { shallowMount } from '@vue/test-utils'

describe('CreateRoutingSlipView.vue', () => {
  it('Should have CreateRoutingSlipView component', () => {
    const wrapper = shallowMount(CreateRoutingSlipView, {
    })
    expect(wrapper.findComponent(CreateRoutingSlip).exists()).toBe(true)
  })
})
