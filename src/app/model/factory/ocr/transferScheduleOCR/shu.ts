import TransferScheduleOCR from '@app/model/factory/ocr/transferScheduleOCR/TransferScheduleOCR'
import * as moment from 'moment-timezone'

export default class ShuScheduleOCR extends TransferScheduleOCR {

  // date only
  getDate(date: string, index: number, day?: string, startDay?: string): number {
    return Number.parseInt(date)
  }

  // month only
  getMonth(date: string, month?: string): number {
    if (month) {
      const m = moment().month(month).month()

      return m
    }

    return 0
  }

  getTime(time: string): string {
    // console.log('time', time)
    if (time.indexOf(':') > 0) {
      return time
    }
    return `${time.slice(0, time.length - 2)}:00`
  }

  getHourSystem(hourSystem: string): string {
    return hourSystem.slice(hourSystem.length - 2, hourSystem.length).toUpperCase()
  }
}
