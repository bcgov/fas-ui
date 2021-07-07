import { shallowMount } from '@vue/test-utils'
import SigninView from '@/views/auth/SigninView.vue'
// import { Dashboard } from '@/components/Dashboard'
import SbcSignin from 'sbc-common-components/src/components/SbcSignin.vue'

describe('SigninView.vue', () => {
  it('is a Vue instance', async () => {
    const wrapper = shallowMount(SigninView, { })
    // expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.findComponent(SbcSignin).exists()).toBe(true)
  })
})
