import Unauthorized from '@/views/Unauthorized.vue'
import { shallowMount } from '@vue/test-utils'

describe('Unauthorized.vue', () => {
  let vm: any

  it('initializes unauthorized view', () => {
    const wrapper = shallowMount(Unauthorized, {
    })
    vm = wrapper.vm
    expect(vm.$el.querySelector('#contact-btn')).not.toBeNull()
  })
})
