import { Injectable } from '@angular/core'
import { BehaviorSubject, combineLatest } from 'rxjs'
import { Stream } from '@app/feature/schedule/type'
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
  streamerStreams: Array<Stream> = [];
  guestStreams: Array<Stream> = [];

  streams$ = new BehaviorSubject<Array<Stream>>([])

  constructor(private streamTypeService: StreamTypeService,
              private streamGroupService: StreamGroupService) {

    this.streamerStreams = this.origData.filter((stream: Stream) => {
      const info = findStreamerInfo(stream.streamer)
      return stream.isStreamer && info
    })

    const clone = lodash.cloneDeep(this.origData)
    this.guestStreams = clone
      .filter((stream) => {
        if (!stream.isStreamer) {
          const guestId = stream.guestId
          const mainStream = this.origData.find((i) => i.id === guestId)
          if (mainStream) {
            stream.title = mainStream.title
            stream.link = mainStream.link
            stream.timestamp = mainStream.timestamp
          }
        }
        return !stream.isStreamer && findStreamerInfo(stream.streamer)
      })

    combineLatest([this.streamGroupService.group$, this.streamTypeService.type$])
      .subscribe((results) => {
        const group = results[0]
        const type = results[1]
        this.updateStreams(group, type)
      })
  }

  updateStreams(group: StreamerGroup, type: StreamType): void {
    let list = []
    switch (type) {
      case StreamType.Streamer:
        list = this.streamerStreams
        break;
      case StreamType.Guest:
        list = this.guestStreams
        break;
      case StreamType.All:
        const streamer = this.streamerStreams
        const guest = this.guestStreams
        list = streamer.concat(guest)
        break;
    }

    list = list.filter((s) => {
      if (group !== StreamerGroup.All) {
        const streamer = findStreamerInfo(s.streamer)
        return streamer?.group === group
      }
      return true
    })

    this.streams$.next(list)
  }
}
