import { Injectable } from '@angular/core';
import { setDisplayValue, StreamVo } from '@app/model/vo/StreamVo'
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs'
import { StreamViewItem } from '@app/model/vo/StreamVo'
import { Moment } from 'moment-timezone'
import * as moment from 'moment-timezone'
import { TimezoneService } from '@app/layout/timezone/timezone.service'
import { StreamService } from '@app/service/stream.service'
import { StreamGroupService } from '@app/service/stream-group.service'
import { setMidnightEndMoment, setMidnightStartMoment } from '@app/feature/schedule/utils'
import { RainbowLoaderService } from '@app/common-component/rainbow-loader/rainbow-loader.service'
import { StreamerInfoService } from '@app/service/streamer-info.service'

@Injectable({
  providedIn: 'root'
})
export class MonthService {
  allStreams: Array<StreamVo> = []
  filterStreams$: BehaviorSubject<Array<StreamViewItem>> = new BehaviorSubject<Array<StreamViewItem>>([])

  date$: BehaviorSubject<Moment> = new BehaviorSubject(moment())
  startTimestamp: number = moment().valueOf()
  endTimestamp: number = moment().valueOf()

  groups: Array<string> = []
  timezone = ''

  subscription: Subscription | undefined

  constructor(private tzService: TimezoneService,
              private firebaseService: StreamService,
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
    this.startTimestamp = setMidnightStartMoment(date.clone().startOf('month')).valueOf()
    this.endTimestamp = setMidnightEndMoment(date.clone().endOf('month')).valueOf()

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

    let filterStreams = this.allStreams.filter((s) => {
      const streamer = this.streamerInfoService.findStreamerInfo(s.streamer)
      if (streamer && streamer.group) {
        if (this.groups.indexOf(streamer.group) > -1) {
          return true
        }
      }
      return false
    })

    filterStreams = filterStreams.map((stream) => {
      const viewItem: StreamViewItem = stream as StreamViewItem
      viewItem.displayMoment = moment()
      setDisplayValue(viewItem, this.timezone, this.streamerInfoService)
      return viewItem
    })

    this.filterStreams$.next(filterStreams as Array<StreamViewItem>)
  }
}
