import { StreamerInfo } from '@app/feature/schedule/data/StreamerInfo'
import { Stream, TBDStream } from '@app/feature/schedule/data/Stream'

import { Stream as FirebaseStream } from '@app/feature/schedule/test/dto/Stream'

export interface StreamViewItem extends Stream {
  displayDate: string
  displayTime: string
  streamerInfo: StreamerInfo
}

export interface FirebaseStreamViewItem extends FirebaseStream {
  displayDate: string
  displayTime: string
  streamerInfo: StreamerInfo
}

export interface TBDStreamViewItem extends TBDStream {
  streamerInfo: StreamerInfo
}
