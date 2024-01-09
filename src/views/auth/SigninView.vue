<template>
  <sbc-signin @sync-user-profile-ready="onSessionReady()" />
</template>

<script setup lang="ts">
import SbcSignin from 'sbc-common-components/src/components/SbcSignin.vue'
import ConfigHelper from '@/util/config-helper'
import { useRoute, useRouter } from 'vue-router'

/** Called when Keycloak session is ready (ie, the user is authenticated). */
const onSessionReady = async () => {
  const route = useRoute()
  const router = useRouter()
  if (route.query.redirect) {
    // navigate to the route we originally came from
    router.push(route.query.redirect as string)
  } else {
    console.error('Signin page missing redirect param') // eslint-disable-line no-console
    // redirect to fas Registry home page
    const appUrl = ConfigHelper.getSelfURL()
    // assume fas URL is always reachable
    window.location.assign(appUrl)
  }
}
</script>

<style lang="scss" scoped>
</style>
