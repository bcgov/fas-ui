import InterimLanding from '@/components/common/InterimLanding.vue'
import PageNotFound from '@/views/PageNotFound.vue'
import { shallowMount } from '@vue/test-utils'

describe('PageNotFound.vue', () => {
  it('Should have Dashboard component', () => {
    const wrapper = shallowMount(PageNotFound, {

    })
    expect(wrapper.findComponent(InterimLanding).exists()).toBe(true)
  })
})
