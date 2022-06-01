import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '@app/service/firebase.service'
import { Observable } from 'rxjs'
import * as moment from 'moment-timezone'
import * as lodash from 'lodash'
import { Stream, StreamDto, initStream, toDto } from '@app/feature/schedule/test/dto/Stream'
import { findStreamerInfo, StreamerInfo } from '@app/feature/schedule/data/StreamerInfo'
import { Streamer } from '@app/feature/schedule/data/Streamer'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  item: Stream = initStream()
  date: string = moment().format('YYYY-MM-DD')
  time: string = '00:00'
  timezone: string = moment.tz.guess()

  submitLoading: boolean = false

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

  constructor(public firebaseService: FirebaseService) {


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

  streamerChanged(value: string): void {
    const info = findStreamerInfo(value)
    if (info) {
      this.timezone = info.timezone
    }
  }

  findFeatStreamerInfoChanged(value: string): void {
    this.findFeatStreamerInfo = findStreamerInfo(value)
  }

  addFeatStreamer(): void {
    const name = this.findFeatStreamerInfo?.name
    if (name) {
      // @ts-ignore
      if (this.item.featStreamers.includes(name)) {
        return
      }
      // @ts-ignore
      this.item.featStreamers.push(name)
    }
  }

  enterToAddFeatStreamer(): void {
    this.addFeatStreamer()
    this.searchFeatStreamer = ''
    this.findFeatStreamerInfo = undefined
  }

  removeFeatStreamer(streamer: String): void {
    // @ts-ignore
    const index = this.item.featStreamers.indexOf(streamer)
    if (index > -1) {
      this.item.featStreamers.splice(index, 1)
    }
  }

  clear(): void {
    this.item = initStream()
  }

  submit(): void {
    this.submitLoading = true

    this.item.timestamp = this.timestampFromTz
    const dto = toDto(this.item)

    this.firebaseService.add(dto)
      .then(() => {

      })
      .finally(() => {
        this.submitLoading = false
    })
  }
}
