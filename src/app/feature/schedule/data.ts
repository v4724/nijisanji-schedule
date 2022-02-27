import { Stream, StreamViewItem } from './type'
import * as moment from 'moment-timezone'

export function setDisplayValue(item: StreamViewItem, tz: string):void {
  item.displayDate = moment(item.timestamp).tz(tz).format('yyyy-MM-DD')
  item.displayTime = moment(item.timestamp).tz(tz).format('HH:mm')
}
