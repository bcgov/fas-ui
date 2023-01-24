import { createLocalVue, mount } from '@vue/test-utils'

import DateRangeFilter from '@/components/common/DateRangeFilter.vue'
import Vuetify from 'vuetify'

describe('DateRangeFilter.vue', () => {
  const localVue = createLocalVue()
  const vuetify = new Vuetify({})
  const value = ['2021-08-04', '2021-08-05']
  it('renders date range filter', () => {
    const wrapper: any = mount(DateRangeFilter, {
      vuetify,
      localVue,
      propsData: {
        value: value
      }
    })
    expect(wrapper.find('[data-test="input-date-picker"]').exists()).toBeTruthy()
    expect(wrapper.vm.dateRangeSelectedDisplay).toBe(value.join(' - '))
    expect(wrapper.vm.dateRangeSelected).toBe(value)
  })
})
