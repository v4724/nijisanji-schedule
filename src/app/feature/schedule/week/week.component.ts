import { Component, OnInit } from '@angular/core';
import { Stream, StreamViewItem } from '../type'
import { setDisplayValue, findStreamerInfo, streams } from '../data'
import { streamerList } from '../types/Streamer'
import * as moment from 'moment-timezone'
import * as lodash from 'lodash'
import { WeekType, WeekHeader } from './types'
import { Moment } from 'moment'
import { TimezoneService } from '@app/feature/schedule/toolbar/timezone/timezone.service'
import { StreamType } from '@app/feature/schedule/toolbar/stream-type/stream-type.service'
import { ScheduleService } from '@app/feature/schedule/schedule.service'
import { combineLatest, forkJoin } from 'rxjs'
import { combineAll } from 'rxjs/operators'

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss']
})
export class WeekComponent implements OnInit {

  streams: Array<Stream> = []
  timezone = ''

  headers: Array<WeekHeader> = []
  data: Array<any> = []

  StreamType = StreamType
  categoryType: StreamType = StreamType.Streamer

  WeekType = WeekType
  currWeek: WeekType = WeekType.This

  currStreamer: string = ''
  streamers = streamerList()

  findStreamerInfo = findStreamerInfo

  constructor(private scheduleService: ScheduleService,
              private tzService: TimezoneService) {
  }

  ngOnInit(): void {
    combineLatest([this.scheduleService.streams$, this.tzService.timezone$])
      .subscribe((result) => {
        this.streams = result[0]
        const timezone = result[1]

        if (timezone !== this.timezone) {
          this.timezone = timezone
          this.changeTimezone()
        } else {
          this.updateSchedule()
        }
      })
  }

  getDateByWeek(type: WeekType): Moment{
    const date = moment().tz(this.timezone)
    switch (type) {
      case WeekType.Last:
        date.subtract(7, 'd')
        break;
      case WeekType.This:
        break;
      case WeekType.Next:
        date.add(7, 'd')
        break;
    }
    return date
  }

  changeTimezone(): void {
    const date = this.getDateByWeek(this.currWeek)
    this.updateWeek(date)
    this.updateSchedule()
  }

  changeWeek(type: WeekType): void {
    this.currWeek = type
    const date = this.getDateByWeek(type)
    this.updateWeek(date)
    this.updateSchedule()
  }

  changeStreamer(): void {
    this.updateSchedule()
  }

  changeCategory(type: StreamType): void {
    this.categoryType = type
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

      const dateText = moment(viewItem.timestamp)
        .tz(tz)
        .format('YYYY-MM-DD')

      const findDate = this.headers.find((h) => {
        return h.key === dateText
      })
      if (!findDate) {
        return
      }

      const date = viewItem.displayDate
      const week = streamerMap.get(streamer)
      if (week) {
        const stream = {
          text: `${viewItem.title} ${viewItem.displayTime}`,
          link: viewItem.link,
          isStreamer: viewItem.isStreamer,
        }
        if (week[date]) {
          week[date].push(stream)
        } else {
          week[date] = [stream]
        }
      }

    })
    this.data = Array.from(streamerMap.values())
  }
}
