import { ref, watch, reactive } from '@vue/composition-api'

export function useSearch () {
  const headerSearch = [
    {
      text: 'Routing Slip Number',
      align: 'start',
      value: 'routingSlipNumber',
      display: true
    },
    {
      text: 'Receipt Number',
      align: 'start',
      sortable: false,
      value: 'receiptNumber',
      display: true
    },
    {
      text: 'Date',
      align: 'start',
      sortable: false,
      value: 'date',
      display: true
    },
    {
      text: 'Status',
      align: 'start',
      sortable: false,
      value: 'status',
      display: true
    },
    {
      text: 'Folio Number',
      align: 'start',
      value: 'folioNumber',
      sortable: false,
      display: true
    },
    {
      text: 'Initiator',
      align: 'start',
      value: 'initiator',
      sortable: false,
      display: true
    },
    {
      text: 'Total Amount',
      align: 'start',
      value: 'total',
      sortable: false,
      display: true
    },
    {
      text: 'Actions',
      align: 'start',
      value: '',
      sortable: false,
      display: true
    }
  ]

  function getDisplayedHeaders () {
    const displayed = []
    for (let i = 0; i < headerSearch.length; i++) {
      if (headerSearch[i].display) {
        displayed.push(headerSearch[i])
      }
    }
    return displayed
  }

  const currentStatus = ref<string>('')
  const routingSlipNumber = ref<string>('')
  const receiptNumber = ref<string>('')
  const folioNumber = ref<string>('')
  const initiator = ref<string>('')

  const totalAmount = ref('')
  const searchDate = ref([])
  const routingSlipDetails = ref([])

  function applyDateFilter (dateRangeObj) {
    searchDate.value = dateRangeObj
  }

  return {
    headerSearch,
    getDisplayedHeaders,
    currentStatus,
    routingSlipNumber,
    receiptNumber,
    searchDate,
    folioNumber,
    initiator,
    totalAmount,
    routingSlipDetails,
    applyDateFilter
  }
}
