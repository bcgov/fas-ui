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
        item-text="filingTypeCode.description"
        item-value="filingTypeCode.description"
        placeholder="Filing Type Name"
        return-object
        append-icon=""
      >
        <!-- hide-no-data -->
        <template v-slot:item="{ item }">
          <div class="rs-details">
            <span>{{ item.corpTypeCode.description }}</span>
            <span>
              <span>-</span>
              {{ item.filingTypeCode.description }}</span
            >
          </div>
        </template>
      </v-autocomplete>
    </div>
  </transition-group>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { useFIlingTypeAutoComplete } from '@/composables/ViewRoutingSlip'

@Component({
  setup (props, context) {
    const {
      filingType,
      autoCompleteFilingTypes,
      isLoading,
      search,
      delayedSearch
    } = useFIlingTypeAutoComplete(props, context)

    return {
      filingType,
      autoCompleteFilingTypes,
      isLoading,
      search,
      delayedSearch
    }
  }
})
export default class FIlingTypeAutoComplete extends Vue {
  @Prop({ default: () => [] }) value: any[]
}
</script>

<style lang="scss" scoped>
.rs-details {
  display: flex;
  span {
    min-width: 118px;

    span {
      padding: 0 5px !important;
    }
  }
}
.row + .row {
  margin-top: 7px !important;
}
</style>
