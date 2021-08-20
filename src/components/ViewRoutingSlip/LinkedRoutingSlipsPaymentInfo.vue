<template>
  <v-row no-gutters>
    <v-col class="col-12">
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ReviewRoutingSlipCashPayment from '@/components/ReviewRoutingSlip/ReviewRoutingSlipCashPayment.vue'
import ReviewRoutingSlipChequePayment from '@/components/ReviewRoutingSlip/ReviewRoutingSlipChequePayment.vue'
import { useLinkedRoutingSlipsPaymentInfo } from '@/composables/ViewRoutingSlip'

@Component({
  components: {
    ReviewRoutingSlipCashPayment,
    ReviewRoutingSlipChequePayment
  },
  setup () {
    const {
      routingSlip,
      isPaymentCheque
    } = useLinkedRoutingSlipsPaymentInfo()
    return {
      routingSlip,
      isPaymentCheque
    }
  }
})
export default class LinkedRoutingSlipsPaymentInfo extends Vue {
}
</script>
