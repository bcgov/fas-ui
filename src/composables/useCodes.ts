import { ref } from '@vue/composition-api'
import { Code } from '@/models/Code'
import CodesService from '@/services/codes.service'
import { SlipStatus } from '@/util/constants'

const routingSlipStatusList = ref<Code[]>([])

export const useCodes = () => {
  const getRoutingSlipStatusList = async () => {
    if (routingSlipStatusList.value.length === 0) {
      const response: any = await CodesService.getCodes(
        'routing_slip_statuses'
      )
      if (response && response.data && response.status === 200) {
        routingSlipStatusList.value = response.data?.codes.filter(
          code => code.code !== SlipStatus.REFUNDREJECTED
        )
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
