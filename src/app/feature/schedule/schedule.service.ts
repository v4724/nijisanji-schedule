import { Injectable } from '@angular/core'
import { BehaviorSubject, combineLatest, Subject } from 'rxjs'
import { StreamViewItem } from '@app/feature/schedule/type'
import { Stream } from '@app/feature/schedule/data/Stream'
import * as lodash from 'lodash'
import { StreamType, StreamTypeService } from '@app/feature/schedule/toolbar/stream-type/stream-type.service'
import { findStreamerInfo } from '@app/feature/schedule/data/StreamerInfo'
import { StreamGroupService } from '@app/feature/schedule/toolbar/stream-group/stream-group.service'
import { StreamerGroup } from '@app/feature/schedule/data/StreamerGroups'
import * as XLSX from 'xlsx'

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  origData$ = new Subject<Array<Stream>>();
  allStreams: Array<StreamViewItem> = [];
  streamerStreams: Array<StreamViewItem> = [];
  guestStreams: Array<StreamViewItem> = [];

  streams$ = new BehaviorSubject<Array<Stream>>([])

  constructor(private streamTypeService: StreamTypeService,
              private streamGroupService: StreamGroupService) {

    this.readFromExcel()
    this.origData$.subscribe((data) => {
      this.initData(data)
    })
  }

  initData(origData: Array<Stream>): void {
    this.allStreams = lodash.cloneDeep(origData) as Array<StreamViewItem>
    this.allStreams.forEach((stream) => {
      const s = stream as StreamViewItem
      const info = findStreamerInfo(stream.streamer)
      if (info) {
        s.streamerInfo = info
      }

      if (!s.isStreamer) {
        const guestId = s.guestId
        const mainStream = origData.find((i) => i.id === guestId)
        if (mainStream) {
          s.title = mainStream.title
          s.link = mainStream.link
          s.timestamp = mainStream.timestamp
          s.isCanceled = mainStream.isCanceled
          s.isUncertain = mainStream.isUncertain
          s.isNew = mainStream.isNew
          s.isModified = mainStream.isModified
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

  readFromExcel (): void {
    const url = 'assets/docs/Schedule.xlsx';
    fetch(url).then((result) => {
      result.arrayBuffer()
        .then((data) => {

          /* data is an ArrayBuffer */
          const workbook = XLSX.read(data);
          workbook.SheetNames.forEach((sheetName: string) => {
            this.origData$.next(XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]))
          })
        })
    });
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
