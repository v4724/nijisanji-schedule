import { Injectable } from '@angular/core';
import { OCRSchedule } from '@app/feature/ocr/ocr.component'
import { BehaviorSubject } from 'rxjs'
import { FormControl } from '@angular/forms'
import { RainbowLoaderService } from '@app/common-component/rainbow-loader/rainbow-loader.service'
import { TimezoneService } from '@app/layout/timezone/timezone.service'
import { ScheduleResultFactory } from '@app/model/factory/ocr/scheduleResult/ScheduleResultFactory'
import ScheduleResult from '@app/model/factory/ocr/scheduleResult/ScheduleResult'
import { OcrService } from '@app/feature/ocr/ocr.service'

@Injectable({
  providedIn: 'root'
})
export class TemplateResultService {

  scheduleImgSrc$ = new BehaviorSubject<string>('')
  manuallySpecifiedMonth$ = new BehaviorSubject<string>('')
  manuallySpecifiedDate$ = new BehaviorSubject<string>('')
  scheduleResult$ = new BehaviorSubject<Array<OCRSchedule>>([])

  ocr: ScheduleResult | undefined
  constructor(
    private loadingService: RainbowLoaderService,
    public tzService: TimezoneService,
    private ocrService: OcrService

  ) {
    this.tzService.timezone$.subscribe((tz) => {
      if (this.ocr) {
        const origOcrSchedule = this.scheduleResult$.getValue()
        const ocrSchedule = this.ocr.updateScheduleByTz(tz, origOcrSchedule)
        this.scheduleResult$.next(ocrSchedule)
      }
    })
  }

  loadTextAnnotation() {
    const imgUri = this.scheduleImgSrc$.getValue()

    this.ocrService.getTextAnnotation(imgUri)
        .subscribe((textAnnotations) => {
          this.parseSchedule()
        })
  }

  parseSchedule (): void {
    const clientWidth = this.ocrService.clientWidth$.getValue()
    const streamerInfo = this.ocrService.currentStreamerInfo$.getValue()
    const textAnnotations = this.ocrService.textAnnotations$.getValue()
    const templateAnchorVo = this.ocrService.currentTemplateAnchor$.getValue()

    if (!templateAnchorVo) {
      return
    }

    const streamerTz = streamerInfo?.timezone
    this.ocr = ScheduleResultFactory.getOcr(templateAnchorVo, clientWidth, textAnnotations, streamerTz)
    this.ocr.manuallySpecifiedMonth = this.manuallySpecifiedMonth$.getValue()
    this.ocr.manuallySpecifiedDate = this.manuallySpecifiedDate$.getValue()

    const tz = this.tzService.timezone$.getValue()
    const schedule = this.ocr.schedule
    const ocrSchedule = this.ocr.updateScheduleByTz(tz, schedule)
    ocrSchedule.forEach((s) => {
      s.streams.forEach((stream) => {
        stream.formControl = new FormControl('')
      })
    })

    // TODO ocrSchedule always return 7 days result
    this.scheduleResult$.next(ocrSchedule)
  }

  manuallyAddStream(dateSchedule: OCRSchedule): void {
    const tz = this.tzService.timezone$.getValue()
    if (this.ocr) {
      dateSchedule.streams.push(this.ocr.getDefaultStreamForForm(dateSchedule, tz))
    }
  }
}
