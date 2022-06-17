import { Injectable } from '@angular/core';
import { setDisplayValue, Stream } from '@app/feature/schedule/data/firebase-stream/Stream'
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs'
import { FirebaseStreamViewItem } from '@app/feature/schedule/data/firebase-stream/Stream'
import { Moment } from 'moment-timezone'
import * as moment from 'moment-timezone'
import { TimezoneService } from '@app/feature/schedule/toolbar/timezone/timezone.service'
import { FirebaseService } from '@app/service/firebase.service'
import { StreamGroupService } from '@app/service/stream-group.service'
import { RainbowLoaderService } from '@app/common-component/rainbow-loader/rainbow-loader.service'
import { setMidnightEndMoment, setMidnightStartMoment } from '@app/feature/schedule/utils'
import { StreamerInfoService } from '@app/service/streamer-info.service'

@Injectable({
  providedIn: 'root'
})
export class WeekService {
  allStreams: Array<Stream> = []
  filterStreams$: BehaviorSubject<Array<FirebaseStreamViewItem>> = new BehaviorSubject<Array<FirebaseStreamViewItem>>([])

  date$: BehaviorSubject<Moment> = new BehaviorSubject(moment())
  startTimestamp: number = moment().valueOf()
  endTimestamp: number = moment().valueOf()

  groups: Array<string> = []
  timezone = ''

  subscription: Subscription | undefined

  constructor(private tzService: TimezoneService,
              private firebaseService: FirebaseService,
              private streamGroupService: StreamGroupService,
              private rainbowLoaderService: RainbowLoaderService,
              private streamerInfoService: StreamerInfoService) {

    combineLatest([
      this.tzService.timezone$,
      this.streamGroupService.selectedGroup$
    ])
      .subscribe((result) => {
        const timezone = result[0]
        this.groups = result[1]

        if (timezone !== this.timezone) {
          this.timezone = timezone
          this.changeTimezone()
        } else {
          this.updateFilterStreams()
        }
      })

  }

  updateDate(date: Moment): void {
    date.tz(this.timezone)
    this.date$.next(date)
    this.updateStreams()
  }

  private changeTimezone(): void {
    const date = this.date$.getValue().tz(this.timezone)
    this.date$.next(date)
    this.updateStreams()
  }

  public updateStreams(): void {
    const date = this.date$.getValue()
    const currentDay = date.day()
    this.startTimestamp = setMidnightStartMoment(date.clone().add(-currentDay, 'day')).valueOf()
    this.endTimestamp = setMidnightEndMoment(date.clone().add(6-currentDay, 'day')).valueOf()

    this.rainbowLoaderService.set(true)

    if (this.subscription) {
      this.subscription.unsubscribe()
    }

    this.subscription = this.firebaseService.where(
      this.startTimestamp,
      this.endTimestamp)
                            .pipe()
                            .subscribe((result) => {
                              this.allStreams = result
                              this.updateFilterStreams()

                              this.subscription?.unsubscribe()
                              this.rainbowLoaderService.set(false)
                            })
  }

  updateFilterStreams(): void {
    const filterStreams = this.allStreams.filter((s) => {

      const streamer = this.streamerInfoService.findStreamerInfo(s.streamer)
      if (streamer && streamer.group) {
        if (this.groups.indexOf(streamer.group) > -1) {
          return true
        }
      }
      return false
    })

    filterStreams.map((stream) => {
      const viewItem = stream as FirebaseStreamViewItem
      viewItem.displayMoment = moment()
      setDisplayValue(viewItem, this.timezone, this.streamerInfoService)
      return viewItem
    })

    this.filterStreams$.next(filterStreams as Array<FirebaseStreamViewItem>)
  }
}
