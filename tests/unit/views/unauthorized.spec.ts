import { shallowMount } from '@vue/test-utils'
import Unauthorized from '@/views/Unauthorized.vue'

describe('Unauthorized.vue', () => {
  let vm: any

  it('initializes unauthorized view', () => {
    const wrapper = shallowMount(Unauthorized, {
    })
    vm = wrapper.vm
    expect(vm.$el.querySelector('#contact-btn')).not.toBeNull()
  })
})
