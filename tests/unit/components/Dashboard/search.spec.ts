import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import { headerSearch, updatedHeaderSearch } from '../../test-data/mock-search-headers'

import { Search } from '@/components/Dashboard'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { routingSlip } from '../../test-data/mock-routing-slip'

describe('Search.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const vuetify = new Vuetify({})
  let store
  beforeEach(() => {
    const routingSlipModule = {
      namespaced: true,
      state: {
        routingSlip: routingSlip,
        searchRoutingSlipParams: [],
        searchRoutingSlipResult: []
      },
      actions: {
        searchRoutingSlip: jest.fn()
      },
      mutations: {
        setChequePayment: jest.fn(),
        setCashPayment: jest.fn(),
        setSearchRoutingSlipParams: jest.fn()
      }
    }

    const codesModule = {
      namespaced: true,
      state: {
        routingSlipStatusList: []
      },
      actions: {
        getRoutingSlipStatusList: jest.fn()
      }
    }

    store = new Vuex.Store({
      strict: false,
      modules: {
        routingSlip: routingSlipModule,
        codes: codesModule
      }
    })

    jest.resetModules()
    jest.clearAllMocks()
  })
  it('Should have h4 title', () => {
    const wrapper = shallowMount(Search, {
      store,
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
    const MyStub = {
      template: '<div />'
    }
    const wrapper: any = mount(Search, {
      store,
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
    await wrapper.setData({ headerSearch: updatedHeaderSearch })
    expect(wrapper.vm.headerSearch).toStrictEqual(updatedHeaderSearch)
    const displayedHeaderSearch = updatedHeaderSearch.filter((header) => header.display)
    expect(wrapper.vm.displayedHeaderSearch).toStrictEqual(displayedHeaderSearch)

    expect(wrapper.vm.canShowColumn('routingSlipNumber')).toBeFalsy()
    expect(wrapper.vm.canShowColumn('receiptNumber')).toBeFalsy()
    expect(wrapper.vm.canShowColumn('date')).toBeTruthy()
    expect(wrapper.vm.canShowColumn('status')).toBeTruthy()
    expect(wrapper.vm.canShowColumn('folioNumber')).toBeTruthy()
    expect(wrapper.vm.canShowColumn('initiator')).toBeTruthy()
    expect(wrapper.vm.canShowColumn('total')).toBeTruthy()
  })
})
