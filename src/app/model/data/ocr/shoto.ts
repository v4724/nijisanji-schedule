import { TextAnnotation } from '@app/feature/ocr/ocr.component'
import TransferScheduleOCR, { ScheduleAnchor } from '@app/model/data/ocr/TransferScheduleOCR'
import { Point, StreamCountPoint } from '@app/model/data/ocr/Point'
import * as moment from 'moment'

export default class ShotoScheduleOCR extends TransferScheduleOCR {
  constructor (clientWidth: number, anchors: ScheduleAnchor, textAnnotations: Array<TextAnnotation>) {
    super(clientWidth, anchors.streamAnchors, textAnnotations)

    this.streamCountHorizonBoundary = anchors.streamCountHorizonBoundary
    this.streamCountVerticalBoundary = anchors.streamCountVerticalBoundary

    this.titleHorizonBoundary = anchors.titleHorizonBoundary
    this.titleVerticalBoundary = anchors.titleVerticalBoundary

    this.titleMultiHorizonBoundary = anchors.titleMultiHorizonBoundary
    this.titleMultiVerticalBoundary = anchors.titleMultiVerticalBoundary
  }

  getPoint(anchorX: number, anchorY: number, vBoundary: number, hBoundary: number): UkiStreamCountPoint {
    return new UkiStreamCountPoint(anchorX, anchorY, vBoundary, hBoundary)
  }

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

class UkiStreamCountPoint extends StreamCountPoint {

  findStream (targets: Array<TextAnnotation>): Array<TextAnnotation> {
    const find = targets.filter(t => {
      const target = new Point(t.x ?? 1, t.y ?? 1)
      return this.contains(target) && t.description === 'EDT'
    })
    return find
  }

}
