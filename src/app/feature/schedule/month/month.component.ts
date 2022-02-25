import { Component, OnInit } from '@angular/core';
import { Day, MonthHeader, Streamer, WeekItem } from './types'
import { headers } from './data'
import * as moment from 'moment-timezone'
import * as lodash from 'lodash'
import { Stream, StreamViewItem } from '../type'
import { findStreamerInfo, setDisplayValue, streams } from '../data'


@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnInit {

  headers: Array<MonthHeader> = headers
  origData: Array<Stream> = streams
  data: Array<WeekItem> = []

  year: number = -1
  month: number = -1

  timezone: string = ''

  lastStreamerDetail: Streamer | null = null
  constructor() {
    this.timezone = moment.tz.guess()
    const now = moment().tz(this.timezone)
    this.year = now.year()
    this.month = now.month()

    this.updateSchedule(this.year, this.month)
  }

  ngOnInit(): void {
  }

  showStreamerDetail(streamer: Streamer): void {
    streamer.showDetail = true
    if (this.lastStreamerDetail) {
      this.lastStreamerDetail.showDetail = false
    }
    this.lastStreamerDetail = streamer
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

    const streams = this.origData.filter((s) => {
      const date = moment(s.timestamp).tz(this.timezone)
      const tmpYear = date.year()
      const tmpMonth = date.month()
      return tmpYear === year && tmpMonth === month
    })

    const dateMap = new Map<number, Map<string, Array<StreamViewItem>>>()
    streams.forEach((s) => {
      const date = moment(s.timestamp).tz(this.timezone)
      const days = date.date()
      if (!dateMap.has(days)) {
        dateMap.set(days, new Map<string, Array<StreamViewItem>>())
      }
      const dateStreams = dateMap.get(days)
      if (dateStreams) {
        const streamer = s.streamer
        if (!dateStreams.has(streamer)) {
          dateStreams.set(streamer, [])
        }

        const streams = dateStreams.get(streamer)
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
        moment: null,
        streamers: []
      })
      firstWeekDay -= 1
    }

    for(let days = 1; days <= daysInMonth; days++) {

      const day = tmpDate.day().toString()
      if (day === Day.SUN && days !== 0) {
        weekItem = []
        data.push(weekItem)
      }

      const streamersMap = dateMap.get(days)
      const streamers: Array<Streamer> = []
      if (streamersMap) {
        streamersMap.forEach((value, key) => {
          const info = findStreamerInfo(key)
          if (info) {
            const streamer: Streamer = {
              info: info,
              streams: value,
              showDetail: false
            }
            streamers.push(streamer)
          }
        })
      }
      const cloneMoment = moment(tmpDate)
      weekItem.push({
        moment: cloneMoment,
        streamers
      })

      tmpDate.add(1, 'd')
    }

    this.data = data
  }
}
