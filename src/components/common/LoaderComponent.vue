<template>
  <v-container>
    <v-fade-transition>
      <div class="loading-container" data-test="div-loading-container">
        <v-progress-circular size="50" width="5" color="primary" indeterminate/>
      </div>
    </v-fade-transition>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class LoaderComponent extends Vue {
}
</script>
