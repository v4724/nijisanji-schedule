import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { findStreamerInfo, StreamerInfo } from '@app/feature/schedule/data/StreamerInfo'
import { initStream, resetStream, Stream } from '@app/feature/schedule/test/dto/Stream'
import * as moment from 'moment-timezone'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-stream-detail[item]',
  templateUrl: './stream-detail.component.html',
  styleUrls: ['./stream-detail.component.scss']
})
export class StreamDetailComponent implements OnInit, OnChanges {

  // @ts-ignore
  @Input() item: Stream

  date: string = moment().format('YYYY-MM-DD')
  time: string = '00:00'
  timezone: string = moment.tz.guess()

  timezones = [
    'Australia/Sydney',
    'Asia/Tokyo',
    'Asia/Taipei',
    'Asia/Jakarta',
    'Europe/London',
    'GMT+0',
    'EST5EDT',
    'PST8PDT'
  ]

  items: Observable<[]> = new Observable<[]>()

  searchFeatStreamer: string = ''
  findFeatStreamerInfo: StreamerInfo | undefined = undefined

  constructor() {

  }

  get timestampFromTz(): number {
    return moment.tz(`${this.date} ${this.time}`, this.timezone).valueOf();
  }

  get datetimeFromTz(): string {
    return moment(this.timestampFromTz).tz(this.timezone).format('YYYY/MM/DD HH:mm z')
  }

  get gmtMoment(): string {
    return moment(this.timestampFromTz).tz('GMT+0').format('YYYY/MM/DD HH:mm z')
  }

  get isValid(): boolean {
    return !!this.item.streamer &&
      !!this.item.title &&
      !!this.timestampFromTz
  }

  ngOnInit(): void {
  }

  ngOnChanges (changes: SimpleChanges): void {
    if (this.item.timestamp) {
      this.date = moment(this.item.timestamp).tz(this.timezone).format('YYYY/MM/DD')
      this.time = moment(this.item.timestamp).tz(this.timezone).format('HH:mm')
    }
  }

  streamerChanged(value: string): void {
    const info = findStreamerInfo(value)
    if (info) {
      this.timezone = info.timezone
    }
  }

  dateOrTimeChanged(): void {
    this.item.timestamp = this.timestampFromTz
  }

  findFeatStreamerInfoChanged(value: string): void {
    this.findFeatStreamerInfo = findStreamerInfo(value)
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
