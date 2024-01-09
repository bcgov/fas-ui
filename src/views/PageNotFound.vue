<template>
  <interim-landing :summary="$t('pageNotFoundTitle')" :description="$t('pageNotFoundMsg')" icon="mdi-alert-circle-outline" iconColor="error">
  </interim-landing>
</template>

<script setup lang="ts">
import InterimLanding from '@/components/common/InterimLanding.vue'
</script>
