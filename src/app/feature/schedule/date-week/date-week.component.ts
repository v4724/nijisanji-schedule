import { Component, OnInit } from '@angular/core';
import { Moment } from 'moment'
import * as moment from 'moment-timezone'
import { Stream } from '@app/feature/schedule/data/Stream'
import { WeekHeader } from '@app/feature/schedule/week/types'
import { streamerList } from '@app/feature/schedule/data/Streamer'
import { ScheduleService } from '@app/feature/schedule/schedule.service'
import { TimezoneService } from '@app/feature/schedule/toolbar/timezone/timezone.service'
import { combineLatest } from 'rxjs'
import { StreamViewItem } from '@app/feature/schedule/type'
import { setDisplayValue } from '@app/feature/schedule/data'

interface RowItem {
  timeKey: string,
  sun: Array<StreamViewItem>,
  mon: Array<StreamViewItem>,
  tue: Array<StreamViewItem>,
  wed: Array<StreamViewItem>,
  thu: Array<StreamViewItem>,
  fri: Array<StreamViewItem>,
  sat: Array<StreamViewItem>
}

@Component({
  selector: 'app-date-week',
  templateUrl: './date-week.component.html',
  styleUrls: ['./date-week.component.scss']
})
export class DateWeekComponent implements OnInit {
  // displayDateWeekText: string = ''
  // date: Moment = moment()
  //
  // streams: Array<CreatedStream> = []
  // timezone = ''
  //
  // headers: Array<WeekHeader> = []
  // data: Array<RowItem> = []
  //
  // hours = new Map<string, Array<StreamViewItem>>()
  //
  // StreamType = StreamType
  // categoryType: StreamType = StreamType.Streamer
  //
  // currStreamer: string = ''
  // streamers = streamerList()
  //
  // findStreamerInfo = findStreamerInfo

  constructor(private scheduleService: ScheduleService,
              private tzService: TimezoneService) {
  }

  ngOnInit(): void {
    // combineLatest([this.scheduleService.streams$, this.tzService.timezone$])
    //   .subscribe((result) => {
    //     this.streams = result[0]
    //     const timezone = result[1]
    //
    //     if (timezone !== this.timezone) {
    //       this.timezone = timezone
    //       this.changeTimezone()
    //     } else {
    //       this.updateSchedule()
    //     }
    //   })

  }

  // changeTimezone(): void {
  //   this.date = moment(this.date).tz(this.timezone)
  //
  //   this.updateWeek(this.date)
  //   this.updateSchedule()
  // }
  //
  // changeWeek(dateNumber: number): void {
  //   this.date.add(dateNumber, 'd')
  //
  //   this.updateWeek(this.date)
  //   this.updateSchedule()
  // }
  //
  // changeStreamer(): void {
  //   this.updateSchedule()
  // }
  //
  // changeCategory(type: StreamType): void {
  //   this.categoryType = type
  //   this.updateSchedule()
  // }
  //
  // resetWeek(): void {
  //   this.date = moment().tz(this.timezone)
  //   this.updateWeek(this.date)
  //   this.updateSchedule()
  // }
  //
  // updateWeek(nowDate: Moment): void {
  //   const nowDay = nowDate.day()
  //
  //   const headerMap = new Map<number, WeekHeader>()
  //   headerMap.set(0, { key: 'streamer', value: 'streamer', isToday: false })
  //
  //   const setHeaders = (fromDay: number, toDay: number): void => {
  //     for (let day = fromDay; day < toDay; day++) {
  //       const gap = nowDay - day
  //       const tmpDate = moment(nowDate).subtract(gap, 'day')
  //       const timestamp = tmpDate.valueOf()
  //       const dateText = tmpDate.format('YYYY-MM-DD')
  //       const dayText = tmpDate.format('ddd')
  //       const isToday = tmpDate.date() === moment().date()
  //
  //       headerMap.set(timestamp, { key: dateText, value: dayText, isToday: isToday })
  //     }
  //   }
  //   setHeaders(0, nowDay)
  //   setHeaders(nowDay, 7)
  //
  //   const newMap = new Map([...headerMap.entries()].sort())
  //   this.headers = Array.from(newMap.values())
  //   this.displayWeekText = `${this.headers[1].key} ~ ${this.headers[this.headers.length - 1].key}`
  // }
  //
  // updateSchedule(): void {
  //   if (this.currStreamer) {
  //     this.streams = this.streams.filter(i => i.streamer === this.currStreamer)
  //   }
  //
  //   this._updateScheduleByTZ(this.streams, this.timezone)
  // }
  //
  // resetData(): void {
  //   this.data = []
  //   this.hours = new Map<string, Array<StreamViewItem>>()
  //   for (let hour = 0; hour < 24; hour++) {
  //     const tmpHour = hour.toString().padStart(2, '0')
  //     this.hours.set(`${tmpHour}`,[])
  //   }
  // }
  //
  // updateDate(tz: string, streams: Array<CreatedStream>): void {
  //   this.resetData()
  //
  //   const currDate = moment(this.date).tz(tz)
  //   this.displayDateWeekText = currDate.format("YYYY-MM-DD")
  //
  //   streams.forEach((stream) => {
  //     const viewItem = stream as StreamViewItem
  //     setDisplayValue(viewItem, tz)
  //
  //     const dateText = viewItem.displayDate
  //     if (dateText !== this.displayDateText) {
  //       return
  //     }
  //
  //     const timeKey = viewItem.displayTime.split(':')[0].padStart(2, '0')
  //     const streamsValue = this.hours.get(timeKey)
  //     if (streamsValue) {
  //       streamsValue.push(viewItem)
  //     }
  //   })
  //
  //   const newMap = new Map([...this.hours.entries()].sort())
  //   newMap.forEach((value, key) => {
  //     this.data.push({ hour: key, streams: value })
  //   })
  // }
  // _updateScheduleByTZ(streams: Array<CreatedStream>, tz: string): void {
  //
  //   const timeKeyMap = new Map<string, any>()
  //
  //   streams.forEach((item) => {
  //     const viewItem = item as StreamViewItem
  //
  //     if (viewItem.timestamp) {
  //       setDisplayValue(viewItem, tz)
  //     }
  //
  //     const streamer = viewItem.streamer
  //     if (!streamerMap.has(streamer)) {
  //       streamerMap.set(streamer, {
  //         streamer: streamer,
  //       })
  //     }
  //
  //     const dateText = moment(viewItem.timestamp)
  //       .tz(tz)
  //       .format('YYYY-MM-DD')
  //
  //     const findDate = this.headers.find((h) => {
  //       return h.key === dateText
  //     })
  //     if (!findDate) {
  //       return
  //     }
  //
  //     const date = viewItem.displayDate
  //     const week = streamerMap.get(streamer)
  //     if (week) {
  //       const stream = {
  //         text: `${viewItem.title} ${viewItem.displayTime}`,
  //         link: viewItem.link,
  //         onSchedule: viewItem.onSchedule,
  //         streamerInfo: viewItem.streamerInfo,
  //         isCanceled: viewItem.isCanceled,
  //         isModified: viewItem.isModified,
  //         isNew: viewItem.isNew,
  //         isUncertain: viewItem.isUncertain,
  //       }
  //       if (week[date]) {
  //         week[date].push(stream)
  //       } else {
  //         week[date] = [stream]
  //       }
  //     }
  //
  //   })
  //   this.data = Array.from(streamerMap.values())
  // }
}
