
import ViewRoutingSlip from '@/views/ViewRoutingSlip.vue'
import { RoutingSlipInfo, PaymentInformation } from '@/components/ViewRoutingSlip'

import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuetify from 'vuetify'

describe('ViewRoutingSlip.vue', () => {
  const localVue = createLocalVue()

  const vuetify = new Vuetify({})
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })
  it('Should have PrintRoutingSlip, RoutingSlipInfo and PaymentInformation component', () => {
    const wrapper = shallowMount(ViewRoutingSlip, {
      localVue,
      vuetify
    })
    expect(wrapper.findComponent(RoutingSlipInfo).exists()).toBe(true)
    expect(wrapper.findComponent(PaymentInformation).exists()).toBe(true)
  })
})
