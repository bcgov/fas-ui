import { SessionStorageKeys } from '@/util/constants'

import axios from 'axios'

/**
 * the configs are used since process.env doesnt play well when we hae only one build config and multiple deployments..so going for this
 */
const url = `${process.env.VUE_APP_PATH}config/configuration.json`

export default class ConfigHelper {
  static async fetchConfig () {
    const response = await axios.get(url)
    sessionStorage.setItem(SessionStorageKeys.ApiConfigKey, JSON.stringify(response.data))
    // sbc common components need the following keys
    sessionStorage.setItem(SessionStorageKeys.AuthApiUrl, ConfigHelper.getAuthAPIUrl())
    sessionStorage.setItem(SessionStorageKeys.StatusApiUrl, ConfigHelper.getStatusAPIUrl())
    sessionStorage.setItem(SessionStorageKeys.AuthWebUrl, ConfigHelper.getSelfURL())
  }

  /**
 * this will run everytime when vue is being loaded..so do the call only when session storage doesnt have the values
 */
  static saveConfigToSessionStorage () {
    return this.fetchConfig()
  }

  static getSelfURL () {
    // this is without a trailing slash
    return `${window.location.origin}${process.env.VUE_APP_PATH}`.replace(/\/$/, '') // remove the slash at the end
  }

  static getPayAPIURL () {
    return ConfigHelper.getValue('PAY_API_URL') + ConfigHelper.getValue('PAY_API_VERSION')
  }

  static getFasAPIURL () {
    return `${ConfigHelper.getPayAPIURL()}/fas`
  }

  static getAuthAPIUrl () {
    return ConfigHelper.getValue('AUTH_API_URL') + ConfigHelper.getValue('AUTH_API_VERSION')
  }

  static getStatusAPIUrl () {
    return ConfigHelper.getValue('STATUS_API_URL') + ConfigHelper.getValue('STATUS_API_VERSION')
  }

  static getValue (key: String) {
    // @ts-ignore
    return JSON.parse(sessionStorage.getItem(SessionStorageKeys.ApiConfigKey))[key]
  }

  static addToSession (key:string, value:any) {
    sessionStorage.setItem(key, value)
  }

  static getFromSession (key:string) {
    return sessionStorage.getItem(key)
  }

  static removeFromSession (key:string) {
    sessionStorage.removeItem(key)
  }

  static clearSession () {
    sessionStorage.clear()
  }
}
