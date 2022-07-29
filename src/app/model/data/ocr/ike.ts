import TransferScheduleOCR, { ScheduleAnchor, StreamAnchor } from '@app/model/data/ocr/TransferScheduleOCR'
import { TextAnnotation } from '@app/feature/ocr/ocr.component'

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

}
