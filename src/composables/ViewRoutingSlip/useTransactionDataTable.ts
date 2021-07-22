import { Invoice, InvoiceDisplay, LineItem, Reference } from '@/models/Invoice'
import { ref, toRefs, watch } from '@vue/composition-api'

import { InvoiceStatus } from '@/util/constants'
import { createNamespacedHelpers } from 'vuex-composition-helpers'

const routingSlipModule = createNamespacedHelpers('routingSlip') // specific module name
const { useGetters, useState } = routingSlipModule

// Composable function to inject Props, options and values to TransactionDataTable component
export default function useTransactionDataTable (props) {
  // ref and i/p variables
  const invoiceDisplay = ref<InvoiceDisplay[]>([])
  const headerTranscations = [
    {
      text: 'Date',
      align: 'start',
      sortable: false,
      value: 'createdOn'
    },
    {
      text: 'Invoice #',
      align: 'start',
      sortable: false,
      value: 'invoiceNumber'
    },
    {
      text: 'Transaction Amount',
      align: 'end',
      sortable: false,
      value: 'total'
    },
    {
      text: 'Description',
      align: 'start',
      value: 'description',
      sortable: false
    },
    {
      text: 'Initiator',
      align: 'start',
      value: 'createdName',
      sortable: false
    }
  ]

  // vuex getter and state
  const { invoiceCount } = useGetters(['invoiceCount'])
  const { routingSlip } = useState(['routingSlip'])

  // We are watching routingslip parent object and if any changes, we update the invoice and pass it along to transaction table to display
  watch(routingSlip, () => {
    if (routingSlip.value?.invoices) {
      transformInvoices(routingSlip.value?.invoices)
    }
  }, { deep: true, immediate: true })

  function transformInvoices (invoices: Invoice[]): void {
    for (let i = 0; i < invoices?.length; i++) {
      const invoice: Invoice = invoices[i]
      const invoiceDisplayObject: InvoiceDisplay = {}
      // assign created on date
      invoiceDisplayObject.createdOn = invoice.createdOn
      // concatenate all description from line items
      const description = invoice?.lineItems.map((lineItem: LineItem) => {
        return lineItem?.description
      })
      invoiceDisplayObject.description = description
      // we need invoice number of completed transaction only
      invoiceDisplayObject.invoiceNumber = invoice?.references?.find((reference: Reference) => reference?.statusCode === InvoiceStatus.COMPLETED)?.invoiceNumber
      invoiceDisplayObject.total = invoice?.total
      invoiceDisplayObject.createdName = invoice?.createdName || invoice?.createdBy
      invoiceDisplay.value.push(invoiceDisplayObject)
    }
  }

  return {
    invoiceDisplay,
    headerTranscations,
    invoiceCount,
    transformInvoices
  }
}
