import { ScheduleTemplateVo } from '@app/model/vo/ScheduleTemplate/ScheduleTemplateVo'
import ScheduleResult from '@app/model/factory/ocr/scheduleResult/ScheduleResult'
import { TextAnnotation } from '@app/model/factory/ocr/TextAnnotation'

export class ScheduleResultFactory {

  static getOcr(ocrAnchorVo: ScheduleTemplateVo, clientWidth: number, textAnnotations: Array<TextAnnotation>, tz?: string): ScheduleResult {
    switch (ocrAnchorVo.streamer) {
      default:
        return new ScheduleResult(clientWidth, ocrAnchorVo.anchor, textAnnotations, tz)
    }
  }

}
