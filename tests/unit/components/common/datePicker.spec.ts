import DatePicker from '@/components/common/DatePicker.vue'
import { mount } from '@vue/test-utils'

describe('DatePicker.vue', () => {
  it('renders date pricker', async() => {
    const wrapper = mount(DatePicker, {
      props: {
        modelValue: ''
      }
    })
    expect(wrapper.find('[data-test="input-date-picker"]').exists()).toBeTruthy()
    // Trigger the activator
    await wrapper.find('[data-test="input-date-picker"]').trigger('click')

    await wrapper.vm.$nextTick()
    console.log(wrapper.html())
    expect(wrapper.find('[data-test="date-date-picker"]').exists()).toBeTruthy()
  })
})
