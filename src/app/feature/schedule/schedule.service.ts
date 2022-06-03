import { Injectable } from '@angular/core'
import { BehaviorSubject, combineLatest, Subject } from 'rxjs'
import { ExcelStream as ExcelStream, ExcelStreamViewItem as ExcelStreamViewItem, TBDStream, TBDStreamViewItem } from '@app/model/dto/ExcelStream'
import * as lodash from 'lodash'
import { StreamType, StreamTypeService } from '@app/feature/schedule/toolbar/stream-type/stream-type.service'
import { StreamGroupService } from '@app/service/stream-group.service'
import * as XLSX from 'xlsx'
import * as moment from 'moment-timezone'
import { StreamerInfoService } from '@app/service/streamer-info.service'

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  origData$ = new Subject<Array<ExcelStream>>();
  allStreams: Array<ExcelStreamViewItem> = [];
  streamerStreams: Array<ExcelStreamViewItem> = [];
  guestStreams: Array<ExcelStreamViewItem> = [];

  streams$ = new BehaviorSubject<Array<ExcelStream>>([])

  origTBDData$ = new Subject<Array<TBDStream>>();
  TBDStreams: Array<TBDStreamViewItem> = [];
  TBDStreams$ = new BehaviorSubject<Array<TBDStream>>([])


  constructor(private streamTypeService: StreamTypeService,
              private streamGroupService: StreamGroupService,
              private streamerInfoService: StreamerInfoService) {

    // 不從 excel 取得資料
    // this.readFromExcel()
    this.origData$.subscribe((data) => {
      this.initData(data)
    })

    this.origTBDData$.subscribe((data) => {
      this.initTBDData(data)
    })
  }

  initData(origData: Array<ExcelStream>): void {
    this.allStreams = lodash.cloneDeep(origData) as Array<ExcelStreamViewItem>
    this.allStreams.forEach((stream) => {
      const s = stream as ExcelStreamViewItem
      const info = this.streamerInfoService.findStreamerInfo(stream.streamer)
      if (info) {
        s.streamerInfo = info
      }

      if (s.guestId) {
        const guestId = s.guestId
        const mainStream = origData.find((i) => i.id === guestId)

        if (mainStream) {
          s.title = `(ref:${mainStream.streamer}) ${mainStream.title}`
          s.link = mainStream.link
          s.timestamp = mainStream.timestamp
          s.isCanceled = mainStream.isCanceled
          s.isUncertain = mainStream.isUncertain
          s.isModified = mainStream.isModified
          s.mainStreamer = mainStream.streamer
        }
      }
    })
    this.allStreams.sort((s1, s2) => {
      return Number(s1.timestamp) - Number(s2.timestamp)
    })

    combineLatest([this.streamGroupService.selectedGroup$, this.streamTypeService.type$])
      .subscribe((results) => {
        const groups = results[0]
        const type = results[1]
        this.updateStreams(groups, type)
      })
  }

  initTBDData(origData: Array<TBDStream>): void {

    this.TBDStreams = lodash.cloneDeep(origData) as Array<TBDStreamViewItem>
    this.TBDStreams.forEach((stream) => {
      const info = this.streamerInfoService.findStreamerInfo(stream.streamer)
      if (info) {
        stream.streamerInfo = info
      }

    })

    combineLatest([this.streamGroupService.selectedGroup$, this.streamTypeService.type$])
      .subscribe((results) => {
        const groups = results[0]
        const type = results[1]
        this.updateTBDStreams(groups, type)
      })
  }

  readFromExcel (): void {
    const url = `assets/docs/Schedule.xlsx?${moment()}`;
    fetch(url).then((result) => {
      result.arrayBuffer()
        .then((data) => {

          /* data is an ArrayBuffer */
          const workbook = XLSX.read(data);
          workbook.SheetNames.forEach((sheetName: string) => {
            if (sheetName === 'ALL') {
              this.origData$.next(XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]))
            } else if (sheetName === 'TBD') {
              this.origTBDData$.next(XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]))
            }

          })
        })
    });
  }

  updateStreams(groups: Array<string>, type: StreamType): void {
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

      const streamer = this.streamerInfoService.findStreamerInfo(s.streamer)
      if (streamer) {
        if (groups.indexOf(streamer.group) > -1) {
          return true
        }
      }
      return false
    })

    this.streams$.next(list)
  }

  updateTBDStreams(groups: Array<string>, type: StreamType): void {
    let list = this.TBDStreams

    list = list.filter((s) => {

      const streamer = this.streamerInfoService.findStreamerInfo(s.streamer)
      if (streamer) {
        if (groups.indexOf(streamer.group) > -1) {
          return true
        }
      }
      return false
    })

    this.TBDStreams$.next(list)
  }
}
