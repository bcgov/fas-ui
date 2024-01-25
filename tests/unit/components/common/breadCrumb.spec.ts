import { createRouter, createWebHistory } from 'vue-router'
import BreadCrumb from '@/components/common/BreadCrumb.vue'
import { mount } from '@vue/test-utils'
import routes from '@/router/routes'

vi.mock('@/util/config-helper', () => ({
  default: {
    getAuthWebUrl () {
      return 'test'
    }
  }
}))

describe('BreadCrumb.vue', () => {
  let router

  beforeEach(() => {
    router = createRouter({
      history: createWebHistory(),
      routes
    })

    vi.resetModules()
    vi.clearAllMocks()
  })

  it('renders component', async () => {
    const wrapper = mount(BreadCrumb, {
      global: {
        plugins: [router]
      }
    })

    expect(wrapper.findComponent(BreadCrumb).exists()).toBe(true)
  })
})
