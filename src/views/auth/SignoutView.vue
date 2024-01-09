
<template>
  <sbc-signout :redirect-url="businessesUrl" />
</template>

<script setup lang="ts">
import SbcSignout from 'sbc-common-components/src/components/SbcSignout.vue'
import ConfigHelper from '@/util/config-helper'
import { computed } from 'vue'

/** The URL of the Business Registry home page. */
const businessesUrl = computed<string>(() => {
  return ConfigHelper.getSelfURL()
})
</script>
