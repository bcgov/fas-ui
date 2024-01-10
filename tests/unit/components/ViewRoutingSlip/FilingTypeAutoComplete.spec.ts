import { FilingTypeAutoComplete } from '@/components/ViewRoutingSlip'
import Vuetify from 'vuetify'

describe('FilingTypeAutoComplete.vue', () => {
  const localVue = createLocalVue()

  const vuetify = new Vuetify({})
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('renders component', () => {
    const wrapper: any = mount(FilingTypeAutoComplete, {
      localVue,
      vuetify
    })

    expect(
      wrapper.find('[data-test="input-filing-type"]').exists()
    ).toBeTruthy()
  })
})
