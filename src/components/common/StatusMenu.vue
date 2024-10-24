<template>
  <v-menu  bottom
            left
            offset-y
            v-model="menuOpen"
            v-if="routingAllowedSlipStatus.length > 0">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary"  v-bind="attrs" v-on="on">
        <v-icon  size="15" class="mr-2">mdi-pencil</v-icon>
        Edit Status
        <v-icon dense class="ml-2">
          {{ menuOpen ? 'mdi-menu-up' : 'mdi-menu-down' }}
        </v-icon>
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

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { useStatusMenu } from '@/composables/common'

export default defineComponent({
  name: 'StatusMenu',
  props: {
    value: {
      type: Object,
      required: false
    },
    allowedStatusList: {
      type: Array,
      required: false,
      default: () => []
    },
    isApprovalFlow: {
      type: Boolean,
      default: false
    }
  },

  setup (props, context) {
    // Destructuring `context` to get emit
    const { emit } = context

    // Using the custom composable `useStatusMenu` with both props and context
    const { routingAllowedSlipStatus, currentStatus, setStatus } = useStatusMenu(props, context)

    // Reactive variable to track if the menu is open or closed
    const menuOpen = ref(false)

    // Emit an event when the status is updated
    const updateStatus = (status: string) => {
      emit('update:modelValue', status)
    }

    return {
      routingAllowedSlipStatus,
      currentStatus,
      setStatus,
      menuOpen,
      updateStatus
    }
  }
})
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
