import LoaderComponent from '@/components/common/LoaderComponent.vue'
import Vuetify from 'vuetify'
import { mount } from '@vue/test-utils'

describe('LoaderComponent.vue', () => {
  const localVue = createLocalVue()

  const vuetify = new Vuetify({})

  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('renders component', () => {
    const wrapper = mount(LoaderComponent, {
      localVue,
      vuetify
    })
    expect(wrapper.find("[data-test='div-loading-container']").exists()).toBeTruthy()
  })
})
