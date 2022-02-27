import { Stream, StreamViewItem } from './type'
import * as moment from 'moment-timezone'
import { findStreamerInfo } from '@app/feature/schedule/data/StreamerInfo'

export function setDisplayValue(item: StreamViewItem, tz: string):void {
  item.displayDate = moment(item.timestamp).tz(tz).format('yyyy-MM-DD')
  item.displayTime = moment(item.timestamp).tz(tz).format('HH:mm')

  const info = findStreamerInfo(item.streamer)
  if (info) {
    item.streamerInfo = info
  }
}
