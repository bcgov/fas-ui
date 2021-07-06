/**
 * Place to put all the custom utility methods
 */

import moment from 'moment'

export default class CommonUtils {
  // checking url matches the regex
  static isUrl (value:string):boolean {
    const URL_MATCHER = new RegExp('^(?:\\w+:)?\\/\\/([^\\s\\.]+\\.\\S{2}|localhost[\\:?\\d]*)\\S*$')
    return URL_MATCHER.test(value)
  }

  // Formatting date in the desired format for displaying in the template
  static formatDisplayDate (date: Date, format?: string) {
    return (date) ? moment(date).format(format || 'MM-DD-YYYY') : ''
  }
}
