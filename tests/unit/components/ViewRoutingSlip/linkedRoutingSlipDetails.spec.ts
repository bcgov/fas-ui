import { createLocalVue, mount } from '@vue/test-utils'

import { LinkedRoutingSlipDetails } from '@/components/ViewRoutingSlip'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'

describe('LinkedRoutingSlipDetails.vue', () => {
  const localVue = createLocalVue()

  const vuetify = new Vuetify({})
  const router = new VueRouter()
  const MyStub = {
    template: '<div />'
  }

  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('renders component', () => {
    const wrapper: any = mount(LinkedRoutingSlipDetails, {
      localVue,
      router,
      vuetify,
      propsData: {
        siNumber: 'TestSiNumber',
        routingSlipNumber: '123TEST',
        createdDate: new Date('07/30/2021')
      }
    })
    expect(wrapper.find('[data-test="text-created-date"]').text()).toBe('Jul 30, 2021')
  })
})
