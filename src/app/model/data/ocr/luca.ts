import TransferScheduleOCR from '@app/model/data/ocr/TransferScheduleOCR'

export default class LucaScheduleOCR extends TransferScheduleOCR {

  // month only
  getDate(date: string, index: number, origDay?: string, startDay?: string): number {
    console.log('date', date)
    const arr = date.split('-')
    return Number.parseInt(arr[0]) + index
  }

  // month only
  getMonth(date: string, month?: string): number {
    console.log('month', month)
    if (month) {
      return Number.parseInt(month) - 1
    }
    return -1
  }

  getTime(time: string): string {
    return `${time.slice(0, time.length - 2)}:00`
  }

  getHourSystem(hourSystem: string): string {
    return hourSystem.slice(hourSystem.length - 2, hourSystem.length).toUpperCase()
  }
}
