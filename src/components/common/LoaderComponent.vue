<template>
  <v-container>
    <v-fade-transition>
      <div class="loading-container" data-test="div-loading-container">
        <v-progress-circular :size="size" :width="width" :color="color" indeterminate/>
      </div>
    </v-fade-transition>
  </v-container>
</template>

<script lang="ts">

withDefaults(defineProps<{
  size: number
  width: number
  color: string
}>(), {
  size: 50,
  width: 5,
  color: 'primary'
})
</script>
