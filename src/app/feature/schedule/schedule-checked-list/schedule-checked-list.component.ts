import { Component, OnInit } from '@angular/core'
import { StreamerInfo } from '@app/feature/schedule/data/StreamerInfo'
import { openUrl } from '@app/feature/schedule/utils'
import { ScheduleCheckedListService } from '@app/feature/schedule/schedule-checked-list/schedule-checked-list.service'
import { AdminService } from '@app/service/admin.service'
import {
  ScheduleCheckedItem,
  ScheduleCheckedState,
  ScheduleCheckedStateValues
} from '@app/feature/schedule/data/firebase-stream/ScheduleCheckedItem'

@Component({
  selector: 'app-schedule-checked-list',
  templateUrl: './schedule-checked-list.component.html',
  styleUrls: ['./schedule-checked-list.component.scss']
})
export class ScheduleCheckedListComponent implements OnInit {
  streamers: Array<ScheduleCheckedItem> = []

  ScheduleCheckedState = ScheduleCheckedState
  ScheduleCheckedStateValues = ScheduleCheckedStateValues

  constructor(public service: ScheduleCheckedListService,
              public adminService: AdminService,
              ) {

  }

  ngOnInit(): void {

    this.service.filterData$.subscribe((streams) => {
      this.streamers = streams
    })

  }

  linkToTwitter(streamer: StreamerInfo | undefined): void {
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
