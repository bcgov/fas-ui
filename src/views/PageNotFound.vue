<template>
  <interim-landing :summary="$t('pageNotFoundTitle')" :description="$t('pageNotFoundMsg')" icon="mdi-alert-circle-outline" iconColor="error">
  </interim-landing>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator'
import InterimLanding from '@/components/common/InterimLanding.vue'
@Component({
  components: { InterimLanding }
})
export default class PageNotFound extends Vue {
}
</script>
