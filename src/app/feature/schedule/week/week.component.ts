import { Component, OnInit } from '@angular/core';
import { StreamViewItem } from '@app/model/vo/StreamVo'
import { WeekHeader } from './types'
import { Subscription } from 'rxjs'
import { openUrl } from '@app/feature/schedule/utils'
import { TBDStream } from '@app/model/dto/ExcelStream'
import { DisplayText } from '@app/feature/schedule/common/display-text/DisplayText'
import * as lodash from 'lodash'
import { WeekService } from '@app/feature/schedule/week/week.service'
import { TimezoneService } from '@app/layout/timezone/timezone.service'
import { StreamerInfoService } from '@app/service/streamer-info.service'
import { StreamerInfoVo } from '@app/model/vo/StreamerInfoVo'
import { StreamGroupService } from '@app/service/stream-group.service'
import * as moment from 'moment-timezone'

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss']
})
export class WeekComponent implements OnInit {
  title: string = ''

  streams: Array<StreamViewItem> = []
  TBDStreams: Array<TBDStream> = []

  headers: Array<WeekHeader> = []
  data: Array<any> = []

  openUrl = openUrl

  subscription: Subscription | undefined

  constructor(public weekService: WeekService,
              private tzService: TimezoneService,
              public streamerInfoService: StreamerInfoService,
              private streamerGroupService: StreamGroupService){
  }

  ngOnInit(): void {

    this.weekService.filterStreams$.subscribe((streams) => {
      this.streams = streams
      this.update()

      const groupList = this.streamerGroupService.groupOrderChanged$.getValue()
      this.data = this.sortByGroupOrder(this.data, groupList)
    })

    this.streamerGroupService.groupOrderChanged$.subscribe((groupList) => {
      this.data = this.sortByGroupOrder(this.data, groupList)
    })

  }

  linkToYoutube (streamer: string): void {
    const info = this.streamerInfoService.findStreamerInfo(streamer)
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
    const tz = this.tzService.timezone$.getValue()
    const currDate = moment().tz(tz)
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
        const isToday = tmpDate.format('YYYY/MM/DD') === currDate.format('YYYY/MM/DD')

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
          group: item.streamerInfo.group
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

    this.data = []
    const streamerInfo = this.streamerInfoService.streamerInfos$.getValue()
    const selectedGroups = this.streamerGroupService.selectedGroup$.getValue()
    streamerInfo.forEach((streamer: StreamerInfoVo) => {
      if (streamerMap.has(streamer.name)) {
        const o = streamerMap.get(streamer.name)
        this.data.push(o)
        return
      }

      if (selectedGroups.indexOf(streamer.group) > -1) {
        this.data.push({
          streamer: streamer.name,
          group: streamer.group,
        })
        return
      }
    })
  }

  sortByGroupOrder(data: Array<any>, groupList: string[]): Array<any> {
    return data.sort((a: any, b: any) => {
      const groupOrder1 = groupList.indexOf(a.group)
      const groupOrder2 = groupList.indexOf(b.group)

      if (groupOrder1 > -1 && groupOrder2 > -1) {
        return groupOrder1 - groupOrder2
      }

      return 0
    })

  }
}
