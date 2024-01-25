import ConfigHelper from '@/util/config-helper'
import { Search } from '@/components/Dashboard'
import { headerSearch } from '../../test-data/mock-search-headers'
import { routingSlipMock } from '../../test-data/mock-routing-slip'
import { useRoutingSlip } from '@/composables/useRoutingSlip'
import { mount, shallowMount } from '@vue/test-utils'

describe('Search.vue', () => {
  const { headerSearchTitle, routingSlip } = useRoutingSlip()
  beforeEach(() => {
    routingSlip.value = routingSlipMock
    headerSearchTitle.key = headerSearch

    vi.resetModules()
    vi.clearAllMocks()
  })
  it('Should have h4 title', () => {
    vi.spyOn(ConfigHelper, 'getFasWebUrl').mockReturnValue('test')
    vi.spyOn(ConfigHelper, 'getPayAPIURL').mockReturnValue('https://pay-api-dev.apps.silver.devops.gov.bc.ca/api/v1')
    const wrapper = shallowMount(Search, {
      directives: {
        can () { /* stub */ }
      }
    })
    expect(wrapper.find('h4').exists()).toBeTruthy()
    expect(wrapper.find('h4').text()).toBe('Search Routing Slip')
  })
  it('displayed search header behaviour', async () => {
    vi.spyOn(ConfigHelper, 'getFasWebUrl').mockReturnValue('test')
    vi.spyOn(ConfigHelper, 'getPayAPIURL').mockReturnValue('https://pay-api-dev.apps.silver.devops.gov.bc.ca/api/v1')

    const MyStub = {
      template: '<div />'
    }
    const wrapper: any = mount(Search, {
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
