import { TextAnnotation } from '@app/feature/ocr/ocr.component'
import TransferScheduleOCR, { ScheduleAnchor } from '@app/model/data/ocr/TransferScheduleOCR'
import { Point, StreamCountPoint } from '@app/model/data/ocr/Point'
import * as moment from 'moment'

export default class EnnaScheduleOCR extends TransferScheduleOCR {
  constructor (clientWidth: number, anchors: ScheduleAnchor, textAnnotations: Array<TextAnnotation>, tz?: string) {
    super(clientWidth, anchors.streamAnchors, textAnnotations, tz)

    this.pointHorizonBoundary = anchors.pointHorizonBoundary
    this.pointVerticalBoundary = anchors.pointVerticalBoundary

    this.streamCountHorizonBoundary = anchors.streamCountHorizonBoundary
    this.streamCountVerticalBoundary = anchors.streamCountVerticalBoundary

    this.titleHorizonBoundary = anchors.titleHorizonBoundary
    this.titleVerticalBoundary = anchors.titleVerticalBoundary

    this.titleMultiHorizonBoundary = anchors.titleMultiHorizonBoundary
    this.titleMultiVerticalBoundary = anchors.titleMultiVerticalBoundary
  }

  getPoint(anchorX: number, anchorY: number, vBoundary: number, hBoundary: number): EnnaStreamCountPoint {
    return new EnnaStreamCountPoint(anchorX, anchorY, vBoundary, hBoundary)
  }

  // date only
  getDate(date: string, index: number, day?: string, startDay?: string): number {
    return Number.parseInt(date) + index
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
    console.log('time', time)
    return `${time.slice(0, time.length - 2)}:00`
  }

  getHourSystem(hourSystem: string): string {
    return hourSystem.slice(hourSystem.length - 2, hourSystem.length).toUpperCase()
  }

}

class EnnaStreamCountPoint extends StreamCountPoint {

  findStream (targets: Array<TextAnnotation>): Array<TextAnnotation> {
    const find = targets.filter(t => {
      const target = new Point(t.x ?? 1, t.y ?? 1)
      return this.contains(target) && t.description === 'PDT'
    })
    return find
  }

}
