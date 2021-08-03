<template>
  <v-alert tile v-if="hasCallFailed" :type="type" :icon="icon" :dismissible="dismissible">{{ message }}</v-alert>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { useErrorAlert } from '@/composables/common'

@Component({
  setup () {
    /* if hasCallFailed is true, then we display the error alert component. */
    const { hasCallFailed } = useErrorAlert()
    return {
      hasCallFailed
    }
  }
})
export default class ErrorAlertComponent extends Vue {
  @Prop({ default: '' }) message: string
  @Prop({ default: 'error' }) type: string
  @Prop({ default: 'mdi-alert-circle-outline' }) icon: string
  @Prop({ default: false }) dismissible: boolean
}
</script>
