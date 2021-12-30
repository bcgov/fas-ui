/**
 * Place to put all the custom utility methods
 */

import { Address, BaseAddressModel } from '@/models/Address'

import { Role, SlipStatus } from '@/util/constants'
import moment from 'moment'
import KeyCloakService from 'sbc-common-components/src/services/keycloak.services'
export default class CommonUtils {
  // Formatting date in the desired format for displaying in the template
  static formatDisplayDate (date: Date, format?: string) {
    return date ? moment(date).format(format || 'MMM DD, YYYY') : ''
  }

  static requiredFieldRule (errorMessage: string = 'This field is required') {
    return [v => !!v || errorMessage]
  }

  static isSigningIn (): boolean {
    const path = window.location.pathname
    return (
      path.includes('/signin') ||
      path.includes('/signin-redirect') ||
      path.includes('/signin-redirect-full')
    )
  }

  static isSigningOut (): boolean {
    const path = window.location.pathname
    return path.includes('/signout')
  }

  // blob convert to downloadable file
  static fileDownload (data: any, fileName: string, fileType: string = 'text/plain', action:string = 'download') {
    const blob = new Blob([data], { type: fileType })
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
      // IE workaround for "HTML7007: One or more blob URLs were
      // revoked by closing the blob for which they were created.
      // These URLs will no longer resolve as the data backing
      // the URL has been freed."
      window.navigator.msSaveBlob(blob, fileName)
    } else {
      const blobURL = (window.URL && window.URL.createObjectURL) ? window.URL.createObjectURL(blob) : window.webkitURL.createObjectURL(blob)
      const tempLink = document.createElement('a')
      tempLink.style.display = 'none'
      tempLink.href = blobURL
      if (action === 'open') {
        tempLink.setAttribute('target', '_blank')
      } else {
        tempLink.setAttribute('download', fileName)
      }

      // Safari thinks _blank anchor are pop ups. We only want to set _blank
      // target if the browser does not support the HTML5 download attribute.
      // This allows you to download files in desktop safari if pop up blocking
      // is enabled.
      if (typeof tempLink.download === 'undefined') {
        tempLink.setAttribute('target', '_blank')
      }
      document.body.appendChild(tempLink)
      tempLink.click()
      setTimeout(() => {
        document.body.removeChild(tempLink)
        // TO CHECK: not revoking may increase more temp memory usage
        // once download, we will revokeObjectURL
        if (action !== 'open') {
          window.URL.revokeObjectURL(blobURL)
        }
      }, 200)
    }
  }

  static statusListColor (status: string, textColor: boolean = true) {
    let color = ''
    switch (status) {
      case SlipStatus.ACTIVE:
      case SlipStatus.COMPLETE:
      case SlipStatus.REFUNDCOMPLETED:
        color = 'success'
        break
      case SlipStatus.BOUNCED:
      case SlipStatus.NSF:
      case SlipStatus.LINKED:
      case SlipStatus.REFUNDREQUEST:
      case SlipStatus.REFUNDAUTHORIZED:
        color = 'error'
        break
    }

    return textColor ? `${color}--text` : color
  }

  static appendCurrencySymbol (currency: number) {
    return '$' + currency
  }

  static cleanObject (obj) {
    return Object.keys(obj)
      .filter((k) => obj[k] !== '' && obj[k] !== null)
      .reduce((a, k) => ({ ...a, [k]: obj[k] }), {})
  }

  static createQueryParams = params =>
    Object.keys(params)
      .map(k => `${k}=${encodeURI(params[k])}`)
      .join('&')

  static appendQueryParamsIfNeeded (targetUrl: string, route: any): string {
    const requestParams = CommonUtils.createQueryParams(route.query)
    return requestParams ? `${targetUrl}?${requestParams}` : targetUrl
  }

  // for converting address object of sbc-auth to as needed for BaseAddress component
  static convertAddressForComponent (address: Address) : BaseAddressModel {
    return {
      addressCity: address.city,
      addressCountry: address.country,
      addressRegion: address.region,
      deliveryInstructions: address.deliveryInstructions,
      postalCode: address.postalCode,
      streetAddress: address.street,
      streetAddressAdditional: address.streetAdditional
    }
  }

  // for converting address object of BaseAddress component to as needed for sbc-auth
  static convertAddressForAuth (iaddress: BaseAddressModel) : Address {
    return {
      city: iaddress.addressCity,
      country: iaddress.addressCountry,
      region: iaddress.addressRegion,
      deliveryInstructions: iaddress.deliveryInstructions,
      postalCode: iaddress.postalCode,
      street: iaddress.streetAddress,
      streetAdditional: iaddress.streetAddressAdditional
    }
  }

  static isApproverRole () {
    const approverRole:any = [Role.FAS_REFUND_APPROVER]
    return KeyCloakService.verifyRoles(approverRole, [])
  }

  /**
   * check its in refunc process
   * @param  {string} status
   */
  static isRefundProcessStatus (status) {
    return [
      SlipStatus.REFUNDREQUEST,
      SlipStatus.REFUNDAUTHORIZED,
      SlipStatus.REFUNDCOMPLETED,
      SlipStatus.REFUNDREJECTED
    ].includes(status)
  }

  /**
   * status is refundrequest
   * @param  {string} status
   */
  static isRefundRequestStatus (status) {
    return [
      SlipStatus.REFUNDREQUEST
    ].includes(status)
  }

  /**
   * status permission allow to chaneg details
   * @param  {string} status
   */
  static isEditEnableBystatus (status) {
    return ![
      SlipStatus.REFUNDCOMPLETED,
      SlipStatus.REFUNDAUTHORIZED,
      SlipStatus.NSF,
      SlipStatus.LINKED
    ].includes(status)
  }
}
