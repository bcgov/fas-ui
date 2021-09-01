import { filingType } from '../../test-data/mock-routing-slip'
import { createLocalVue, mount } from '@vue/test-utils'

import { FilingTypeAutoComplete } from '@/components/ViewRoutingSlip'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

describe('FilingTypeAutoComplete.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const vuetify = new Vuetify({})
  let store
  const MyStub = {
    template: '<div />'
  }

  beforeEach(() => {
    const routingSlipModule = {
      namespaced: true,
      state: {
        autoCompleteFilingTypes: filingType
      },
      actions: {
        getAutoCompleteFilingTypes: jest.fn()
      }
    }

    store = new Vuex.Store({
      strict: false,
      modules: {
        routingSlip: routingSlipModule
      }
    })

    jest.resetModules()
    jest.clearAllMocks()
  })

  it('renders component', () => {
    const wrapper: any = mount(FilingTypeAutoComplete, {
      store,
      localVue,
      vuetify
    })

    expect(
      wrapper.find('[data-test="input-filing-type"]').exists()
    ).toBeTruthy()
  })
})
