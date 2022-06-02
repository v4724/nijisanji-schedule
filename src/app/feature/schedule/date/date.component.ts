import { Component, OnInit } from '@angular/core';
import * as moment from 'moment-timezone'
import { FirebaseStreamViewItem } from '@app/feature/schedule/type'
import { openUrl } from '@app/feature/schedule/utils'
import { DateService } from '@app/feature/schedule/date/date.service'

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnInit {

  streams: Array<FirebaseStreamViewItem> = []

  displayDateText: string = ''

  hours: Map<string, Array<FirebaseStreamViewItem>> = new Map()
  data: Array<{ hour: string, streams: Array<FirebaseStreamViewItem>}> = []

  openUrl = openUrl
  constructor(public dateService: DateService) {

  }

  ngOnInit(): void {
    this.dateService.filterStreams$.subscribe((streams) => {
      this.streams = streams

      this.updateData()
    })

    this.dateService.date$.subscribe((currDate) => {
      this.displayDateText = currDate.format("YYYY-MM-DD")
    })
  }

  resetDate(): void {
    this.dateService.updateDate(moment())
  }

  changeDate(date: number): void {
    const dateMoment = this.dateService.date$.getValue()
                           .clone()
                           .add(date, 'd')
    this.dateService.updateDate(dateMoment)
  }

  resetData(): void {
    this.data = []
    this.hours = new Map<string, Array<FirebaseStreamViewItem>>()
    for (let hour = 0; hour < 24; hour++) {
      const tmpHour = hour.toString().padStart(2, '0')
      this.hours.set(`${tmpHour}`,[])
    }
  }

  updateData(): void {
    this.resetData()

    this.streams.forEach((stream) => {
      const timeKey = stream.displayTime.split(':')[0].padStart(2, '0')
      const streamsValue = this.hours.get(timeKey)
      if (streamsValue) {
        streamsValue.push(stream)
      }
    })

    const newMap = new Map([...this.hours.entries()].sort())
    newMap.forEach((value, key) => {
      this.data.push({ hour: key, streams: value })
    })
  }
}
