import { ref } from '@vue/composition-api'
import { Code } from '@/models/Code'
import CodesService from '@/services/codes.service'

const routingSlipStatusList = ref<Code[]>([])

export const useCodes = () => {
  const getRoutingSlipStatusList = async () => {
    if (routingSlipStatusList.value.length === 0) {
      const response: any = await CodesService.getCodes(
        'routing_slip_statuses'
      )
      if (response && response.data && response.status === 200) {
        routingSlipStatusList.value = response.data?.codes
        return
      }
      routingSlipStatusList.value = []
    }
  }
  return {
    routingSlipStatusList,
    getRoutingSlipStatusList
  }
}
