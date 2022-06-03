import TransferScheduleOCR, { ScheduleAnchor } from '@app/model/data/ocr/TransferScheduleOCR'
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
import EliraScheduleOCR from '@app/model/data/ocr/elira'
import { OCRAnchorVo } from '@app/model/vo/OCRAnchorVo'

export class TransferScheduleOCRFactory {

  static getOcr(ocrAnchorVo: OCRAnchorVo, clientWidth: number, textAnnotations: Array<TextAnnotation>, tz?: string): TransferScheduleOCR {
    switch (ocrAnchorVo.streamer) {
      case 'Selen':
        return new SelenScheduleOCR(clientWidth, ocrAnchorVo.anchor, textAnnotations, tz)
      case 'Ike':
        return new IkeScheduleOCR(clientWidth, ocrAnchorVo.anchor, textAnnotations, tz)
      case 'Uki':
        return new UkiScheduleOCR(clientWidth, ocrAnchorVo.anchor, textAnnotations, tz)
      case 'Shoto':
        return new ShotoScheduleOCR(clientWidth, ocrAnchorVo.anchor, textAnnotations, tz)
      case 'Luca':
        return new LucaScheduleOCR(clientWidth, ocrAnchorVo.anchor, textAnnotations, tz)
      case 'Sonny':
        return new SonnyScheduleOCR(clientWidth, ocrAnchorVo.anchor, textAnnotations, tz)
      case 'Alban':
        return new AlbanScheduleOCR(clientWidth, ocrAnchorVo.anchor, textAnnotations, tz)
      case 'Shu':
        return new ShuScheduleOCR(clientWidth, ocrAnchorVo.anchor, textAnnotations, tz)
      case 'Fulgur':
        return new FulgurScheduleOCR(clientWidth, ocrAnchorVo.anchor, textAnnotations, tz)
      case 'Enna':
        return new EnnaScheduleOCR(clientWidth, ocrAnchorVo.anchor, textAnnotations, tz)
      case 'Elira':
        return new EliraScheduleOCR(clientWidth, ocrAnchorVo.anchor, textAnnotations, tz)
      default:
        return new TransferScheduleOCR(clientWidth, ocrAnchorVo.anchor, textAnnotations, tz)
    }
  }

  static getAnchors(name: string): ScheduleAnchor {
    switch (name) {
      case 'Selen':
        return anchors.selen
      case 'Ike':
        return  anchors.ike
      case 'Uki':
        return  anchors.uki
      case 'Shoto':
        return  anchors.shoto
      case 'Luca':
        return  anchors.luca
      case 'Sonny':
        return  anchors.sonny
      case 'Alban':
        return  anchors.alban
      case 'Shu':
        return  anchors.shu
      case 'Fulgur':
        return  anchors.fulgur
      case 'Enna':
        return  anchors.enna
      case 'Elira':
        return  anchors.elira
      default:
        return anchors.ike
    }
  }
}
