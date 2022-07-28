import { TextAnnotation } from '@app/feature/ocr/ocr.component'
import TransferScheduleOCR, { ScheduleAnchor } from '@app/model/data/ocr/TransferScheduleOCR'
import { Point, StreamCountPoint } from '@app/model/data/ocr/Point'
import * as moment from 'moment'

export default class LucaScheduleOCR extends TransferScheduleOCR {
  constructor (clientWidth: number, anchors: ScheduleAnchor, textAnnotations: Array<TextAnnotation>) {
    super(clientWidth, anchors.streamAnchors, textAnnotations)

    this.streamCountHorizonBoundary = anchors.streamCountHorizonBoundary
    this.streamCountVerticalBoundary = anchors.streamCountVerticalBoundary

    this.titleHorizonBoundary = anchors.titleHorizonBoundary
    this.titleVerticalBoundary = anchors.titleVerticalBoundary

    this.titleMultiHorizonBoundary = anchors.titleMultiHorizonBoundary
    this.titleMultiVerticalBoundary = anchors.titleMultiVerticalBoundary
  }

  getPoint(anchorX: number, anchorY: number, vBoundary: number, hBoundary: number): LucaStreamCountPoint {
    return new LucaStreamCountPoint(anchorX, anchorY, vBoundary, hBoundary)
  }

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

class LucaStreamCountPoint extends StreamCountPoint {

  findStream (targets: Array<TextAnnotation>): Array<TextAnnotation> {
    const find = targets.filter(t => {
      const target = new Point(t.x ?? 1, t.y ?? 1)
      return this.contains(target) && t.description === 'AEST'
    })
    return find
  }

}
