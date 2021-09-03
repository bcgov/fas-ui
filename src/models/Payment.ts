// Class for storing values in CreateRoutingSlipPayment children - CASH and CHEQUE
export interface Payment {
  id?: number
  chequeReceiptNumber?: string
  paymentMethod?: string
  paymentDate?: string
  paidAmount?: number
  createdBy?: string
  isRoutingSlip?: boolean
  paymentSystem?: string // FAS incase of this app
  receiptNumber?: number
  statusCode?: string
}

export interface CorpTypeCode {
  code?: string
  description?: string
  isOnlineBankingAllowed?: boolean
  product: string
}

export interface FilingTypeCode {
  code?: string
  description?: string
}

export interface FilingType {
  corpTypeCode?: CorpTypeCode
  fee?: string
  feeScheduleId?: number
  feeStartDate?: Date
  filingTypeCode?: FilingTypeCode
  futureEffectiveFee?: string
  priorityFee?: number
  serviceFee?: number
}

export interface GetFeeRequestParams {
  corpTypeCode: string
  filingTypeCode: string
  requestParams: {
    quantity?: number
    priority?: boolean
    futureFiling?: boolean
  }
}
