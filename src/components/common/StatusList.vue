<template>
  <v-select
    v-model="currentStatus"
    :items="routingSlipStatusList"
    variant="filled"
    item-title="description"
    item-value="code"
    return-object
    data-test="select-status"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script setup lang="ts">
/** component for status list.
 * example
 * <status-list v-model="currentStatus" label="Status"></status-list>
 */

import { useStatusList } from '@/composables/common'

const props = defineProps<{ value: string }>()

const emits = defineEmits<{
  input: [value: string]
}>()

const { routingSlipStatusList, currentStatus } = useStatusList(props, emits)
</script>
