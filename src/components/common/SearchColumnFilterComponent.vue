<template>
  <v-menu
  :close-on-content-click="false"
  offset-y
  data-test="menu-search-column-filter">
    <template v-slot:activator="{ on: { click } }">
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
      <v-list-item-group>
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
          >
          </v-checkbox>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import { useSearchColumnFilterComponent } from '@/composables/common'

@Component({
  setup (props, context) {
    const { selectedHeaderSearchList } = useSearchColumnFilterComponent(
      props,
      context
    )
    return {
      selectedHeaderSearchList
    }
  }
})
export default class SearchColumnFilterComponent extends Vue {
  @Prop({ default: () => [] }) value: any[]
}
</script>
<style lang="scss">
  .column-filter > .v-input__control,
  .column-filter .v-input__slot {
    background: white !important;
  }

  .v-icon.v-icon.v-icon--link {
    cursor: inherit !important;
  }

  .v-input--selection-controls.v-input {
    flex: 0 1 100% !important;
  }
</style>
