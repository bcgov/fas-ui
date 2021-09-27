import { createLocalVue, mount } from '@vue/test-utils'
import { linkedRoutingSlipsWithChildren, routingSlip } from '../../test-data/mock-routing-slip'

import { LinkRoutingSlip } from '@/components/ViewRoutingSlip'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

describe('LinkRoutingSlip.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const vuetify = new Vuetify({})
  const router = new VueRouter()
  let store
  const MyStub = {
    template: '<div />'
  }

  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('renders non linked display', async () => {
    const routingSlipModule = {
      namespaced: true,
      state: {
        routingSlip: routingSlip,
        linkedRoutingSlips: []
      },
      getters: {
        isRoutingSlipAChild: jest.fn().mockReturnValue(false),
        isRoutingSlipLinked: jest.fn().mockReturnValue(false)
      }
    }

    store = new Vuex.Store({
      strict: false,
      modules: {
        routingSlip: routingSlipModule
      }
    })

    const wrapper: any = mount(LinkRoutingSlip, {
      localVue,
      store,
      router,
      vuetify,
      stubs: {
        LinkedRoutingSlipDetails: MyStub,
        RoutingSlipAutoComplete: MyStub
      },
      directives: {
        can () { /* stub */ }
      }
    })
    wrapper.find('[data-test="btn-add-link-rs"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('[data-test="routing-slip-auto-complete"]').exists()).toBeTruthy()
  })

  it('renders linked display', async () => {
    const routingSlipModule = {
      namespaced: true,
      state: {
        routingSlip: routingSlip,
        linkedRoutingSlips: linkedRoutingSlipsWithChildren
      },
      getters: {
        isRoutingSlipAChild: jest.fn().mockReturnValue(false),
        isRoutingSlipLinked: jest.fn().mockReturnValue(true)
      }
    }

    const wrapper = getWrapper(routingSlipModule)
    expect(wrapper.find('[data-test="linked-routing-slip-details"]').exists()).toBeTruthy()
    expect(wrapper.vm.isRoutingSlipLinked).toBeTruthy()
    expect(wrapper.vm.isRoutingSlipAChild).toBeFalsy()
  })

  it('renders cantLinkSinceInvoicesExistMsg when invoices are more than 10', async () => {
    const routingSlipModule = {
      namespaced: true,
      state: {
        routingSlip: routingSlip,
        linkedRoutingSlips: linkedRoutingSlipsWithChildren
      },
      getters: {
        isRoutingSlipAChild: jest.fn().mockReturnValue(false),
        isRoutingSlipLinked: jest.fn().mockReturnValue(false),
        invoiceCount: jest.fn().mockReturnValue(10)
      }
    }

    const wrapper = getWrapper(routingSlipModule)
    expect(wrapper.find('[data-test="invoice-exist-error-msg"]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test="search-link-header"]').exists()).toBeFalsy()
  })

  it('hides cantLinkSinceInvoicesExistMsg when invoices are less than 1', async () => {
    const routingSlipModule = {
      namespaced: true,
      state: {
        routingSlip: routingSlip,
        linkedRoutingSlips: linkedRoutingSlipsWithChildren
      },
      getters: {
        isRoutingSlipAChild: jest.fn().mockReturnValue(false),
        isRoutingSlipLinked: jest.fn().mockReturnValue(false),
        invoiceCount: jest.fn().mockReturnValue(0)
      }
    }

    const wrapper = getWrapper(routingSlipModule)
    expect(wrapper.find('[data-test="invoice-exist-error-msg"]').exists()).toBeFalsy()
    expect(wrapper.find('[data-test="search-link-header"]').exists()).toBeTruthy()
  })
  it('hides cantLinkSinceInvoicesExistMsg when no invoices exist', async () => {
    const routingSlipModule = {
      namespaced: true,
      state: {
        routingSlip: routingSlip,
        linkedRoutingSlips: linkedRoutingSlipsWithChildren
      },
      getters: {
        isRoutingSlipAChild: jest.fn().mockReturnValue(false),
        isRoutingSlipLinked: jest.fn().mockReturnValue(false)
      }
    }

    const wrapper = getWrapper(routingSlipModule)
    expect(wrapper.find('[data-test="invoice-exist-error-msg"]').exists()).toBeFalsy()
    expect(wrapper.find('[data-test="search-link-header"]').exists()).toBeTruthy()
  })

  it('doesnt show cantLinkSinceInvoicesExistMsg when its already linked', async () => {
    const routingSlipModule = {
      namespaced: true,
      state: {
        routingSlip: routingSlip,
        linkedRoutingSlips: linkedRoutingSlipsWithChildren
      },
      getters: {
        isRoutingSlipAChild: jest.fn().mockReturnValue(false),
        isRoutingSlipLinked: jest.fn().mockReturnValue(true)
      }
    }
    const wrapper = getWrapper(routingSlipModule)
    expect(wrapper.find('[data-test="invoice-exist-error-msg"]').exists()).toBeFalsy()
  })

  function getWrapper (routingSlipModule) {
    const stub = jest.fn()
    store = new Vuex.Store({
      strict: false,
      modules: {
        routingSlip: routingSlipModule
      }
    })

    const msg = 'Invoices exist.so cant link'
    const $t = () => msg
    const wrapper: any = mount(LinkRoutingSlip, {
      localVue,
      store,
      router,
      vuetify,
      stubs: {
        LinkedRoutingSlipDetails: MyStub,
        RoutingSlipAutoComplete: MyStub
      },
      directives: {
        can () { /* stub */
        }
      },
      mocks: {
        toggleSearch: stub,
        mocks: { $t }
      }
    })
    return wrapper
  }
})
