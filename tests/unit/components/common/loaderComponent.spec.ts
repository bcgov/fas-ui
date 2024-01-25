import LoaderComponent from '@/components/common/LoaderComponent.vue'
import Vuetify from 'vuetify'
import { mount } from '@vue/test-utils'

describe('LoaderComponent.vue', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('renders component', () => {
    const wrapper = mount(LoaderComponent)
    expect(wrapper.find("[data-test='div-loading-container']").exists()).toBeTruthy()
  })
})
