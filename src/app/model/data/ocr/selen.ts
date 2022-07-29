import { OCRSchedule, TextAnnotation } from '@app/feature/ocr/ocr.component'
import * as lodash from 'lodash'
import TransferScheduleOCR, { ScheduleAnchor, StreamAnchor } from '@app/model/data/ocr/TransferScheduleOCR'
import { Point, StreamCountPoint } from '@app/model/data/ocr/Point'
import * as moment from 'moment-timezone'

export default class SelenScheduleOCR extends TransferScheduleOCR {
  constructor (clientWidth: number, anchors: ScheduleAnchor, textAnnotations: Array<TextAnnotation>, tz?: string) {
    super(clientWidth, anchors.streamAnchors, textAnnotations, tz)

    this.streamCountHorizonBoundary = anchors.streamCountHorizonBoundary
    this.streamCountVerticalBoundary = anchors.streamCountVerticalBoundary

    this.titleHorizonBoundary = anchors.titleHorizonBoundary
    this.titleVerticalBoundary = anchors.titleVerticalBoundary

    this.titleMultiHorizonBoundary = anchors.titleMultiHorizonBoundary
    this.titleMultiVerticalBoundary = anchors.titleMultiVerticalBoundary
  }

  getPoint(anchorX: number, anchorY: number, vBoundary: number, hBoundary: number): SelenStreamCountPoint {
    return new SelenStreamCountPoint(anchorX, anchorY, vBoundary, hBoundary)
  }

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

class SelenStreamCountPoint extends StreamCountPoint {

  findStream (targets: Array<TextAnnotation>): Array<TextAnnotation> {
    const find = targets.filter(t => {
      const target = new Point(t.x ?? 1, t.y ?? 1)
      return this.contains(target) && t.description === 'PDT'
    })
    return find
  }

}
