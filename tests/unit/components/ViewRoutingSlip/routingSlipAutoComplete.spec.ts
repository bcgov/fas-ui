import { autoCompleteRoutingSlips, routingSlipMock } from '../../test-data/mock-routing-slip'
import { createLocalVue, mount } from '@vue/test-utils'

import { RoutingSlipAutoComplete } from '@/components/ViewRoutingSlip'
import Vuetify from 'vuetify'

describe('RoutingSlipAutoComplete.vue', () => {
  const localVue = createLocalVue()

  const vuetify = new Vuetify({})
  const MyStub = {
    template: '<div />'
  }

  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('renders component', () => {
    const wrapper: any = mount(RoutingSlipAutoComplete, {
      localVue,
      vuetify,
      stubs: {
        ReviewRoutingSlipDetails: MyStub,
        ReviewRoutingSlipPayment: MyStub
      }
    })
    expect(wrapper.find('[data-test="btn-link-rs"]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test="btn-cancel-link"]').exists()).toBeTruthy()
  })

  it('UI behaviour', async () => {
    const stub = vi.fn()
    const wrapper: any = mount(RoutingSlipAutoComplete, {
      localVue,
      vuetify,
      stubs: {
        ReviewRoutingSlipDetails: MyStub,
        ReviewRoutingSlipPayment: MyStub
      },
      mocks: {
        searchRS: stub
      }
    })
    wrapper.find('[data-test="btn-cancel-link"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('toggleSearch')).toBeTruthy()

    wrapper.find('[data-test="btn-link-rs"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(stub).toBeCalled()
  })
})
