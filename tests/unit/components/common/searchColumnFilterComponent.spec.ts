import SearchColumnFilterComponent from '@/components/common/SearchColumnFilterComponent.vue'
import { headerSearch } from '../../test-data/mock-search-headers'
import { mount } from '@vue/test-utils'

describe('SearchColumnFilterComponent.vue', () => {
  const value = headerSearch
  it('renders component', () => {
    const wrapper: any = mount(SearchColumnFilterComponent, {
      props: {
        modelValue: value
      }
    })
    expect(wrapper.find('[data-test="menu-search-column-filter"]').exists()).toBeTruthy()
    expect(wrapper.vm.selectedHeaderSearchList).toBe(value)
  })
})
