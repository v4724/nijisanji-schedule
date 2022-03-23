import { Component, OnInit } from '@angular/core';
import { StreamViewItem } from '../type'
import { setDisplayValue } from '../data'
import { streamerList } from '../data/Streamer'
import * as moment from 'moment-timezone'
import { WeekHeader } from './types'
import { Moment } from 'moment'
import { TimezoneService } from '@app/feature/schedule/toolbar/timezone/timezone.service'
import { StreamType } from '@app/feature/schedule/toolbar/stream-type/stream-type.service'
import { ScheduleService } from '@app/feature/schedule/schedule.service'
import { findStreamerInfo } from '@app/feature/schedule/data/StreamerInfo'
import { combineLatest, forkJoin } from 'rxjs'
import { openUrl } from '@app/feature/schedule/utils'
import { Stream, TBDStream } from '@app/feature/schedule/data/Stream'

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss']
})
export class WeekComponent implements OnInit {
  displayWeekText: string = ''
  date: Moment = moment()

  streams: Array<Stream> = []
  timezone = ''
  TBDStreams: Array<TBDStream> = []

  headers: Array<WeekHeader> = []
  data: Array<any> = []

  StreamType = StreamType
  categoryType: StreamType = StreamType.Streamer

  currStreamer: string = ''
  streamers = streamerList()

  findStreamerInfo = findStreamerInfo
  openUrl = openUrl

  constructor(private scheduleService: ScheduleService,
              private tzService: TimezoneService) {
  }

  ngOnInit(): void {
    combineLatest([this.scheduleService.streams$, this.tzService.timezone$, this.scheduleService.TBDStreams$])
      .subscribe((result) => {
        this.streams = result[0]
        const timezone = result[1]
        this.TBDStreams = result[2]

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

    this.updateWeek(this.date)
    this.updateSchedule()
  }

  changeWeek(dateNumber: number): void {
    this.date.add(dateNumber, 'd')

    this.updateWeek(this.date)
    this.updateSchedule()
  }

  changeStreamer(): void {
    this.updateSchedule()
  }

  changeCategory(type: StreamType): void {
    this.categoryType = type
    this.updateSchedule()
  }

  resetWeek(): void {
    this.date = moment().tz(this.timezone)
    this.updateWeek(this.date)
    this.updateSchedule()
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
        const isToday = tmpDate.date() === moment().date()

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
    if (this.currStreamer) {
      this.streams = this.streams.filter(i => i.streamer === this.currStreamer)
    }

    this._updateScheduleByTZ(this.streams, this.timezone)
  }

  _updateScheduleByTZ(streams: Array<Stream>, tz: string): void {

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
          text: `${viewItem.title} ${viewItem.displayTime}`,
          link: viewItem.link,
          onSchedule: viewItem.onSchedule,
          streamerInfo: viewItem.streamerInfo,
          isCanceled: viewItem.isCanceled,
          isModified: viewItem.isModified,
          isNew: viewItem.isNew,
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
      const dateText = `${year}-${month}-${date}`
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

    this.data = Array.from(streamerMap.values())
  }
}
