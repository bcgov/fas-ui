import { createLocalVue, mount } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'

import { linkedRoutingSlipsWithChildren, routingSlipMock } from '../../test-data/mock-routing-slip'
import { useRoutingSlip } from '@/composables/useRoutingSlip'
import { LinkRoutingSlip } from '@/components/ViewRoutingSlip'

describe('LinkRoutingSlip.vue', () => {
  const { linkedRoutingSlips, routingSlip } = useRoutingSlip()
  const localVue = createLocalVue()
  const vuetify = new Vuetify({})
  const router = new VueRouter()
  const MyStub = {
    template: '<div />'
  }

  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('renders non linked display', async () => {
    const wrapper: any = mount(LinkRoutingSlip, {
      localVue,
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
    routingSlip.value = routingSlipMock
    linkedRoutingSlips.value = linkedRoutingSlipsWithChildren
    const wrapper = getWrapper()
    expect(wrapper.find('[data-test="linked-routing-slip-details"]').exists()).toBeTruthy()
    expect(wrapper.vm.isRoutingSlipLinked).toBeTruthy()
    expect(wrapper.vm.isRoutingSlipAChild).toBeFalsy()
  })

  it('renders cantLinkSinceInvoicesExistMsg when invoices are more than 10', async () => {
    routingSlip.value = { ...routingSlipMock, invoices: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}] }
    linkedRoutingSlips.value = {
      children: []
    }
    const wrapper = getWrapper()
    await wrapper.vm.$nextTick()
    expect(wrapper.find('[data-test="invoice-exist-error-msg"]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test="search-link-header"]').exists()).toBeFalsy()
  })

  it('hides cantLinkSinceInvoicesExistMsg when invoices are less than 1', async () => {
    const wrapper = getWrapper()
    routingSlip.value.invoices = []
    linkedRoutingSlips.value = {
      children: []
    }
    await wrapper.vm.$nextTick()
    expect(wrapper.find('[data-test="invoice-exist-error-msg"]').exists()).toBeFalsy()
    expect(wrapper.find('[data-test="search-link-header"]').exists()).toBeTruthy()
  })
  it('hides cantLinkSinceInvoicesExistMsg when no invoices exist', async () => {
    const wrapper = getWrapper()
    routingSlip.value.invoices = []
    await wrapper.vm.$nextTick()
    expect(wrapper.find('[data-test="invoice-exist-error-msg"]').exists()).toBeFalsy()
    expect(wrapper.find('[data-test="search-link-header"]').exists()).toBeTruthy()
  })

  it('doesnt show cantLinkSinceInvoicesExistMsg when its already linked', async () => {
    const wrapper = getWrapper()
    expect(wrapper.find('[data-test="invoice-exist-error-msg"]').exists()).toBeFalsy()
  })

  function getWrapper () {
    const stub = vi.fn()

    const msg = 'Invoices exist.so cant link'
    const $t = () => msg
    const wrapper: any = mount(LinkRoutingSlip, {
      localVue,
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
