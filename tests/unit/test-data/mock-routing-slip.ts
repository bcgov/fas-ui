import { AccountInfo, RoutingSlip, RoutingSlipDetails } from '@/models/RoutingSlip'

import { Invoice } from '@/models/Invoice'
import { Payment } from '@/models/Payment'

export const invoice: Invoice[] = [
  {
    businessIdentifier: 'CP0001405',
    corpTypeCode: 'CP',
    createdBy: 'SERVICE-ACCOUNT-ENTITY-SERVICE-ACCOUNT',
    createdOn: '2021-07-15T17:57:32.432827',
    id: 1,
    lineItems: [
      {
        description: 'Annual Report'
      },
      {
        description: '2.0 Version1'
      }
    ],
    references: [
      {
        id: 8427,
        invoiceNumber: 'REGD00010652',
        statusCode: 'ACTIVE'
      }
    ],
    total: 1000
  },
  {
    businessIdentifier: 'CP000140135',
    corpTypeCode: 'CP',
    createdName: 'testIDIR',
    createdOn: '2021-07-15T17:57:32.432827',
    id: 1,
    lineItems: [
      {
        description: 'Annual Report'
      }
    ],
    references: [
      {
        id: 8427,
        invoiceNumber: 'REGD00010652',
        statusCode: 'COMPLETED'
      }
    ],
    total: 10000
  }
]

export const routingSlip: RoutingSlip = {
  id: 4,
  number: '123',
  paymentAccount: { billable: true, name: 'test', paymentMethod: 'CHEQUE' },
  payments: [{ chequeReceiptNumber: '123', createdBy: 'user', id: 7636, paymentMethod: 'CHEQUE', paidAmount: 123, paymentDate: '2021-07-15' }],
  remainingAmount: 123,
  routingSlipDate: '2021-07-08',
  status: 'ACTIVE',
  total: 12345,
  invoices: invoice
}

export const routingSlipDetails: RoutingSlipDetails = {
  number: 'RoutingTEST123',
  routingSlipDate: '2021-08-13'
}

export const accountInfo: AccountInfo = {
  accountName: 'Thomas Wayne'
}

export const chequePayment: Payment[] = [
  {
    chequeReceiptNumber: 'CHEQUE1',
    paidAmount: 100,
    paymentMethod: 'CHEQUE'
  },
  {
    chequeReceiptNumber: 'CHEQUE2',
    paidAmount: 100,
    paymentMethod: 'CHEQUE'
  }
]

export const cashPayment: Payment =
{
  chequeReceiptNumber: 'CASH123',
  paidAmount: 1000,
  paymentMethod: 'CASH'
}
