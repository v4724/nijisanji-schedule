import { StreamViewItem } from '../type'
import { Moment } from 'moment-timezone'
import { StreamerInfo } from '@app/feature/schedule/data/StreamerInfo'

export enum Day {
  SUN='0',
  MON='1',
  TUE='2',
  WED='3',
  THU='4',
  FRI='5',
  SAT='6'
}

export interface MonthHeader {
  key: Day,
  value: string
}

export interface Streamer {
  info: StreamerInfo,
  streams: Array<StreamViewItem>,
  showDetail: boolean
}

export interface DayItem {
  isToday: boolean,
  moment: Moment | null,
  streamers: Array<Streamer>
}
export interface WeekItem extends Array<DayItem> {

}
