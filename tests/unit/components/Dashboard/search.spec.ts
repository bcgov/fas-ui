import { shallowMount } from '@vue/test-utils'
import { Search } from '@/components/Dashboard'

describe('Search.vue', () => {
  it('SHould have h4 title', () => {
    const wrapper = shallowMount(Search, {})
    expect(wrapper.find('h4').exists()).toBeTruthy()
    expect(wrapper.find('h4').text()).toBe('Search for Routing Slip')
  })
  it('should show advanced search on click', async () => {
    const wrapper = shallowMount(Search, {})
    await wrapper.setData({ showAdvanceSearch: true })
    wrapper.find("[data-test='btn-advanced-search']").trigger('click')
    expect(wrapper.find("[data-test='div-advanced-search']").exists()).toBeTruthy()
  })
})
