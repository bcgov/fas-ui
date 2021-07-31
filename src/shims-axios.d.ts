/* This file is for extend and merge AxiosRequestConfig namespaces so that we can add our custom showGlobalLoader config property
that we can use to pass between requests. If showGlobalLoader passed with true value, then we can show loading progress */
import { AxiosRequestConfig } from 'axios'

declare module 'axios' {

  export interface AxiosRequestConfig {
    showGlobalLoader?: boolean
  }
}
