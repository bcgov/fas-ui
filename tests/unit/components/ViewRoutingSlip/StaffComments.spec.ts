import { shallowMount } from '@vue/test-utils'
import StaffCommentsComp from '@/components/ViewRoutingSlip/StaffComments.vue'

import { StaffComments } from '@bcrs-shared-components/staff-comments'
import Vue from 'vue'

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
      propsData: {
        routingSlipNumber: '123'
      }
    })
    expect(wrapper.findComponent(StaffComments).exists()).toBe(true)
  })
})
