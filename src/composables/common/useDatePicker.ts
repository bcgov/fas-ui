// TODO still WIP - Travis Semple
import { computed, ref, toRefs } from 'vue'
import { DateTime } from 'luxon'
export function useDatePicker (props, emits) {
  const { modelValue } = toRefs(props)
  const showDateField = computed(() => {
    if (modelValue.value instanceof Date) return DateTime.fromJSDate(modelValue.value).setZone('America/Vancouver').toFormat('yyyy-MM-dd')
    return DateTime.fromFormat(modelValue.value, 'yyyy-MM-dd').setZone('America/Vancouver').toJSDate()
  })
  const dateValue = computed({
    get: () => {
      if (modelValue.value instanceof Date) return modelValue.value
      return DateTime.fromFormat(modelValue.value, 'yyyy-MM-dd').setZone('America/Vancouver').toJSDate()
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
