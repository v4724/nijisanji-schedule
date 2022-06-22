import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs'
import { StreamService } from '@app/service/stream.service'
import { TimezoneService } from '@app/layout/timezone/timezone.service'
import { StreamGroupService } from '@app/service/stream-group.service'
import { StreamerInfoService } from '@app/service/streamer-info.service'
import { ScheduleCheckedService } from '@app/service/schedule-checked.service'
import { ScheduleCheckedItemVo } from '@app/model/vo/ScheduleCheckedItemVo'
import { toDto } from '@app/model/dto/ScheduleCheckedItemDto'

export interface SysParam {
  id: string,
  value: string,
  description: string
}

@Injectable({
  providedIn: 'root'
})
export class ScheduleCheckedListService {
  allData: Array<ScheduleCheckedItemVo> = []
  filterData$: BehaviorSubject<Array<ScheduleCheckedItemVo>> = new BehaviorSubject<Array<ScheduleCheckedItemVo>>([])

  groups: Array<string> = []

  subscription: Subscription | undefined

  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor(
    private tzService: TimezoneService,
    private streamGroupService: StreamGroupService,
    private firebaseService: StreamService,
    private streamerInfoService: StreamerInfoService,
    private service: ScheduleCheckedService
  ) {

    combineLatest([
      this.streamGroupService.selectedGroup$
    ])
      .subscribe((result) => {
        this.groups = result[0]

        this.updateFilterData()
      })

    this.loading$.next(true)
    this.service.scheduleCheckedList$
        .subscribe((data) => {
          this.loading$.next(false)
          this.allData = data

          this.updateFilterData()
        })
  }

  public update (list: Array<ScheduleCheckedItemVo>): void {
    this.loading$.next(true)
    let count = 0
    const partialUpdate = list.filter((item) => {
      const find = this.allData.find((orig) => {
        return orig.id === item.id
      })
      return item.state !== find?.state
    })

    partialUpdate.forEach((item) => {
      const dto = toDto(item)
      this.service.updateScheduleChecked(item.id, dto)
          .finally(() => {
            count += 1
            if (count === partialUpdate.length) {
              this.loading$.next(false)
            }
          })
    })
  }

  private updateFilterData(): void {
    const filterData = this.allData.filter((s) => {

      const streamer = this.streamerInfoService.findStreamerInfo(s.streamer)
      if (streamer && streamer.group) {
        return this.groups.indexOf(streamer.group) > -1
      }
      return false
    })

    this.filterData$.next(filterData as Array<ScheduleCheckedItemVo>)
  }

}
