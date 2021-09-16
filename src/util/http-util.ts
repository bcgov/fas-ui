import Axios from 'axios'
import ConfigHelper from './config-helper'
import { SessionStorageKeys } from './constants'
import store from '@/store'

const axios = Axios.create()

axios.defaults.showGlobalLoader = false // by default, false
axios.defaults.showGlobalErrorHandling = true

axios.interceptors.request.use(
  config => {
    const token = ConfigHelper.getFromSession(SessionStorageKeys.KeyCloakToken)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    // we would want showGlobalLoader only if the request has that configuration set to true
    if (config.showGlobalLoader) {
      store.commit('indicator/incrementActiveCalls')
    }
    return config
  },
  error => Promise.reject(error)
)

axios.interceptors.response.use(
  response => {
    // decrement active calls count by one
    if (response.config.showGlobalLoader && store.getters['indicator/isThereActiveCalls']) {
      store.commit('indicator/decrementActiveCalls')
    }
    return response
  },
  error => {
    // decrement active calls count by one
    if (error.config.showGlobalLoader && store.getters['indicator/isThereActiveCalls']) {
      store.commit('indicator/decrementActiveCalls')
    }
    // call has failed in this case. And if the config showGlobalErrorHandling is true, then update store
    if (error.config.showGlobalErrorHandling && error?.response?.status >= 500) {
      store.commit('indicator/setHasCallFailed', { hasCallFailed: true })
    }
    return Promise.reject(error)
  }
)

// to work on both case export as default and normal
export { axios }
export default axios
