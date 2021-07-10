<template>
  <v-dialog
    :persistent="isPersistent"
    :fullscreen="fullscreenOnMobile"
    :scrollable="isScrollable"
    :content-class="dialogClass"
    :max-width="maxWidth"
    v-model="isOpen"
    @keydown.esc="cancel">
    <v-card>
      <v-card-title data-test="dialog-header">
        <slot v-if="showIcon" name="icon">
          <v-icon large color="success">mdi-check</v-icon>
        </slot>
        <span>
          <slot name="title">{{ title }}</slot>
        </span>
        <span v-if="showCloseIcon">
           <v-btn
            icon
           @click="close()"
           class="font-weight-bold"
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>

        </span>
      </v-card-title>
      <v-card-text>
        <slot name="text">
          <div v-html="text"></div>
        </slot>
      </v-card-text>
        <v-card-actions v-if="showActions">
        <slot name="actions">
          <v-btn large color="success" @click="close()" data-test="dialog-ok-button">OK</v-btn>
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { useNavigation } from '@/composables/common'

@Component({
  setup (props, context) {
    const { goHome } = useNavigation(props, context)
    return {
      goHome
    }
  }
})
export default class InterimLanding extends Vue {
  @Prop({ default: '' }) private summary: string
  @Prop({ default: '' }) private description: string
  @Prop({ default: 'mdi-information-outline' }) private icon: string
  @Prop({ default: 'primary' }) private iconColor: string
  @Prop({ default: true }) private showHomePageBtn: boolean
}
</script>

<style lang="scss" scoped>
@import '$assets/scss/theme.scss';

.container {
  padding-top: 3rem;
  padding-bottom: 3rem;
}
</style>
