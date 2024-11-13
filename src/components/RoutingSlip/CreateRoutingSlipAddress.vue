<template>
  <div class="d-flex justify-start">
    <v-col cols="2">
      <p data-test="title" class="text-center font-weight-bold mt-4">Name of Person or Organization & Address</p>
    </v-col>
    <v-col cols="10" class="pl-0 pr-md-16">
      <v-form ref="createRoutingSlipAddressForm" class="mt-4">
        <v-row class="d-flex px-0 mx-0 justify-between">
          <v-col class="py-0">
            <v-text-field
              filled
              label="Name of Person or Organization"
              req
              persistent-hint
              data-test="txtAmount"
              v-model="contactName"
              :rules="entityNameRules"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row class="d-flex px-0 mx-0 justify-between">
          <v-col class="py-0">
            <AddressForm
              ref="addressForm"
              :editing="true"
              :schema="baseAddressSchema"
              :address="address"
              @update:address="updateAddress"
              @valid="addressValidity"
            >
            </AddressForm>
          </v-col>
        </v-row>
      </v-form>
    </v-col>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from '@vue/composition-api'
import { useCreateRoutingSlipAddress } from '@/composables/RoutingSlip'
import AddressForm from '@/components/common/AddressForm.vue'

export default defineComponent({
  name: 'CreateRoutingSlipAddress',
  components: {
    AddressForm
  },
  props: {
  },
  setup () {
    const createRoutingSlipAddressState = useCreateRoutingSlipAddress()

    const state = reactive({
      ...createRoutingSlipAddressState
    })

    return {
      ...toRefs(state)
    }
  }
})
</script>

<style lang="scss" scoped>
@import '$assets/scss/theme.scss';

.text-center {
  text-align: center;
}
</style>
