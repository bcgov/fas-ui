import { address, baseAddress } from '../../test-data/mock-routing-slip'
import { createLocalVue, mount } from '@vue/test-utils'

import AddressForm from '@/components/common/AddressForm.vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import { addressSchema } from '@/schema'
import routes from '@/router/routes'

describe('AddressForm.vue', () => {
  const localVue = createLocalVue()
  const vuetify = new Vuetify({})
  const MyStub = {
    template: '<div />'
  }
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })
  it('renders component', async () => {
    const router = new VueRouter({ routes })
    const wrapper: any = mount(AddressForm, {
      localVue,
      router,
      vuetify,
      propsData: {
        schema: addressSchema,
        address,
        editing: true
      },
      stubs: {
        BaseAddress: MyStub
      }
    })
    expect(wrapper.findComponent(AddressForm).exists()).toBe(true)
    expect(wrapper.vm.inputaddress.addressCity).toBe(baseAddress.addressCity)
    expect(wrapper.vm.inputaddress.addressCountry).toBe(baseAddress.addressCountry)
    expect(wrapper.vm.inputaddress.postalCode).toBe(baseAddress.postalCode)
  })
})
