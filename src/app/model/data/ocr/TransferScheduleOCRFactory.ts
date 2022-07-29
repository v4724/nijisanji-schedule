import TransferScheduleOCR from '@app/model/data/ocr/TransferScheduleOCR'
import SelenScheduleOCR from '@app/model/data/ocr/selen'
import * as anchors from '@app/model/data/ocr/anchors'
import IkeScheduleOCR from '@app/model/data/ocr/ike'
import UkiScheduleOCR from '@app/model/data/ocr/uki'
import { TextAnnotation } from '@app/feature/ocr/ocr.component'
import ShotoScheduleOCR from '@app/model/data/ocr/shoto'
import LucaScheduleOCR from '@app/model/data/ocr/luca'
import SonnyScheduleOCR from '@app/model/data/ocr/sonny'
import AlbanScheduleOCR from '@app/model/data/ocr/alban'
import ShuScheduleOCR from '@app/model/data/ocr/shu'
import FulgurScheduleOCR from '@app/model/data/ocr/fulgur'
import EnnaScheduleOCR from '@app/model/data/ocr/enna'

export class TransferScheduleOCRFactory {

  static getOcr(name: string, clientWidth: number, textAnnotations: Array<TextAnnotation>, tz?: string): TransferScheduleOCR {
    switch (name) {
      case 'Selen':
        return new SelenScheduleOCR(clientWidth, anchors.selen, textAnnotations, tz)
      case 'Ike':
        return new IkeScheduleOCR(clientWidth, anchors.ike, textAnnotations, tz)
      case 'Uki':
        return new UkiScheduleOCR(clientWidth, anchors.uki, textAnnotations, tz)
      case 'Shoto':
        return new ShotoScheduleOCR(clientWidth, anchors.shoto, textAnnotations, tz)
      case 'Luca':
        return new LucaScheduleOCR(clientWidth, anchors.luca, textAnnotations, tz)
      case 'Sonny':
        return new SonnyScheduleOCR(clientWidth, anchors.sonny, textAnnotations, tz)
      case 'Alban':
        return new AlbanScheduleOCR(clientWidth, anchors.alban, textAnnotations, tz)
      case 'Shu':
        return new ShuScheduleOCR(clientWidth, anchors.shu, textAnnotations, tz)
      case 'Fulgur':
        return new FulgurScheduleOCR(clientWidth, anchors.fulgur, textAnnotations, tz)
      case 'Enna':
        return new EnnaScheduleOCR(clientWidth, anchors.enna, textAnnotations, tz)
      default:
        return new TransferScheduleOCR(clientWidth, anchors.ike.streamAnchors, textAnnotations, tz)
    }
  }
}
