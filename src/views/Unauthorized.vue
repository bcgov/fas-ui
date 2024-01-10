<template>
  <v-container class="view-container">
    <v-row justify="center">
      <v-col
        cols="12"
        lg="8"
        class="text-center"
      >
        <v-icon
          size="48"
          color="error"
          class="mb-6"
        >
          mdi-lock-outline
        </v-icon>
        <h1>{{ $t('unauthorizedTitle') }}</h1>
        <p class="mt-8 mb-10">
          {{ $t('unauthorizedMsg') }}
        </p>
        <div class="btns">
          <v-btn
            id="contact-btn"
            size="large"
            link
            color="primary"
            class="ml-1"
            href="mailto:SBC_ITOperationsSupport@gov.bc.ca?subject=FAS Support"
          >
            Contact Support
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
</script>
