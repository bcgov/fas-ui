
import { PaymentInformation, RoutingSlipInfo } from '@/components/ViewRoutingSlip'
import ViewRoutingSlip from '@/views/ViewRoutingSlip.vue'
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
