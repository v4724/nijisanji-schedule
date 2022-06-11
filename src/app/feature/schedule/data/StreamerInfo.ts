import { StreamerGroup } from './StreamerGroups'
import { Streamer } from '@app/feature/schedule/data/Streamer'
import { Timezone } from '@app/feature/schedule/data/Timezone'

export interface StreamerInfo {
  img: string,
  name: string,
  group: string,
  channelId: string,
  youtubeLink: string,
  twitterLink: string,
  twitchLink: string,
  color: string,
  bgColor: string,
  timezone: Timezone | null,
}

export function initStreamer() {
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
    timezone: '',
  }
  return streamer
}

//
// export function findStreamerInfo(streamer: Streamer | string): StreamerInfo{
//   const defaultInfo = {
//     img: 'assets/imgs/undefine_profile.jpg',
//     name: streamer,
//     color: 'undefine-primary-color',
//     bgColor: 'undefine-primary-bg-color'
//   }
//   const find = streamers.find(s => s.name === streamer)
//   return find ?? defaultInfo
// }
