import Axios from 'axios'
import ConfigHelper from '@/util/config-helper'
import { SessionStorageKeys } from '@/util/constants'
import { activeCalls, hasCallFailed, isThereActiveCalls } from '@/composables/state'
// import store from '@/store'
// using fasStore from window to avoid library build issue.
const axios = Axios.create()

axios.defaults.showGlobalLoader = false // by default, false
axios.defaults.showGlobalErrorHandling = true

axios.interceptors.request.use(
  config => {
    const token = ConfigHelper.getFromSession(SessionStorageKeys.KeyCloakToken)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    if (config.showGlobalLoader) {
      activeCalls.value++
    }
    return config
  },
  error => Promise.reject(error)
)

axios.interceptors.response.use(
  response => {
    // decrement active calls count by one
    if (response.config.showGlobalLoader && isThereActiveCalls.value) {
      activeCalls.value--
    }
    return response
  },
  error => {
    const fasStore = window && (window as any).fasStore

    // decrement active calls count by one
    if (error.config.showGlobalLoader && isThereActiveCalls.value) {
      activeCalls.value--
    }
    // call has failed in this case. And if the config showGlobalErrorHandling is true, then update store
    if (error.config.showGlobalErrorHandling && error?.response?.status >= 500) {
      hasCallFailed.value = true
    }
    return Promise.reject(error)
  }
)

// to work on both case export as default and normal
export { axios }
export default axios
