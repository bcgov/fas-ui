import { ref } from '@vue/composition-api'

// Composable function to inject Props, options and values to CreateRoutingSlipDetails component
export function useCreateRoutingSlipDetails () {
  const createRoutingSlipDetailsForm = ref<HTMLFormElement>()
  const routingSlipId = ref(null)
  const routingDate = ref('')
  const routingSlipPersonName = ref('')

  return {
    createRoutingSlipDetailsForm,
    routingSlipId,
    routingDate,
    routingSlipPersonName
  }
}
