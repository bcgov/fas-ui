<template>
  <interim-landing :summary="$t('pageNotFoundTitle')" :description="$t('pageNotFoundMsg')" icon="mdi-alert-circle-outline" iconColor="error">
  </interim-landing>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import InterimLanding from '@/components/common/InterimLanding.vue'
import Vue from 'vue'
@Component({
  components: { InterimLanding }
})
export default class PageNotFound extends Vue {
}
</script>
