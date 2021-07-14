import { ref } from '@vue/composition-api'

export function useModalDialog () {
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
