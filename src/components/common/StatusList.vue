<template>
  <v-select
    v-model="currentStatus"
    :items="routingSlipStatusList"
    variant="filled"
    item-title="description"
    item-value="code"
    placeholder="Status"
    return-object
    data-test="select-status"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { Code } from '@/models/Code'
import { useStatusList } from '@/composables/common'

const props = withDefaults(defineProps<{ modelValue: Code }>(), {
  modelValue: null
})

const emits = defineEmits<{
  'update:modelValue': [value: any]
}>()

const { routingSlipStatusList, currentStatus } = useStatusList(props, emits)
</script>
