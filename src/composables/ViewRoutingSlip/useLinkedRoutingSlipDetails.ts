import CommonUtils from '@/util/common-util'
import { toRefs } from 'vue'

// Composable function to inject Props, options and values to LinkedRoutingSlipDetails component
export default function useLinkedRoutingSlipDetails (props, context) {
  const { parentRoutingSlipNumber, routingSlipNumber } = toRefs(props)
  const appendQueryParamsIfNeeded = CommonUtils.appendQueryParamsIfNeeded

  /* During these scenarios this component would be displayed:
    1. Navigate to child routing slip - at which we append the parent id and check if it is a libray call.
      If so, append queryparam to persist breadcrumbs
    2. Navigate to parent routing slip - at which we redirect to view routing slip and append queryparams if it is a library call.
  */
  function navigateTo (): string {
    const route = context.root.$route
    if (parentRoutingSlipNumber.value) {
      return appendQueryParamsIfNeeded(`/view-routing-slip/${parentRoutingSlipNumber.value}/${routingSlipNumber.value}`, route)
    } else {
      return appendQueryParamsIfNeeded(`/view-routing-slip/${routingSlipNumber.value}`, route)
    }
  }

  return {
    navigateTo
  }
}
