import { ref, watch, reactive } from '@vue/composition-api'

export function useSearch () {
  // move to API
  const categoryList = reactive([
    { name: 'Select a Search Category', value: '' },
    { name: 'Routing slip #', value: 'Routing slip #' },
    { name: 'Receipt Number', value: 'Receipt Number' },
    { name: 'Cheque Number', value: 'Cheque Number' }
  ])
  const statusList = reactive([
    { name: 'Active', value: 'Active' },
    { name: 'Completed', value: 'Completed' },
    { name: 'Bounced', value: 'Bounced' },
    { name: 'Non Sufficient Fund', value: 'Non Sufficient Fund' },
    { name: 'Refund', value: 'Refund' },
    { name: 'Last Service', value: 'Last Service' }
  ])

  const searchLabel = ref('Select a Search Category First')

  const category = ref('')
  const searchModal = ref('')
  const statusModal = ref('')
  const totalAmount = ref('')
  const searchDate = ref([])
  const showAdvanceSearch = ref(false)
  const selectedDate = ref('')

  // on change of value need to change label
  watch(category, (newCategory: any) => {
    if (newCategory.value !== '') {
      searchLabel.value = `Enter ${newCategory.name}`
    } else {
      searchLabel.value = 'Select a Search Category First'
    }
  })

  function toggleAdvanceSearch () {
    showAdvanceSearch.value = !showAdvanceSearch.value
  }
  function applyDateFilter (dateRangeObj) {
    searchDate.value = dateRangeObj
  }

  return {
    categoryList,
    category,
    searchLabel,
    searchModal,
    statusList,
    statusModal,
    totalAmount,
    searchDate,
    showAdvanceSearch,
    toggleAdvanceSearch,
    applyDateFilter,
    selectedDate
  }
}
