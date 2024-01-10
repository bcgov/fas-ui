import { computed, reactive, ref, toRefs } from 'vue'

import CommonUtils from '@/util/common-util'
import { DateFilterCodes } from '@/util/constants'
import moment from 'moment'

export const DATEFILTER_CODES = DateFilterCodes
export function useDateRange (props, emits) {
  const { value } = toRefs(props)

  // using same v-model value for getting value and update parent on change
  const dateRangeSelected = computed({
    get: () => {
      return value.value
    },
    set: (modalValue: Date[]) => {
      emits('input', modalValue)
    }
  })
  // to keep track of old value on cancel rest to this value default value will props passed
  const oldSelectedRange = ref(value.value)

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

  function formatDatePickerDate (dateObj) {
    return dateObj.format('YYYY-MM-DD')
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
    dateFilterChange,
    isApplyFilterBtnValid,
    dateClick,
    applyDateFilter,
    showDateRangeSelected,
    cancelDateFilter
  }
}
