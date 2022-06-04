import { StreamerInfo } from '@app/feature/schedule/data/StreamerInfo'

export interface TBDStream {
  id: number,
  streamer: string,
  title: string,
  year: number,
  month: number,
  date: number,
}

export interface Stream {
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

export interface StreamViewItem extends Stream {
  displayDate: string
  displayTime: string
  streamerInfo: StreamerInfo
}

export interface TBDStreamViewItem extends TBDStream {
  streamerInfo: StreamerInfo
}
