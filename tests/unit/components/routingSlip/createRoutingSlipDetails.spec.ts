import { createLocalVue, shallowMount } from '@vue/test-utils'

import { CreateRoutingSlipDetails } from '@/components/RoutingSlip'

describe('CreateRoutingSlipDetails.vue', () => {
  let store
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('renders component', () => {
    const wrapper = shallowMount(CreateRoutingSlipDetails, {
      store
    })
    expect(wrapper.find('p').exists()).toBeTruthy()
    expect(wrapper.find('p').text()).toBe('Routing slip')
    expect(wrapper.find("[data-test='txtNumberId']").exists()).toBeTruthy()
    expect(wrapper.find("[data-test='txtEntityNumber']").exists()).toBeTruthy()
    expect(wrapper.find("[data-test='txtRoutingSlipDate']").exists()).toBeTruthy()
  })
})
