<template>
<v-app id="app">
    <div class="header-group" ref="headerGroup">
      <!-- loader  -->
      <sbc-loader :show="showLoading" />
      <!-- common header -->
        <sbc-header
        class="sbc-header"
        :key="$store.state.refreshKey"
        :inAuth="false"
        :show-product-selector="false"
        :redirectUrlLoginFail="logoutUrl"
        :redirect-on-logout="logoutUrl"
        :showActions="true"
      >
      </sbc-header>
    </div>
    <!-- body content -->
    <div class="app-body">
      <!-- using v-show instead of v-if to persist state -->
      <loader-component v-show="isLoadingState"></loader-component>
      <router-view v-show="!isLoadingState" />
    </div>
    <sbc-footer></sbc-footer>
  </v-app>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import LoaderComponent from '@/components/common/LoaderComponent.vue'

import SbcFooter from 'sbc-common-components/src/components/SbcFooter.vue'
import SbcHeader from 'sbc-common-components/src/components/SbcHeader.vue'
import SbcLoader from 'sbc-common-components/src/components/SbcLoader.vue'

@Component({
  components: {
    SbcHeader,
    SbcFooter,
    SbcLoader,
    LoaderComponent
  }
})
export default class App extends Vue {
  private showLoading = true
  private logoutUrl = ''

  /* Getter will return true if there is an ongoing axios request and the request has a config of showLoading set to true
  This value is used to toggle between showing route and loading progress components */
  get isLoadingState (): boolean {
    const store: any = this.$store.state
    return store.loadingStatus.isLoading
  }

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
</style>
