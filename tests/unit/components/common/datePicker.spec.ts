import DatePicker from '@/components//common/DatePicker.vue'
import { shallowMount } from '@vue/test-utils'

describe('DatePicker.vue', () => {
  it('renders date pricker', () => {
    const wrapper = shallowMount(DatePicker, {
      propsData: {
        value: '2021-01-01'
      }
    })
    expect(wrapper.find('[data-test="date-date-picker"]').exists()).toBeTruthy()
  })
})
