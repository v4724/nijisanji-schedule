import { OCRSchedule, TextAnnotation } from '@app/feature/ocr/ocr.component'
import * as lodash from 'lodash'
import TransferScheduleOCR, { ScheduleAnchor, StreamAnchor } from '@app/model/data/ocr/TransferScheduleOCR'
import { Point, StreamCountPoint } from '@app/model/data/ocr/Point'
import * as moment from 'moment-timezone'

export default class SonnyScheduleOCR extends TransferScheduleOCR {
  constructor (clientWidth: number, anchors: ScheduleAnchor, textAnnotations: Array<TextAnnotation>, tz?: string) {
    super(clientWidth, anchors.streamAnchors, textAnnotations, tz)

    this.streamCountHorizonBoundary = anchors.streamCountHorizonBoundary
    this.streamCountVerticalBoundary = anchors.streamCountVerticalBoundary

    this.titleHorizonBoundary = anchors.titleHorizonBoundary
    this.titleVerticalBoundary = anchors.titleVerticalBoundary

    this.titleMultiHorizonBoundary = anchors.titleMultiHorizonBoundary
    this.titleMultiVerticalBoundary = anchors.titleMultiVerticalBoundary
  }

  getPoint(anchorX: number, anchorY: number, vBoundary: number, hBoundary: number): SonnyStreamCountPoint {
    return new SonnyStreamCountPoint(anchorX, anchorY, vBoundary, hBoundary)
  }

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

    return -1
  }

  getTime(time: string): string {
    console.log('time', time, `${time.slice(0, time.length - 2)}:00`)
    return `${time.slice(0, time.length - 2)}:00`
  }

  getHourSystem(hourSystem: string): string {
    return hourSystem.slice(hourSystem.length - 2, hourSystem.length).toUpperCase()
  }
}

class SonnyStreamCountPoint extends StreamCountPoint {

  findStream (targets: Array<TextAnnotation>): Array<TextAnnotation> {
    const find = targets.filter(t => {
      const target = new Point(t.x ?? 1, t.y ?? 1)
      return this.contains(target) && t.description === 'JST'
    })
    return find
  }

}
