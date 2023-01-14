import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import { headerSearch } from '../../test-data/mock-search-headers'

import { Search } from '@/components/Dashboard'
import Vuetify from 'vuetify'
import { routingSlipMock } from '../../test-data/mock-routing-slip'
import { headerSearchTitle, routingSlip } from '@/composables/state'

import ConfigHelper, * as f from '@/util/config-helper'

describe('Search.vue', () => {
  const localVue = createLocalVue()
  const vuetify = new Vuetify({})
  beforeEach(() => {
    routingSlip.value = routingSlipMock
    headerSearchTitle.value = headerSearch

    jest.resetModules()
    jest.clearAllMocks()
  })
  it('Should have h4 title', () => {
    jest.spyOn(ConfigHelper, 'getFasWebUrl').mockReturnValue('test')
    jest.spyOn(ConfigHelper, 'getPayAPIURL').mockReturnValue('https://pay-api-dev.apps.silver.devops.gov.bc.ca/api/v1')
    const wrapper = shallowMount(Search, {
      localVue,
      vuetify,
      directives: {
        can () { /* stub */ }
      }
    })
    expect(wrapper.find('h4').exists()).toBeTruthy()
    expect(wrapper.find('h4').text()).toBe('Search Routing Slip')
  })
  it('displayed search header behaviour', async () => {
    jest.spyOn(ConfigHelper, 'getFasWebUrl').mockReturnValue('test')
    jest.spyOn(ConfigHelper, 'getPayAPIURL').mockReturnValue('https://pay-api-dev.apps.silver.devops.gov.bc.ca/api/v1')

    const MyStub = {
      template: '<div />'
    }
    const wrapper: any = mount(Search, {
      localVue,
      vuetify,
      stubs: {
        DateRangeFilter: MyStub,
        SearchColumnFilterComponent: MyStub,
        statusList: MyStub
      },
      directives: {
        can () { /* stub */ }
      }
    })
    expect(wrapper.vm.headerSearch).toStrictEqual(headerSearch)

    expect(wrapper.vm.canShowColumn('routingSlipNumber')).toBeTruthy()
    expect(wrapper.vm.canShowColumn('receiptNumber')).toBeTruthy()
    expect(wrapper.vm.canShowColumn('date')).toBeTruthy()
    expect(wrapper.vm.canShowColumn('status')).toBeTruthy()
    expect(wrapper.vm.canShowColumn('folioNumber')).toBeTruthy()

    expect(wrapper.vm.canShowColumn('remainingAmount')).toBeTruthy()
  })
})
