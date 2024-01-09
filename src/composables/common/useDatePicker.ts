import { ref, computed, toRefs } from 'vue'

export function useDatePicker (props, emits) {
  // using `toRefs` to create a Reactive Reference to the `user` property of props
  const { value, persist } = toRefs(props)

  const showDateModal = ref(false)

  // using same v-model value for getting value and update parent on change
  const selectedDate = computed({
    get: () => {
      return value.value
    },
    set: (modalValue: Date) => {
      emits('input', modalValue)
    }
  })

  function toggleDatePicker () {
    showDateModal.value = !showDateModal.value
  }

  function closeAfterSelection () {
    // if persist pass as prop no need close on click
    if (persist.value === false) {
      toggleDatePicker()
    }
  }

  return {
    selectedDate,
    showDateModal,
    closeAfterSelection
  }
}
