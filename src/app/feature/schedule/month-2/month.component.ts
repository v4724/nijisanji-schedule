import { Component, OnInit } from '@angular/core';
import { Day, HourStreams, MonthHeader, WeekItem } from './types'
import { headers } from './data'
import * as moment from 'moment-timezone'
import { StreamViewItem } from '@app/model/vo/StreamVo'
import { openUrl } from '@app/feature/schedule/utils'
import { MonthService } from '@app/feature/schedule/month-2/month.service'
import { Moment } from 'moment-timezone'


@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnInit {

  streams: Array<StreamViewItem> = []

  headers: Array<MonthHeader> = headers
  data: Array<WeekItem> = []

  dateMap: Map<number, Map<String, Array<StreamViewItem>>> = new Map<number, Map<String, Array<StreamViewItem>>>()

  today: Moment = moment()
  title: string = ''
  openUrl = openUrl

  constructor(public monthService: MonthService) {

  }

  ngOnInit(): void {
    this.monthService.filterStreams$.subscribe((streams) => {
      this.streams = streams
      this.updateSchedule()
    })

    this.monthService.date$.subscribe((date) => {
      this.today = date
      this.title = date.format('YYYY-MM')
    })
  }

  resetMonth(): void {
    this.monthService.updateDate(moment())
  }

  changeMonth(month: number): void {
    const date = this.monthService.date$.getValue().clone()
                     .add(month, 'month')
    this.monthService.updateDate(date)
  }

  updateSchedule(): void {

    this.dateMap = new Map<number, Map<String, Array<StreamViewItem>>>()
    this.streams.forEach((s) => {
      const days = s.displayMoment.date()
      if (!this.dateMap.has(days)) {
        this.dateMap.set(days, new Map<String, Array<StreamViewItem>>())
      }
      const dateStreams = this.dateMap.get(days)
      if (dateStreams) {
        const key = s.displayTime
        if (!dateStreams.has(key)) {
          dateStreams.set(key, [])
        }

        const streams = dateStreams.get(key)
        if (streams) {
          streams.push(s)
        }
      }
    })

    const data: Array<WeekItem>= []
    const date = this.monthService.date$.getValue().clone()
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
        const sortedMap = new Map([...streamersMap.entries()].sort());
        const tmp = Array.from(sortedMap)
        tmp.forEach((o) => {
          streams.push({
            hour: o[0],
            streamViewItems: o[1]
          })
        })
      }

      const cloneMoment = moment(tmpDate)
      const isToday = cloneMoment.year() === this.today.year() &&
        cloneMoment.month() === this.today.month() &&
        cloneMoment.date() === this.today.date()
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
