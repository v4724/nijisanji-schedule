import { Injectable } from '@angular/core'
import { BehaviorSubject, combineLatest } from 'rxjs'
import { Stream, StreamViewItem } from '@app/feature/schedule/type'
import { streams } from '@app/feature/schedule/data/Stream'
import * as lodash from 'lodash'
import { StreamType, StreamTypeService } from '@app/feature/schedule/toolbar/stream-type/stream-type.service'
import { findStreamerInfo } from '@app/feature/schedule/data/StreamerInfo'
import { StreamGroupService } from '@app/feature/schedule/toolbar/stream-group/stream-group.service'
import { StreamerGroup } from '@app/feature/schedule/data/StreamerGroups'
import { find } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  origData: Array<Stream> = streams
  allStreams: Array<StreamViewItem> = [];
  streamerStreams: Array<StreamViewItem> = [];
  guestStreams: Array<StreamViewItem> = [];

  streams$ = new BehaviorSubject<Array<Stream>>([])

  constructor(private streamTypeService: StreamTypeService,
              private streamGroupService: StreamGroupService) {

    this.allStreams = lodash.cloneDeep(this.origData) as Array<StreamViewItem>
    this.allStreams.forEach((stream) => {
      const s = stream as StreamViewItem
      const info = findStreamerInfo(stream.streamer)
      if (info) {
        s.streamerInfo = info
      }

      if (!s.isStreamer) {
        const guestId = s.guestId
        const mainStream = this.origData.find((i) => i.id === guestId)
        if (mainStream) {
          s.title = mainStream.title
          s.link = mainStream.link
          s.timestamp = mainStream.timestamp
        }
      }
    })
    this.allStreams.sort((s1, s2) => {
      return Number(s1.timestamp) - Number(s2.timestamp)
    })

    this.streamerStreams = this.allStreams.filter((stream: StreamViewItem) => {
      return stream.isStreamer && stream.streamerInfo
    })

    this.guestStreams = this.allStreams
      .filter((stream) => {
        return !stream.isStreamer && stream.streamerInfo
      })

    combineLatest([this.streamGroupService.group$, this.streamTypeService.type$])
      .subscribe((results) => {
        const groups = results[0]
        const type = results[1]
        this.updateStreams(groups, type)
      })
  }

  updateStreams(groups: Array<StreamerGroup>, type: StreamType): void {
    let list = []
    switch (type) {
      case StreamType.Streamer:
        list = this.streamerStreams
        break;
      case StreamType.Guest:
        list = this.guestStreams
        break;
      case StreamType.All:
        list = this.allStreams
        break;
    }

    list = list.filter((s) => {

      const streamer = findStreamerInfo(s.streamer)
      if (streamer) {
        if (groups.indexOf(streamer.group) > -1) {
          return true
        }
      }
      return false
    })

    this.streams$.next(list)
  }
}
