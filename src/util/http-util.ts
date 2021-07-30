import Axios from 'axios'
import ConfigHelper from '@/util/config-helper'
import { SessionStorageKeys } from '@/util/constants'
import store from '@/store'

const axios = Axios.create()

axios.defaults.showLoader = false // by default, false

axios.interceptors.request.use(
  config => {
    const token = ConfigHelper.getFromSession(SessionStorageKeys.KeyCloakToken)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    // we would want showLoader only if the request has that configuration set to true
    if (config.showLoader) {
      store.dispatch('loader/showGlobalLoader')
    }
    return config
  },
  error => Promise.reject(error)
)

axios.interceptors.response.use(
  response => {
    // if we are showing progress circle, close it
    if (response.config.showLoader) {
      store.dispatch('loader/closeGlobalLoader')
    }
    return response
  },
  error => {
    // if we are showing progress circle, close it
    if (error.config.showLoader) {
      store.dispatch('loader/closeGlobalLoader')
    }
    return Promise.reject(error)
  }
)

// to work on both case export as default and normal
export { axios }
export default axios
