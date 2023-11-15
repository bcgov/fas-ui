import { filingType } from '../../test-data/mock-routing-slip'
import { createLocalVue, mount } from '@vue/test-utils'

import { FilingTypeAutoComplete } from '@/components/ViewRoutingSlip'
import Vuetify from 'vuetify'

describe('FilingTypeAutoComplete.vue', () => {
  const localVue = createLocalVue()

  const vuetify = new Vuetify({})
  const MyStub = {
    template: '<div />'
  }

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
