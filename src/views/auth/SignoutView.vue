
<template>
  <sbc-signout :redirect-url="businessesUrl" />
</template>

<script lang="ts">
// Libraries
import { Component, Vue } from 'vue-facing-decorator'
// common Components
import SbcSignout from 'sbc-common-components/src/components/SbcSignout.vue'

// utils
import ConfigHelper from '@/util/config-helper'

@Component({
  components: {
    SbcSignout
  }
})
export default class SignoutView extends Vue {
  /** The URL of the Business Registry home page. */
  private get businessesUrl (): string {
    return ConfigHelper.getSelfURL()
  }
}
</script>
