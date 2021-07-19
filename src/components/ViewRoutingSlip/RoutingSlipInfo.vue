<template>
  <div>
    <header class="d-flex flex-column mb-0">
      <h3>01.Routing Slip Information</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </header>
    <v-card class="pl-5 py-2">
      <v-card-text>
        <v-row no-gutters>
          <v-col class="col-12 col-sm-10 ">
            <v-row no-gutters>
              <v-col class="col-6 col-sm-3 font-weight-bold">
                Routing Slip - Unique ID
              </v-col>
              <v-col class="col-6 col-sm-9">
                {{ routinSlipDetails.number }}
              </v-col>
            </v-row>

            <v-row>
              <v-col class="col-6 col-sm-3 font-weight-bold">
                Date
              </v-col>

              <v-col class="col-6 col-sm-9">
                {{
                  formatDisplayDate(
                    routinSlipDetails.routingSlipDate,
                    'MMM DD, YYYY'
                  )
                }}
              </v-col>
            </v-row>

            <v-row v-if="!editMode">
              <v-col class="col-6 col-sm-3 font-weight-bold">
                Status
              </v-col>
              <v-col class="col-6 col-sm-9">
                <span
                  :class="colors(routinSlipDetails.status)"
                  class="slip-status"
                  >{{ getStatusLabel(routinSlipDetails.status) }}</span
                >
              </v-col>
            </v-row>
            <!-- show only on edit -->
            <v-row v-else>
              <v-col class="col-6 col-sm-3 font-weight-bold">
                Status
              </v-col>
              <v-col class="col-6 col-sm-9">
                <statusList v-model="currentStatus"></statusList>
              </v-col>
            </v-row>

            <v-row>
              <v-col class="col-6 col-sm-3 font-weight-bold">
                Name of Person Submitting
              </v-col>
              <v-col class="col-6 col-sm-9">
                {{ routinSlipDetails.createdName }}
              </v-col>
            </v-row>
          </v-col>

          <v-col class="col-1 col-sm-2 d-flex justify-end pr-5"
            ><span
              class="primary--text cursor-pointer"
              @click="toggleEdit(true)"
              ><v-icon color="primary" size="20"> mdi-pencil</v-icon> Edit
              Status</span
            >
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="pr-10 justify-end pa-3 pb-5" v-if="editMode">
        <v-btn
          large
          color="primary"
          @click="updateStatus()"
          class="px-8 font-weight-bold"
          data-test="btn-edit-routing-done"
        >
          <span>Done</span>
        </v-btn>
        <v-btn
          large
          outlined
          class="px-7"
          color="primary"
          @click="toggleEdit(false)"
          data-test="btn-edit-routing-cancel"
        >
          <span>Cancel</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import commonUtil from '@/util/common-util'
import { useRoutingSlipInfo } from '@/composables/ViewRoutingSlip'
import statusList from '@/components/common/StatusList.vue'

@Component({
  components: {
    statusList
  },
  setup (props) {
    const {
      routinSlipDetails,
      editMode,
      toggleEdit,
      currentStatus,
      updateStatus,
      getStatusLabel
    } = useRoutingSlipInfo(props)

    return {
      routinSlipDetails,
      editMode,
      toggleEdit,
      currentStatus,
      updateStatus,
      getStatusLabel
    }
  }
})
export default class PrintRoutingSlip extends Vue {
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
</style>
