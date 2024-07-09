<template>
  <div class="observer" ref="observerElement" />
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from '@vue/composition-api'

export default {
  props: ['options'],
  setup (props, { emit }) {
    const observerElement = ref(null)
    const observer = ref(null)

    onMounted(() => {
      const options = props.options || {}
      observer.value = new IntersectionObserver(([entry]) => {
        if (entry && entry.isIntersecting) {
          emit('intersect', entry)
        }
      }, options)
      observer.value.observe(observerElement.value)
    })

    onBeforeUnmount(() => {
      observer.value?.disconnect()
    })

    return {
      observerElement
    }
  }
}
</script>

<style scoped>
.observer {
  min-height: 1px;
}
</style>
