import { shallowMount } from '@vue/test-utils'
import DashboardView from '@/views/Dashboard.vue'
import { Dashboard } from '@/components/Dashboard'

describe('DashboardView.vue', () => {
  it('Should have Dashboard component', () => {
    const wrapper = shallowMount(DashboardView, {

    })
    expect(wrapper.findComponent(Dashboard).exists()).toBe(true)
  })
})
