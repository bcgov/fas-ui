import { DateTime, Interval } from 'luxon'
import { computed, reactive, ref, toRefs, watch } from 'vue'
import CommonUtils from '@/util/common-util'
import { DateFilterCodes } from '@/util/constants'

export const DATEFILTER_CODES = DateFilterCodes
export function useDateRange (props, emits) {
  const { modalValue = ref([]) } = toRefs(props)
  const dateRangeSelected = ref([])
  const oldSelectedRange = ref(modalValue)
  const today = DateTime.now().toJSDate()

  const dateRangeSelectedDisplay = computed(() => {
    if (Array.isArray(dateRangeSelected.value) && dateRangeSelected.value.length > 0 && dateRangeSelected.value[0] !== null) {
      return dateRangeSelected.value
        .map(date => CommonUtils.formatDisplayDate(date, 'yyyy-LL-dd'))
        .join(' - ')
    } else {
      return ''
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
      switch (dateFilterSelected.value.code) {
        case DATEFILTER_CODES.TODAY:
          dateRangeSelected.value = [today, today]
          break
        case DATEFILTER_CODES.YESTERDAY:
          const yesterday = DateTime.now().minus({ days: 1 })
          dateRangeSelected.value = getDateRangeArray(yesterday.toJSDate(), yesterday.toJSDate())
          break
        case DATEFILTER_CODES.LASTWEEK:
          const weekStartDate = DateTime.now().minus({ weeks: 1 }).startOf('week')
          const weekEndDate = DateTime.now().minus({ weeks: 1 }).endOf('week')
          dateRangeSelected.value = getDateRangeArray(weekStartDate.toJSDate(), weekEndDate.toJSDate())
          break
        case DATEFILTER_CODES.LASTMONTH:
          const monthStartDate = DateTime.now().minus({ months: 1 }).startOf('month')
          const monthEndDate = DateTime.now().minus({ months: 1 }).endOf('month')
          dateRangeSelected.value = getDateRangeArray(monthStartDate.toJSDate(), monthEndDate.toJSDate())
          break
        case DATEFILTER_CODES.CUSTOMRANGE:
          dateRangeSelected.value = []
          break
      }
    }
  }

  function getDateRangeArray (startDate, endDate) {
    const start = DateTime.fromJSDate(startDate).startOf('day')
    const end = DateTime.fromJSDate(endDate).endOf('day')

    const interval = Interval.fromDateTimes(start, end)

    const dateArray = Array.from(interval.splitBy({ days: 1 }))
      .map(dateTime => dateTime.start.toJSDate())

    return dateArray
  }

  function dateClick () {
    pickerDate.value = ''
    // ideally it should find using DATEFILTER_CODES.CUSTOMRANGE, but since its static and date click is often, better give the index as it is
    dateFilterSelectedIndex.value = 4 // 4 = Custom Range
    dateFilterSelected.value = dateFilterRanges[dateFilterSelectedIndex.value]
  }

  function applyDateFilter () {
    if (dateRangeSelected.value && dateRangeSelected.value.length > 0) {
      const firstDate = dateRangeSelected.value[0]
      const lastDate = dateRangeSelected.value[dateRangeSelected.value.length - 1]

      emits('applied', [firstDate, lastDate])

      oldSelectedRange.value = [firstDate, lastDate]
    } else {
      emits('applied', [])
      oldSelectedRange.value = []
    }

    // Close the date filter UI
    showDateFilter.value = false
  }

  function cancelDateFilter () {
    //  on cancel we need to rest to previous value, which we stored in oldSelectedRange
    dateRangeSelected.value = oldSelectedRange.value
    showDateFilter.value = false
  }

  watch(() => props.modelValue, (newValue) => {
    if (!newValue || newValue.length === 0) {
      dateRangeSelected.value = []
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
    today
  }
}
