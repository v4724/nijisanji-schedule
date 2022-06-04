import { Injectable } from '@angular/core';
import * as moment from 'moment-timezone'
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs'
import { TimezoneService } from '@app/feature/schedule/toolbar/timezone/timezone.service'
import { Moment } from 'moment-timezone'
import { setMidnightEndMoment, setMidnightStartMoment } from '@app/feature/schedule/utils'
import { Stream, setDisplayValue } from '@app/feature/schedule/data/firebase-stream/Stream'
import { FirebaseService } from '@app/service/firebase.service'
import { StreamGroupService } from '@app/feature/schedule/toolbar/stream-group/stream-group.service'
import { findStreamerInfo } from '@app/feature/schedule/data/StreamerInfo'
import { StreamerGroup } from '@app/feature/schedule/data/StreamerGroups'
import { FirebaseStreamViewItem } from '@app/feature/schedule/data/firebase-stream/Stream'
import { RainbowLoaderService } from '@app/common-component/rainbow-loader/rainbow-loader.service'

@Injectable({
  providedIn: 'root'
})
export class DateService {
  allStreams: Array<Stream> = []
  filterStreams$: BehaviorSubject<Array<FirebaseStreamViewItem>> = new BehaviorSubject<Array<FirebaseStreamViewItem>>([])

  date$: BehaviorSubject<Moment> = new BehaviorSubject(moment())
  startTimestamp: number = moment().valueOf()
  endTimestamp: number = moment().valueOf()

  groups: Array<StreamerGroup> = []
  timezone = ''

  subscription: Subscription | undefined

  constructor(private tzService: TimezoneService,
              private firebaseService: FirebaseService,
              private streamGroupService: StreamGroupService,
              private rainbowLoaderService: RainbowLoaderService) {

    combineLatest([
      this.tzService.timezone$,
      this.streamGroupService.group$
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
    this.startTimestamp = setMidnightStartMoment(date.clone()).valueOf()
    this.endTimestamp = setMidnightEndMoment(date.clone()).valueOf()

    this.rainbowLoaderService.set(true)

    if (this.subscription) {
      this.subscription.unsubscribe()
    }

    this.subscription = this.firebaseService.where(this.startTimestamp, this.endTimestamp)
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

      const streamer = findStreamerInfo(s.streamer)
      if (streamer) {
        if (this.groups.indexOf(streamer.group) > -1) {
          return true
        }
      }
      return false
    })

    filterStreams.map((stream) => {
      const viewItem = stream as FirebaseStreamViewItem
      setDisplayValue(viewItem, this.timezone)
      return viewItem
    })

    this.filterStreams$.next(filterStreams as Array<FirebaseStreamViewItem>)
  }
}
