import Axios from 'axios'
import ConfigHelper from './config-helper'
import { SessionStorageKeys } from './constants'
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
    const fasStore = window && (window as any).fasStore
    if (config.showGlobalLoader) {
      fasStore.commit('indicator/incrementActiveCalls')
    }
    return config
  },
  error => Promise.reject(error)
)

axios.interceptors.response.use(
  response => {
    const fasStore = window && (window as any).fasStore

    // decrement active calls count by one
    if (response.config.showGlobalLoader && fasStore.getters['indicator/isThereActiveCalls']) {
      fasStore.commit('indicator/decrementActiveCalls')
    }
    return response
  },
  error => {
    const fasStore = window && (window as any).fasStore

    // decrement active calls count by one
    if (error.config.showGlobalLoader && fasStore.getters['indicator/isThereActiveCalls']) {
      fasStore.commit('indicator/decrementActiveCalls')
    }
    // call has failed in this case. And if the config showGlobalErrorHandling is true, then update store
    if (error.config.showGlobalErrorHandling && error?.response?.status >= 500) {
      fasStore.commit('indicator/setHasCallFailed', { hasCallFailed: true })
    }
    return Promise.reject(error)
  }
)

// to work on both case export as default and normal
export { axios }
export default axios
