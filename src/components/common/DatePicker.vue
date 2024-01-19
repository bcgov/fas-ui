<template>
  <v-menu
    v-model="showDateMenu"
    :close-on-content-click="true"
    transition="scale-transition"
    min-width="auto"
  >
    <template #activator="{ props: activatorProps }">
      <v-text-field
        v-model="showDateField"
        :label="label"
        append-icon="mdi-calendar"
        readonly
        variant="filled"
        v-bind="activatorProps"
        data-test="input-date-picker"
      />
    </template>
    <v-date-picker
      v-model="dateValue"
      :persist="false"
      color="primary"
      data-test="date-date-picker"
    />
  </v-menu>
</template>

<script setup lang="ts">
import { useDatePicker } from '@/composables/common'

const props = withDefaults(defineProps<{
  modelValue?: Date | string
  label?: string
}>(),
{
  modelValue: null,
  label: 'Select Date'
})

const emits = defineEmits<{
  'update:modelValue': [value: string]
}>()

const {
  dateValue,
  showDateMenu,
  showDateField
} = useDatePicker(props, emits)
</script>
