<template>
  <div class="home">
    <bread-crumb/>
    <Dashboard />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Dashboard } from '@/components/Dashboard' // @ is an alias to /src
import BreadCrumb from '@/components/common/BreadCrumb.vue'

@Component({
  components: {
    Dashboard,
    BreadCrumb
  }
})
export default class DashboardView extends Vue {}
</script>
