import * as moment from 'moment-timezone'
import { QueryDocumentSnapshot } from '@angular/fire/compat/firestore'
import { getFeatStream, StreamVo } from '@app/model/vo/StreamVo'
import { OCRSchedule, OCRStream } from '@app/feature/ocr/ocr.component'

// for firebase
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


export function toDto (item: StreamVo): StreamDto {
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

export function OCRtoDto (streamer: string, item: OCRStream): StreamDto {
  const featStreamers = item.featStreamers.length ? item.featStreamers.join(',') : ''
  const itemDto: StreamDto = {
    streamer: streamer,
    title: item.title,
    onSchedule: true,
    link: '',
    timestamp: item.timestamp,
    isUncertain: false,
    isModified: false,
    isCanceled: false,
    featStreamers: featStreamers,
    updatedTimestamp: moment().valueOf()
  }

  return itemDto
}

export function fromDto (id: string, dto: StreamDto): StreamVo {
  const featStreamers = dto.featStreamers?.length ? dto.featStreamers.split(',') : []
  const item: StreamVo = {
    id: id,
    streamer: dto.streamer,
    title: dto.title,
    onSchedule: dto.onSchedule,
    link: dto.link,
    timestamp: dto.timestamp,
    isUncertain: dto.isUncertain,
    isModified: dto.isModified,
    isCanceled: dto.isCanceled,
    featStreamers: featStreamers,
    updatedTimestamp: dto.updatedTimestamp,
    mainStreamer: ''
  }

  return item
}

export function toStreamData (origData: Array<QueryDocumentSnapshot<StreamDto>>): Array<StreamVo> {
  const data: Array<StreamVo> = []
  origData.forEach((doc) => {
    const origItem = doc.data()
    const item = fromDto(doc.id, origItem)
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

