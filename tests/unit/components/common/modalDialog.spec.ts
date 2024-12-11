import { shallowMount } from '@vue/test-utils'
import ModalDialog from '@/components//common/ModalDialog.vue'

describe('ModalDialog.vue', () => {
  const title = 'test'
  const text = 'test text'
  it('renders Modal with title', () => {
    const wrapper = shallowMount(ModalDialog, {
      propsData: {
        title
      }
    })

    expect(wrapper.find('[data-test="dialog-header"] .modal-dialog-title').exists()).toBeTruthy()
    expect(wrapper.find('[data-test="dialog-header"] .modal-dialog-title').text()).toBe(title)
  })

  it('Modal Should have close icon when props pass', () => {
    const wrapper = shallowMount(ModalDialog, {
      propsData: {
        title,
        showCloseIcon: true
      }
    })

    expect(
      wrapper.find('[data-test="icon-dialog-close"]').exists()
    ).toBeTruthy()
  })

  it(' Modal Should have show all values pass as props', () => {
    const wrapper = shallowMount(ModalDialog, {
      propsData: {
        title,
        text,
        showActions: true,
        showCloseIcon: true
      }
    })

    expect(wrapper.find('[data-test="dialog-title"]').text()).toBe(title)
    expect(wrapper.find('[data-test="dialog-text"]').text()).toBe(text)
    expect(wrapper.find('[data-test="dialog-ok-button"]').text()).toBe('Close')
  })
})
