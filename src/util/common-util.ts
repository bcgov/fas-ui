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

  static statusListColor (status: string, textColor: boolean = true) {
    let color = ''
    switch (status) {
      case SlipStatus.ACTIVE:
      case SlipStatus.COMPLETE:
        color = 'green'
        break
      case SlipStatus.BOUNCED:
      case SlipStatus.NSF:
        color = 'error'
        break
    }

    return textColor ? `${color}--text` : color
  }

  static appendCurrencySymbol (currency: number) {
    return '$' + currency
  }
}
