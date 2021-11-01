<template>
  <div class="staff-comment">
    <StaffComments  :url="url" :axios="axios" :businessId="routingSlipNumber" :key="routingSlipNumber" maxLength="2000"/>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { StaffComments } from '@bcrs-shared-components/staff-comments'
import axios from '@/util/http-util'
import ConfigHelper from '@/util/config-helper'

// @Component
@Component({
  components: {
    StaffComments
  }
})
export default class StaffCommentsComp extends Vue {
    readonly axios = axios // for template
    // RS number is taking from props, since we dont have any functionality here. so no need of compostion api now
    @Prop({ required: true }) readonly routingSlipNumber: string
    // Creating URL since all services are handled by component , passing only URL
    get url () {
      return `${ConfigHelper.getFasAPIURL()}/routing-slips/${this.routingSlipNumber}/comments`
    }
}
</script>
<style lang="scss" scoped>
.staff-comment{
  padding-left:-5px
}
</style>
