<template>
  <v-menu >
    <template v-slot:activator="{ on, attrs }">
      <v-btn dark icon v-bind="attrs" v-on="on">
        <v-icon color="primary" size="20">mdi-dots-vertical</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item v-for="(item, i) in routingSlipStatus" :key="i">
        <v-list-item-title @click="setStatus(item)" >{{ item.label }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
/** component for status menu.
 * example
 * <status-menu v-model="currentStatus" label="Status"></status-menu>
 */

import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import { useStatusMenu } from '@/composables/common'

@Component({
  setup (props, context) {
    const { routingSlipStatus, currentStatus, setStatus } = useStatusMenu(props, context)
    return {
      routingSlipStatus,
      currentStatus,
      setStatus

    }
  }
})
export default class StatusMenu extends Vue {
  @Prop() value: string
  @Prop() allowedStatusList: []
}
</script>
