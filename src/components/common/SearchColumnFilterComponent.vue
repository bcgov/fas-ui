<template>
  <v-menu
  :close-on-content-click="false"
  offset-y
  data-test="menu-search-column-filter">
    <template v-slot:activator="{ props: { click } }">
      <v-text-field
        label="Columns to Show"
        readonly
        v-bind="$attrs"
        @click="click"
        filled
        class="column-filter"
        append-icon="mdi-menu-down"
        @click:append="click"
      >
      </v-text-field>
    </template>
    <v-list nav dense v-bind="$attrs">
      <v-list-item
        class="ma-0"
        v-for="(item, i) in selectedHeaderSearchList.filter(header => !header.hideInSearchColumnFilter)"
        :key="i"
      >
        <v-checkbox
          class="ma-0"
          v-model="item.display"
          :label="item.text"
          hide-details
        ></v-checkbox>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
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
