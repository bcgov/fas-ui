<template>
  <v-container>
    <v-fade-transition>
      <div class="loading-container" data-test="div-loading-container" v-if="isLoading">
        <v-progress-circular size="50" width="5" color="primary" :indeterminate="isLoading"/>
      </div>
    </v-fade-transition>
  </v-container>
</template>

<script lang="ts">
import { useLoader } from '@/composables/common'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  setup () {
    const { isLoading } = useLoader()
    return {
      isLoading
    }
  }
})
export default class LoaderComponent extends Vue {
}
</script>
