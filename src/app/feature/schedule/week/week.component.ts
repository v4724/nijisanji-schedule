import { Component, OnInit } from '@angular/core';
import { Stream, StreamViewItem, CategoryType } from '../type'
import { setDisplayValue, findStreamerInfo, streams } from '../data'
import { streamerList } from '../types/Streamer'
import * as moment from 'moment-timezone'
import * as lodash from 'lodash'
import { WeekType, WeekHeader } from './types'
import { Moment } from 'moment'

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss']
})
export class WeekComponent implements OnInit {

  headers: Array<WeekHeader> = []
  origData: Array<Stream> = streams
  data: Array<any> = []

  CategoryType = CategoryType
  categoryType: CategoryType = CategoryType.Streamer

  WeekType = WeekType
  currWeek: WeekType = WeekType.This

  currStreamer: string = ''
  streamers = streamerList()

  findStreamerInfo = findStreamerInfo

  countries = moment.tz.names()

  timezone: string = '';
  constructor() {
    this.timezone = moment.tz.guess()

    const date = this.getDateByWeek(this.currWeek)
    this.updateWeek(date)
    this.updateSchedule()
  }

  get streamerStreams(): Array<Stream> {
    return this.origData.filter((stream) => {
      return stream.isStreamer
    })
  }

  get guestStreams(): Array<Stream> {
    const clone = lodash.cloneDeep(this.origData)
    return clone
      .filter((stream) => {
        if (!stream.isStreamer) {
          const guestId = stream.guestId
          const mainStream = this.origData.find((i) => i.id === guestId)
          if (mainStream) {
            stream.link = mainStream.link
            stream.timestamp = mainStream.timestamp
          }
        }
        return !stream.isStreamer
      })
  }

  ngOnInit(): void {
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

  changeCategory(type: CategoryType): void {
    this.categoryType = type
    this.updateSchedule()
  }

  getSteamsByCategory(type: CategoryType): Array<Stream> {
    let list = []
    switch (type) {
      case CategoryType.Streamer:
        list = this.streamerStreams
        break;
      case CategoryType.Guest:
        list = this.guestStreams
        break;
      case CategoryType.All:
        const streamer = this.streamerStreams
        const guest = this.guestStreams
        list = streamer.concat(guest)
        break;
    }

    return list
  }

  updateWeek(nowDate: Moment): void {
    const nowDay = nowDate.day()

    const headerMap = new Map<number, WeekHeader>()
    headerMap.set(0, { key: 'streamer', value: 'streamer' })

    const setHeaders = (fromDay: number, toDay: number): void => {
      for (let day = fromDay; day < toDay; day++) {
        const gap = nowDay - day
        const tmpDate = moment(nowDate).subtract(gap, 'day')
        const timestamp = tmpDate.valueOf()
        const dateText = tmpDate.format('YYYY-MM-DD')
        const dayText = tmpDate.format('ddd')

        headerMap.set(timestamp, { key: dateText, value: dayText })
      }
    }
    setHeaders(0, nowDay)
    setHeaders(nowDay, 7)

    const newMap = new Map([...headerMap.entries()].sort())
    this.headers = Array.from(newMap.values())
  }
  updateSchedule(): void {
    let streams = this.getSteamsByCategory(this.categoryType)

    if (this.currStreamer) {
      streams = streams.filter(i => i.streamer === this.currStreamer)
    }

    this._updateScheduleByTZ(streams, this.timezone)
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
          link: viewItem.link
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
