import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core'
import { StreamerInfoVo } from '@app/model/vo/StreamerInfoVo'
import { OCRSchedule, OCRStream } from '@app/feature/ocr/ocr.component'
import { Subscription } from 'rxjs'
import { TimezoneService } from '@app/layout/timezone/timezone.service'
import { ScheduleCheckedService } from '@app/service/schedule-checked.service'
import { RainbowLoaderService } from '@app/common-component/rainbow-loader/rainbow-loader.service'
import { OcrAnchorService } from '@app/service/ocr-anchor.service'
import { OCRtoDto } from '@app/model/dto/StreamDto'
import { StreamService } from '@app/service/stream.service'
import { TemplateResultService } from '@app/feature/ocr/template-form-result/template-result.service'
import { ScheduleTemplateVo } from '@app/model/vo/ScheduleTemplate/ScheduleTemplateVo'
import * as moment from 'moment-timezone'
import { OcrService } from '@app/feature/ocr/ocr.service'
import { ScheduleCheckedState } from '@app/model/enum/ScheduleCheckedState'
import { toDto } from '@app/model/dto/ScheduleCheckedItemDto'

@Component({
  selector: 'app-template-form-result',
  templateUrl: './template-form-result.component.html',
  styleUrls: ['./template-form-result.component.scss']
})
export class TemplateFormResultComponent implements OnInit, OnChanges, OnDestroy {

  @Input() streamerInfo: StreamerInfoVo | undefined

  scheduleImgSrc = ''
  manuallySpecifiedMonth = ''
  manuallySpecifiedDate = ''
  templateAnchorList: Array<ScheduleTemplateVo> = []

  subscriptions: Array<Subscription> = []
  constructor (
    public service: TemplateResultService,
    private ocrService: OcrService,
    private ocrAnchorService: OcrAnchorService,
    private scheduleCheckedService: ScheduleCheckedService,
    private loadingService: RainbowLoaderService,
    private streamService: StreamService,
    public tzService: TimezoneService) { }

  ngOnInit (): void {

    const s1 = this.ocrService.currentStreamerInfo$.subscribe((info) => {
      this.scheduleImgSrc = ''
      this.manuallySpecifiedMonth = ''
      this.manuallySpecifiedDate = ''
      this.service.scheduleImgSrc$.next('')
      this.service.manuallySpecifiedMonth$.next('')
      this.service.manuallySpecifiedDate$.next('')
      this.service.scheduleResult$.next([])
    })
    this.subscriptions.push(s1)

    const s2 = this.ocrService.currentTemplateAnchor$.subscribe(() => {
      this.scheduleImgSrc = ''
      this.manuallySpecifiedDate = ''
      this.manuallySpecifiedMonth = ''
      this.service.scheduleImgSrc$.next('')
      this.service.manuallySpecifiedMonth$.next('')
      this.service.manuallySpecifiedDate$.next('')
      this.service.scheduleResult$.next([])
    })
    this.subscriptions.push(s2)
  }

  ngOnChanges (changes: SimpleChanges): void {

  }

  ngOnDestroy(): void {
    this.service.scheduleImgSrc$.next('')
    this.service.manuallySpecifiedMonth$.next('')
    this.service.manuallySpecifiedDate$.next('')
    this.subscriptions.forEach((s) => {
      if (s) {
        s.unsubscribe()
      }
    })
  }

  reParseSchedule (): void {
    const name = this.streamerInfo?.name ?? ''
    // const voList = this.ocrAnchorService.ocrAnchorInfos.get(name)
    // this.templateAnchorVo = vo
    this.service.parseSchedule()
  }

  confirmCreate(item: OCRStream): void {
    // const confirm = window.confirm('add?')
    // if (!confirm) {
    //   return
    // }

    item.createdStatus = 'LOADING'

    const streamer = this.streamerInfo?.name ?? ''
    const dto = OCRtoDto(streamer, item)

    this.streamService.add(dto)
        .then(() => {
          item.createdStatus = 'SUCCESS'
        })
        .catch(() => {
          item.createdStatus = ''
        })
  }

  updateTimestampAndText(item: OCRStream): void {
    const tz = this.tzService.timezone$.getValue()
    const date = moment.tz(`${item.date} ${item.time}`, item.timezone)
    item.timestamp = date.valueOf();
    // console.log(item.date, item.time, item.timezone, item.timestamp)
    item.scheduleOrigDisplayText = moment(item.timestamp).tz(item.timezone).format('YYYY/MM/DD HH:mm z')
    item.scheduleTzDisplayText = moment(item.timestamp).tz(tz).format('YYYY/MM/DD HH:mm z')
  }

  checkedSchedule (): void {
    const list = this.scheduleCheckedService.scheduleCheckedList$.getValue()
    const item = list.find(i => i.streamer === this.streamerInfo?.name)

    if (item) {
      item.state = ScheduleCheckedState.checked
      this.loadingService.loading$.next(true)
      const dto = toDto(item)
      this.scheduleCheckedService.updateScheduleChecked(item.id, dto)
          .finally(() => {
            this.loadingService.loading$.next(false)
          })
    }
  }

  manuallyAddStream (ocr: OCRSchedule): void {
    this.service.manuallyAddStream(ocr)
  }
}
