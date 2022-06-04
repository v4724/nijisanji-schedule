import { Component, OnInit } from '@angular/core';
import { FirebaseStreamViewItem } from '../type'
import { Streamer, streamerList } from '../data/Streamer'
import * as moment from 'moment-timezone'
import { WeekHeader } from './types'
import { findStreamerInfo } from '@app/feature/schedule/data/StreamerInfo'
import { Subscription } from 'rxjs'
import { openUrl } from '@app/feature/schedule/utils'
import { TBDStream } from '@app/feature/schedule/data/Stream'
import { DisplayText } from '@app/feature/schedule/common/display-text/DisplayText'
import * as lodash from 'lodash'
import { WeekService } from '@app/feature/schedule/week/week.service'

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss']
})
export class WeekComponent implements OnInit {
  title: string = ''

  streams: Array<FirebaseStreamViewItem> = []
  TBDStreams: Array<TBDStream> = []

  headers: Array<WeekHeader> = []
  data: Array<any> = []

  streamers = streamerList()

  findStreamerInfo = findStreamerInfo
  openUrl = openUrl

  subscription: Subscription | undefined

  constructor(public weekService: WeekService){
  }

  ngOnInit(): void {

    this.weekService.filterStreams$.subscribe((streams) => {
      this.streams = streams
      this.update()
    })

  }

  linkToYoutube (streamer: string): void {
    const info = findStreamerInfo(streamer)
    if (info) {
      const ytLink = info.youtubeLink
      openUrl(ytLink)
    }
  }

  changeWeek(dateNumber: number): void {
    const date = this.weekService.date$.getValue().clone()
    date.add(dateNumber, 'd')
    this.weekService.updateDate(date)
  }

  resetWeek(): void {
    const date = moment()
    this.weekService.updateDate(date)
  }

  private updateWeek(): void {
    const date = this.weekService.date$.getValue()
    const nowDay = date.day()

    const headerMap = new Map<number, WeekHeader>()
    headerMap.set(0, { key: 'streamer', value: 'streamer', isToday: false })

    const setHeaders = (fromDay: number, toDay: number): void => {
      for (let day = fromDay; day < toDay; day++) {
        const gap = nowDay - day
        const tmpDate = date.clone().subtract(gap, 'day')
        const timestamp = tmpDate.valueOf()
        const dateText = tmpDate.format('YYYY-MM-DD')
        const dayText = tmpDate.format('ddd')
        const isToday = tmpDate.date() === date.date()

        headerMap.set(timestamp, { key: dateText, value: dayText, isToday: isToday })
      }
    }
    setHeaders(0, nowDay)
    setHeaders(nowDay, 7)

    const newMap = new Map([...headerMap.entries()].sort())
    this.headers = Array.from(newMap.values())
    this.title = `${this.headers[1].key} ~ ${this.headers[this.headers.length - 1].key}`
  }

  update(): void {
    this.updateWeek()

    const streamerMap = new Map<string, any>()

    this.streams.forEach((item) => {

      const streamer = item.streamer
      if (!streamerMap.has(streamer)) {
        streamerMap.set(streamer, {
          streamer: streamer,
        })
      }

      const dateText = item.displayMoment.format('YYYY-MM-DD')

      const findDate = this.headers.find((h) => {
        return h.key === dateText
      })
      if (!findDate) {
        return
      }

      const date = item.displayDate
      const week = streamerMap.get(streamer)
      if (week) {
        const stream: DisplayText = Object.assign(
          lodash.cloneDeep(item),
          {
            text: `${ item.title } ${ item.displayTime }`}
        )

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
