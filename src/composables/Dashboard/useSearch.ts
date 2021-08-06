import { computed, ref } from '@vue/composition-api'
import { createNamespacedHelpers } from 'vuex-composition-helpers'

const routingSlipModule = createNamespacedHelpers('routingSlip') // specific module name
const { useActions, useState, useMutations } = routingSlipModule

export function useSearch () {
  // vuex action and state
  const { searchRoutingSlip } = useActions(['searchRoutingSlip'])
  const { searchRoutingSlipParams, searchRoutingSlipResult } = useState([
    'searchRoutingSlipParams',
    'searchRoutingSlipResult'
  ])

  const { setSearchRoutingSlipParams } = useMutations([
    'setSearchRoutingSlipParams'
  ])
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

  const headerToShow: any = computed(() => {
    const displayed = []
    for (let i = 0; i < headerSearch.length; i++) {
      if (headerSearch[i].display) {
        displayed.push(headerSearch[i])
      }
    }
    return displayed
  })

  function canShowColum (columnName) {
    return headerToShow.value.find((header) => {
      return header.value === columnName && header.display
    })
  }
  const headerToDisplay = [
    'routingSlipNumber',
    'receiptNumber',
    'date',
    'status',
    'folioNumber',
    'initiator',
    'total'
  ]

  // using same v-model value for getting value and update parent on change
  const routingSlipNumber: any = computed({
    get: () => {
      return searchRoutingSlipParams.value.routingSlipNumber || ''
    },
    set: (modalValue: any) => {
      setSearchRoutingSlipParams({
        ...searchRoutingSlipParams.value,
        routingSlipNumber: modalValue
      })
    }
  })

  const receiptNumber: any = computed({
    get: () => {
      return searchRoutingSlipParams.value.receiptNumber || ''
    },
    set: (modalValue: any) => {
      setSearchRoutingSlipParams({
        ...searchRoutingSlipParams.value,
        receiptNumber: modalValue
      })
    }
  })

  const currentStatus: any = computed({
    get: () => {
      return searchRoutingSlipParams.value.currentStatus || ''
    },
    set: (modalValue: any) => {
      setSearchRoutingSlipParams({
        ...searchRoutingSlipParams.value,
        currentStatus: modalValue
      })
    }
  })

  const folioNumber: any = computed({
    get: () => {
      return searchRoutingSlipParams.value.folioNumber || ''
    },
    set: (modalValue: any) => {
      setSearchRoutingSlipParams({
        ...searchRoutingSlipParams.value,
        folioNumber: modalValue
      })
    }
  })

  const initiator: any = computed({
    get: () => {
      return searchRoutingSlipParams.value.initiator || ''
    },
    set: (modalValue: any) => {
      setSearchRoutingSlipParams({
        ...searchRoutingSlipParams.value,
        initiator: modalValue
      })
    }
  })

  const totalAmount: any = computed({
    get: () => {
      return searchRoutingSlipParams.value.totalAmount || ''
    },
    set: (modalValue: any) => {
      setSearchRoutingSlipParams({
        ...searchRoutingSlipParams.value,
        totalAmount: modalValue
      })
    }
  })

  const searchDate: any = computed({
    get: () => {
      return searchRoutingSlipParams.value.searchDate || ''
    },
    set: (modalValue: any) => {
      setSearchRoutingSlipParams({
        ...searchRoutingSlipParams.value,
        searchDate: modalValue
      })
    }
  })

  function applyDateFilter (dateRangeObj) {
    searchDate.value = dateRangeObj
  }

  function searchNow () {
    searchRoutingSlip()
  }

  return {
    headerSearch,
    headerToShow,
    currentStatus,
    routingSlipNumber,
    receiptNumber,
    searchDate,
    folioNumber,
    initiator,
    totalAmount,
    canShowColum,
    // routingSlipDetails,
    applyDateFilter,
    searchNow,
    searchRoutingSlipResult,
    headerToDisplay
  }
}
