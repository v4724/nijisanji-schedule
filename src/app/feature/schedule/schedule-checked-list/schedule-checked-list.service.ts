import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs'
import { findStreamerInfo } from '@app/feature/schedule/data/StreamerInfo'
import { FirebaseService } from '@app/service/firebase.service'
import { TimezoneService } from '@app/feature/schedule/toolbar/timezone/timezone.service'
import { StreamGroupService } from '@app/feature/schedule/toolbar/stream-group/stream-group.service'
import { StreamerGroup } from '@app/feature/schedule/data/StreamerGroups'
import { ScheduleCheckedItem, toDto } from '@app/feature/schedule/data/firebase-stream/ScheduleCheckedItem'
import { orders } from '@app/feature/schedule/data/Streamer'

export interface SysParam {
  id: string,
  value: string,
  description: string
}

@Injectable({
  providedIn: 'root'
})
export class ScheduleCheckedListService {
  allData: Array<ScheduleCheckedItem> = []
  filterData$: BehaviorSubject<Array<ScheduleCheckedItem>> = new BehaviorSubject<Array<ScheduleCheckedItem>>([])

  groups: Array<StreamerGroup> = []

  subscription: Subscription | undefined

  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor(
    private tzService: TimezoneService,
    private streamGroupService: StreamGroupService,
    private firebaseService: FirebaseService,
  ) {

    this.load()

    combineLatest([
      this.streamGroupService.group$
    ])
      .subscribe((result) => {
        this.groups = result[0]

        this.updateFilterData()
      })
  }

  public load (): void {
    this.loading$.next(true)
    const subscription = this.firebaseService.getScheduleCheckedList()
        .subscribe((data) => {
          this.loading$.next(false)
          subscription.unsubscribe()
          this.loading$.next(false)

          const allData: Array<ScheduleCheckedItem> = []
          orders.forEach((streamer) => {
            const item = data.find((item) => item.streamer === streamer)
            if (item) {
              allData.push(item)
            }
          })
          this.allData = allData

          this.updateFilterData()
        })
  }

  public update (list: Array<ScheduleCheckedItem>): void {
    this.loading$.next(true)
    let count = 0
    list.forEach((item) => {
      const dto = toDto(item)
      this.firebaseService.updateScheduleChecked(item.id, dto)
          .finally(() => {
            count += 1
            if (count === list.length) {
              this.loading$.next(false)
            }
          })
    })
  }

  private updateFilterData(): void {
    const filterData = this.allData.filter((s) => {

      const streamer = findStreamerInfo(s.streamer)
      if (streamer) {
        return this.groups.indexOf(streamer.group) > -1
      }
      return false
    })

    this.filterData$.next(filterData as Array<ScheduleCheckedItem>)
  }

}
