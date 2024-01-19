<template>
  <v-menu
    :close-on-content-click="false"
    data-test="menu-search-column-filter"
  >
    <template #activator="{ props }">
      <v-text-field
        label="Columns to Show"
        readonly
        v-bind="props"
        variant="filled"
        class="column-filter"
        append-inner-icon="mdi-menu-down"
      />
    </template>
    <v-list
      nav
      density="compact"
      v-bind="$attrs"
    >
      <v-list-item
        v-for="(item, i) in selectedHeaderSearchList.filter(header => !header.hideInSearchColumnFilter)"
        :key="i"
        class="ma-0"
      >
        <v-checkbox
          v-model="item.display"
          class="ma-0"
          :label="item.title"
          hide-details
        />
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'
import { useSearchColumnFilterComponent } from '@/composables/common'

const props = withDefaults(
  defineProps<{
    modelValue: any
  }>(),
  {
    modelValue: []
  }
)

const emits = defineEmits<{
  input: [modelValue: any]
}>()

const { selectedHeaderSearchList } = useSearchColumnFilterComponent(
  props,
  emits
)

</script>
<style lang="scss">
  .column-filter > .v-input__control,
  .column-filter .v-input__slot {
    background: white !important;
  }

  .v-icon.v-icon.v-icon--link {
    cursor: inherit !important;
  }
</style>
