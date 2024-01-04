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
import { Component, Prop, Vue } from 'vue-facing-decorator'

@Component({})
export default class LoaderComponent extends Vue {
  @Prop({ default: 50 }) size: number
  @Prop({ default: 5 }) width: number
  @Prop({ default: 'primary' }) color: string
}
</script>
