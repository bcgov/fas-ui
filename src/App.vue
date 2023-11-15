<template>
<v-app id="app">
    <div
      class="header-group"
      ref="headerGroup"
    >
      <!-- loader  -->
      <sbc-loader :show="showLoading" />
      <!-- common header -->
        <sbc-header
        class="flex-column"
        :key="$store.state.refreshKey"
        :inAuth="false"
        :show-product-selector="false"
        :redirectUrlLoginFail="logoutUrl"
        :redirect-on-logout="logoutUrl"
        :showActions="true"
      >
      </sbc-header>
      <bread-crumb />
      <!-- error alert -->
      <error-alert-component
      :message="$t('errorAlertMessage')"
      v-if="hasCallFailed"
      ></error-alert-component>

    </div>
    <!-- body content -->
    <div class="app-body">
      <!-- using v-show instead of v-if to persist state -->
      <loader-component v-show="isThereActiveCalls"></loader-component>
      <router-view v-show="!isThereActiveCalls" />
    </div>
    <sbc-footer></sbc-footer>
  </v-app>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import ErrorAlertComponent from '@/components/common/ErrorAlertComponent.vue'
import LoaderComponent from '@/components/common/LoaderComponent.vue'

import SbcFooter from 'sbc-common-components/src/components/SbcFooter.vue'
import SbcHeader from 'sbc-common-components/src/components/SbcHeader.vue'
import SbcLoader from 'sbc-common-components/src/components/SbcLoader.vue'
import { useLoader, useErrorAlert } from './composables/common'

import BreadCrumb from '@/components/common/BreadCrumb.vue'

@Component({
  components: {
    SbcHeader,
    SbcFooter,
    SbcLoader,
    LoaderComponent,
    ErrorAlertComponent,
    BreadCrumb
  },
  setup () {
    /* Getter will return number of axios calls that are in progress with request.config.globalloading set to true
    This value is used to toggle between showing route and loading progress components
    if there are active calls, loading component is rendered else router-view */
    const { isThereActiveCalls } = useLoader()
    /* if hasCallFailed is true, then we display the error alert component. */
    const { hasCallFailed } = useErrorAlert()

    return {
      hasCallFailed,
      isThereActiveCalls

    }
  }
})
export default class App extends Vue {
  private showLoading = true
  private logoutUrl = ''

  private async mounted (): Promise<void> {
    this.showLoading = false
  }
}
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
