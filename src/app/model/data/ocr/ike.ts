import TransferScheduleOCR, { ScheduleAnchor, StreamAnchor } from '@app/model/data/ocr/TransferScheduleOCR'
import { TextAnnotation } from '@app/feature/ocr/ocr.component'
import * as moment from 'moment'

export default class IkeScheduleOCR extends TransferScheduleOCR {

  constructor (clientWidth: number, anchors:ScheduleAnchor, textAnnotations: Array<TextAnnotation>, tz?: string) {
    super(clientWidth, anchors.streamAnchors, textAnnotations, tz)

    this.streamCountHorizonBoundary = anchors.streamCountHorizonBoundary
    this.streamCountVerticalBoundary = anchors.streamCountVerticalBoundary

    this.titleHorizonBoundary = anchors.titleHorizonBoundary
    this.titleVerticalBoundary = anchors.titleVerticalBoundary

    this.titleMultiHorizonBoundary = anchors.titleMultiHorizonBoundary
    this.titleMultiVerticalBoundary = anchors.titleMultiVerticalBoundary
  }

  getDate (date: string, index: number, day?: string, startDay?: string): number {
    return Number.parseInt(date) + index
  }

  getMonth (date: string, month?: string): number {
    if (month) {
      return moment().month(month).month()
    }
    return -1
  }
}
