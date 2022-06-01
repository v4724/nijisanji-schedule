import { Component, OnInit } from '@angular/core';
import { FirebaseStreamViewItem as StreamViewItem } from '../type'
import { setDisplayValue } from '../data'
import { Streamer, streamerList } from '../data/Streamer'
import * as moment from 'moment-timezone'
import { WeekHeader } from './types'
import { Moment } from 'moment-timezone'
import { TimezoneService } from '@app/feature/schedule/toolbar/timezone/timezone.service'
import { StreamType } from '@app/feature/schedule/toolbar/stream-type/stream-type.service'
import { ScheduleService } from '@app/feature/schedule/schedule.service'
import { findStreamerInfo } from '@app/feature/schedule/data/StreamerInfo'
import { combineLatest, forkJoin, Observable, Subscription } from 'rxjs'
import { openUrl } from '@app/feature/schedule/utils'
import { Stream, TBDStream } from '@app/feature/schedule/data/Stream'
import { Stream as FirebaseStream } from '@app/feature/schedule/test/dto/Stream'
import { FirebaseService } from '@app/service/firebase.service'
import { tap } from 'rxjs/operators'
import { StreamGroupService } from '@app/feature/schedule/toolbar/stream-group/stream-group.service'
import { StreamerGroup } from '@app/feature/schedule/data/StreamerGroups'

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss']
})
export class WeekComponent implements OnInit {
  displayWeekText: string = ''
  date: Moment = moment()

  streams: Array<FirebaseStream> = []
  filterStreams: Array<FirebaseStream> = []
  timezone = ''
  TBDStreams: Array<TBDStream> = []

  groups: Array<StreamerGroup> = []

  headers: Array<WeekHeader> = []
  data: Array<any> = []

  StreamType = StreamType
  categoryType: StreamType = StreamType.Streamer

  currStreamer: string = ''
  streamers = streamerList()

  findStreamerInfo = findStreamerInfo
  openUrl = openUrl

  startTimestamp: number = moment().valueOf()
  endTimestamp: number = moment().valueOf()

  streamLoading: boolean = false
  subscription: Subscription | undefined

  constructor(private scheduleService: ScheduleService,
              private tzService: TimezoneService,
              private firebaseService: FirebaseService,
              private streamGroupService: StreamGroupService) {
  }

  ngOnInit(): void {
    const defaultTimezone = this.tzService.timezone$.getValue()
    const currentMoment = this.date.tz(defaultTimezone)
    const currentDay = currentMoment.day()
    this.startTimestamp = currentMoment.clone().add(-currentDay, 'day')
                                       .set('hour', 0)
                                       .set('minute', 0)
                                       .set('second', 0).valueOf()
    this.endTimestamp = currentMoment.clone().add(7-currentDay-1, 'day')
                                     .set('hour', 23)
                                     .set('minute', 59)
                                     .set('second', 59).valueOf()

    combineLatest([
      this.tzService.timezone$,
      this.scheduleService.TBDStreams$,
      this.streamGroupService.group$
    ])
      .subscribe((result) => {
        const timezone = result[0]
        this.TBDStreams = result[1]
        this.groups = result[2]

        if (timezone !== this.timezone) {
          this.timezone = timezone
          this.changeTimezone()
        } else {
          this.updateSchedule()
        }
      })

  }

  linkToYoutube (streamer: string): void {
    const info = findStreamerInfo(streamer)
    if (info) {
      const ytLink = info.youtubeLink
      openUrl(ytLink)
    }
  }

  changeTimezone(): void {
    this.date = moment(this.date).tz(this.timezone)
    this.updateStreams()
  }

  changeWeek(dateNumber: number): void {
    this.date.add(dateNumber, 'd')
    this.updateStreams()
  }

  resetWeek(): void {
    this.date = moment().tz(this.timezone)
    this.updateStreams()
  }

  updateStreams(): void {
    const currentDay = this.date.day()
    this.startTimestamp = this.date.clone().add(-currentDay, 'day')
                              .set('hour', 0)
                              .set('minute', 0)
                              .set('second', 0).valueOf()
    this.endTimestamp = this.date.clone().add(7-currentDay-1, 'day')
                            .set('hour', 23)
                            .set('minute', 59)
                            .set('second', 59).valueOf()

    this.streamLoading = true

    if (this.subscription) {
      this.subscription.unsubscribe()
    }
    console.log('update')
    this.subscription = this.firebaseService.where(this.startTimestamp, this.endTimestamp)
        .pipe(
          tap((result) => {
            this.streams = result
          })
        )
        .subscribe(() => {
          this.subscription?.unsubscribe()

          this.streamLoading = false
          this.updateWeek(this.date)
          this.updateSchedule()
        })
  }

  updateWeek(nowDate: Moment): void {
    const nowDay = nowDate.day()

    const headerMap = new Map<number, WeekHeader>()
    headerMap.set(0, { key: 'streamer', value: 'streamer', isToday: false })

    const setHeaders = (fromDay: number, toDay: number): void => {
      for (let day = fromDay; day < toDay; day++) {
        const gap = nowDay - day
        const tmpDate = moment(nowDate).subtract(gap, 'day')
        const timestamp = tmpDate.valueOf()
        const dateText = tmpDate.format('YYYY-MM-DD')
        const dayText = tmpDate.format('ddd')
        const isToday = tmpDate.date() === moment().tz(this.timezone).date()

        headerMap.set(timestamp, { key: dateText, value: dayText, isToday: isToday })
      }
    }
    setHeaders(0, nowDay)
    setHeaders(nowDay, 7)

    const newMap = new Map([...headerMap.entries()].sort())
    this.headers = Array.from(newMap.values())
    this.displayWeekText = `${this.headers[1].key} ~ ${this.headers[this.headers.length - 1].key}`
  }

  updateSchedule(): void {
    this.filterStreams = this.streams.filter((s) => {

      const streamer = findStreamerInfo(s.streamer)
      if (streamer) {
        if (this.groups.indexOf(streamer.group) > -1) {
          return true
        }
      }
      return false
    })
    this._updateScheduleByTZ(this.filterStreams, this.timezone)
  }

  _updateScheduleByTZ(streams: Array<FirebaseStream>, tz: string): void {

    const streamerMap = new Map<string, any>()

    streams.forEach((item) => {
      const viewItem = item as StreamViewItem

      if (viewItem.timestamp) {
        setDisplayValue(viewItem, tz)
      }

      const streamer = viewItem.streamer
      if (!streamerMap.has(streamer)) {
        streamerMap.set(streamer, {
          streamer: streamer,
        })
      }

      const momentTz = moment(viewItem.timestamp).tz(tz)
      const dateText = momentTz.format('YYYY-MM-DD')

      const findDate = this.headers.find((h) => {
        return h.key === dateText
      })
      if (!findDate) {
        return
      }

      const date = viewItem.displayDate
      const week = streamerMap.get(streamer)
      if (week) {
        const stream: any = {
          text: `${ viewItem.title } ${ viewItem.displayTime }`,
          link: viewItem.link,
          onSchedule: viewItem.onSchedule,
          streamerInfo: viewItem.streamerInfo,
          isCanceled: viewItem.isCanceled,
          isModified: viewItem.isModified,
          isUncertain: viewItem.isUncertain,
        }
        if (week[date]) {
          week[date].push(stream)
        } else {
          week[date] = [stream]
        }
      }

    })

    this.TBDStreams.forEach((s) => {
      const streamer = s.streamer
      const year = s.year
      const month = s.month.toString().padStart(2, '0')
      const date = s.date.toString().padStart(2, '0')
      const dateText = `${ year }-${ month }-${ date }`
      const findDate = this.headers.find((h) => {
        return h.key === dateText
      })
      if (!findDate) {
        return
      }
      const week = streamerMap.get(streamer)
      if (week) {
        if (!week['TBD']) {
          week['TBD'] = {}
        }
        week['TBD'][dateText] = s
      }
    })

    const orders = new Array<Streamer>()
    orders.push(Streamer.Ike)
    orders.push(Streamer.Vox)
    orders.push(Streamer.Mysta)
    orders.push(Streamer.Shu)
    orders.push(Streamer.Luca)
    orders.push(Streamer.Yugo)
    orders.push(Streamer.Fulgur)
    orders.push(Streamer.Alban)
    orders.push(Streamer.Uki)
    orders.push(Streamer.Sonny)
    orders.push(Streamer.Nina)
    orders.push(Streamer.Enna)
    orders.push(Streamer.Reimu)
    orders.push(Streamer.Elira)
    orders.push(Streamer.Finana)
    orders.push(Streamer.Selen)
    orders.push(Streamer.Pomu)
    orders.push(Streamer.Rosemi)
    orders.push(Streamer.Petra)
    orders.push(Streamer.Millie)
    orders.push(Streamer.Mika)

    this.data = []
    orders.forEach((streamer: Streamer) => {
      if (!streamerMap.has(streamer)) {
        return
      }

      const o = streamerMap.get(streamer)
      this.data.push(o)
    })
  }
}
