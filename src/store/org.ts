import { Organization } from '@/models/Organization'
import { EftRefundRequest } from '@/models/refund'
import { StatementFilterParams, StatementsSummary } from '@/models/statement'
import PaymentService from '@/services/payment.services'
import { reactive, toRefs } from '@vue/composition-api'
import { defineStore } from 'pinia'

export const useOrgStore = defineStore('org', () => {
  const state = reactive({
    currentOrganization: undefined as Organization,
    statementsSummary: {} as StatementsSummary
  })

  async function getStatementsList (filterParams: StatementFilterParams, organizationId = state.currentOrganization.id) {
    const response = await PaymentService.getStatementsList(organizationId, filterParams)
    return response?.data
  }

  async function getStatementsSummary (organizationId = state.currentOrganization.id) {
    try {
      const response = await PaymentService.getStatementsSummary(organizationId)
      const result = response?.data || {} as StatementsSummary
      state.statementsSummary = result
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async function refundEFT (refundPayload: EftRefundRequest) {
    const response = await PaymentService.refundEFT(refundPayload)
    return response?.data || {}
  }

  return {
    ...toRefs(state),
    getStatementsList,
    getStatementsSummary,
    refundEFT
  }
})
