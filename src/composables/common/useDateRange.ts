import { ref, reactive, computed, toRefs } from '@vue/composition-api'
import { DateFilterCodes } from '@/util/constants'
import moment from 'moment'
import CommonUtils from '@/util/common-util'

export const DATEFILTER_CODES = DateFilterCodes
// this is component took from auth-web and convert to composible
// TODO: cross check and fix if any issues
export function useDateRange (props, context) {
  // using `toRefs` to create a Reactive Reference to the `user` property of props
  const { dateFilterProp } = toRefs(props)

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

  const dateRangeSelected = ref([])
  const dateFilterSelectedIndex = ref(null)
  const dateFilterSelected: any = ref({})
  const showDateFilter = ref(false)
  const pickerDate = ref('')

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
      dateFilterSelected.value?.code === DATEFILTER_CODES.TODAY ||
      dateFilterSelected.value?.code === DATEFILTER_CODES.YESTERDAY
    ) {
      dateText = `<strong>${
        dateFilterSelected.value.label
      }:</strong> ${CommonUtils.formatDisplayDate(
        dateRangeSelected.value[0],
        'MM-DD-YYYY'
      )}`
    } else {
      dateText = `<strong>${dateFilterSelected.value?.label}:</strong> 
      ${CommonUtils.formatDisplayDate(
        dateRangeSelected.value[0],
        'MM-DD-YYYY'
      )} 
        - ${CommonUtils.formatDisplayDate(
          dateRangeSelected.value[1],
          'MM-DD-YYYY'
        )}`
    }

    return dateFilterSelected.value?.code
      ? dateText
      : '<strong>No dates selected</strong>'
  })

  function emitDateFilter () {
    const data = {
      startDate: formatDateFilter(dateRangeSelected.value[0]),
      endDate: formatDateFilter(dateRangeSelected.value[1])
    }
    context.emit('emitDateFilter', data)
  }

  // methods
  function openDateFilter () {
    initDatePicker()
    showDateFilter.value = true
  }

  function initDatePicker () {
    if (!dateFilterProp.value) {
      dateFilterSelectedIndex.value = null
      dateRangeSelected.value = []
    }

    dateFilterSelected.value = dateFilterSelectedIndex.value
      ? dateFilterRanges[dateFilterSelectedIndex.value]
      : {}
  }

  function formatDatePickerDate (dateObj) {
    return dateObj.format('YYYY-MM-DD')
  }

  function formatDateFilter (dateStr) {
    if (!dateStr) return null
    const [year, month, day] = dateStr.split('-')
    return `${month}/${day}/${year}`
  }

  function dateFilterChange (val) {
    if (val > -1) {
      dateFilterSelected.value = dateFilterRanges[val]
      switch (dateFilterSelected.value.code) {
        case DATEFILTER_CODES.TODAY:
          // eslint-disable-next-line no-case-declarations
          const today = formatDatePickerDate(moment())
          dateRangeSelected.value = [today, today]
          pickerDate.value = today.slice(0, -3)
          break
        case DATEFILTER_CODES.YESTERDAY:
          // eslint-disable-next-line no-case-declarations
          const yesterday = formatDatePickerDate(moment().subtract(1, 'days'))
          dateRangeSelected.value = [yesterday, yesterday]
          pickerDate.value = yesterday.slice(0, -3)
          break
        case DATEFILTER_CODES.LASTWEEK:
          // Week should start from  Monday and Ends on Sunday
          // eslint-disable-next-line no-case-declarations
          const weekStart = formatDatePickerDate(
            moment()
              .subtract(1, 'weeks')
              .startOf('isoWeek')
          )
          // eslint-disable-next-line no-case-declarations
          const weekEnd = formatDatePickerDate(
            moment()
              .subtract(1, 'weeks')
              .endOf('isoWeek')
          )
          dateRangeSelected.value = [weekStart, weekEnd]
          pickerDate.value = weekStart.slice(0, -3)
          break
        case DATEFILTER_CODES.LASTMONTH:
          // eslint-disable-next-line no-case-declarations
          const monthStart = formatDatePickerDate(
            moment()
              .subtract(1, 'months')
              .startOf('month')
          )
          // eslint-disable-next-line no-case-declarations
          const monthEnd = formatDatePickerDate(
            moment()
              .subtract(1, 'months')
              .endOf('month')
          )
          dateRangeSelected.value = [monthStart, monthEnd]
          pickerDate.value = monthStart.slice(0, -3)
          break
        case DATEFILTER_CODES.CUSTOMRANGE:
          pickerDate.value = ''
      }
    }
  }

  function dateClick (date) {
    pickerDate.value = ''
    // ideally it should find using DATEFILTER_CODES.CUSTOMRANGE, but since its static and date click is often, better give the index as it is
    dateFilterSelectedIndex.value = 4 // 4 = Custom Range
    dateFilterSelected.value = dateFilterRanges[dateFilterSelectedIndex.value]
  }

  function applyDateFilter () {
    emitDateFilter()
    showDateFilter.value = false
  }

  return {
    dateFilterRanges,
    dateRangeSelected,
    dateFilterSelectedIndex,

    dateFilterSelected,
    showDateFilter,
    pickerDate,
    openDateFilter,
    initDatePicker,
    dateFilterChange,
    isApplyFilterBtnValid,
    dateClick,
    applyDateFilter,
    showDateRangeSelected,
    emitDateFilter
  }
}
