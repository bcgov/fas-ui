import { Dashboard } from '@/components/Dashboard'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'

describe('Dashboard.vue', () => {
  const localVue = createLocalVue()
  const vuetify = new Vuetify({})

  vi.resetModules()
  vi.clearAllMocks()

  it('renders props.msg when passed', async () => {
    const wrapper = shallowMount(Dashboard, {
      localVue,
      vuetify,
      mocks: {
        $vuetify: vi.fn()
      }
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('h1').exists()).toBeTruthy()
    expect(wrapper.find('h1').text()).toBe('FAS Staff Dashboard')
  })
})
