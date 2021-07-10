import { computed, ref, toRefs } from '@vue/composition-api'

export function useModalDialog (props, context) {
  // using `toRefs` to create a Reactive Reference to a list of all props
  const {
    title,
    text,
    showIcon,
    showActions,
    isPersistent,
    fullscreenOnMobile,
    isScrollable,
    dialogClass,
    maxWidth,
    showCloseIcon
  } = toRefs(props)

  function goHome () {
    context.root.$router.push('/')
  }
  function gotoPage (page: string) {
    context.root.$router.push(page)
  }

  return {
    goHome,
    gotoPage
  }
}
