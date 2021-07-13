<template>
  <v-dialog
    :persistent="isPersistent"
    :fullscreen="fullscreenOnMobile"
    :scrollable="isScrollable"
    :content-class="dialogClass"
    :max-width="maxWidth"
    v-model="isOpen"
    @keydown.esc="cancel">
    <v-card class="pa-10">
      <v-card-title data-test="dialog-header" class="pt-0 pb-5">
        <slot v-if="showIcon" name="icon" >
          <v-icon large :color="iconColor" class="mt-0">{{ icon }}</v-icon>
        </slot>
        <span>
          <slot name="title">{{ title }}</slot>
        </span>
        <span v-if="showCloseIcon">
           <v-btn
            icon
           @click="close()"
           class="font-weight-bold"
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>

        </span>
      </v-card-title>
      <v-card-text>
        <slot name="text">
          <div v-html="text" class="px-8 pb-7"></div>
        </slot>
      </v-card-text>
        <v-card-actions v-if="showActions">
        <slot name="actions">
          <v-btn large color="success" @click="close()" data-test="dialog-ok-button">OK</v-btn>
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { useModalDialog } from '@/composables/common'

@Component({
  setup (props, context) {
    const {
      isOpen,
      open,
      close
    } = useModalDialog(props, context)
    return {
      isOpen,
      open,
      close
    }
  }
})
export default class InterimLanding extends Vue {
  @Prop({ default: '' }) private title: string
  @Prop({ default: '' }) private text: string
  @Prop({ default: true }) private showIcon: boolean
  @Prop({ default: true }) private showActions: boolean
  @Prop({ default: false }) private isPersistent: boolean
  @Prop({ default: false }) private fullscreenOnMobile: boolean
  @Prop({ default: false }) private isScrollable: boolean
  @Prop({ default: '' }) private dialogClass: string
  @Prop({ default: '' }) private maxWidth: string
  @Prop({ default: false }) private showCloseIcon: boolean
  @Prop({ default: 'mdi-check' }) private icon: string
  @Prop({ default: 'primary' }) private iconColor: string
}
</script>

<style lang="scss" scoped>
  // Notify Dialog Variant
  // Vertical stacked title container (icon w/ text)
  // Center-aligned text throughout
  .notify-dialog .v-card__title {
    flex-direction: column;

    ::v-deep i {
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
  }

  .notify-dialog .v-card__text {
    text-align: center;
  }

  .notify-dialog .v-card__actions {
    justify-content: center;
    padding: 1.5rem;
  }
</style>
