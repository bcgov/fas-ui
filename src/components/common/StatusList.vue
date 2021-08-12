<template>
  <v-select
    :items="routingSlipStatus"
    v-model="currentStatus"
    filled
    item-text="description"
    item-value="code"
    return-object
    label="Status"
    data-test="select-status"
    v-bind="$attrs"
    v-on="$listeners"
  ></v-select>
</template>

<script lang="ts">
/** component for status list.
 * example
 * <status-list v-model="currentStatus" ></status-list>
 */

import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import { useStatusList } from '@/composables/common'

@Component({
  setup (props, context) {
    const { routingSlipStatus, currentStatus } = useStatusList(props, context)
    return {
      routingSlipStatus,
      currentStatus
    }
  }
})
export default class StatusList extends Vue {
  @Prop() value: string
}
</script>
