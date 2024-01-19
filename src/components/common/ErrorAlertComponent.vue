<template>
  <v-expand-transition>
    <v-alert
      data-test="alert-error-alert"
      rounded="0"
      :type="type"
      :icon="icon"
      :closable="dismissible"
    >
      {{ message }}
    </v-alert>
  </v-expand-transition>
</template>

<script setup lang="ts">

withDefaults(defineProps<{
  message: string
  type: string
  icon: string
  dismissible: boolean
}>(), {
  message: '',
  type: 'error',
  icon: 'mdi-alert-circle-outline',
  dismissible: false
})
</script>
