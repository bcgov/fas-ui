import { createLocalVue, mount } from '@vue/test-utils'

import BreadCrumb from '@/components/common/BreadCrumb.vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import routes from '@/router/routes'

vi.mock('@/util/config-helper', () => ({
  default: {
    getAuthWebUrl () {
      return 'test' // set some default value
    }
  }
}))

describe('BreadCrumb.vue', () => {
  const localVue = createLocalVue()
  const vuetify = new Vuetify({})
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })
  it('renders component', async () => {
    const router = new VueRouter({ routes })
    const wrapper: any = mount(BreadCrumb, {
      localVue,
      router,
      vuetify
    })
    expect(wrapper.findComponent(BreadCrumb).exists()).toBe(true)
  })
})
