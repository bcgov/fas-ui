import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

import { Code } from '@/models/Code'
import CodesService from '../../services/codes.service'

@Module({ namespaced: true })
export default class CodesModule extends VuexModule {
  routingSlipStatusList: Code[] = []

  private routingSlipStatusCodeTable = 'routing_slip_statuses'

  @Mutation
  public setRoutingSlipStatus (codes: Code[]) {
    this.routingSlipStatusList = codes
  }

  @Action({ commit: 'setRoutingSlipStatus', rawError: true })
  public async getRoutingSlipStatusList (): Promise<Code[]> {
    const context: any = this.context
    const routingSlipStatusList = context.state.routingSlipStatusList
    if (routingSlipStatusList.length === 0) {
      const response: any = await CodesService.getCodes(
        this.routingSlipStatusCodeTable
      )
      if (response && response.data && response.status === 200) {
        return response.data?.codes
      }
      return []
    } else {
      return routingSlipStatusList
    }
  }
}
