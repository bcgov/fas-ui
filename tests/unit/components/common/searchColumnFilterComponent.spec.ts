import { createLocalVue, mount } from '@vue/test-utils'

import SearchColumnFilterComponent from '@/components/common/SearchColumnFilterComponent.vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { headerSearch } from '../../test-data/mock-search-headers'

describe('SearchColumnFilterComponent.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const vuetify = new Vuetify({})
  const value = headerSearch
  it('renders component', () => {
    const wrapper: any = mount(SearchColumnFilterComponent, {
      vuetify,
      localVue,
      propsData: {
        value: value
      }
    })
    expect(wrapper.find('[data-test="menu-search-column-filter"]').exists()).toBeTruthy()
    expect(wrapper.vm.selectedHeaderSearchList).toBe(value)
  })
})
