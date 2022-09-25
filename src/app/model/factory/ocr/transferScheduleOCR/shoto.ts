import TransferScheduleOCR from '@app/model/factory/ocr/transferScheduleOCR/TransferScheduleOCR'
import * as moment from 'moment'

export default class ShotoScheduleOCR extends TransferScheduleOCR {

  // month only
  getDate(date: string, index: number, origDay?: string, startDay?: string): number {
    if (origDay && startDay) {
      let s_day = moment().day(startDay).day() // MON=1
      let day = moment().day(origDay).day() // MON=1
      day = day === 0 ? 7 : day
      const arr = date.split('-')
      if ((index + 1) !== day) {
        return Number.parseInt(arr[0]) + index
      }
      return Number.parseInt(arr[0]) + day - 1 - (s_day - 1)
    }
    return -1
  }

  // month only
  getMonth(date: string, month?: string): number {
    if (month) {
      return Number.parseInt(month) - 1
    }
    return -1
  }
}
