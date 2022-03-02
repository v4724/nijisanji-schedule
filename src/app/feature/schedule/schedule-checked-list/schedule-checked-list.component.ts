import { Component, OnInit } from '@angular/core';
import { StreamerInfo, streamers } from '@app/feature/schedule/data/StreamerInfo'
import { StreamGroupService } from '@app/feature/schedule/toolbar/stream-group/stream-group.service'
import * as moment from 'moment-timezone'
import * as lodash from 'lodash'
import { nextScheduleUpdatedMap, scheduleUpdatedMap } from '@app/feature/schedule/data/ScheduleUpdated'
import { Streamer } from '@app/feature/schedule/data/Streamer'
import { Moment } from 'moment-timezone'
import { StreamerGroup } from '@app/feature/schedule/data/StreamerGroups'

interface ScheduleUpdatedInfo extends StreamerInfo {
  scheduleUpdated: boolean
}

@Component({
  selector: 'app-schedule-checked-list',
  templateUrl: './schedule-checked-list.component.html',
  styleUrls: ['./schedule-checked-list.component.scss']
})
export class ScheduleCheckedListComponent implements OnInit {
  selectedGroups: Array<StreamerGroup> = []
  streamers: Array<ScheduleUpdatedInfo> = []
  date: Moment = moment()
  displayWeekText: string = ''

  currWeek: boolean = true

  updateInfo: Map<Streamer, boolean> = scheduleUpdatedMap

  constructor(private groupService: StreamGroupService) {
    this.updateWeekText(this.date)
  }

  ngOnInit(): void {
    this.groupService.group$.subscribe((groups) => {
      this.selectedGroups = groups
      this.updateSchedule(groups)
    })
  }

  changeWeek(number: number): void {
    if (number > 0) {
      this.currWeek = false
      this.updateInfo = nextScheduleUpdatedMap
    } else {
      this.currWeek = true
      this.updateInfo = scheduleUpdatedMap
    }
    this.updateSchedule(this.selectedGroups)

    this.date = moment(this.date).add(number, 'd')
    this.updateWeekText(this.date)
  }

  updateSchedule(groups: Array<StreamerGroup>): void {
    const clone = lodash.cloneDeep(streamers) as Array<ScheduleUpdatedInfo>
    this.streamers = clone.filter((info) => {
      info.scheduleUpdated = this.updateInfo.get(info.name) ?? false
      return groups.find((group) => group === info.group)
    })
  }

  updateWeekText(date: Moment): void {
    const day = date.day()
    const startMoment = moment(date).add(0 - day, 'd')
    const weekendMoment = moment(date).add(6 - day, 'd')
    this.displayWeekText = `${startMoment.format('YYYY-MM-DD')}~${weekendMoment.format('YYYY-MM-DD')}`
  }

}
