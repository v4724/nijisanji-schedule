import * as moment from 'moment-timezone'
import * as lodash from 'lodash'
import { Moment } from 'moment-timezone'
import { StreamerInfoService } from '@app/service/streamer-info.service'
import { StreamerInfoVo } from '@app/model/vo/StreamerInfoVo'

// arrange feat streamers from StreamDto,
export interface StreamVo {
  id: string,
  streamer: string,
  title: string,
  onSchedule: boolean,
  link: string,
  timestamp: number | null,
  isUncertain: boolean | null,
  isModified: boolean | null,
  isCanceled: boolean | null,
  featStreamers: Array<string>,
  updatedTimestamp: number,
  mainStreamer: string
}

// include information of streamer and the date converted by timezome
export interface StreamViewItem extends StreamVo {
  displayMoment: Moment
  displayDate: string
  displayTime: string
  streamerInfo: StreamerInfoVo
}

export function initStream (): StreamVo {
  return {
    id: '',
    isCanceled: false,
    isModified: false,
    isUncertain: false,
    link: '',
    onSchedule: true,
    streamer: '',
    timestamp: null,
    title: '',
    featStreamers: [],
    updatedTimestamp: -1,
    mainStreamer: ''
  }
}

export function resetStream(stream: StreamVo): void {
  Object.assign(stream, initStream())
}

export function getFeatStream (mainStream: StreamVo, featStreamer: string) :StreamVo {
  const feat = lodash.cloneDeep(mainStream)
  feat.streamer = featStreamer as string
  feat.title = `(ref:${mainStream.streamer}) ${mainStream.title}`
  feat.mainStreamer = mainStream.streamer
  feat.onSchedule = false
  feat.featStreamers = []

  return feat
}

export function setDisplayValue(item: StreamViewItem, tz: string, streamerInfoService: StreamerInfoService):void {

  if ('displayMoment' in item) {
    item.displayMoment = moment(item.timestamp).tz(tz)
  }

  item.displayDate = moment(item.timestamp).tz(tz).format('yyyy-MM-DD')
  item.displayTime = moment(item.timestamp).tz(tz).format('HH:mm')

  const info = streamerInfoService.findStreamerInfo(item.streamer)
  if (info) {
    item.streamerInfo = info
  }
}
