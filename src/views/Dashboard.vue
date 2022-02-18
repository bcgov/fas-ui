<template>
  <div class="home">
    <Dashboard />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Dashboard } from '@/components/Dashboard' // @ is an alias to /src

@Component({
  components: {
    Dashboard
  }
})
export default class DashboardView extends Vue {}
</script>
