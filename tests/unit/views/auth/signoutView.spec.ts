import SbcSignout from 'sbc-common-components/src/components/SbcSignout.vue'
import SignoutView from '@/views/auth/SignoutView.vue'
import { shallowMount } from '@vue/test-utils'

describe('SignoutView.vue', () => {
  it('is a Vue instance', () => {
    const wrapper = shallowMount(SignoutView, { })
    // expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.findComponent(SbcSignout).exists()).toBe(true)
  })
})
