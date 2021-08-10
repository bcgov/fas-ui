import { Dashboard } from '@/components/Dashboard'
import { shallowMount } from '@vue/test-utils'

describe('Dashboard.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Dashboard, {

    })
    expect(wrapper.find('h1').exists()).toBeTruthy()
    expect(wrapper.find('h1').text()).toBe('FAS Staff Dashboard')
  })
})
