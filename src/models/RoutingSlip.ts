import { Payment } from './Payment'

// Each Routing Slip is tied to an account - PayBC
export interface AccountInfo {
    accountName?: string
}
// Class for storing values in CreateRoutingSlip component - for POST endpoint
export interface RoutingSlip {
    number?: string
    paymentAccount?: AccountInfo
    payments?: Payment[]
    routingSlipDate?: string
}
// Class for storing values in CreateRoutingSlipDetails component
export interface RoutingSlipDetails {
    number?: string
    routingSlipDate?: string
    accountName?: string
}
