import { createLocalVue, mount } from '@vue/test-utils'

import InterimLanding from '@/components//common/InterimLanding.vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

describe('InterimLanding.vue', () => {
  it('renders date pricker', async () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const vuetify = new Vuetify({})
    const stub = jest.fn()
    const wrapper: any = mount(InterimLanding, {
      vuetify,
      localVue,
      propsData: {
        description: "The page you are looking for has been removed or doesn't exist.",
        summary: 'Page not found',
        showHomePageBtn: true
      },
      mocks: {
        goHome: stub
      }
    })
    expect(wrapper.vm.summary).toBe('Page not found')
    expect(wrapper.vm.description).toBe("The page you are looking for has been removed or doesn't exist.")

    wrapper.find('[data-test="btn-home"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(stub).toHaveBeenCalledTimes(1)
  })
})
