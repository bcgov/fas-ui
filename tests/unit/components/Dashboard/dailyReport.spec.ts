import { DailyReport } from '@/components/Dashboard'
import { shallowMount } from '@vue/test-utils'

describe('DailyReport.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(DailyReport, {
      propsData: {
        showCalendar: false
      },
      directives: {
        can () {
          /* stub */
        }
      }
    })

    expect(
      wrapper.find('[data-test="title-daily-report"]').exists()
    ).toBeTruthy()
    expect(wrapper.find('[data-test="title-daily-report"]').text()).toBe(
      'Select Daily Report Date:'
    )
  })
})
