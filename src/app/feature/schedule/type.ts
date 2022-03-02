import { Streamer } from '@app/feature/schedule/data/Streamer'
import { StreamerInfo } from '@app/feature/schedule/data/StreamerInfo'

export interface Stream {
  id: number,
  streamer: string,
  title: string,
  isStreamer: boolean,
  link: string,
  isCollab: boolean | null,
  timestamp: number | null,
  guestId: number | null
}

export interface StreamViewItem extends Stream {
  displayDate: string
  displayTime: string
  streamerInfo: StreamerInfo
}


