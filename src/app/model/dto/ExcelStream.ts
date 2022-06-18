import { StreamerInfoVo } from '@app/model/vo/StreamerInfoVo'

export interface TBDStream {
  id: number,
  streamer: string,
  title: string,
  year: number,
  month: number,
  date: number,
}

export interface ExcelStream {
  id: number,
  streamer: string,
  title: string,
  onSchedule: boolean,
  link: string,
  isCollab: boolean | null,
  timestamp: number | null,
  guestId: number | null,
  isUncertain: boolean | null,
  isModified: boolean | null,
  isCanceled: boolean | null,
  isNew: boolean | null,
  mainStreamer: string | null
}

export interface ExcelStreamViewItem extends ExcelStream {
  displayDate: string
  displayTime: string
  streamerInfo: StreamerInfoVo
}

export interface TBDStreamViewItem extends TBDStream {
  streamerInfo: StreamerInfoVo
}
