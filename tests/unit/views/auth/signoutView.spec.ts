import { shallowMount } from '@vue/test-utils'
import SignoutView from '@/views/auth/SignoutView.vue'
import SbcSignout from 'sbc-common-components/src/components/SbcSignout.vue'

describe('SignoutView.vue', () => {
  it('is a Vue instance', () => {
    const wrapper = shallowMount(SignoutView, { })
    // expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.findComponent(SbcSignout).exists()).toBe(true)
  })
})
