import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs'
import { Moment } from 'moment-timezone'
import * as moment from 'moment-timezone'
import { CollectionReference } from '@angular/fire/compat/firestore'
import { setMidnightEndMoment, setMidnightStartMoment } from '@app/feature/schedule/utils'
import { findStreamerInfo } from '@app/feature/schedule/data/StreamerInfo'
import { FirebaseService } from '@app/service/firebase.service'
import { TimezoneService } from '@app/feature/schedule/toolbar/timezone/timezone.service'
import { StreamGroupService } from '@app/feature/schedule/toolbar/stream-group/stream-group.service'
import { StreamerGroup } from '@app/feature/schedule/data/StreamerGroups'
import { Stream } from '@app/feature/schedule/data/firebase-stream/Stream'

export interface SysParam {
  id: string,
  value: string,
  description: string
}

enum SysParamKey {
  scheduleCount ='SHCEDULE_COUNT'
}

@Injectable({
  providedIn: 'root'
})
export class ScheduleCheckedListService {
  allStreams: Array<Stream> = []
  filterStreams$: BehaviorSubject<Array<Stream>> = new BehaviorSubject<Array<Stream>>([])

  date$: BehaviorSubject<Moment> = new BehaviorSubject(moment())
  startTimestamp: number = moment().valueOf()
  endTimestamp: number = moment().valueOf()

  groups: Array<StreamerGroup> = []
  timezone = ''

  subscription: Subscription | undefined

  count$: BehaviorSubject<number> = new BehaviorSubject<number>(3)

  constructor(
    private tzService: TimezoneService,
    private streamGroupService: StreamGroupService,
    private firebaseService: FirebaseService,
  ) {

    this.firebaseService.getSysParam(SysParamKey.scheduleCount).subscribe((sysParam) => {
      if (sysParam) {
        this.count$.next(Number.parseInt(sysParam.value, 10))
      }
    })

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

  private changeTimezone(): void {
    const date = this.date$.getValue().tz(this.timezone)
    this.date$.next(date)
    this.updateStreams()
  }

  private updateStreams(): void {
    const date = this.date$.getValue()
    const currentDay = date.day()
    this.startTimestamp = setMidnightStartMoment(date.clone().add(-currentDay, 'day')).valueOf()
    this.endTimestamp = setMidnightEndMoment(date.clone().add(6-currentDay, 'day')).valueOf()

    if (this.subscription) {
      this.subscription.unsubscribe()
    }

    this.subscription = this.firebaseService.where(
      this.startTimestamp,
      this.endTimestamp
      // ,
      // (ref: CollectionReference) =>
      //   ref.where('onSchedule', '==', 'true')
      )
                            .pipe()
                            .subscribe((result) => {
                              this.allStreams = result
                              this.updateFilterStreams()

                              this.subscription?.unsubscribe()
                            })
  }

  updateFilterStreams(): void {
    const filterStreams = this.allStreams.filter((s) => {

      const streamer = findStreamerInfo(s.streamer)
      if (streamer) {
        if (this.groups.indexOf(streamer.group) > -1) {
          return true && s.onSchedule
        }
      }
      return false
    })

    this.filterStreams$.next(filterStreams as Array<Stream>)
  }
}
