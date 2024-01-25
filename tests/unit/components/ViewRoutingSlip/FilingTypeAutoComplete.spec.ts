import { FilingTypeAutoComplete } from '@/components/ViewRoutingSlip'
import Vuetify from 'vuetify'

describe('FilingTypeAutoComplete.vue', () => {
  


  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('renders component', () => {
    const wrapper: any = mount(FilingTypeAutoComplete)

    expect(
      wrapper.find('[data-test="input-filing-type"]').exists()
    ).toBeTruthy()
  })
})
