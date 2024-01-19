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
        :item-title="itemText"
        :item-value="itemText"
        placeholder="Filing Type Name"
        return-object
        append-icon=""
        :hide-no-data="hideNoData"
        v-bind="$attrs"
        data-test="input-filing-type"
        @keyup="delayedSearch"
        @update:search="search = $event"
      >
        <template #item="{ props: activatorProps, item }">
          <v-list-item
            v-bind="activatorProps"
            title=""
          >
            <div class="filing-details">
              <span>{{ item.raw.filingTypeCode.description }}</span>
              <span>
                <span>-</span>
                {{ item.raw.corpTypeCode.description }}</span>
            </div>
          </v-list-item>
        </template>
      </v-autocomplete>
    </div>
  </transition-group>
</template>
<script setup lang="ts">
import { FilingType } from '@/models/Payment'
import { useFilingTypeAutoComplete } from '@/composables/ViewRoutingSlip'

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
