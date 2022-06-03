import { Timezone } from '@app/model/enum/Timezone'
import { StreamerInfoVo } from '@app/model/vo/StreamerInfoVo'
import { QueryDocumentSnapshot } from '@angular/fire/compat/firestore'

export interface StreamerInfoDto {
  img: string,
  name: string,
  group: string,
  channelId: string,
  youtubeLink: string,
  twitterLink: string,
  twitchLink: string,
  color: string,
  bgColor: string,
  timezone: Timezone,
  order: number,
  ocr: boolean
}

export function initStreamerDto(): StreamerInfoDto {
  const streamer = {
    img: '',
    name: '',
    group: '',
    channelId: '',
    youtubeLink: '',
    twitterLink: '',
    twitchLink: '',
    color: '',
    bgColor: '',
    timezone: Timezone.GMT,
    order: 0,
    ocr: false
  }
  return streamer
}

export function toDto (item: StreamerInfoVo): StreamerInfoDto {
  const itemDto: StreamerInfoDto = {
    img: item.img,
    name: item.name,
    group: item.group,
    channelId: item.channelId,
    youtubeLink: item.youtubeLink,
    twitterLink: item.twitterLink,
    twitchLink: item.twitchLink,
    color: item.color,
    bgColor: item.bgColor,
    timezone: item.timezone,
    order: item.order,
    ocr: item.ocr
  }

  return itemDto
}

export function fromDto (id: string, dto: StreamerInfoDto): StreamerInfoVo {
  const item: StreamerInfoVo = {
    id: id,
    img: dto.img,
    name: dto.name,
    group: dto.group,
    channelId: dto.channelId,
    youtubeLink: dto.youtubeLink,
    twitterLink: dto.twitterLink,
    twitchLink: dto.twitchLink,
    color: dto.color,
    bgColor: dto.bgColor,
    timezone: dto.timezone,
    order: dto.order,
    ocr: dto.ocr
  }
  return item
}

export function toStreamerInfoData (origData: Array<QueryDocumentSnapshot<StreamerInfoDto>>): Array<StreamerInfoVo> {
  const data: Array<StreamerInfoVo> = []
  origData.forEach((doc) => {
    const origItem = doc.data()
    const item = fromDto(doc.id, origItem)
    data.push(item)
  })

  return data
}
