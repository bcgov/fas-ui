<template>
  <v-menu
    v-model="showDateModal"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on: { click } }">
      <v-text-field
        v-model="selectedDate"
        :label="label"
        append-icon="mdi-calendar"
        readonly
        v-bind="$attrs"
        @click="click"
        filled
        data-test="input-date-picker"
        @click:append="click"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="selectedDate"
      v-bind="$attrs"
      @input="closeAfterSelection()"
      v-on="$listeners"
      data-test="date-date-picker"
    ></v-date-picker>
  </v-menu>
</template>

<script lang="ts">
/** component for date picker.
 * this is just a wrapper for vuetify date picker
 * can use all attributs from vuetify
 * pass persist if no no need close calendar after click
 *
 * example
 * <date-picker v-model="selectedDate" persist></date-picker></v-col>
 */

import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import { useDatePicker } from '@/composables/common'

@Component({
  setup (props, context) {
    const { selectedDate, showDateModal, closeAfterSelection } = useDatePicker(
      props,
      context
    )
    return {
      selectedDate,
      showDateModal,
      closeAfterSelection
    }
  }
})
export default class DatePicker extends Vue {
  @Prop() value: string
  @Prop({ default: 'Select Date' }) label: string
  @Prop({ default: false }) persist: boolean
}
</script>
