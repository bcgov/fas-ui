import { createLocalVue, mount } from '@vue/test-utils'

import ErrorAlertComponent from '@/components/common/ErrorAlertComponent.vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

describe('ErrorAlertComponent.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const vuetify = new Vuetify({})

  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('renders component', () => {
    const wrapper = mount(ErrorAlertComponent, {
      localVue,
      vuetify
    })
    expect(wrapper.find("[data-test='alert-error-alert']").exists()).toBeTruthy()
  })
})
