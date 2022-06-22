import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { resetStream, StreamVo } from '@app/model/vo/StreamVo'
import * as moment from 'moment-timezone'
import { Observable } from 'rxjs'
import { TimezoneService } from '@app/layout/timezone/timezone.service'
import { timezoneEntries } from '@app/model/enum/Timezone'
import { StreamerInfoService } from '@app/service/streamer-info.service'
import { StreamerInfoVo } from '@app/model/vo/StreamerInfoVo'

@Component({
  selector: 'app-stream-detail[item]',
  templateUrl: './stream-detail.component.html',
  styleUrls: ['./stream-detail.component.scss']
})
export class StreamDetailComponent implements OnInit, OnChanges {

  // @ts-ignore
  @Input() item: StreamVo
  @Input() update: boolean = false

  date: string = moment().format('YYYY-MM-DD')
  time: string = '00:00'
  timezone: string = moment.tz.guess()
  globalTz: string = moment.tz.guess()
  datetimeFromTz: string = ''
  gmtMoment: string = ''
  datetimeFromGlobalTz: string = ''

  timezones = timezoneEntries

  items: Observable<[]> = new Observable<[]>()

  searchFeatStreamer: string = ''
  findFeatStreamerInfo: StreamerInfoVo | undefined = undefined

  constructor(private timezoneService: TimezoneService,
              private streamerInfoService: StreamerInfoService) {

  }

  get isValid(): boolean {
    return !!this.item.streamer &&
      !!this.item.title &&
      !!this.item.timestamp
  }

  ngOnInit(): void {
    this.timezoneService.timezone$.subscribe((tz) => {
      this.timezone = tz
      this.globalTz = tz

      this.initTextByItem()
    })
  }

  ngOnChanges (changes: SimpleChanges): void {
    this.initTextByItem()
  }

  streamerChanged(value: string): void {
    const info = this.streamerInfoService.findStreamerInfo(value)
    if (info) {
      this.timezone = info.timezone ?? ''
    }
  }

  updateTimestampAndText(): void {
    const date = moment.tz(`${this.date} ${this.time}`, this.timezone)
    this.item.timestamp = date.valueOf();

    this.updateText()
  }
  private updateText(): void {
    this.datetimeFromTz = moment(this.item.timestamp).tz(this.timezone).format('YYYY/MM/DD HH:mm z')
    this.gmtMoment = moment(this.item.timestamp).tz('GMT+0').format('YYYY/MM/DD HH:mm z')
    this.datetimeFromGlobalTz = moment(this.item.timestamp).tz(this.globalTz).format('YYYY/MM/DD HH:mm z')
  }

  private initTextByItem (): void {
    if (this.item.timestamp) {
      this.date = moment(this.item.timestamp).tz(this.timezone).format('YYYY-MM-DD')
      this.time = moment(this.item.timestamp).tz(this.timezone).format('HH:mm')
      this.updateText()
    }
  }

  findFeatStreamerInfoChanged(value: string): void {
    this.findFeatStreamerInfo = this.streamerInfoService.findStreamerInfo(value)
  }

  addFeatStreamer(): void {
    const name = this.findFeatStreamerInfo?.name
    if (name) {
      if (this.item.featStreamers.includes(name)) {
        return
      }
      this.item.featStreamers.push(name)
    }
  }

  enterToAddFeatStreamer(): void {
    this.addFeatStreamer()
    this.searchFeatStreamer = ''
    this.findFeatStreamerInfo = undefined
  }

  removeFeatStreamer(streamer: string): void {
    const index = this.item.featStreamers.indexOf(streamer)
    if (index > -1) {
      this.item.featStreamers.splice(index, 1)
    }
  }

  clear(): void {
    if (this.item) {
      resetStream(this.item)
    }
  }

}
