import { Component, OnInit } from '@angular/core';
import { StreamerInfo, streamers } from '@app/feature/schedule/data/StreamerInfo'
import { StreamGroupService } from '@app/feature/schedule/toolbar/stream-group/stream-group.service'
import * as moment from 'moment-timezone'
import * as lodash from 'lodash'
import { Streamer } from '@app/feature/schedule/data/Streamer'
import { Moment } from 'moment-timezone'
import { StreamerGroup } from '@app/feature/schedule/data/StreamerGroups'
import { ScheduleService } from '@app/feature/schedule/schedule.service'
import { combineLatest } from 'rxjs'
import { Stream } from '@app/feature/schedule/data/Stream'
import { TimezoneService } from '@app/feature/schedule/toolbar/timezone/timezone.service'
import { openUrl } from '@app/feature/schedule/utils'

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

  newScheduleId: number = 1012
  newScheduleDay: number = 17

  updateInfo: Map<Streamer, boolean> = new Map<Streamer, boolean>()

  constructor(private groupService: StreamGroupService,
              private scheduleService: ScheduleService,
              private tzService: TimezoneService ) {

    streamers.forEach((info) => {
      this.updateInfo.set(info.name, false)
    })

  }

  ngOnInit(): void {
    this.tzService.timezone$.subscribe((tz) => {
      const tzMoment = moment().tz(tz).set('D', this.newScheduleDay)
      this.updateWeekText(tzMoment)
    })

    combineLatest([this.scheduleService.streams$, this.groupService.group$])
      .subscribe((results) => {
        const streams = results[0]
        const groups = results[1]

        this.updateInfoScheduled(streams)

        this.selectedGroups = groups
        this.updateSchedule(groups)
      })
  }

  isNewSchedule(id: number | null): boolean {
    return !!id && id >= this.newScheduleId
  }

  updateInfoScheduled(streams: Array<Stream>): void {
    this.updateInfo.forEach((v, k) => {
      this.updateInfo.set(k, false)
    })

    streams.forEach((stream: Stream) => {
      const id = stream.id
      const guestId = stream.guestId
      const name = stream.streamer as Streamer
      const onSchedule = stream.onSchedule

      if ((this.isNewSchedule(id) || this.isNewSchedule(guestId) )
          && onSchedule
          && this.updateInfo.has(name)) {
        this.updateInfo.set(name, true)
      }

    })
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

  linkToTwitter(streamer: StreamerInfo): void {
    const ytLink = streamer.twitterLink
    openUrl(ytLink)
  }
}
