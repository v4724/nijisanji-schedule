import { Component, OnInit } from '@angular/core'
import { openUrl } from '@app/feature/schedule/utils'
import { ScheduleCheckedListService } from '@app/feature/schedule/schedule-checked-list/schedule-checked-list.service'
import { AdminService } from '@app/service/admin.service'
import * as lodash from 'lodash'
import { StreamerInfoVo } from '@app/model/vo/StreamerInfoVo'
import { ScheduleCheckedStateValues } from '@app/model/dto/ScheduleCheckedItemDto'
import { ScheduleCheckedState } from '@app/model/enum/ScheduleCheckedState'
import { ScheduleCheckedItemVo } from '@app/model/vo/ScheduleCheckedItemVo'

@Component({
  selector: 'app-schedule-checked-list',
  templateUrl: './schedule-checked-list.component.html',
  styleUrls: ['./schedule-checked-list.component.scss']
})
export class ScheduleCheckedListComponent implements OnInit {
  streamers: Array<ScheduleCheckedItemVo> = []

  ScheduleCheckedState = ScheduleCheckedState
  ScheduleCheckedStateValues = ScheduleCheckedStateValues

  constructor(public service: ScheduleCheckedListService,
              public adminService: AdminService,
              ) {

  }

  ngOnInit(): void {

    this.service.filterData$.subscribe((streams) => {
      this.streamers = lodash.cloneDeep(streams)
    })

  }

  linkToTwitter(streamer: StreamerInfoVo | undefined): void {
    const editable = this.adminService.editable$.getValue()
    if (editable) {
      return
    }

    const ytLink = streamer?.twitterLink ?? ''
    openUrl(ytLink)
  }

  clear(): void {
    this.streamers.forEach((item) => {
      item.state = ScheduleCheckedState.none
    })
  }

  update(): void {
    this.service.update(this.streamers)
  }
}
