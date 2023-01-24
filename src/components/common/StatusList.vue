<template>
  <v-select
    :items="routingSlipStatusList"
    v-model="currentStatus"
    filled
    item-text="description"
    item-value="code"
    return-object
    data-test="select-status"
    v-bind="$attrs"
    v-on="$listeners"
  ></v-select>
</template>

<script lang="ts">
/** component for status list.
 * example
 * <status-list v-model="currentStatus" label="Status"></status-list>
 */

import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import { useStatusList } from '@/composables/common'

@Component({
  setup (props, context) {
    const { routingSlipStatusList, currentStatus } = useStatusList(props, context)
    return {
      routingSlipStatusList,
      currentStatus
    }
  }
})
export default class StatusList extends Vue {
  @Prop() value: string
}
</script>
