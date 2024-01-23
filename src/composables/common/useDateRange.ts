import { computed, reactive, ref, toRefs, watch } from 'vue'

import CommonUtils from '@/util/common-util'
import { DateFilterCodes } from '@/util/constants'
import { DateTime } from 'luxon'

export const DATEFILTER_CODES = DateFilterCodes
export function useDateRange (props, emits) {
  const { modalValue = ref([]) } = toRefs(props)
  const datePickerKey = ref(0)

  // using same v-model value for getting value and update parent on change
  const dateRangeSelected = computed({
    get: () => {
      return modalValue.value || []
    },
    set: (modalValue: Date[]) => {
      emits('input', modalValue)
    }
  })

  const startDate = computed({
    get: () => dateRangeSelected.value[0],
    set: (value) => {
      const newRange = [value, dateRangeSelected.value[1] || null]
      modalValue.value = newRange
      emits('input', newRange)
    }
  })

  const endDate = computed({
    get: () => dateRangeSelected.value[1],
    set: (value) => {
      const newRange = [dateRangeSelected.value[0] || null, value]
      modalValue.value = newRange
      emits('input', newRange)
    }
  })

  // Watchers for startDate and endDate
  watch(startDate, (newStartDate) => {
    console.log(newStartDate)
    if (newStartDate !== dateRangeSelected.value[0]) {
      const newRange = [newStartDate, endDate.value || null]
      modalValue.value = newRange
      emits('input', newRange)
    }
  })

  watch(endDate, (newEndDate) => {
    if (newEndDate !== dateRangeSelected.value[1]) {
      const newRange = [startDate.value || null, newEndDate]
      modalValue.value = newRange
      emits('input', newRange)
    }
  })

  function updateStartDate (date) {
    if (date) {
      const newRange = [date, dateRangeSelected.value[1] || null]
      modalValue.value = newRange
      emits('input', newRange)
    }
  }

  function updateEndDate (date) {
    if (date) {
      const newRange = [dateRangeSelected.value[0] || null, date]
      modalValue.value = newRange
      emits('input', newRange)
    }
  }

  // to keep track of old value on cancel rest to this value default value will props passed
  const oldSelectedRange = ref(modalValue)
  const today = DateTime.now().toJSDate()

  const dateRangeSelectedDisplay = computed(() => {
    return dateRangeSelected.value.join(' - ')
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

  function formatDatePickerDate (dateObj) {
    // TODO TEST
    // Check if dateObj is a JavaScript Date object
    if (dateObj instanceof Date) {
    // Convert JavaScript Date to Luxon DateTime
      const dateTime = DateTime.fromJSDate(dateObj)
      return dateTime.toFormat('yyyy-LL-dd')
    } else if (dateObj instanceof DateTime) {
    // If it's already a Luxon DateTime, format it directly
      return dateObj.toFormat('yyyy-LL-dd')
    }
  }

  function dateFilterChange (val) {
    if (val > -1) {
      dateFilterSelected.value = dateFilterRanges[val]
      let newRange
      switch (dateFilterSelected.value.code) {
        case DATEFILTER_CODES.TODAY:
          // TODO TEST:
          // eslint-disable-next-line no-case-declaration
          // dateRangeSelected.value = [today, today]
          newRange = [today, today]
          pickerDate.value = formatDatePickerDate(today)
          break
        case DATEFILTER_CODES.YESTERDAY:
          // TODO TEST:
          // eslint-disable-next-line no-case-declarations
          const yesterday = formatDatePickerDate(DateTime.now().minus({ days: 1 }))
          // dateRangeSelected.value = [yesterday, yesterday]
          newRange = [yesterday, yesterday]
          pickerDate.value = yesterday.slice(0, -3)
          break
        case DATEFILTER_CODES.LASTWEEK:
          // Week should start from  Monday and Ends on Sunday
          // eslint-disable-next-line no-case-declarations
          // TODO COMPARE Luxon vs Moment
          // const weekStartDate = moment()
          //   .subtract(1, 'weeks')
          //   .startOf('isoWeek')
          const weekStartDate = DateTime.now().minus({ weeks: 1 }).startOf('week')
          const weekStart = formatDatePickerDate(weekStartDate)
          // eslint-disable-next-line no-case-declarations
          // TODO COMPARE Luxon vs Moment
          // const weekEndDate = moment()
          //   .subtract(1, 'weeks')
          //   .endOf('isoWeek')
          const weekEndDate = DateTime.now().minus({ weeks: 1 }).endOf('week')
          const weekEnd = formatDatePickerDate(weekEndDate)
          // dateRangeSelected.value = [weekStart, weekEnd]
          newRange = [weekStart, weekEnd]
          pickerDate.value = weekStart.slice(0, -3)
          break
        case DATEFILTER_CODES.LASTMONTH:
          // eslint-disable-next-line no-case-declarations
          // TODO COMPARE Luxon vs Moment
          // const monthStartDate = moment()
          //   .subtract(1, 'months')
          //   .startOf('month')
          const monthStartDate = DateTime.now().minus({ months: 1 }).startOf('month')
          const monthStart = formatDatePickerDate(monthStartDate)
          // eslint-disable-next-line no-case-declarations
          // TODO COMPARE Luxon vs Moment
          // const monthEndDate = moment()
          //   .subtract(1, 'months')
          //   .endOf('month')
          const monthEndDate = DateTime.now().minus({ months: 1 }).endOf('month')
          const monthEnd = formatDatePickerDate(monthEndDate)
          // dateRangeSelected.value = [monthStart, monthEnd]
          newRange = [monthStart, monthEnd]
          pickerDate.value = monthStart.slice(0, -3)
          break
        case DATEFILTER_CODES.CUSTOMRANGE:
          pickerDate.value = ''
          newRange = []
      }
      // Update modalValue to trigger reactivity
      modalValue.value = newRange
      emits('input', newRange)
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
    emits('applied', dateRangeSelected.value)
    // updating old value on appy click
    oldSelectedRange.value = dateRangeSelected.value
    showDateFilter.value = false
  }
  function cancelDateFilter () {
    //  on cancel we need to rest to previous value, which we stored in oldSelectedRange
    dateRangeSelected.value = oldSelectedRange.value
    showDateFilter.value = false
  }

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
    datePickerKey,
    updateStartDate,
    updateEndDate
  }
}
