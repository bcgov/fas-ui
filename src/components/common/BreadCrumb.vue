<template>
  <v-container>
    <v-row justify="start">
      <v-col cols="12" lg="8" class="text-center">
        <v-breadcrumbs>
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
          <template v-slot:item="{ item }">
            <v-breadcrumbs-item
              :to="item.to"
              class="text-subtitle-2 crumb-item"
              :disabled="item.disabled"
              exact
            >
              {{ item.text }}
            </v-breadcrumbs-item>
          </template>
        </v-breadcrumbs>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
// import { useBreadCrumb } from '@/composables/common'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  setup () {
  }
})
export default class BreadCrumb extends Vue {
    @Prop({
      default: () => [
        {
          text: 'Dashboard',
          disabled: false,
          to: '/home'
        }
      ]
    }) items: string[]
}
</script>

<style lang="scss" scoped>
@import '$assets/scss/theme.scss';
</style>
