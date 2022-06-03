import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { StreamerInfoVo } from '@app/model/vo/StreamerInfoVo'
import { StreamerInfoService } from '@app/service/streamer-info.service'
import { StreamGroupService } from '@app/service/stream-group.service'
import { AdminService } from '@app/service/admin.service'
import { combineLatest, Subscription } from 'rxjs'
import { FormControl } from '@angular/forms'
import { MatAutocomplete } from '@angular/material/autocomplete'
import { TimezoneService } from '@app/layout/timezone/timezone.service'
import * as moment from 'moment-timezone'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/internal/operators'
import { Observable } from 'rxjs/internal/observable'
import { RainbowLoaderService } from '@app/common-component/rainbow-loader/rainbow-loader.service'
import TransferScheduleOCR from '@app/model/data/ocr/TransferScheduleOCR'
import { environment } from '@environments/environment'
import { TransferScheduleOCRFactory } from '@app/model/data/ocr/TransferScheduleOCRFactory'
import { StreamService } from '@app/service/stream.service'
import { OCRtoDto } from '@app/model/dto/StreamDto'
import { ToastService } from '@app/common-component/toast/toast.service'
import { OCRAnchorVo } from '@app/model/vo/OCRAnchorVo'
import { OcrAnchorService } from '@app/service/ocr-anchor.service'
import * as lodash from 'lodash'
import { ScheduleCheckedService } from '@app/service/schedule-checked.service'
import { toDto } from '@app/model/dto/ScheduleCheckedItemDto'
import { ScheduleCheckedState } from '@app/model/enum/ScheduleCheckedState'

export interface TextAnnotation {
  description: string,
  boundingPoly: {
    vertices: Array<{ x: number, y: number }>
  },
  x?: number,
  y?: number,
  top?: string,
  left?: string
}

export interface OCRStream {
  hourSystem: string,
  title: string,
  date: string,
  time: string,
  timezone: string,
  timestamp: number,
  scheduleOrigDisplayText: string,   // display
  scheduleTzDisplayText: string,   // display
  createdStatus: string,  // loading
  formControl: FormControl, // form

  searchFeatStreamer: string, // form
  findFeatStreamerInfo?: StreamerInfoVo, // form
  featStreamers: string[], // form
}

export interface OCRSchedule {
  month: string,
  day: string,
  date: string,
  streams: Array<OCRStream>
}

@Component({
  selector: 'app-ocr',
  templateUrl: './ocr.component.html',
  styleUrls: ['./ocr.component.scss']
})
export class OcrComponent implements OnInit, OnDestroy {

  @ViewChild('image') image: ElementRef | undefined

  textAnnotations: Array<TextAnnotation> = []

  ocrSchedule: Array<OCRSchedule> = []

  currentStreamerInfo: StreamerInfoVo | undefined;
  ocrAnchorVo: OCRAnchorVo | undefined

  scheduleImgSrc = ''

  streamerKeyword = ''
  streamers: Array<StreamerInfoVo> = []
  filterStreamers: Array<StreamerInfoVo> = []

  myControl = new FormControl('');

  searchFeatStreamer: string = ''
  findFeatStreamerInfo: StreamerInfoVo | undefined = undefined

  ocr: TransferScheduleOCR | undefined
  ocrTest = false

  subscriptions: Array<Subscription> = []
  constructor(private streamerService: StreamerInfoService,
              private streamGroupService: StreamGroupService,
              public tzService: TimezoneService,
              public adminService: AdminService,
              private loadingService: RainbowLoaderService,
              private streamService: StreamService,
              private toastService: ToastService,
              private ocrAnchorService: OcrAnchorService,
              private scheduleCheckedService: ScheduleCheckedService,
              private http: HttpClient) {
  }

  ngOnDestroy(): void {
     this.subscriptions.forEach((s) => {
       if (s) {
         s.unsubscribe()
       }
     })
  }

  ngOnInit(): void {

    const s = this.tzService.timezone$.subscribe((tz) => {
      if (this.ocr) {
        this.ocrSchedule = this.ocr.updateScheduleByTz(tz, this.ocrSchedule)
      }
    })
    this.subscriptions.push(s)

    const s1 = combineLatest([
      this.streamerService.streamerInfos$,
      this.streamGroupService.selectedGroup$
    ])
      .subscribe((results) => {
        // const groups = results[1]
        // this.streamers = results[0].filter((info) => {
        //   const find = groups.find((group) => group === info.group)
        //   return !!find
        // })
        this.streamers = results[0].filter((info) => {
          return info.ocr === true
        })

        // if (!this.currentStreamerInfo && this.streamers.length) {
        //   this.changeCurrStreamer('Enna')
        //   // @ts-ignore
        //   this.streamerKeyword = this.currentStreamerInfo.name
        // }

        if (this.ocrSchedule.length) {
          this.streamerKeywordChanged()
        }
      })
    this.subscriptions.push(s1)
  }

  get zoomRatio (): number {
    if (this.image) {
      // anchorWidth = 1296
      const clientHeight = this.image.nativeElement.clientHeight
      // const clientHeight = 1296
      const naturalHeight = this.image.nativeElement.naturalHeight
      return clientHeight/naturalHeight
    } else {
      return 1
    }
  }

  get clientWidth (): number {
    if (this.image) {
      return this.image.nativeElement.clientWidth
    } else {
      return 1
    }
  }

  load (): void {
    this.getTextAnnotation()
        .subscribe((textAnnotations) => {

          textAnnotations.forEach(o => {
            const x = o.boundingPoly.vertices[0].x
            const y = o.boundingPoly.vertices[0].y
            o.x = Math.floor(x * this.zoomRatio)
            o.y = Math.floor(y * this.zoomRatio)
            o.left = Math.floor(x * this.zoomRatio) + 'px'
            o.top = Math.floor(y * this.zoomRatio) + 'px'
          })
          this.textAnnotations = textAnnotations

          this.loadOCRSchedule()
        })

  }

  reloadOCRSchedule(): void {
    const name = this.currentStreamerInfo?.name ?? ''
    const vo = this.ocrAnchorService.ocrAnchorInfos.get(name)
    this.ocrAnchorVo = vo
    this.loadOCRSchedule()
  }

  loadOCRSchedule(): void {
    if (!this.ocrAnchorVo)
      return

    const streamerTz = this.currentStreamerInfo?.timezone
    this.ocr = TransferScheduleOCRFactory.getOcr(this.ocrAnchorVo, this.clientWidth, this.textAnnotations, streamerTz)

    const tz = this.tzService.timezone$.getValue()
    const schedule = this.ocr.schedule
    const ocrSchedule = this.ocr.updateScheduleByTz(tz, schedule)
    ocrSchedule.forEach((s) => {
      s.streams.forEach((stream) => {
        stream.formControl = new FormControl('')
      })
    })

    this.ocrSchedule = ocrSchedule
  }

  streamerKeywordChanged(auto?: MatAutocomplete): void {
    const upperKeyword = this.streamerKeyword.toString().toUpperCase()
    this.filterStreamers = this.streamers.filter((info)=> {
      return upperKeyword.length ? info.name.toUpperCase().includes(upperKeyword) : true
    })

  }

  changeCurrStreamer(name: string): void {
    if (name === this.currentStreamerInfo?.name) {
      return
    }

    this.currentStreamerInfo = this.streamers.find(info => info.name === name)
    this.ocrAnchorService.getByStreamer(name, false)
      .subscribe((vo) => {
        this.ocrAnchorVo = lodash.cloneDeep(vo)
      })

    this.scheduleImgSrc = ''
    this.ocrSchedule = []
  }

  getTextAnnotation(): Observable<Array<TextAnnotation>> {
    this.loadingService.loading$.next(true)
    const key = environment.firebase.apiKey
    const url = `https://content-vision.googleapis.com/v1/images:annotate?alt=json&key=${key}`
    return this.http.post(url, {
      "requests": [
        {
          "features": [
            {
              "type": "TEXT_DETECTION"
            }
          ],
          "image": {
            "source": {
              "imageUri": this.scheduleImgSrc
            }
          }
        }
      ]
    }).pipe((map((res) => {

      this.loadingService.loading$.next(false)
      // @ts-ignore
      return res.responses[0].textAnnotations
      // return textAnnotations.selen.textAnnotations
    })))
  }

  updateTimestampAndText(item: OCRStream): void {
    const tz = this.tzService.timezone$.getValue()
    const date = moment.tz(`${item.date} ${item.time}`, item.timezone)
    item.timestamp = date.valueOf();
// console.log(item.date, item.time, item.timezone, item.timestamp)
    item.scheduleOrigDisplayText = moment(item.timestamp).tz(item.timezone).format('YYYY/MM/DD HH:mm z')
    item.scheduleTzDisplayText = moment(item.timestamp).tz(tz).format('YYYY/MM/DD HH:mm z')
  }

  confirmCreate(item: OCRStream): void {
    // const confirm = window.confirm('add?')
    // if (!confirm) {
    //   return
    // }

    item.createdStatus = 'LOADING'

    const streamer = this.currentStreamerInfo?.name ?? ''
    const dto = OCRtoDto(streamer, item)

    this.streamService.add(dto)
        .then(() => {
          item.createdStatus = 'SUCCESS'
        })
        .catch(() => {
          item.createdStatus = ''
        })
  }

  createAnchor(): void {
    this.adminService.openCreateAnchorInfoModal()
  }

  editAnchor(): void {
    const name = this.currentStreamerInfo?.name ?? ''
    const vo = this.ocrAnchorService.ocrAnchorInfos.get(name)
    this.ocrAnchorVo = vo
    this.adminService.openEditAnchorInfoModal(this.ocrAnchorVo)
  }

  checkedSchedule(): void {
    const list = this.scheduleCheckedService.scheduleCheckedList$.getValue()
    const item = list.find(i => i.streamer === this.currentStreamerInfo?.name)

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
}
