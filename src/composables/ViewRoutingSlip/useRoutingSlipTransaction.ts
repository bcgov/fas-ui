// Composable function to inject Props, options and values to RoutingSlipTransaction component
export default function useRoutingSlipTransaction (_, context) {
  function close (): void {
    context.root.$router.push('home')
  }

  return {
    close
  }
}
