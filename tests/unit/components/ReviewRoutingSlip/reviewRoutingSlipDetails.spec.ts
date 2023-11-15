import { accountInfoMock, routingSlipDetailsMock } from '../../test-data/mock-routing-slip'
import { createLocalVue, mount } from '@vue/test-utils'

import { ReviewRoutingSlipDetails } from '@/components/ReviewRoutingSlip'
import Vuetify from 'vuetify'

describe('ReviewRoutingSlipDetails.vue', () => {
  const localVue = createLocalVue()

  const vuetify = new Vuetify({})

  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('renders component', async () => {
    const wrapper: any = mount(ReviewRoutingSlipDetails, {
      localVue,
      vuetify,
      propsData: {
        routingSlipDetails: routingSlipDetailsMock,
        accountInfo: accountInfoMock
      }
    })
    expect(wrapper.vm.routingSlipDetails).toStrictEqual(routingSlipDetailsMock)
    expect(wrapper.vm.accountInfo).toStrictEqual(accountInfoMock)

    expect(wrapper.find('[data-test="txt-routing-slip-number"]').text()).toEqual(routingSlipDetailsMock.number)
    expect(wrapper.find('[data-test="txt-routing-slip-name"]').text()).toEqual(accountInfoMock.accountName)
    expect(wrapper.find('[data-test="txt-routing-slip-date"]').text()).toBe('August 13, 2021')
  })
})
