import TransferScheduleOCR from '@app/model/data/ocr/TransferScheduleOCR'

export default class SelenScheduleOCR extends TransferScheduleOCR {

  // date only
  getDate(date: string, index: number, day?: string, startDay?: string): number {
    const arr = date.split('.')
    return Number.parseInt(arr[1])
  }

  // month only
  getMonth(date: string, month?: string): number {
    const arr = date.split('.')
    return Number.parseInt(arr[0]) - 1
  }
}
