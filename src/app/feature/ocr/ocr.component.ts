import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { textAnnotations } from '@app/feature/ocr/data'
import TransferScheduleOCR from '@app/model/data/ocr/ike'
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

export interface Stream {
  time: string,
  hourSystem: string,
  timezone: string,
  title: string,
  scheduleOrigDisplayText: string,
  scheduleTzDisplayText: string
}

export interface OCRSchedule {
  date: string,
  streams: Array<Stream>
}


@Component({
  selector: 'app-ocr',
  templateUrl: './ocr.component.html',
  styleUrls: ['./ocr.component.scss']
})
export class OcrComponent implements OnInit {

  @ViewChild('image') image: ElementRef | undefined

  textAnnotations = textAnnotations as Array<TextAnnotation>

  ocrSchedule: Array<OCRSchedule> = []

  currentStreamerInfo: StreamerInfoVo | undefined;

  scheduleImgSrc = ''
  // scheduleImgSrc = 'https://pbs.twimg.com/media/FWO7_3CXEAAsjJu?format=jpg&name=large'

  streamerKeyword = ''
  streamers: Array<StreamerInfoVo> = []
  filterStreamers: Array<StreamerInfoVo> = []

  myControl = new FormControl('');

  constructor(private streamerService: StreamerInfoService,
              private streamGroupService: StreamGroupService,
              private tzService: TimezoneService,
              public adminService: AdminService,
              private http: HttpClient) {
  }

  ngOnInit(): void {

    this.tzService.timezone$.subscribe(() => {
      this.updateScheduleByTz(this.ocrSchedule)
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
        this.streamers = results[0]

        if (!this.currentStreamerInfo && this.streamers.length) {
          this.changeCurrStreamer(this.streamers[0].name)
          // @ts-ignore
          this.streamerKeyword = this.currentStreamerInfo.name
        }

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
            o.x = (x * this.zoomRatio)
            o.y = (y * this.zoomRatio)
            o.left = (x * this.zoomRatio) + 'px'
            o.top = (y * this.zoomRatio) + 'px'
          })

          const ocr = new TransferScheduleOCR(this.clientWidth, textAnnotations)
          console.log('ocr', ocr)
          this.ocrSchedule = ocr.schedule
          this.updateScheduleByTz(this.ocrSchedule)
        })

  }

  streamerKeywordChanged(auto?: MatAutocomplete): void {
    const upperKeyword = this.streamerKeyword.toString().toUpperCase()
    this.filterStreamers = this.streamers.filter((info)=> {
      return upperKeyword.length ? info.name.toUpperCase().includes(upperKeyword) : true
    })

  }

  changeCurrStreamer(name: string): void {
    this.currentStreamerInfo = this.streamers.find(info => info.name === name)
  }

  updateScheduleByTz(list: Array<OCRSchedule>): void {
    const tz = this.tzService.timezone$.getValue()
    const month = 7 // TODO

    if (!list.length) {
      return
    }
    const startDate = Number.parseInt(list[0].date)

    list.forEach((dateSchedule) => {
      const date = Number.parseInt(dateSchedule.date)
      dateSchedule.streams.forEach(s => {
        const timezone = s.timezone
        const time = s.time
        let hour = Number.parseInt(time.split(':')[0])
        let min = Number.parseInt(time.split(':')[1])
        const hourSystem = s.hourSystem
        if (hourSystem === 'PM') {
          hour += 12
        }

        let dateTime = moment()
          .tz(timezone)
          .set('date', date)
          .set('hour', hour)
          .set('minute', min)
          .set('second', 0)
          .set('millisecond', 0)
          .set('month', month)
        if (date < startDate) {
          dateTime = dateTime.add(1, 'month')
        }

        s.scheduleOrigDisplayText = dateTime.format('YYYY/MM/DD HH:mm z')
        s.scheduleTzDisplayText = dateTime.tz(tz).format('YYYY/MM/DD HH:mm z')

      })
    })
  }

  getTextAnnotation(): Observable<Array<TextAnnotation>> {
    const key = '' // TODO
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
      // @ts-ignore
      return res.responses[0].textAnnotations
      // return textAnnotations
    })))
  }
}
