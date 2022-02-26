import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { Stream } from '@app/feature/schedule/type'
import { findLuxiemInfo, streams } from '@app/feature/schedule/data'
import * as lodash from 'lodash'
import { StreamType, StreamTypeService } from '@app/feature/schedule/toolbar/stream-type/stream-type.service'

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  origData: Array<Stream> = streams
  streamerStreams: Array<Stream> = [];
  guestStreams: Array<Stream> = [];

  streams$ = new BehaviorSubject<Array<Stream>>([])

  constructor(private streamTypeService: StreamTypeService) {

    this.streamerStreams = this.origData.filter((stream) => {
      return stream.isStreamer && this.isLuxiemMember(stream)
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
        return !stream.isStreamer && this.isLuxiemMember(stream)
      })

    this.streamTypeService.type$.subscribe((type) => {
      this.updateStreams(type)
    })
  }

  isLuxiemMember(s: Stream): boolean {
    return !!findLuxiemInfo(s.streamer)
  }

  updateStreams(type: StreamType): void {
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

    this.streams$.next(list)
  }
}
