import { OCRSchedule, TextAnnotation } from '@app/feature/ocr/ocr.component'
import * as lodash from 'lodash'
import TransferScheduleOCR, { ScheduleAnchor } from '@app/model/data/ocr/TransferScheduleOCR'
import { Point, StreamCountPoint } from '@app/model/data/ocr/Point'
import * as moment from 'moment-timezone'

export default class SelenScheduleOCR extends TransferScheduleOCR {
  constructor (clientWidth: number, anchors:Array<ScheduleAnchor>, textAnnotations: Array<TextAnnotation>) {
    super(clientWidth, anchors, textAnnotations)

    this.streamCountHorizonBoundary = 200
    this.streamCountVerticalBoundary = 20

    this.titleHorizonBoundary = 200
    this.titleVerticalBoundary = 30

    this.titleMultiHorizonBoundary = 140
    this.titleMultiVerticalBoundary = 30

  }

  getPoint(anchorX: number, anchorY: number, vBoundary: number, hBoundary: number): SelenStreamCountPoint {
    return new SelenStreamCountPoint(anchorX, anchorY, vBoundary, hBoundary)
  }

  // date only
  getDate(date: string): number {
    const arr = date.split('.')
    return Number.parseInt(arr[1])
  }

  // month only
  getMonth(date: string): number {
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
