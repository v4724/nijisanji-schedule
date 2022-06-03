import { Timezone } from '@app/model/enum/Timezone'

export interface StreamerInfoVo {
  id: string
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
  ocr: boolean,
}

export function initStreamerInfoVo(): StreamerInfoVo {
  const streamer = {
    id: '',
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
    ocr: false,
  }
  return streamer
}
