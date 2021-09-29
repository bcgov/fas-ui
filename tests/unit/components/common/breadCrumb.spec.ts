import { createLocalVue, mount } from '@vue/test-utils'

import BreadCrumb from '@/components/common/BreadCrumb.vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import routes from '@/router/routes'

jest.mock('@/util/config-helper', () => ({
  getAuthWebUrl () {
    return 'test' // set some default value
  }
}))

describe('BreadCrumb.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const vuetify = new Vuetify({})
  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
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
