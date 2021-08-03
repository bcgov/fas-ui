import Axios from 'axios'
import ConfigHelper from '@/util/config-helper'
import { SessionStorageKeys } from '@/util/constants'
import store from '@/store'

const axios = Axios.create()

axios.defaults.showGlobalLoader = false // by default, false

axios.interceptors.request.use(
  config => {
    const token = ConfigHelper.getFromSession(SessionStorageKeys.KeyCloakToken)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    // we would want showGlobalLoader only if the request has that configuration set to true
    if (config.showGlobalLoader) {
      store.commit('loader/incrementActiveCalls')
    }
    return config
  },
  error => Promise.reject(error)
)

axios.interceptors.response.use(
  response => {
    // decrement active calls count by one
    if (response.config.showGlobalLoader && store.getters['loader/isThereActiveCalls']) {
      store.commit('loader/decrementActiveCalls')
    }
    return response
  },
  error => {
    // decrement active calls count by one
    if (error.config.showGlobalLoader && store.getters['loader/isThereActiveCalls']) {
      store.commit('loader/decrementActiveCalls')
    }
    return Promise.reject(error)
  }
)

// to work on both case export as default and normal
export { axios }
export default axios
