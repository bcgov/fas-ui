import { mount } from '@vue/test-utils'

import ErrorAlertComponent from '@/components/common/ErrorAlertComponent.vue'

describe('ErrorAlertComponent.vue', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('renders component', () => {
    const wrapper = mount(ErrorAlertComponent)
    expect(wrapper.find("[data-test='alert-error-alert']").exists()).toBeTruthy()
  })
})
