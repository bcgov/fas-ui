<template>
  <div class="mb-4">
    <span class="font-weight-bold" v-if="siNumber !== ''">
      {{ siNumber }}. </span
    >
    <router-link
      :to="navigateTo()"
      class="font-weight-bold"
    >
      {{ routingSlipNumber }}
    </router-link>
    <span>
      - Routing slip created date:
      <span data-test="text-created-date" class="font-weight-bold">{{
        formatDisplayDate(createdDate)
      }}</span></span
    >
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import commonUtil from '@/util/common-util'
import { useLinkedRoutingSlipDetails } from '@/composables/ViewRoutingSlip'

@Component({
  setup (props, context) {
    const {
      navigateTo
    } = useLinkedRoutingSlipDetails(props, context)
    return {
      navigateTo
    }
  }
})
export default class LinkedRoutingSlipDetails extends Vue {
  @Prop({ default: '' }) private siNumber: string
  @Prop({ default: '' }) private routingSlipNumber: string
  @Prop({ default: '' }) private createdDate: Date | string
  @Prop({ default: undefined }) private parentRoutingSlipNumber: string

  public colors = commonUtil.statusListColor
  public formatDisplayDate = commonUtil.formatDisplayDate
}
</script>

<style lang="scss" scoped>
.slip-status {
  text-transform: capitalize;
}
.row + .row {
  margin-top: 7px !important;
}
.status-list {
  max-width: 400px;
}
</style>
