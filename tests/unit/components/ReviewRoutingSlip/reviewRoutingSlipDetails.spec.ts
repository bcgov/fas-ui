import { accountInfo, cashPayment, chequePayment, routingSlipDetails } from '../../test-data/mock-routing-slip'
import { createLocalVue, mount } from '@vue/test-utils'

import { ReviewRoutingSlipDetails } from '@/components/ReviewRoutingSlip'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import commonUtil from '@/util/common-util'

describe('ReviewRoutingSlipDetails.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const vuetify = new Vuetify({})

  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('renders component', async () => {
    const wrapper: any = mount(ReviewRoutingSlipDetails, {
      localVue,
      vuetify,
      propsData: {
        routingSlipDetails: routingSlipDetails,
        accountInfo: accountInfo
      }
    })
    expect(wrapper.vm.routingSlipDetails).toStrictEqual(routingSlipDetails)
    expect(wrapper.vm.accountInfo).toStrictEqual(accountInfo)

    expect(wrapper.find('[data-test="txt-routing-slip-number"]').text()).toEqual(routingSlipDetails.number)
    expect(wrapper.find('[data-test="txt-routing-slip-name"]').text()).toEqual(accountInfo.accountName)
  })
})
