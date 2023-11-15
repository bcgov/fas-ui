import { createLocalVue, mount } from '@vue/test-utils'

import ErrorAlertComponent from '@/components/common/ErrorAlertComponent.vue'
import Vuetify from 'vuetify'

describe('ErrorAlertComponent.vue', () => {
  const localVue = createLocalVue()

  const vuetify = new Vuetify({})

  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('renders component', () => {
    const wrapper = mount(ErrorAlertComponent, {
      localVue,
      vuetify
    })
    expect(wrapper.find("[data-test='alert-error-alert']").exists()).toBeTruthy()
  })
})
