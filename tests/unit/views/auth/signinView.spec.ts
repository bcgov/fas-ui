import SbcSignin from 'sbc-common-components/src/components/SbcSignin.vue'
import SigninView from '@/views/auth/SigninView.vue'
import { mount } from '@vue/test-utils'

describe('SigninView.vue', () => {
  const MyStub = {
    template: '<div />'
  }
  it('is a Vue instance', async () => {
    const wrapper = mount(SigninView, {
      stubs: {
        SbcSignin: MyStub
      }
    })
    expect(wrapper.findComponent(SbcSignin).exists()).toBe(true)
  })
})
