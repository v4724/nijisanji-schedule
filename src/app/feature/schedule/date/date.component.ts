import { Component, OnInit } from '@angular/core';
import { TimezoneService } from '@app/feature/schedule/toolbar/timezone/timezone.service'
import * as moment from 'moment-timezone'
import { Stream, StreamViewItem } from '@app/feature/schedule/type'
import { ScheduleService } from '@app/feature/schedule/schedule.service'
import { combineLatest } from 'rxjs'
import * as lodash from 'lodash'
import { setDisplayValue } from '@app/feature/schedule/data'
import { openUrl } from '@app/feature/schedule/utils'
import { Moment } from 'moment-timezone'

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnInit {

  timezone: string = ''
  streams: Array<Stream> = []

  displayDateText: string = ''
  date: Moment = moment()

  hours: Map<string, Array<StreamViewItem>> = new Map()
  data: Array<{ hour: string, streams: Array<StreamViewItem>}> = []

  openUrl = openUrl
  constructor(private tzService: TimezoneService,
              private scheduleService: ScheduleService) {

  }

  ngOnInit(): void {

    combineLatest([this.tzService.timezone$, this.scheduleService.streams$])
    .subscribe((results) => {
      const tz = results[0]
      const streams = results[1]
      this.timezone = tz
      this.streams = lodash.cloneDeep(streams)

      this.updateData(tz, this.streams)
    })
  }

  resetDate(): void {
    this.date = moment().tz(this.timezone)
    this.displayDateText = this.date.format('YYYY-MM-DD')
    this.updateData(this.timezone, this.streams)
  }

  changeDate(date: number): void {
    this.date = moment(this.date).tz(this.timezone)
                                 .add(date, 'd')
    this.displayDateText = this.date.format('YYYY-MM-DD')
    this.updateData(this.timezone, this.streams)
  }

  resetData(): void {
    this.data = []
    this.hours = new Map<string, Array<StreamViewItem>>()
    for (let hour = 0; hour < 24; hour++) {
      const tmpHour = hour.toString().padStart(2, '0')
      this.hours.set(`${tmpHour}`,[])
    }
  }

  updateData(tz: string, streams: Array<Stream>): void {
    this.resetData()

    const currDate = moment(this.date).tz(tz)
    this.displayDateText = currDate.format("YYYY-MM-DD")

    streams.forEach((stream) => {
      const viewItem = stream as StreamViewItem
      setDisplayValue(viewItem, tz)

      const dateText = viewItem.displayDate
      if (dateText !== this.displayDateText) {
        return
      }

      const timeKey = viewItem.displayTime.split(':')[0].padStart(2, '0')
      const streamsValue = this.hours.get(timeKey)
      if (streamsValue) {
        streamsValue.push(viewItem)
      }
    })

    const newMap = new Map([...this.hours.entries()].sort())
    newMap.forEach((value, key) => {
      this.data.push({ hour: key, streams: value })
    })
  }
}
