import TransferScheduleOCR, { ScheduleAnchor } from '@app/model/data/ocr/TransferScheduleOCR'
import { TextAnnotation } from '@app/feature/ocr/ocr.component'

export default class IkeScheduleOCR extends TransferScheduleOCR {

  constructor (clientWidth: number, anchors:Array<ScheduleAnchor>, textAnnotations: Array<TextAnnotation>) {
    super(clientWidth, anchors, textAnnotations)

    this.streamCountHorizonBoundary = 20
    this.streamCountVerticalBoundary = 20

    this.titleHorizonBoundary = 110
    this.titleVerticalBoundary = 30

    this.titleMultiHorizonBoundary = 110
    this.titleMultiVerticalBoundary = 30
  }

}
