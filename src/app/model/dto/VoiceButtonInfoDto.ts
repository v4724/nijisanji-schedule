import * as moment from 'moment-timezone'
import { QueryDocumentSnapshot } from '@angular/fire/compat/firestore'
import { getFeatStream, StreamVo } from '@app/model/vo/StreamVo'
import { VoiceButtonInfoVo } from '@app/model/vo/VoiceButtonInfoVo'
import { StreamerInfoVo } from '@app/model/vo/StreamerInfoVo'
import { StreamerInfoDto } from '@app/model/dto/StreamerInfoDto'

export interface VoiceButtonInfoDto {
  start: number,
  end: number,
  videoId: string,
  streamer: string,
  text: string
}


export function toDto (item: VoiceButtonInfoVo): VoiceButtonInfoDto {
  const itemDto: VoiceButtonInfoDto = {
    start: item.start,
    end: item.end,
    videoId: item.videoId,
    streamer: item.streamer,
    text: item.text
  }

  return itemDto
}

export function fromDto (id: string, dto: VoiceButtonInfoDto): VoiceButtonInfoVo {
  const item: VoiceButtonInfoVo = {
    id: id,
    start: dto.start,
    end: dto.end,
    videoId: dto.videoId,
    streamer: dto.streamer,
    text: dto.text
  }

  return item
}

export function toVoiceButtonInfoData (origData: Array<QueryDocumentSnapshot<VoiceButtonInfoDto>>): Array<VoiceButtonInfoVo> {
  const data: Array<VoiceButtonInfoVo> = []
  origData.forEach((doc) => {
    const origItem = doc.data()
    const item = fromDto(doc.id, origItem)
    data.push(item)
  })

  return data
}

