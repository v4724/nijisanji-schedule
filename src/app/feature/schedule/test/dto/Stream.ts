import * as moment from 'moment-timezone'
import * as lodash from 'lodash'
import { QueryDocumentSnapshot } from '@angular/fire/compat/firestore'

export interface Stream {
  streamer: string,
  title: string,
  onSchedule: boolean,
  link: string,
  timestamp: number | null,
  isUncertain: boolean | null,
  isModified: boolean | null,
  isCanceled: boolean | null,
  featStreamers: Array<String> | [],
  mainStreamer: string | null
}

export interface StreamDto {
  streamer: string,
  title: string,
  onSchedule: boolean,
  link: string,
  timestamp: number | null,
  isUncertain: boolean | null,
  isModified: boolean | null,
  isCanceled: boolean | null,
  featStreamers: string,
  updatedTimestamp: number
}


export function initStream (): Stream {
  return {
    isCanceled: false,
    isModified: false,
    isUncertain: false,
    link: '',
    onSchedule: true,
    streamer: '',
    timestamp: null,
    title: '',
    featStreamers: [],
    mainStreamer: null
  }
}

export function toDto (item: Stream): StreamDto {
  const featStreamers = item.featStreamers.length ? item.featStreamers.join(',') : ''
  const itemDto: StreamDto = {
    streamer: item.streamer,
    title: item.title,
    onSchedule: item.onSchedule,
    link: item.link,
    timestamp: item.timestamp,
    isUncertain: item.isUncertain,
    isModified: item.isModified,
    isCanceled: item.isCanceled,
    featStreamers: featStreamers,
    updatedTimestamp: moment().valueOf()
  }

  return itemDto
}

export function fromDto (dto: StreamDto): Stream {
  const featStreamers = dto.featStreamers?.length ? dto.featStreamers.split(',') : []
  const item: Stream = {
    streamer: dto.streamer,
    title: dto.title,
    onSchedule: dto.onSchedule,
    link: dto.link,
    timestamp: dto.timestamp,
    isUncertain: dto.isUncertain,
    isModified: dto.isModified,
    isCanceled: dto.isCanceled,
    featStreamers: featStreamers,
    mainStreamer: null
  }

  return item
}

export function toStreamData (origData: Array<QueryDocumentSnapshot<StreamDto>>): Array<Stream> {
  const data: Array<Stream> = []
  origData.forEach((doc) => {
    const origItem = doc.data()
    const item = fromDto(origItem)
    data.push(item)

    if (item.featStreamers.length) {
      item.featStreamers.forEach((featStreamer) => {
        const feat = getFeatStream(item, featStreamer as string)
        data.push(feat)
      })
    }

  })

  return data
}

export function getFeatStream (mainStream: Stream, featStreamer: string) :Stream {
  const feat = lodash.cloneDeep(mainStream)
  feat.streamer = featStreamer as string
  feat.title = `(ref:${mainStream.streamer}) ${mainStream.title}`
  feat.mainStreamer = mainStream.streamer

  return feat
}
