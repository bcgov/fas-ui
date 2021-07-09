/**
 * Place to put all the custom utility methods
 */

import moment from 'moment'

export default class CommonUtils {
  // Formatting date in the desired format for displaying in the template
  static formatDisplayDate (date: Date, format?: string) {
    return (date) ? moment(date).format(format || 'MM-DD-YYYY') : ''
  }

  static requiredFieldRule (errorMessage: string = '') {
    return [
      v => !!v || errorMessage
    ]
  }

  static isSigningIn ():boolean {
    const path = window.location.pathname
    return path.includes('/signin') || path.includes('/signin-redirect') || path.includes('/signin-redirect-full')
  }

  static isSigningOut ():boolean {
    const path = window.location.pathname
    return path.includes('/signout')
  }
}
