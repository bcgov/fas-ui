/**
 * Place to put all the custom utility methods
 */

import { SlipStatus } from '@/util/constants'
import moment from 'moment'

export default class CommonUtils {
  // Formatting date in the desired format for displaying in the template
  static formatDisplayDate (date: Date, format?: string) {
    return date ? moment(date).format(format || 'MMM DD, YYYY') : ''
  }

  static requiredFieldRule (errorMessage: string = '') {
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

  static fileDownload (data: any, fileName: string, fileType: string = 'text/plain') {
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
      tempLink.setAttribute('download', fileName)

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
        window.URL.revokeObjectURL(blobURL)
      }, 200)
    }
  }

  static statusListColor (status: string, textColor: boolean = true) {
    let color = ''
    switch (status) {
      case SlipStatus.ACTIVE:
      case SlipStatus.COMPLETE:
        color = 'green'
        break
      case SlipStatus.BOUNCED:
      case SlipStatus.NSF:
      case SlipStatus.LINKED:
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
}
