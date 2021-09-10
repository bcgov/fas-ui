import CommonUtils from '@/util/common-util'
import { computed, ref } from '@vue/composition-api'
import moment from 'moment'
import { createNamespacedHelpers } from 'vuex-composition-helpers'

const routingSlipModule = createNamespacedHelpers('routingSlip') // specific module name
const { useActions } = routingSlipModule

export function useDailyReport () {
  // vuex action and state
  const { getDailyReportByDate } = useActions(['getDailyReportByDate'])
  const selectedDate = ref<string>('')
  const showCalendar = ref<boolean>(false)
  const isDownloading = ref<boolean>(false)

  async function getDailyReport () {
    isDownloading.value = true

    try {
      const downloadType = 'application/pdf'
      const response = await getDailyReportByDate(selectedDate.value, downloadType)
      if (response && response.status === 201) {
        const contentDispArr = response?.headers['content-disposition'].split(
          '='
        )

        const fileName =
          contentDispArr.length && contentDispArr[1]
            ? contentDispArr[1]
            : 'bcregistry-daily-report'

        CommonUtils.fileDownload(response.data, fileName, downloadType)
      } else {
        // eslint-disable-next-line no-console
        console.error(response)
      }
    } finally {
      //  close cal after download
      isDownloading.value = false
    }
  }

  const maxDate = computed(() => {
    // enable date till yesterday
    const yesterday = moment().subtract(1, 'day')
    return yesterday.toISOString()
  })

  function toggleCalendar (value) {
    showCalendar.value = value
  }

  return {
    selectedDate,
    getDailyReport,
    showCalendar,
    isDownloading,
    toggleCalendar,
    maxDate
  }
}
