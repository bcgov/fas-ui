
import { StaffComments } from '@bcrs-shared-components/staff-comments'
import StaffCommentsComp from '@/components/ViewRoutingSlip/StaffComments.vue'
import { shallowMount } from '@vue/test-utils'

describe('StaffCommentsComp.vue', () => {
  beforeEach(() => {
    const config = {
      AUTH_API_URL: 'https://localhost:8080/api/v1/11',
      PAY_API_URL: 'https://pay-api-dev.pathfinder.gov.bc.ca/api/v1'
    }

    sessionStorage.AUTH_API_CONFIG = JSON.stringify(config)
  })
  it('Should have StaffComments component', () => {
    const wrapper = shallowMount(StaffCommentsComp, {
       props: {
        routingSlipNumber: '123'
      }
    })
    expect(wrapper.findComponent(StaffComments).exists()).toBe(true)
  })
})
