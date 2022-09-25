import TransferScheduleOCR from '@app/model/factory/ocr/transferScheduleOCR/TransferScheduleOCR'

export default class FulgurScheduleOCR extends TransferScheduleOCR {

  // month only
  getDate(date: string, index: number, origDay?: string, startDay?: string): number {
    // console.log('date', date)
    const arr = date.split('-')
    return Number.parseInt(arr[0]) + index
  }

  // month only
  getMonth(date: string, month?: string): number {
    // console.log('month', month)
    if (month) {
      return Number.parseInt(month) - 1
    }
    return -1
  }

}
