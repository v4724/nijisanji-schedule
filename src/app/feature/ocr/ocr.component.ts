import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { StreamerInfoVo } from '@app/model/vo/StreamerInfoVo'
import { StreamerInfoService } from '@app/service/streamer-info.service'
import { StreamGroupService } from '@app/service/stream-group.service'
import { AdminService } from '@app/service/admin.service'
import { combineLatest } from 'rxjs'
import { FormControl } from '@angular/forms'
import { MatAutocomplete } from '@angular/material/autocomplete'
import { TimezoneService } from '@app/layout/timezone/timezone.service'
import * as moment from 'moment-timezone'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/internal/operators'
import { Observable } from 'rxjs/internal/observable'
import { RainbowLoaderService } from '@app/common-component/rainbow-loader/rainbow-loader.service'
import TransferScheduleOCR from '@app/model/data/ocr/TransferScheduleOCR'
import { environment } from '@environments/environment.prod'
import { TransferScheduleOCRFactory } from '@app/model/data/ocr/TransferScheduleOCRFactory'
import { StreamService } from '@app/service/stream.service'
import { OCRtoDto, toDto } from '@app/model/dto/StreamDto'
import { ToastService } from '@app/common-component/toast/toast.service'

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
  scheduleOrigDisplayText: string,
  scheduleTzDisplayText: string,
  createdStatus: string
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
export class OcrComponent implements OnInit {

  @ViewChild('image') image: ElementRef | undefined

  textAnnotations: Array<TextAnnotation> = []

  ocrSchedule: Array<OCRSchedule> = []

  currentStreamerInfo: StreamerInfoVo | undefined;

  scheduleImgSrc = ''

  streamerKeyword = ''
  streamers: Array<StreamerInfoVo> = []
  filterStreamers: Array<StreamerInfoVo> = []

  myControl = new FormControl('');
  myControlTz = new FormControl('');

  ocr = new TransferScheduleOCR(1, [], [])
  ocrTest = false

  constructor(private streamerService: StreamerInfoService,
              private streamGroupService: StreamGroupService,
              public tzService: TimezoneService,
              public adminService: AdminService,
              private loadingService: RainbowLoaderService,
              private streamService: StreamService,
              private toastService: ToastService,
              private http: HttpClient) {
  }

  ngOnInit(): void {

    this.tzService.timezone$.subscribe((tz) => {
      this.ocrSchedule = this.ocr.updateScheduleByTz(tz, this.ocrSchedule)
    })

    combineLatest([
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

          this.reloadOCRSchedule()
        })

  }

  reloadOCRSchedule(): void {
    const name = this.currentStreamerInfo?.name ?? ''
    const streamerTz = this.currentStreamerInfo?.timezone
    this.ocr = TransferScheduleOCRFactory.getOcr(name, this.clientWidth, this.textAnnotations, streamerTz)

    const tz = this.tzService.timezone$.getValue()
    this.ocrSchedule = this.ocr.updateScheduleByTz(tz, this.ocr.schedule)
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
    const confirm = window.confirm('add?')
    if (!confirm) {
      return
    }

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
}
