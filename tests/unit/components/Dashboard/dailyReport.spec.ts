import { DailyReport } from '@/components/Dashboard'
import { mount } from '@vue/test-utils'

describe('DailyReport.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = mount(DailyReport, {
      props: {
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
