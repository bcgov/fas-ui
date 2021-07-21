import { Invoice, InvoiceDto, LineItem, Reference } from '@/models/Invoice'
import { ref, toRefs, watch } from '@vue/composition-api'

import { createNamespacedHelpers } from 'vuex-composition-helpers'

const routingSlipModule = createNamespacedHelpers('routingSlip') // specific module name
const { useGetters } = routingSlipModule

// Composable function to inject Props, options and values to TransactionDataTable component
export default function useTransactionDataTable (props, _) {
  // ref and i/p variables
  const { invoices } = toRefs(props)
  const invoiceDto = ref<InvoiceDto[]>([])
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

  // vuex getter
  const { invoiceCount } = useGetters(['invoiceCount'])

  watch(invoices, () => {
    transformInvoices()
  }, { deep: true, immediate: true })

  function transformInvoices (): void {
    for (let i = 0; i < invoices.value?.length; i++) {
      const invoice: Invoice = invoices.value[i]
      const invoiceDtoObject: InvoiceDto = {}
      // assign created on date
      invoiceDtoObject.createdOn = invoice.createdOn
      // concatenate all description from line items
      const description = invoice?.lineItems.map((lineItem: LineItem) => {
        return lineItem?.description
      }).join('')
      invoiceDtoObject.description = description
      // TODO Change statuscode to enum after PR merge
      // we need invoice number of completed transaction only
      invoiceDtoObject.invoiceNumber = invoice?.references?.find((reference: Reference) => reference?.statusCode === 'COMPLETED')?.invoiceNumber
      invoiceDtoObject.total = invoice?.total
      invoiceDtoObject.createdName = invoice?.createdName || invoice?.createdBy
      invoiceDto.value.push(invoiceDtoObject)
    }
  }

  return {
    invoiceDto,
    headerTranscations,
    invoiceCount,
    transformInvoices
  }
}
