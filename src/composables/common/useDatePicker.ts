import { computed, ref, toRefs } from 'vue'
import { DateTime } from 'luxon'
export function useDatePicker (props, emits) {
  const { modelValue } = toRefs(props)
  // Wired up to input.
  const showDateField = computed(() => {
    const dateObject = (modelValue.value instanceof Date)
      ? DateTime.fromJSDate(modelValue.value) : DateTime.fromFormat(modelValue.value, 'yyyy-LL-dd')
    return dateObject.setZone('America/Vancouver').toFormat('yyyy-LL-dd')
  })
  // Wired up to datepicker.
  const dateValue = computed({
    get: () => {
      const dateObject = (modelValue.value instanceof Date)
        ? DateTime.fromJSDate(modelValue.value) : DateTime.fromFormat(modelValue.value, 'yyyy-LL-dd')
      return dateObject.setZone('America/Vancouver').toJSDate()
    },
    set: (val) => emits('update:modelValue', val)
  })
  const showDateMenu = ref(false)
  return {
    dateValue,
    showDateMenu,
    showDateField
  }
}
