<template>
<v-container class="view-container">
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>components will load here</div>
  </div>
</v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
}
</script>
