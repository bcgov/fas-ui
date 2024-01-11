<template>
  <v-btn
    color="primary"
  >
    <v-icon
      size="15"
      class="mr-2"
    >
      mdi-pencil
    </v-icon> Edit Status
    <v-menu
      v-if="routingAllowedSlipStatus.length > 0"
      transition="slide-y-transition"
      activator="parent"
    >
      <v-list density="compact">
        <template v-for="(item, i) in routingAllowedSlipStatus">
          <v-list-item
            v-if="item.label !== ''"
            :key="i"
            class="menu-list"
            @click="setStatus(item)"
          >
            <v-list-item-title>
              {{
                item.label
              }}
            </v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
    </v-menu>
  </v-btn>
</template>

<script setup lang="ts">
import { useStatusMenu } from '@/composables/common'

const props = withDefaults(
  defineProps<{
    value?: string
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
