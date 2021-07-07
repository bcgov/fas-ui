import { shallowMount } from '@vue/test-utils'
import PageNotFound from '@/views/PageNotFound.vue'
import InterimLanding from '@/components/common/InterimLanding.vue'

describe('PageNotFound.vue', () => {
  it('Should have Dashboard component', () => {
    const wrapper = shallowMount(PageNotFound, {

    })
    expect(wrapper.findComponent(InterimLanding).exists()).toBe(true)
  })
})
