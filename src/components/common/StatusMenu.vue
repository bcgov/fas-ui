<template>
  <v-menu  bottom
            left
            offset-y

             v-if="routingAllowedSlipStatus.length > 0">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary"  v-bind="attrs" v-on="on">
        <v-icon  size="15" class="mr-2">mdi-pencil</v-icon> Edit Status
      </v-btn>
    </template>

    <v-list dense>
      <template v-for="(item, i) in routingAllowedSlipStatus">
        <v-list-item v-if="item.label !== ''" :key="i" class="menu-list" @click="setStatus(item)" >
          <v-list-item-content>
          <v-list-item-title>{{
            item.label
          }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
/** component for status menu.
 * example
 * <status-menu v-model="currentStatus" label="Status"></status-menu>
 */
import { useStatusMenu } from '@/composables/common'

const props = withDefaults(
  defineProps<{
    value: string
    allowedStatusList: any
    isApprovalFlow: boolean
  }>(),
  {
    value: '',
    allowedStatusList: [],
    isApprovalFlow: false
  }
)

const emits = defineEmits<{
  input: [value: string]
  'update:statusChange': [value: string]
}>()

const { routingAllowedSlipStatus, setStatus } = useStatusMenu(props, emits)
</script>
<style lang="scss" scoped>
.menu-list{
  // cursor: pointer;
  &:hover{
    cursor: pointer;
    background: #f1f3f5;
    color: var(--v-primary-base) !important;
  }
}
.theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled):hover {
    color: var(--v-primary-base) !important;
}

</style>
