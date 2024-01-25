import { shallowMount } from '@vue/test-utils'
import { Dashboard } from '@/components/Dashboard'

describe('Dashboard.vue', () => {
  vi.resetModules()
  vi.clearAllMocks()

  it('renders props.msg when passed', async () => {
    const wrapper = shallowMount(Dashboard, {
      mocks: {
        $vuetify: vi.fn()
      }
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('h1').exists()).toBeTruthy()
    expect(wrapper.find('h1').text()).toBe('FAS Staff Dashboard')
  })
})
