import { address, baseAddress } from '../../test-data/mock-routing-slip'
import AddressForm from '@/components/common/AddressForm.vue'
import { mount } from '@vue/test-utils'
import { addressSchema } from '@/schema'
import routes from '@/router/routes'
import { createRouter, createWebHistory } from 'vue-router'

describe('AddressForm.vue', () => {
  const MyStub = {
    template: '<div />'
  }
  let router
  beforeEach(() => {
    router = createRouter({
      history: createWebHistory(),
      routes
    })
    vi.resetModules()
    vi.clearAllMocks()
  })
  it('renders component', async () => {
    const wrapper: any = mount(AddressForm, {
      router,
      props: {
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
