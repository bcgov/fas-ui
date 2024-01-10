<template>
  <v-app id="app">
    <div
      ref="headerGroup"
      class="header-group"
    >
      <!-- loader  -->
      <sbc-loader :show="showLoading" />
      <!-- common header -->
      <sbc-header
        :key="refreshKey"
        class="flex-column"
        :inAuth="false"
        :show-product-selector="false"
        :redirectUrlLoginFail="logoutUrl"
        :redirect-on-logout="logoutUrl"
        :showActions="true"
      />
      <bread-crumb />
      <!-- error alert -->
      <error-alert-component
        v-if="hasCallFailed"
        :message="$t('errorAlertMessage')"
      />
    </div>
    <!-- body content -->
    <div class="app-body">
      <!-- using v-show instead of v-if to persist state -->
      <loader-component v-show="isThereActiveCalls" />
      <router-view v-show="!isThereActiveCalls" />
    </div>
    <sbc-footer />
  </v-app>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ErrorAlertComponent from '@/components/common/ErrorAlertComponent.vue'
import LoaderComponent from '@/components/common/LoaderComponent.vue'
import SbcFooter from 'sbc-common-components/src/components/SbcFooter.vue'
import SbcHeader from 'sbc-common-components/src/components/SbcHeader.vue'
import SbcLoader from 'sbc-common-components/src/components/SbcLoader.vue'
import BreadCrumb from '@/components/common/BreadCrumb.vue'
import { useErrorAlert, useLoader } from './composables/common'
import { useAppStore } from '@/store/app'

const headerGroup = ref(null)
const showLoading = ref(true)
const logoutUrl = ref('')

const { isThereActiveCalls } = useLoader()
const { hasCallFailed } = useErrorAlert()
const { refreshKey } = useAppStore()

onMounted(() => {
  showLoading.value = false
})
</script>

<style lang="scss">
  .app-container {
    display: flex;
    flex-flow: column nowrap;
    min-height: 100vh
  }

  .header-group {
    position: sticky;
    position: -webkit-sticky; /* For Safari support */
    top: 0;
    width: 100%;
    z-index: 2;
  }

  .app-body {
    flex: 1 1 auto;
    position: relative;
  }
  .sbc-header{
    height: 70px
  }
</style>
