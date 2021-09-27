import { BreadcrumbItem } from '@/models/BreadcrumbItem'
import { computed } from '@vue/composition-api'

/*
Composable function for BreadCrumb component that is displayed at top of the screen.
Currently, displayed in Dashboard and ViewRoutingslip views
*/
export function useBreadCrumb (_, context) {
  const items = computed(() => {
    if (typeof context.root.$route.meta.breadCrumb === 'function') {
      return context.root.$route.meta.breadCrumb.call(context, context.root.$route)
    }
    return context.root.$route.meta.breadCrumb
  })

  function goBack (): void {
    history.back()
  }
  return {
    items,
    goBack
  }
}
