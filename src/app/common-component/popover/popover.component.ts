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
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {

  }

}
