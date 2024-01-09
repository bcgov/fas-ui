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

<script setup lang="ts">
/** component for date picker.
 * this is just a wrapper for vuetify date picker
 * can use all attributs from vuetify
 * pass persist if no no need close calendar after click
 *
 * example
 * <date-picker v-model="selectedDate" persist></date-picker></v-col>
 */

import { useDatePicker } from '@/composables/common'

const props = defineProps<{
  value: string
  label: {
    type: string
    default: 'Select Date'
  },
  persist: boolean
}>()

const emits = defineEmits<{
  input: [value: string]
}>()

const { selectedDate, showDateModal, closeAfterSelection } = useDatePicker(props, emits)
</script>
