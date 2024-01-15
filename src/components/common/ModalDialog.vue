<template>
  <v-dialog
    v-model="isOpen"
    :persistent="isPersistent"
    :fullscreen="fullscreenOnMobile"
    :scrollable="isScrollable"
    :content-class="dialogClass"
    :max-width="maxWidth"
    :max-height="55"
    @keydown.esc="close"
  >
    <v-card class="px-10 pt-10 pb-8">
      <v-card-title
        data-test="dialog-header"
        class="pt-0 pb-5 d-flex"
      >
        <slot
          v-if="showIcon"
          name="icon"
        >
          <v-icon
            size="large"
            :color="iconColor"
            class="mt-0"
          >
            {{ icon }}
          </v-icon>
        </slot>
        <span data-test="dialog-title">
          <slot name="title">{{ title }}</slot>
        </span>
        <span v-if="showCloseIcon">
          <v-btn
            icon
            class="font-weight-bold"
            data-test="icon-dialog-close"
            @click="close()"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>

        </span>
      </v-card-title>
      <v-card-text>
        <slot name="text">
          <div
            class="px-8 pb-2"
            data-test="dialog-text"
            v-html="text"
          />
        </slot>
      </v-card-text>
      <v-card-actions v-if="showActions">
        <slot name="actions">
          <v-btn
            size="large"
            color="success"
            data-test="dialog-ok-button"
            @click="close()"
          >
            OK
          </v-btn>
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useModalDialog } from '@/composables/common'

withDefaults(defineProps<{
  title: string
  text?: string
  showIcon?: boolean
  showActions?: boolean
  isPersistent?: boolean
  fullscreenOnMobile?: boolean
  isScrollable?: boolean
  dialogClass: string
  maxWidth: string
  showCloseIcon?: boolean
  icon: string
  iconColor: string
}>(), {
  title: '',
  text: '',
  showIcon: true,
  showActions: true,
  isPersistent: false,
  fullscreenOnMobile: false,
  isScrollable: false,
  dialogClass: '',
  maxWidth: '',
  showCloseIcon: false,
  icon: 'mdi-check',
  iconColor: 'primary'
})

const {
  isOpen,
  close,
  open
} = useModalDialog()

defineExpose({
  open,
  close,
  isOpen
})
</script>

<style lang="scss" scoped>
  // Notify Dialog Variant
  // Vertical stacked title container (icon w/ text)
  // Center-aligned text throughout
  .notify-dialog .v-card-title {
    flex-direction: column;
    align-items: center;
    ::v-deep i {
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
  }

  .notify-dialog .v-card-text {
    text-align: center;
    letter-spacing: .0071428571em !important;
  }

  .notify-dialog .v-card-actions {
    justify-content: center;
    padding: 8px 16px;
  }
</style>
