import VueCompositionAPI, { computed, ref } from '@vue/composition-api'
import RoutingSlipService from '@/services/routingSlip.services'
import { AccountInfo, AdjustRoutingSlipAmountPrams, AdjustRoutingSlipChequePrams, GetRoutingSlipRequestPayload, LinkedRoutingSlips, RoutingSlip, RoutingSlipDetails } from '@/models/RoutingSlip'
import { ApiErrors, CreateRoutingSlipStatus, SlipStatus } from '@/util/constants'
import CodesService from '@/services/codes.service'
import CommonUtils from '@/util/common-util'
import { BusinessInfo, GetFeeRequestParams, Payment, TransactionParams } from '@/models/Payment'
import Vue from 'vue'
import { Code } from '@/models/Code'

Vue.use(VueCompositionAPI)

// Routing Slips
// Refs
export const headerSearchTitle = ref([
  {
    text: 'Routing Slip Number',
    align: 'start',
    value: 'routingSlipNumber',
    display: true,
    className: 'routing-slip'
  },
  {
    text: 'Receipt Number',
    align: 'start',
    sortable: false,
    value: 'receiptNumber',
    display: true,
    className: 'receiptNumber'
  },
  {
    text: 'Entity Number',
    align: 'start',
    value: 'accountName',
    sortable: false,
    display: false,
    className: 'accountName'
  },
  {
    text: 'Created By',
    align: 'start',
    value: 'createdName',
    sortable: false,
    display: false,
    className: 'createdName'
  },
  {
    text: 'Date',
    align: 'start',
    sortable: false,
    value: 'date',
    display: true,
    className: 'date'
  },
  {
    text: 'Status',
    align: 'start',
    sortable: false,
    value: 'status',
    display: true,
    className: 'status'
  },
  {
    text: 'Reference Number',
    align: 'start',
    value: 'businessIdentifier',
    sortable: false,
    display: true,
    className: 'businessIdentifier'
  },
  {
    text: 'Cheque Number',
    align: 'start',
    value: 'chequeReceiptNumber',
    sortable: false,
    display: false,
    className: 'cheque-receipt-number'
  },
  {
    text: 'Balance',
    align: 'right',
    value: 'remainingAmount',
    sortable: false,
    display: true,
    className: 'remainingAmount'
  },
  {
    text: 'Actions',
    align: 'start',
    value: '',
    sortable: false,
    display: true,
    hideInSearchColumnFilter: true,
    className: 'action'
  }
])
export const searchRoutingSlipResult = ref<RoutingSlip[]>([])
export const searchRoutingSlipParams = ref<any>({})

export const routingSlip = ref<RoutingSlip>({})
export const linkedRoutingSlips = ref<LinkedRoutingSlips>(undefined)
export const routingSlipDetails = ref<RoutingSlipDetails>({})
export const accountInfo = ref<AccountInfo>({})
export const chequePayment = ref<Payment[]>([])
export const cashPayment = ref<Payment>({})
export const isPaymentMethodCheque = ref(true)
export const isAmountPaidInUsd = ref(false)
export const autoCompleteRoutingSlips = ref<RoutingSlip[]>([])

// Computed

export const invoiceCount = computed<number>(() => {
  return routingSlip.value?.invoices?.length
})

export const searchParamsExist = computed<boolean>(() => {
  const params = searchRoutingSlipParams.value
  for (const key in params) {
    if (params[key] && params[key] !== '') {
      return false
    }
  }
  return true
})

// for a child linked to a parent routing slip, there would be a parentNumber
export const isRoutingSlipAChild = computed<boolean>(() => {
  return !!routingSlip.value?.parentNumber
})

// if routingslip has parentNumber then it is a child Else, check if there are any children in linkedroutingslips for it.(in this case, it is a parent)
export const isRoutingSlipLinked = computed<boolean>(() => {
  return (
    isRoutingSlipAChild.value || linkedRoutingSlips.value?.children.length > 0
  )
})

export const isRoutingSlipVoid = computed<boolean>(() => {
  return routingSlip.value?.status === SlipStatus.VOID
})

export const updateRoutingSlipChequeNumber = (chequeNumToChange: AdjustRoutingSlipChequePrams) => {
  const payments = routingSlip.value.payments.map((payment: Payment, i: number) => {
    if (chequeNumToChange.paymentIndex === i) {
      payment.chequeReceiptNumber = chequeNumToChange.chequeNum
    }
    return { ...payment }
  })
  routingSlip.value.payments = payments
}

export const updateRoutingSlipAmount = (amountToChange: AdjustRoutingSlipAmountPrams) => {
  const payments = routingSlip.value.payments.map((payment: Payment, i: number) => {
    if (amountToChange.paymentIndex === i) {
      if (amountToChange.isRoutingSlipPaidInUsd) {
        payment.paidUsdAmount = amountToChange.amount
      } else {
        payment.paidAmount = amountToChange.amount
      }
    }
    return { ...payment }
  })
  routingSlip.value.payments = payments
}

// Functions
export const createRoutingSlip = async () => {
  // build the RoutingSlip Request JSON object that needs to be sent.
  let routingSlipRequest: RoutingSlip = {}
  routingSlipRequest = { ...routingSlipDetails.value }
  routingSlipRequest.paymentAccount = accountInfo.value

  // By design, a routing slip can only have one payment method - CASH or CHEQUE.
  routingSlipRequest.payments = isPaymentMethodCheque.value
    ? chequePayment.value
    : [cashPayment.value]

  const response = await RoutingSlipService.createRoutingSlip(
    routingSlipRequest,
    true
  )
  if (response && response.data && response.status === 200) {
    routingSlip.value = response.data
  }
}

export const checkRoutingNumber = async (): Promise<CreateRoutingSlipStatus> => {
  try {
    const routingNumber = routingSlipDetails.value.number
    const response = await RoutingSlipService.getRoutingSlip(routingNumber)
    // if routing number existing we will get 200 as response
    // else we will get 204
    if (response.status === 204) {
      return CreateRoutingSlipStatus.VALID
    }
    // all other case routing is existing so can't use this number
    return CreateRoutingSlipStatus.EXISTS
  } catch (error) {
    if (error.response?.status === 400 && error.response?.data?.type === ApiErrors.FAS_INVALID_ROUTING_SLIP_DIGITS) {
      return CreateRoutingSlipStatus.INVALID_DIGITS
    }

    // eslint-disable-next-line no-console
    console.error('error ', error.response?.data)
    // on error we allow the routing number which should break on create and show error message
    return CreateRoutingSlipStatus.VALID
  }
}

export const getRoutingSlip = async (getRoutingSlipRequestPayload: GetRoutingSlipRequestPayload) => {
  try {
    const response = await RoutingSlipService.getRoutingSlip(
      getRoutingSlipRequestPayload.routingSlipNumber,
      getRoutingSlipRequestPayload?.showGlobalLoader
    )

    if (response && response.data && response.status === 200) {
      routingSlip.value = response.data
    }
    // TODO : need to handle if slip not existing
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('error ', error.response?.data) // 500 errors may not return data
  }
}

export const updateRoutingSlipStatus = async (
  statusDetails: any
) => {
  const slipNumber = routingSlip.value.number
  // update status
  try {
    let response
    if (CommonUtils.isRefundProcessStatus(statusDetails?.status)) {
      response = await RoutingSlipService.updateRoutingSlipRefund(
        statusDetails,
        slipNumber
      )
    } else {
      response = await RoutingSlipService.updateRoutingSlipStatus(
        statusDetails.status,
        slipNumber
      )
    }
    if (response?.data && (response.status === 200 || response.status === 202)) {
      if (!CommonUtils.isRefundProcessStatus(statusDetails?.status)) {
        routingSlip.value = response.data
      } else {
        const getRoutingSlipRequestPayload: GetRoutingSlipRequestPayload = { routingSlipNumber: slipNumber }
        getRoutingSlip(getRoutingSlipRequestPayload)
      }
      return response
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('error ', error.response)
    return error?.response
  }
}

export const adjustRoutingSlip = async (): Promise<RoutingSlip> => {
  // build the RoutingSlip Request JSON object that needs to be sent.
  const routingSlipRequest: Payment[] = routingSlip.value.payments
  const slipNumber = routingSlip.value.number
  try {
    const response = await RoutingSlipService.adjustRoutingSlip(
      routingSlipRequest,
      slipNumber
    )
    if (response?.data && response.status === 200) {
      return response.data
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('error ', error.response)
    return error?.response
  }
}

export const resetRoutingSlipDetails = () => {
  routingSlipDetails.value = undefined
  accountInfo.value = undefined
  chequePayment.value = undefined
  cashPayment.value = undefined
  isPaymentMethodCheque.value = undefined
}

export const resetSearchParams = (): void => {
  searchRoutingSlipParams.value = {}
  searchRoutingSlipResult.value = []
}

export const searchRoutingSlip = async () => {
  // // build the RoutingSlip Request JSON object that needs to be sent.

  let params = { ...searchRoutingSlipParams.value }
  // filtering and removing all non set values
  params = CommonUtils.cleanObject(params)

  // formatting as per API
  if (params.dateFilter) {
    params.dateFilter = {
      startDate: CommonUtils.formatDisplayDate(
        params.dateFilter[0],
        'YYYY-MM-DD'
      ),
      endDate: CommonUtils.formatDisplayDate(
        params.dateFilter[1],
        'YYYY-MM-DD'
      )
    }
  }

  // check for error handling
  if (params.status) {
    params.status = params.status.code
  }
  // for time being setting limit to avoid overloading
  params.page = 1
  params.limit = 50

  if (Object.keys(params).length > 0) {
    // need to reset result of there is no search params
    const response = await RoutingSlipService.getSearchRoutingSlip(
      params
    )
    if (response && response.data && response.status === 200) {
      searchRoutingSlipResult.value = response.data?.items
      return
    }
  }
  searchRoutingSlipResult.value = []
}

export const getAutoCompleteFilingTypes = async (searchParams) => {
  const response = await RoutingSlipService.getSearchFilingType(searchParams)
  if (response && response.data && response.status === 200) {
    autoCompleteRoutingSlips.value = response.data?.items
    return
  }
  autoCompleteRoutingSlips.value = []
}

export const saveLinkRoutingSlip = async (
  parentRoutingSlipNumber: string
): Promise<any> => {
  const childRoutingSlipNumber: string = routingSlip.value.number

  const LinkPrams = { childRoutingSlipNumber, parentRoutingSlipNumber }

  try {
    // handle error condtions here
    const response = await RoutingSlipService.saveLinkRoutingSlip(LinkPrams)
    if (response && response.data && response.status === 200) {
      return {
        error: false
      }
    }
  } catch (error) {
    if (error.response.status === 400) {
      return { error: true, details: error.response?.data }
    }

    // eslint-disable-next-line no-console
    console.error('error ', error.response?.data)
  }
}

export const getLinkedRoutingSlips = async (routingSlipNumber) => {
  try {
    const response = await RoutingSlipService.getLinkedRoutingSlips(
      routingSlipNumber,
      true
    )
    let result: LinkedRoutingSlips
    if (response && response.data && response.status === 200) {
      result = response.data
    }
    // 204 non content response
    linkedRoutingSlips.value = result
  } catch (error) {
    linkedRoutingSlips.value = undefined
    // eslint-disable-next-line no-console
    console.error('error ', error.response?.data) // 500 errors may not return data
  }
}

export const getDailyReportByDate = async (selectedDate, type) => {
  const formatedDate = CommonUtils.formatDisplayDate(
    selectedDate,
    'YYYY-MM-DD'
  )
  try {
    return await RoutingSlipService.getDailyReport(formatedDate, type, false)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('error ', error.response?.data) // 500 errors may not return data
    return error.response
  }
}

export const getAutoCompleteRoutingSlips = async (
  routingSlipNumber
): Promise<RoutingSlipDetails[]> => {
  const response = await RoutingSlipService.getSearchRoutingSlip({
    routingSlipNumber
  })
  if (response && response.data && response.status === 200) {
    return response.data?.items
  }

  return []
}

export const getFeeByCorpTypeAndFilingType = async (
  getFeeRequestParams: GetFeeRequestParams
): Promise<number> => {
  // Currently, in FAS we only need total from the result that is the source of truth.
  // Other properties such as tax breakdown and priority fees can be ignored here.
  const response = await RoutingSlipService.getFeeByCorpTypeAndFilingType(
    getFeeRequestParams
  )
  if (response && response.data && response.status === 200) {
    return response.data?.total
  }
  return null
}

export const saveManualTransactions = async (transation: any): Promise<any> => {
  // prepare format from here
  const routingSlipNumber: string = routingSlip.value.number

  const {
    referenceNumber,
    filingType,
    futureEffective,
    priority,
    quantity
  } = transation
  const businessInfo: BusinessInfo = {
    corpType: filingType.corpTypeCode.code
  }

  // no need to pass if empty
  if (referenceNumber) {
    businessInfo.businessIdentifier = referenceNumber
  }

  const transactionParams: TransactionParams = {
    businessInfo,
    filingInfo: {
      filingTypes: [
        {
          filingTypeCode: filingType.filingTypeCode.code,
          futureEffective: futureEffective,
          priority: priority,
          quantity: parseInt(quantity)
        }
      ]
    },
    accountInfo: {
      routingSlip: routingSlipNumber
    }
  }

  const response = await RoutingSlipService.saveManualTransactions(
    transactionParams
  )
  return response
}

export const cancelRoutingSlipInvoice = async (invoiceId: number) => {
  return await RoutingSlipService.cancelRoutingSlipInvoice(invoiceId)
}

// Codes
export const routingSlipStatusList = ref<Code[]>([])

export const getRoutingSlipStatusList = async () => {
  debugger
  if (routingSlipStatusList.value.length === 0) {
    const response: any = await CodesService.getCodes(
      'routing_slip_statuses'
    )
    if (response && response.data && response.status === 200) {
      routingSlipStatusList.value = response.data?.codes
      return
    }
    routingSlipStatusList.value = []
  }
}

// Indicator
export const hasCallFailed = ref<boolean>(false)
export const activeCalls = ref<number>(0)
export const isThereActiveCalls = computed<boolean>(() => {
  return activeCalls.value > 0
})
