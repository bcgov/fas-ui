<template>
  <v-container>
    <v-row justify="center">
      <v-col
        cols="12"
        lg="8"
        class="text-center"
      >
        <v-icon
          size="48"
          :color="iconColor"
          class="mb-6"
        >
          {{ icon }}
        </v-icon>
        <h1 class="mb-5">
          {{ summary }}
        </h1>
        <p class="mb-9">
          <slot name="description">
            {{ description }}
          </slot>
        </p>
        <slot name="actions">
          <v-btn
            v-if="showHomePageBtn"
            size="large"
            link
            color="primary"
            data-test="btn-home"
            @click="goHome()"
          >
            {{ $t('homeBtnLabel') }}
          </v-btn>
        </slot>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useNavigation } from '@/composables/common'

const { goHome } = useNavigation()

withDefaults(defineProps<{
  summary: string
  description: string
  icon: string
  iconColor: string
  showHomePageBtn: boolean
}>(), {
  summary: '',
  description: '',
  icon: 'mdi-information-outline',
  iconColor: 'primary',
  showHomePageBtn: true
})
</script>

<style lang="scss" scoped>
@import '$assets/scss/theme.scss';

.container {
  padding-top: 3rem;
  padding-bottom: 3rem;
}
</style>
