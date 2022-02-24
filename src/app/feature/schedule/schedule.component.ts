import { Component, OnInit } from '@angular/core';
import { Stream, StreamViewItem } from './type'
import { streams } from './data'
import * as moment from 'moment-timezone'
import * as lodash from 'lodash'


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  headers: Array<any> = []
  origData: Array<Stream> = streams
  data: Array<any> = []

  timezone: string = '';
  constructor() {
    this.timezone = moment.tz.guess()
    this.updateScheduleByTZ(this.timezone)
  }

  ngOnInit(): void {
  }

  updateScheduleByTZ(tz: string): void {

    const headerMap = new Map<number, { key: string, value: string }>()
    const streamerMap = new Map<string, any>()

    headerMap.set(0, { key: 'streamer', value: 'streamer' })
    const clone = lodash.cloneDeep(this.origData) as Array<StreamViewItem>
    clone.forEach((item) => {
      if (item.timestamp) {
        item.displayDate = moment(item.timestamp).tz(tz).format('yyyy-MM-DD')
        item.displayTime = moment(item.timestamp).tz(tz).format('HH:mm')
      }

      const streamer = item.streamer
      if (!streamerMap.has(streamer)) {
        streamerMap.set(streamer, {
          streamer: streamer,
        })
      }

      const date00 = moment(item.timestamp).tz(tz)
                             .set('h', 0)
                             .set('m', 0)
                             .set('s', 0)
      const date00Timestamp = date00.valueOf()
      const date = item.displayDate
      const day = moment(item.timestamp).tz(tz).format('ddd')
      if (item.timestamp && !headerMap.has(date00Timestamp)) {
        headerMap.set(date00Timestamp, { key: date, value: day })
      }

      const week = streamerMap.get(streamer)
      if (week) {
        const stream = {
          text: `${item.title} ${item.displayTime}`,
          link: item.link
        }
        if (week[date]) {
          week[date].push(stream)
        } else {
          week[date] = [stream]
        }
      }

    })
    const newMap = new Map([...headerMap.entries()].sort())
    this.headers = Array.from(newMap.values())
    this.data = Array.from(streamerMap.values())
  }
}
