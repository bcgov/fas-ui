<template>
  <transition-group name="slide-fade">
    <div
      key="action"
      class="d-flex"
    >
      <v-autocomplete
        v-model="filingType"
        variant="filled"
        :items="autoCompleteFilingTypes"
        :loading="isLoading"
        :search.sync="search"
        :item-title="itemText"
        :item-value="itemText"
        placeholder="Filing Type Name"
        return-object
        append-icon=""
        :hide-no-data="hideNoData"
        v-bind="$attrs"
        data-test="input-filing-type"
        @keyup="delayedSearch"
      >
        <!-- hide-no-data -->
        <template #item="{ item }">
          <div class="filing-details">
            <span>{{ item.filingTypeCode.description }}</span>
            <span>
              <span>-</span>
              {{ item.corpTypeCode.description }}</span>
          </div>
        </template>
      </v-autocomplete>
    </div>
  </transition-group>
</template>
<script setup lang="ts">
import { useFilingTypeAutoComplete } from '@/composables/ViewRoutingSlip'
import { FilingType } from '@/models/Payment'

const props = defineProps<{
  value: FilingType
}>()

const emits = defineEmits<{
  input: [value: FilingType]
}>()

const {
  filingType,
  autoCompleteFilingTypes,
  isLoading,
  search,
  delayedSearch,
  itemText,
  hideNoData
} = useFilingTypeAutoComplete(props, emits)
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
