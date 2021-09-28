import { toRefs } from '@vue/composition-api'

// Composable function to inject Props, options and values to LinkedRoutingSlipDetails component
export default function useLinkedRoutingSlipDetails (props, context) {
  const { parentRoutingSlipNumber, routingSlipNumber } = toRefs(props)

  /* During these scenarios this component would be displayed:
    1. Navigate to child routing slip - at which we append the parent id and check if it is a libray call.
      If so, append queryparam to persist breadcrumbs
    2. Navigate to parent routing slip - at which we redirect to view routing slip and append queryparams if it is a library call.
  */
  function navigateTo (): string {
    const redirectFromAuth = context.root.$route?.query?.redirectFromAuth
    if (parentRoutingSlipNumber.value) {
      return redirectFromAuth ? `/view-routing-slip/${parentRoutingSlipNumber.value}/${routingSlipNumber.value}?redirectFromAuth=true`
        : `/view-routing-slip/${parentRoutingSlipNumber.value}/${routingSlipNumber.value}`
    } else {
      return redirectFromAuth ? `/view-routing-slip/${routingSlipNumber.value}?redirectFromAuth=true` : `/view-routing-slip/${routingSlipNumber.value}`
    }
  }

  return {
    navigateTo
  }
}
