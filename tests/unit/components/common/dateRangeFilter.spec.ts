import DateRangeFilter from '@/components/common/DateRangeFilter.vue'
import { mount } from '@vue/test-utils'

describe('DateRangeFilter.vue', () => {
  const value = ['2021-08-04', '2021-08-05']
  it('renders date range filter', () => {
    const wrapper: any = mount(DateRangeFilter, {
      props: {
        modelValue: value
      }
    })
    expect(wrapper.find('[data-test="input-date-picker"]').exists()).toBeTruthy()
    expect(wrapper.vm.dateRangeSelectedDisplay).toBe(value.join(' - '))
    expect(wrapper.vm.dateRangeSelected).toBe(value)
  })
})
