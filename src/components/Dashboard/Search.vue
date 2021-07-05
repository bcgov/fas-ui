<template>
  <v-row>
    <v-col>
      <v-card class="pa-6">
        <h4>Search for Routing Slip</h4>
        <p class="mb-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at
          porttitor sem.
        </p>

        <v-form>
          <v-row dense class="row-margin">
            <v-col sm="3" cols="12">
              <v-select
                :items="categoryList"
                v-model="category"
                filled
                item-text="name"
                item-value="value"
                return-object
                label="Select a Search Category"
              ></v-select>
            </v-col>
            <v-col sm="8" colsz="12">
              <v-text-field
                v-model="searchModal"
                filled
                :label="searchLabel"
                required
              ></v-text-field
            ></v-col>
            <v-col sm="1" cols="12">
              <v-btn class=" button-search" large dark color="primary">
                <v-icon dark large>
                  mdi-magnify
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row no-gutters class="mb-4">
            <v-col sm="12">
              <span
                color="primary"
                class="advanced-search"
                @click="toggleAdvanceSearch()"
                >Advanced Search</span
              >
            </v-col>
          </v-row>
          <transition name="slide-fade">
            <v-row dense class="row-margin" v-if="showAdvanceSearch">
              <v-col sm="4" cols="12">
                <v-menu
                  ref="menu"
                  :close-on-content-click="false"
                  :return-value.sync="searchDate"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="searchDate"
                      label="Date"
                      append-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      filled
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="searchDate" no-title scrollable range>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">
                      Cancel
                    </v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(date)">
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col sm="4" cols="12">
                <v-select
                  :items="statusList"
                  v-model="statusModal"
                  filled
                  item-text="name"
                  item-value="value"
                  return-object
                  label="Status"
                ></v-select>
              </v-col>
              <v-col sm="4" cols="12">
                <v-text-field
                  v-model="totalAmount"
                  filled
                  label="Total Amount"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </transition>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { useSearch } from '@/composables/Dashboard/useSearch'

@Component({
  setup () {
    const {
      categoryList,
      category,
      searchLabel,
      searchModal,
      statusList,
      statusModal,
      totalAmount,
      searchDate,
      toggleAdvanceSearch,
      showAdvanceSearch
    } = useSearch()
    return {
      categoryList,
      category,
      searchLabel,
      searchModal,
      statusList,
      statusModal,
      totalAmount,
      searchDate,
      toggleAdvanceSearch,
      showAdvanceSearch
    }
  }
})
export default class Search extends Vue {
}
</script>
<style lang="scss" scoped>
.button-search {
  display: flex;
  height: 67% !important;
  width: 100%;
}
.advanced-search {
  color: var(--v-primary-base) !important;
  font-size: 1rem;
  cursor: pointer;
}
.row-margin {
  margin: -5px !important;
}

</style>
