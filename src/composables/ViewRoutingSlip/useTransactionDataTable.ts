import { Invoice, InvoiceDisplay, LineItem, Reference } from '@/models/Invoice'
import { InvoiceStatus, SlipStatus } from '@/util/constants'
import { computed, reactive, ref, toRefs, watch } from '@vue/composition-api'
import { createNamespacedHelpers, useActions } from 'vuex-composition-helpers'

import { GetRoutingSlipRequestPayload } from '@/models/RoutingSlip'

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
    },
    {
      text: 'Actions',
      align: 'end',
      value: 'actions',
      sortable: false
    }
  ]

  // vuex getter and state
  const { invoiceCount } = useGetters(['invoiceCount'])
  const { routingSlip } = useState(['routingSlip'])
  const { cancelRoutingSlipInvoice, getRoutingSlip } = useActions(['updateRoutingSlipStatus', 'getRoutingSlip'])

  const modalDialogRef = ref<HTMLFormElement>()
  // modal dialog props and events
  const modalDialogDetails = reactive<any>({
    modalDialogTitle: 'Cancel Transaction?',
    modalDialogText: 'Canceling a transaction will place the transaction amount back to the routing slip.',
    modalDialogOkText: 'Cancel Transaction',
    modalDialogCancelText: 'Cancel',
    modalDialogIcon: 'mdi-alert-circle-outline',
    modalDialogIconColor: 'error'
  })

  const canShowCancelButton = computed(() => {
    return ![SlipStatus.NSF, SlipStatus.REFUNDAUTHORIZED, SlipStatus.REFUNDCOMPLETED, SlipStatus.REFUNDREQUEST].includes(routingSlip.value.status)
  })

  const currentInvoiceIdForCancelling = ref<number>(undefined)
  const isLoading = ref<boolean>(false)

  // We are watching routingslip parent object and if any changes, we update the invoice and pass it along to transaction table to display
  watch(routingSlip, () => {
    if (routingSlip.value?.invoices) {
      transformInvoices(routingSlip.value?.invoices)
    }
  }, { deep: true, immediate: true })

  function transformInvoices (invoices: Invoice[]): void {
    invoiceDisplay.value = []
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
      invoiceDisplayObject.statusCode = invoice.statusCode
      invoiceDisplay.value.push(invoiceDisplayObject)
    }
  }

  // Cancel Routing slip transaction
  function cancel (invoiceId: number): void {
    currentInvoiceIdForCancelling.value = invoiceId
    modalDialogRef.value.open()
  }

  // Call cancel invoice method
  async function modalDialogConfirm () {
    try {
      if (currentInvoiceIdForCancelling.value) {
        isLoading.value = true
        await cancelRoutingSlipInvoice(currentInvoiceIdForCancelling.value)
        const currentRoutingSlipId = routingSlip.value?.number || ''
        const getRoutingSlipRequestPayload: GetRoutingSlipRequestPayload = { routingSlipNumber: currentRoutingSlipId }
        // Refresh the slip
        await getRoutingSlip(getRoutingSlipRequestPayload)
      }
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error('error ', error?.response)
    } finally {
      isLoading.value = false
      modalDialogRef.value.close()
    }
  }

  // If user clicks cancel on the confirmation dialog, close it
  function modalDialogClose () {
    modalDialogRef.value.close()
  }

  // Incase routing slip status is DELETE_ACCEPTED, display 'cancelled'
  function isInvoiceCancelled (invoice: Invoice): boolean {
    return invoice.statusCode === InvoiceStatus.DELETE_ACCEPTED
  }

  function getIndexedTag (tag, index): string {
    return `${tag}-${index}`
  }

  return {
    invoiceDisplay,
    headerTranscations,
    invoiceCount,
    transformInvoices,
    modalDialogRef,
    modalDialogDetails,
    canShowCancelButton,
    isLoading,
    cancel,
    modalDialogConfirm,
    modalDialogClose,
    isInvoiceCancelled,
    getIndexedTag
  }
}
