<template>
  <v-expand-transition>
    <v-alert data-test="alert-error-alert" tile :type="type" :icon="icon" :dismissible="dismissible">{{ message }}</v-alert>
  </v-expand-transition>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator'

@Component({
})
export default class ErrorAlertComponent extends Vue {
  @Prop({ default: '' }) message: string
  @Prop({ default: 'error' }) type: string
  @Prop({ default: 'mdi-alert-circle-outline' }) icon: string
  @Prop({ default: false }) dismissible: boolean
}
</script>
