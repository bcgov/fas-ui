import { createLocalVue, shallowMount } from '@vue/test-utils'
import StatusList from '@/components/common/StatusList.vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { routingSlipStatusList } from '../../test-data/mock-code'

describe('StatusList.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const vuetify = new Vuetify({})
  let store
  beforeEach(() => {
    const codesModule = {
      namespaced: true,
      state: {
        routingSlipStatusList
      },
      actions: {
        getRoutingSlipStatusList: jest.fn()
      }
    }

    store = new Vuex.Store({
      strict: false,
      modules: {
        fasCodes: codesModule
      }
    })

    jest.resetModules()
    jest.clearAllMocks()
  })

  it('renders status list', () => {
    const wrapper = shallowMount(StatusList, {
      store,
      localVue,
      vuetify,
      propsData: {
        value: 'ACTIVE'
      }
    })
    expect(wrapper.find('[data-test="select-status"]').exists()).toBeTruthy()
  })
})
