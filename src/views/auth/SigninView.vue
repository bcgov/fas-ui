<template>
  <sbc-signin @sync-user-profile-ready="onSessionReady()" />
</template>

<script lang="ts">
// Libraries
import { Component, Vue } from 'vue-property-decorator'
// Components
import SbcSignin from 'sbc-common-components/src/components/SbcSignin.vue'
// utils
import ConfigHelper from '@/util/config-helper'
@Component({
  components: {
    SbcSignin
  }
})
export default class SigninView extends Vue {
  /** Called when Keycloak session is ready (ie, the user is authenticated). */
  private async onSessionReady () {
    if (this.$route.query.redirect) {
      // navigate to the route we originally came from
      this.$router.push(this.$route.query.redirect as string)
    } else {
      console.error('Signin page missing redirect param') // eslint-disable-line no-console
      // redirect to fas Registry home page
      const appUrl = ConfigHelper.getSelfURL()
      // assume fas URL is always reachable
      window.location.assign(appUrl)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
