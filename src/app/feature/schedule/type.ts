import { StreamerInfo } from '@app/feature/schedule/data/StreamerInfo'
import { Stream } from '@app/feature/schedule/data/Stream'

export interface StreamViewItem extends Stream {
  displayDate: string
  displayTime: string
  streamerInfo: StreamerInfo
}


