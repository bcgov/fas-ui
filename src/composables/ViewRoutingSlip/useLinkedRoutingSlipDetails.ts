import { toRefs } from '@vue/composition-api'

// Composable function to inject Props, options and values to LinkedRoutingSlipDetails component
export default function useLinkedRoutingSlipDetails (props, context) {
  const { parentRoutingSlipNumber, routingSlipNumber } = toRefs(props)

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
