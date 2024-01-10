import { Dashboard } from '@/components/Dashboard'
import DashboardView from '@/views/Dashboard.vue'
import { shallowMount } from '@vue/test-utils'

describe('DashboardView.vue', () => {
  it('Should have Dashboard component', () => {
    const wrapper = shallowMount(DashboardView, {

    })
    expect(wrapper.findComponent(Dashboard).exists()).toBe(true)
  })
})
