<template>
  <v-row class="mb-3" v-if="routingSlipAddress.mailingAddress">
    <v-col class="col-3 font-weight-bold">
      Name of Person or Organization & Address
    </v-col>
    <v-col>
      <p>{{ routingSlipAddress.contactName }}</p>
      <AddressForm
        ref="addressForm"
        :editing="false"
        :schema="baseAddressSchema"
        :address="routingSlipAddress.mailingAddress"
      >
      </AddressForm>
  </v-col>
  </v-row>
</template>
<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import AddressForm from '@/components/common/AddressForm.vue'
import { addressSchema } from '@/schema'

export default defineComponent({
  name: 'ReviewRoutingSlipAddress',
  components: {
    AddressForm
  },
  props: {
    routingSlipAddress: {
      type: Object,
      required: true
    }
  },
  setup () {
    const baseAddressSchema = ref<any>(addressSchema)

    return {
      baseAddressSchema
    }
  }
})
</script>
