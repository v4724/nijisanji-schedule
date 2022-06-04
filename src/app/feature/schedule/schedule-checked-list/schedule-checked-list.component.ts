import { Component, OnInit } from '@angular/core';
import { StreamerInfo, streamers } from '@app/feature/schedule/data/StreamerInfo'
import { StreamGroupService } from '@app/feature/schedule/toolbar/stream-group/stream-group.service'
import { Streamer } from '@app/feature/schedule/data/Streamer'
import { Moment } from 'moment-timezone'
import { TimezoneService } from '@app/feature/schedule/toolbar/timezone/timezone.service'
import { openUrl } from '@app/feature/schedule/utils'
import { FirebaseService } from '@app/service/firebase.service'
import { ScheduleCheckedListService } from '@app/feature/schedule/schedule-checked-list/schedule-checked-list.service'
import { Stream } from '@app/feature/schedule/data/firebase-stream/Stream'

interface ScheduleUpdatedInfo extends StreamerInfo {
  scheduleUpdated: boolean
}

@Component({
  selector: 'app-schedule-checked-list',
  templateUrl: './schedule-checked-list.component.html',
  styleUrls: ['./schedule-checked-list.component.scss']
})
export class ScheduleCheckedListComponent implements OnInit {
  streamers: Array<ScheduleUpdatedInfo> = []
  displayWeekText: string = ''

  updateInfo: Map<Streamer, boolean> = new Map<Streamer, boolean>()

  constructor(private groupService: StreamGroupService,
              private firebaseService: FirebaseService,
              private tzService: TimezoneService,
              private service: ScheduleCheckedListService
              ) {

    streamers.forEach((info) => {
      this.updateInfo.set(info.name, false)
    })

  }

  ngOnInit(): void {

    this.service.date$.subscribe((date) => {
      this.updateWeekText(date)
    })

    this.service.filterStreams$.subscribe((streams) => {
      this.updateInfoScheduled(streams)
    })

  }

  updateInfoScheduled(streams: Array<Stream>): void {
    this.updateInfo.forEach((v, k) => {
      this.updateInfo.set(k, false)
    })

    const countLimitation = this.service.count$.getValue()
    const streamsCounter = new Map<Streamer, number>()
    streams.forEach((stream: Stream) => {
      const name = stream.streamer as Streamer

      let count = streamsCounter.get(name) ?? 0
      count += 1
      streamsCounter.set(name, count)

      if (count >= countLimitation) {
        this.updateInfo.set(name, true)
      }

    })

    const clone = streamers as Array<ScheduleUpdatedInfo>
    const groups = this.groupService.group$.getValue()
    this.streamers = clone.filter((info) => {
      info.scheduleUpdated = this.updateInfo.get(info.name) ?? false
      return groups.find(group => group === info.group)
    })
  }

  updateWeekText(date: Moment): void {
    const day = date.day()
    const startMoment = date.clone().add(0 - day, 'd')
    const weekendMoment = date.clone().add(6 - day, 'd')
    this.displayWeekText = `${startMoment.format('YYYY-MM-DD')}~${weekendMoment.format('YYYY-MM-DD')}`
  }

  linkToTwitter(streamer: StreamerInfo): void {
    const ytLink = streamer.twitterLink
    openUrl(ytLink)
  }
}
