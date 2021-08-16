<template>
  <div>
    {{ SiNumber ? `${SiNumber}.` : '' }}

    <router-link
      :to="`/view-routing-slip/${RSNumber}`"
      class="font-weight-bold"
    >
      {{ RSNumber }}
    </router-link>
    <span>
      - Routing slip created date:
      <span class="font-weight-bold">{{
        formatDisplayDate(createdDate)
      }}</span></span
    >
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import commonUtil from '@/util/common-util'

@Component({})
export default class LinkedRSDetails extends Vue {
  public colors = commonUtil.statusListColor
  public formatDisplayDate = commonUtil.formatDisplayDate
  @Prop({ default: '' }) private SiNumber: string
  @Prop({ default: '' }) private RSNumber: string
  @Prop({ default: '' }) private createdDate: Date | string
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
