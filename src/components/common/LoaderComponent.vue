<template>
  <v-container>
    <v-fade-transition>
      <div class="loading-container" v-if="visible">
        <v-progress-circular size="50" width="5" color="primary" :indeterminate="visible"/>
      </div>
    </v-fade-transition>
  </v-container>
</template>

<script lang="ts">
import { useLoader } from '@/composables/common'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  setup () {
    const { visible } = useLoader()
    return {
      visible
    }
  }
})
export default class LoaderComponent extends Vue {
}
</script>
