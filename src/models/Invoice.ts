// Model for storing invoice of a routing slip
export interface LineItem {
  description?: string
  filingFees?: number
  futureEffectiveFees?: number
  gst?: number
  id?: number
  priorityFees?: number
  pst?: number
  quantity?: number
  serviceFees?: number
  statusCode?: string
  total?: number
  waivedBy?: string
  waivedFees?: number
}

export interface Reference {
  id?: number
  invoiceNumber?: string
  statusCode?: string
}

export interface Detail {
  label?: string
  value?: string
}

export interface Invoice {
  businessIdentifier?: string
  corpTypeCode?: string
  createdBy?: string
  createdOn?: string
  createdName?: string
  id?: number
  lineItems?: LineItem[]
  detail?: Detail[]
  paid?: number
  paymentMethod?: string
  references?: Reference[]
  refund?: number
  routingSlip?: string
  serviceFees?: string
  statusCode?: string
  total?: number
}

export interface InvoiceList {
  consInvNumber?: string
  invoiceNumber: string
  invoices: Invoice[],
  paymentMethod: string
  paymentSystem: string
  statusCode: string
  invoiceAmount: number
  paidAmount: number
}

export interface InvoiceListResponse {
  items: InvoiceList[]
  limit: number
  page: number
  total: number
}

// For displaying transaction data table
export interface InvoiceDisplay {
  createdOn?: string
  invoiceNumber?: string
  statusCode?: string
  total?: number
  createdName?: string
  createdBy?: string
  description?: string[]
  id?: number
}
