import { computed, ref, toRefs } from '@vue/composition-api'

export function useModalDialog (props, _) {
  // using `toRefs` to create a Reactive Reference to a list of all props
  const {
    title,
    text,
    showIcon,
    showActions,
    isPersistent,
    fullscreenOnMobile,
    isScrollable,
    dialogClass,
    maxWidth,
    showCloseIcon
  } = toRefs(props)

  const isOpen = ref<boolean>(false)

  function open (): void {
    isOpen.value = true
  }

  function close (): void {
    isOpen.value = false
  }

  return {
    isOpen,
    open,
    close
  }
}
