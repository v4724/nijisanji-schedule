import TransferScheduleOCR from '@app/model/factory/ocr/transferScheduleOCR/TransferScheduleOCR'

import * as moment from 'moment'

export default class IkeScheduleOCR extends TransferScheduleOCR {

  getDate (date: string, index: number, day?: string, startDay?: string): number {
    return Number.parseInt(date) + index
  }

  getMonth (date: string, month?: string): number {
    if (month) {
      return moment().month(month).month()
    }
    return -1
  }
}
