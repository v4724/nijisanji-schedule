import { FirebaseStreamViewItem, StreamViewItem } from './type'
import * as moment from 'moment-timezone'
import { findStreamerInfo } from '@app/feature/schedule/data/StreamerInfo'

export function setDisplayValue(item: StreamViewItem | FirebaseStreamViewItem, tz: string):void {

  if ('displayMoment' in item) {
    item.displayMoment = moment(item.timestamp).tz(tz)
  }

  item.displayDate = moment(item.timestamp).tz(tz).format('yyyy-MM-DD')
  item.displayTime = moment(item.timestamp).tz(tz).format('HH:mm')

  const info = findStreamerInfo(item.streamer)
  if (info) {
    item.streamerInfo = info
  }
}
