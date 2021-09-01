<template>
  <transition-group name="slide-fade">
    <div class="d-flex" key="action">
      <v-autocomplete
        filled
        v-model="filingType"
        :items="autoCompleteFilingTypes"
        :loading="isLoading"
        :search-input.sync="search"
        @keyup="delayedSearch"
        :item-text="itemText"
        :item-value="itemText"
        placeholder="Filing Type Name"
        return-object
        append-icon=""
        :hide-no-data="hideNoData"
        v-bind="$attrs"
        data-test="input-filing-type"
      >
        <!-- hide-no-data -->
        <template v-slot:item="{ item }">
          <div class="filing-details">
            <span>{{ item.filingTypeCode.description }}</span>
            <span>
              <span>-</span>
              {{ item.corpTypeCode.description }}</span
            >
          </div>
        </template>
      </v-autocomplete>
    </div>
  </transition-group>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { useFilingTypeAutoComplete } from '@/composables/ViewRoutingSlip'

@Component({
  setup (props, context) {
    const {
      filingType,
      autoCompleteFilingTypes,
      isLoading,
      search,
      delayedSearch,
      itemText,
      hideNoData
    } = useFilingTypeAutoComplete(props, context)

    return {
      filingType,
      autoCompleteFilingTypes,
      isLoading,
      search,
      delayedSearch,
      itemText,
      hideNoData
    }
  }
})
export default class FIlingTypeAutoComplete extends Vue {
  @Prop({ default: () => [] }) value: any[]
}
</script>

<style lang="scss" scoped>
.filing-details {
  display: flex;
  span {
    min-width: 118px;

    span {
      padding: 0 5px !important;
    }
  }
}
</style>
