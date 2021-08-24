import { autoCompleteRoutingSlips, routingSlip } from '../../test-data/mock-routing-slip'
import { createLocalVue, mount } from '@vue/test-utils'

import { LinkedRoutingSlipDetails } from '@/components/ViewRoutingSlip'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

describe('LinkedRoutingSlipDetails.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const vuetify = new Vuetify({})
  const router = new VueRouter()
  const MyStub = {
    template: '<div />'
  }

  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
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
