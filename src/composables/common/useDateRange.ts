import { computed, reactive, ref, toRefs, watch } from 'vue'

import CommonUtils from '@/util/common-util'
import { DateFilterCodes } from '@/util/constants'
import { DateTime } from 'luxon'

export const DATEFILTER_CODES = DateFilterCodes
export function useDateRange (props, emits) {
  const { modalValue = ref([]) } = toRefs(props)
  const datePickerKey = ref(0)
  const dateRangeSelected = ref(modalValue.value || null)
  const startDate = ref(dateRangeSelected.value[0] || null)
  const endDate = ref(dateRangeSelected.value[1] || null)
  const oldSelectedRange = ref(modalValue)
  const today = DateTime.now().toJSDate()

  watch(startDate, (newStartDate) => {
    if (newStartDate !== dateRangeSelected.value[0]) {
      dateRangeSelected.value = [newStartDate, endDate.value]
    }
  })

  watch(endDate, (newEndDate) => {
    if (newEndDate !== dateRangeSelected.value[1]) {
      dateRangeSelected.value = [startDate.value, newEndDate]
    }
  })

  const dateRangeSelectedDisplay = computed(() => {
    console.log(dateRangeSelected.value[0])
    if (Array.isArray(dateRangeSelected.value) && dateRangeSelected.value.length > 0 && dateRangeSelected.value[0] !== null) {
      return dateRangeSelected.value
        .map(date => CommonUtils.formatDisplayDate(date, 'yyyy-LL-dd'))
        .join(' - ')
    } else {
      return 'Date'
    }
  })

  const dateFilterRanges = reactive([
    {
      label: 'Today',
      code: DATEFILTER_CODES.TODAY
    },
    {
      label: 'Yesterday',
      code: DATEFILTER_CODES.YESTERDAY
    },
    {
      label: 'Last Week',
      code: DATEFILTER_CODES.LASTWEEK
    },
    {
      label: 'Last Month',
      code: DATEFILTER_CODES.LASTMONTH
    },
    {
      label: 'Custom Range',
      code: DATEFILTER_CODES.CUSTOMRANGE
    }
  ])

  const dateFilterSelectedIndex = ref<number>(null)
  const dateFilterSelected: any = ref({})
  const showDateFilter = ref(false)
  const pickerDate = ref('')

  const pickerMonthYear = computed(() => {
    if (pickerDate.value) {
      const [year, month] = pickerDate.value.split('-').map(Number)
      return { month, year }
    }
    // Default to current month and year if pickerDate is not set
    return { month: new Date().getMonth() + 1, year: new Date().getFullYear() }
  })

  // apply filter button enable only if the date ranges are selected and start date <= end date
  const isApplyFilterBtnValid = computed(() => {
    if (
      dateRangeSelected.value.length === 2 &&
      dateRangeSelected.value[0] > dateRangeSelected.value[1]
    ) {
      dateRangeSelected.value = [
        dateRangeSelected.value[1],
        dateRangeSelected.value[0]
      ]
    }

    return (
      dateRangeSelected.value[0] &&
      dateRangeSelected.value[1] &&
      dateRangeSelected.value[0] <= dateRangeSelected.value[1]
    )
  })

  const showDateRangeSelected = computed(() => {
    let dateText = ''
    if (
      dateFilterSelected.value.code === DATEFILTER_CODES.TODAY ||
      dateFilterSelected.value.code === DATEFILTER_CODES.YESTERDAY
    ) {
      dateText = `<strong>${
        dateFilterSelected.value.label
      }:</strong> ${CommonUtils.formatDisplayDate(
        dateRangeSelected.value[0],
        'LL-dd-yyyy'
      )}`
    } else {
      dateText = `<strong>${dateFilterSelected.value?.label}:</strong>
      ${CommonUtils.formatDisplayDate(
        dateRangeSelected.value[0],
        'LL-dd-yyyy'
      )}
        - ${CommonUtils.formatDisplayDate(
          dateRangeSelected.value[1],
          'LL-dd-yyyy'
        )}`
    }

    return dateFilterSelected.value?.code
      ? dateText
      : '<strong>No dates selected</strong>'
  })

  function dateFilterChange (val) {
    if (val > -1) {
      dateFilterSelected.value = dateFilterRanges[val]
      let newRange
      switch (dateFilterSelected.value.code) {
        case DATEFILTER_CODES.TODAY:
          newRange = [today, today]
          break
        case DATEFILTER_CODES.YESTERDAY:
          const yesterday = DateTime.now().minus({ days: 1 })
          newRange = [yesterday.toJSDate(), yesterday.toJSDate()]
          break
        case DATEFILTER_CODES.LASTWEEK:
          const weekStartDate = DateTime.now().minus({ weeks: 1 }).startOf('week')
          const weekEndDate = DateTime.now().minus({ weeks: 1 }).endOf('week')
          newRange = [weekStartDate.toJSDate(), weekEndDate.toJSDate()]
          break
        case DATEFILTER_CODES.LASTMONTH:
          const monthStartDate = DateTime.now().minus({ months: 1 }).startOf('month')
          const monthEndDate = DateTime.now().minus({ months: 1 }).endOf('month')
          newRange = [monthStartDate.toJSDate(), monthEndDate.toJSDate()]
          break
        case DATEFILTER_CODES.CUSTOMRANGE:
          newRange = []
          break
      }

      // Ensure startDate and endDate are Date objects, to prevent throwing comparing.getDate is not a function
      startDate.value = newRange[0] instanceof Date ? newRange[0] : new Date(newRange[0])
      endDate.value = newRange[1] instanceof Date ? newRange[1] : new Date(newRange[1])
      dateRangeSelected.value = [startDate.value, endDate.value]
    }
  }

  function dateClick () {
    pickerDate.value = ''
    // ideally it should find using DATEFILTER_CODES.CUSTOMRANGE, but since its static and date click is often, better give the index as it is
    dateFilterSelectedIndex.value = 4 // 4 = Custom Range
    dateFilterSelected.value = dateFilterRanges[dateFilterSelectedIndex.value]
  }

  function applyDateFilter () {
    // emit applied event so that we can hook to any @change event in parent. By default, v-model with parent variable is in sync all the time
    if (dateRangeSelected.value !== null) {
      emits('applied', dateRangeSelected.value)
      // updating old value on appy click
      oldSelectedRange.value = dateRangeSelected.value
    }

    showDateFilter.value = false
  }
  function cancelDateFilter () {
    //  on cancel we need to rest to previous value, which we stored in oldSelectedRange
    dateRangeSelected.value = oldSelectedRange.value
    showDateFilter.value = false
  }

  watch(() => props.modelValue, (newValue) => {
    if (!newValue || newValue.length === 0) {
      // Reset internal state of date-range-filter
      // For example:
      startDate.value = null
      endDate.value = null
      dateRangeSelected.value = []
      // ... any other internal state related to the selected date
    }
  })

  return {
    dateFilterRanges,
    dateRangeSelected,
    dateFilterSelectedIndex,
    dateRangeSelectedDisplay,
    dateFilterSelected,
    showDateFilter,
    pickerDate,
    pickerMonthYear,
    dateFilterChange,
    isApplyFilterBtnValid,
    dateClick,
    applyDateFilter,
    showDateRangeSelected,
    cancelDateFilter,
    startDate,
    endDate,
    today,
    datePickerKey
  }
}
