import { createLocalVue, shallowMount } from '@vue/test-utils'

import { CreateRoutingSlipDetails } from '@/components/RoutingSlip'
import Vuetify from 'vuetify'

describe('CreateRoutingSlipDetails.vue', () => {
  const localVue = createLocalVue()

  const vuetify = new Vuetify({})
  let store
  const MyStub = {
    template: '<div />'
  }

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
