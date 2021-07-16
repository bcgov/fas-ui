import Axios from 'axios'
import ConfigHelper from '@/util/config-helper'
import { SessionStorageKeys } from '@/util/constants'
import store from '@/store'

const axios = Axios.create()
// const loadingStatusModule = createNamespacedHelpers('loadingState')
// const { useActions } = loadingStatusModule
// const { showLoadingState, closeLoadingState } = useActions(['setCashPayment'])

axios.interceptors.request.use(
  config => {
    const token = ConfigHelper.getFromSession(SessionStorageKeys.KeyCloakToken)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    // we would want loading status for post/put/patch for now
    if ((['post', 'patch', 'put'] as Array<string>).includes(config?.method)) {
      store.dispatch('loadingStatus/showLoadingState')
    }
    return config
  },
  error => Promise.reject(error)
)

axios.interceptors.response.use(
  response => {
    // if we are showing progress circle, close it
    store.dispatch('loadingStatus/closeLoadingState')
    return response
  },
  error => {
    // if we are showing progress circle, close it
    store.dispatch('loadingStatus/closeLoadingState')
    return Promise.reject(error)
  }
)

// to work on both case export as default and normal
export { axios }
export default axios
