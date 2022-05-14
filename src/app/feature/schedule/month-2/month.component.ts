import { Component, OnInit } from '@angular/core';
import { Day, DayItem, HourStreams, MonthHeader, WeekItem } from './types'
import { headers } from './data'
import * as moment from 'moment-timezone'
import * as lodash from 'lodash'
import { StreamViewItem } from '../type'
import { setDisplayValue } from '../data'
import { TimezoneService } from '@app/feature/schedule/toolbar/timezone/timezone.service'
import { ScheduleService } from '@app/feature/schedule/schedule.service'
import { combineLatest } from 'rxjs'
import { findStreamerInfo } from '@app/feature/schedule/data/StreamerInfo'
import { openUrl } from '@app/feature/schedule/utils'
import { Stream } from '@app/feature/schedule/data/Stream'
import { Streamer } from '@app/feature/schedule/data/Streamer'


@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnInit {

  streams: Array<Stream> = []

  headers: Array<MonthHeader> = headers
  data: Array<WeekItem> = []

  monthStreams: Array<Stream> = []
  dateMap: Map<number, Map<String, Array<StreamViewItem>>> = new Map<number, Map<String, Array<StreamViewItem>>>()

  year: number = -1
  month: number = -1

  timezone: string = ''

  openUrl = openUrl

  constructor(private scheduleService: ScheduleService,
              private tzService: TimezoneService) {
    this.timezone = moment.tz.guess()
    const now = moment().tz(this.timezone)
    this.year = now.year()
    this.month = now.month()

  }

  ngOnInit(): void {
    combineLatest([this.scheduleService.streams$, this.tzService.timezone$])
      .subscribe((result) => {
        this.streams = result[0]
        this.timezone = result[1]

        this.updateSchedule(this.year, this.month)
      })
  }

  get monthText(): string {
    return (this.month + 1).toString().padStart(2, '0');
  }

  resetMonth(): void {
    const date = moment().tz(this.timezone)
    this.year = date.year()
    this.month = date.month()
    this.updateSchedule(this.year, this.month)
  }

  changeMonth(month: number): void {
    if (month < 0) {
      this.year -= 1
      this.month = 11
    } else if (month > 11) {
      this.year += 1
      this.month = 0
    } else {
      this.month = month
    }
    this.updateSchedule(this.year, this.month)
  }

  updateSchedule(year: number, month: number): void {

    this.monthStreams = this.streams.filter((s) => {
      const date = moment(s.timestamp).tz(this.timezone)
      const tmpYear = date.year()
      const tmpMonth = date.month()
      return s.timestamp && tmpYear === year && tmpMonth === month
    })
    this.dateMap = new Map<number, Map<String, Array<StreamViewItem>>>()
    this.monthStreams.forEach((s) => {
      const date = moment(s.timestamp).tz(this.timezone)
      const days = date.date()
      if (!this.dateMap.has(days)) {
        this.dateMap.set(days, new Map<String, Array<StreamViewItem>>())
      }
      const dateStreams = this.dateMap.get(days)
      if (dateStreams) {
        const streamerHour = date.hour().toString().padStart(2, '0')
        const streamerMin = date.minute().toString().padStart(2, '0')
        const key = `${streamerHour}:${streamerMin}`
        if (!dateStreams.has(key)) {
          dateStreams.set(key, [])
        }

        const streams = dateStreams.get(key)
        if (streams) {
          const streamViewItem: StreamViewItem = lodash.cloneDeep(s) as StreamViewItem
          setDisplayValue(streamViewItem, this.timezone)
          streams.push(streamViewItem)
        }
      }
    })

    const data: Array<WeekItem>= []
    const date = moment().tz(this.timezone).set('year', year).set('M', month)
    const startOfMonth = date.startOf('month')
    const daysInMonth = date.daysInMonth()

    let tmpDate = startOfMonth
    let weekItem: WeekItem = []
    data.push(weekItem)

    // 補空白
    let firstWeekDay = tmpDate.day()
    while(firstWeekDay > 0) {
      weekItem.push({
        isToday: false,
        moment: null,
        streams: []
      })
      firstWeekDay -= 1
    }

    for(let days = 1; days <= daysInMonth; days++) {

      const day = tmpDate.day().toString()
      if (day === Day.SUN && days !== 0) {
        weekItem = []
        data.push(weekItem)
      }

      const streamersMap = this.dateMap.get(days)
      const streams: Array<HourStreams> = []
      if (streamersMap) {
        const tmp = Array.from(streamersMap)
        tmp.forEach((o) => {
          streams.push({
            hour: o[0],
            streamViewItems: o[1]
          })
        })
      }

      const cloneMoment = moment(tmpDate)
      const isToday = cloneMoment.year() === moment().year() &&
        cloneMoment.month() === moment().month() &&
        cloneMoment.date() === moment().date()
      weekItem.push({
        isToday: isToday,
        moment: cloneMoment,
        streams: streams
      })

      tmpDate.add(1, 'd')
    }

    let lastWeekDay = tmpDate.day()
    while(lastWeekDay < 7 && lastWeekDay !== 0) {
      weekItem.push({
        isToday: false,
        moment: null,
        streams: []
      })
      lastWeekDay += 1
    }

    this.data = data
  }
}
