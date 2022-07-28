import TransferScheduleOCR from '@app/model/data/ocr/TransferScheduleOCR'
import SelenScheduleOCR from '@app/model/data/ocr/selen'
import * as anchors from '@app/model/data/ocr/anchors'
import IkeScheduleOCR from '@app/model/data/ocr/ike'
import UkiScheduleOCR from '@app/model/data/ocr/uki'
import { TextAnnotation } from '@app/feature/ocr/ocr.component'
import ShotoScheduleOCR from '@app/model/data/ocr/shoto'
import LucaScheduleOCR from '@app/model/data/ocr/luca'

export class TransferScheduleOCRFactory {

  static getOcr(name: string, clientWidth: number, textAnnotations: Array<TextAnnotation>): TransferScheduleOCR {
    switch (name) {
      case 'Selen':
        return new SelenScheduleOCR(clientWidth, anchors.selen, textAnnotations)
      case 'Ike':
        return new IkeScheduleOCR(clientWidth, anchors.ike, textAnnotations)
      case 'Uki':
        return new UkiScheduleOCR(clientWidth, anchors.uki, textAnnotations)
      case 'Shoto':
        return new ShotoScheduleOCR(clientWidth, anchors.shoto, textAnnotations)
      case 'Luca':
        return new LucaScheduleOCR(clientWidth, anchors.luca, textAnnotations)
      default:
        return new TransferScheduleOCR(clientWidth, anchors.ike.streamAnchors, textAnnotations)
    }
  }
}
