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
      <router-view  />
    </div>
    <sbc-footer></sbc-footer>
  </v-app>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import SbcFooter from 'sbc-common-components/src/components/SbcFooter.vue'
import SbcHeader from 'sbc-common-components/src/components/SbcHeader.vue'
import SbcLoader from 'sbc-common-components/src/components/SbcLoader.vue'

@Component({
  components: {
    SbcHeader,
    SbcFooter,
    SbcLoader
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
</style>
