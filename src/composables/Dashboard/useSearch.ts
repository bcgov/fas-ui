import { computed, reactive, ref, watch } from '@vue/composition-api'

import { createNamespacedHelpers } from 'vuex-composition-helpers'
import { useStatusList } from '@/composables/common/useStatusList'
import { useLoader } from '@/composables/common/useLoader'

const routingSlipModule = createNamespacedHelpers('routingSlip') // specific module name
const { useActions, useState, useMutations, useGetters } = routingSlipModule

export function useSearch () {
  // vuex action and state
  const { searchRoutingSlip, resetSearchParams } = useActions([
    'searchRoutingSlip',
    'resetSearchParams'
  ])
  const { searchRoutingSlipParams, searchRoutingSlipResult } = useState([
    'searchRoutingSlipParams',
    'searchRoutingSlipResult'
  ])

  const { setSearchRoutingSlipParams } = useMutations([
    'setSearchRoutingSlipParams'
  ])

  const { searchParamsPrecent } = useGetters(['searchParamsPrecent'])

  const { statusLabel } = useStatusList(reactive({ value: '' }), {})
  const { isLoading, toggleLoading } = useLoader()
  const headerSearch = ref<any[]>([
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
      align: 'right',
      value: 'total',
      sortable: false,
      display: true
    },
    {
      text: 'Actions',
      align: 'start',
      value: '',
      sortable: false,
      display: true,
      hideInSearchColumnFilter: true
    }
  ])

  const showExpandedFolio = ref([])
  // to make sure not updating result on keyup
  const searchParamsChanged = ref(false)

  // columntoshow component and update the local object if display = true
  const displayedHeaderSearch: any = computed(() => {
    const displayed = []
    for (let i = 0; i < headerSearch.value.length; i++) {
      if (headerSearch.value[i].display) {
        displayed.push(headerSearch.value[i])
      }
    }
    return displayed
  })

  function canShowColumn (columnName) {
    return displayedHeaderSearch.value.find(header => {
      return header.value === columnName
    })
  }

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
      searchParamsChanged.value = true
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
      searchParamsChanged.value = true
    }
  })

  const status: any = computed({
    get: () => {
      return searchRoutingSlipParams.value.status || ''
    },
    set: (modalValue: any) => {
      setSearchRoutingSlipParams({
        ...searchRoutingSlipParams.value,
        status: modalValue
      })
      searchParamsChanged.value = true
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
      searchParamsChanged.value = true
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
      searchParamsChanged.value = true
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
      searchParamsChanged.value = true
    }
  })

  const dateFilter: any = computed({
    get: () => {
      return searchRoutingSlipParams.value.dateFilter || []
    },
    set: (modalValue: any) => {
      setSearchRoutingSlipParams({
        ...searchRoutingSlipParams.value,
        dateFilter: modalValue
      })
      searchParamsChanged.value = true
    }
  })

  function applyDateFilter (dateRangeObj) {
    dateFilter.value = dateRangeObj
  }

  async function searchNow () {
    toggleLoading()
    await searchRoutingSlip()
    searchParamsChanged.value = false
    toggleLoading()
  }

  // get label of status
  function getStatusLabel (code: string) {
    return statusLabel(code)
  }

  function clearFilter () {
    resetSearchParams()
  }

  function toggleFolio (id: number) {
    //  to show and hide multiple folio on click
    // remove from array if already existing else add to array
    if (showExpandedFolio.value.includes(id)) {
      showExpandedFolio.value = showExpandedFolio.value.filter(function (item) {
        return item !== id
      })
    } else {
      showExpandedFolio.value.push(id)
    }
  }
  function formatFolioResult (routingSlip) {
    // to make sure not updating on keyup
    if (
      !searchParamsChanged.value &&
      folioNumber.value &&
      folioNumber.value !== ''
    ) {
      return [folioNumber.value]
    }
    const { invoices } = routingSlip
    if (invoices) {
      return invoices
        .filter(invoice => invoice.folioNumber)
        .map(value => value.folioNumber)
    }
    return ['-']
  }

  return {
    headerSearch,
    displayedHeaderSearch,
    status,
    routingSlipNumber,
    receiptNumber,
    dateFilter,
    folioNumber,
    initiator,
    totalAmount,
    canShowColumn,
    applyDateFilter,
    searchNow,
    searchRoutingSlipResult,
    getStatusLabel,
    searchParamsPrecent,
    clearFilter,
    formatFolioResult,
    showExpandedFolio,
    toggleFolio,
    isLoading
  }
}
