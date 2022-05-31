import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '@app/service/firebase.service'
import { Stream } from '@app/feature/schedule/data/Stream'
import { Observable } from 'rxjs'
import * as moment from 'moment-timezone'
import { Moment } from 'moment-timezone'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  item: Stream = {
    guestId: null,
    id: 0,
    isCanceled: false,
    isCollab: false,
    isModified: false,
    isNew: false,
    isUncertain: false,
    link: '',
    mainStreamer: null,
    onSchedule: false,
    streamer: '',
    timestamp: null,
    title: ''
  }
  date: string = moment().format('YYYY-MM-DD')
  time: string = '00:00'
  timezone: string = moment.tz.guess()

  submitLoading: boolean = false

  timezones = [
    'Australia/Sydney',
    'Asia/Tokyo',
    'Asia/Taipei',
    'Asia/Jakarta',
    'Europe/London',
    'GMT+0',
    'EST5EDT',
    'PST8PDT'
  ]

  items: Observable<[]> = new Observable<[]>()

  constructor(public firebaseService: FirebaseService) {


  }

  get timestampFromTz(): number {
    return moment.tz(`${this.date} ${this.time}`, this.timezone).valueOf();
  }

  get datetimeFromTz(): string {
    return moment(this.timestampFromTz).tz(this.timezone).format('YYYY/MM/DD HH:mm z')
  }

  get gmtMoment(): string {
    return moment(this.timestampFromTz).tz('GMT+0').format('YYYY/MM/DD HH:mm z')
  }

  ngOnInit(): void {
    this.initItem();
  }

  initItem(): void {
    this.item = {
      guestId: null,
      id: 0,
      isCanceled: false,
      isCollab: false,
      isModified: false,
      isNew: false,
      isUncertain: false,
      link: '',
      mainStreamer: null,
      onSchedule: false,
      streamer: '',
      timestamp: null,
      title: ''
    }
  }

  clear(): void {
    this.initItem()
  }

  submit(): void {
    this.submitLoading = true
    this.firebaseService.add(this.item)
      .then(() => {
        this.initItem()
      })
        .finally(() => {
      this.submitLoading = false
    })
  }
}
