import TransferScheduleOCR from '@app/model/factory/ocr/transferScheduleOCR/TransferScheduleOCR'

export default class EliraScheduleOCR extends TransferScheduleOCR {

  getDate (date: string, index: number, day?: string, startDay?: string): number {
    const arr = date.split('/')
    return Number.parseInt(arr[1]) + index
  }

  getMonth (date: string, month?: string): number {
    const arr = date.split('/')
    return Number.parseInt(arr[0]) - 1
  }

  getTime(time: string): string {
    return `${time.slice(0, time.length - 2)}:00`
  }

  getHourSystem(hourSystem: string): string {
    return hourSystem.slice(hourSystem.length - 2, hourSystem.length).toUpperCase()
  }
}
