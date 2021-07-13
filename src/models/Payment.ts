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
