
import { StreamerGroup } from './StreamerGroups'
import { Streamer } from '@app/feature/schedule/types/Streamer'

export interface StreamerInfo {
  img: string,
  name: Streamer,
  group: StreamerGroup,
  youtubeLink: string,
  twitterLink: string,
  color: string,
  bgColor: string
}

export const luxiem: Array<StreamerInfo> = [{
  img: 'assets/imgs/ike_profile.jpg',
  name: Streamer.Ike,
  group: StreamerGroup.Luxiem,
  youtubeLink: 'https://t.co/hTyg2xavZF',
  twitterLink: 'https://twitter.com/ike_eveland',
  color: 'ike-primary-color',
  bgColor: 'ike-primary-bg-color',
}, {
  img: 'assets/imgs/vox_profile.jpg',
  name: Streamer.Vox,
  group: StreamerGroup.Luxiem,
  youtubeLink: 'https://t.co/vKNOC3Nr5S',
  twitterLink: 'https://twitter.com/Vox_Akuma',
  color: 'vox-primary-color',
  bgColor: 'vox-primary-bg-color',
}, {
  img: 'assets/imgs/luca_profile.jpg',
  name: Streamer.Luca,
  group: StreamerGroup.Luxiem,
  youtubeLink: 'https://t.co/3gtlv10UA6',
  twitterLink: 'https://twitter.com/luca_kaneshiro',
  color: 'luca-primary-color',
  bgColor: 'luca-primary-bg-color',
}, {
  img: 'assets/imgs/mysta_profile.jpg',
  name: Streamer.Mysta,
  group: StreamerGroup.Luxiem,
  youtubeLink: 'https://t.co/zDhDXEWG5t',
  twitterLink: 'https://twitter.com/Mysta_Rias',
  color: 'mysta-primary-color',
  bgColor: 'mysta-primary-bg-color',
}, {
  img: 'assets/imgs/shu_profile.jpg',
  name: Streamer.Shu,
  group: StreamerGroup.Luxiem,
  youtubeLink: 'https://t.co/pmO0oD7Z7V',
  twitterLink: 'https://twitter.com/shu_yamino',
  color: 'shu-primary-color',
  bgColor: 'shu-primary-bg-color',
}]

export const noctyx: Array<StreamerInfo> = [{
  img: 'assets/imgs/fulgur_profile.jpg',
  name: Streamer.Fulgur,
  group: StreamerGroup.Noctyx,
  youtubeLink: 'https://t.co/SHdAQvdg9w',
  twitterLink: 'https://twitter.com/Fulgur_Ovid',
  color: 'fulgur-primary-color',
  bgColor: 'fulgur-primary-bg-color',
}, {
  img: 'assets/imgs/alban_profile.jpg',
  name: Streamer.Alban,
  group: StreamerGroup.Noctyx,
  youtubeLink: 'https://t.co/My93c0L6HV',
  twitterLink: 'https://twitter.com/alban_knox/',
  color: 'alban-primary-color',
  bgColor: 'alban-primary-bg-color',
}, {
  img: 'assets/imgs/sonny_profile.jpg',
  name: Streamer.Sonny,
  group: StreamerGroup.Noctyx,
  youtubeLink: 'https://t.co/0cXVAQQI4m',
  twitterLink: 'https://twitter.com/sonny_brisko',
  color: 'sonny-primary-color',
  bgColor: 'sonny-primary-bg-color',
}, {
  img: 'assets/imgs/uki_profile.jpg',
  name: Streamer.Uki,
  group: StreamerGroup.Noctyx,
  youtubeLink: 'https://t.co/sLBqq2cJlA',
  twitterLink: 'https://twitter.com/uki_violeta',
  color: 'uki-primary-color',
  bgColor: 'uki-primary-bg-color',
}, {
  img: 'assets/imgs/yugo_profile.jpg',
  name: Streamer.Yugo,
  group: StreamerGroup.Noctyx,
  youtubeLink: 'https://t.co/WKF0Vx8fI9',
  twitterLink: 'https://twitter.com/Yugo_Asuma',
  color: 'yugo-primary-color',
  bgColor: 'yugo-primary-bg-color',
}]

export const ethyria: Array<StreamerInfo> = [{
  img: 'assets/imgs/enna_profile.jpg',
  name: Streamer.Enna,
  group: StreamerGroup.Ethyria,
  youtubeLink: 'https://www.youtube.com/channel/UCR6qhsLpn62WVxCBK1dkLow',
  twitterLink: '',
  color: 'enna-primary-color',
  bgColor: 'enna-primary-bg-color',
}, {
  img: 'assets/imgs/nina_profile.jpg',
  name: Streamer.Nina,
  group: StreamerGroup.Ethyria,
  youtubeLink: 'https://www.youtube.com/channel/UCkieJGn3pgJikVW8gmMXE2w',
  twitterLink: '',
  color: 'nina-primary-color',
  bgColor: 'nina-primary-bg-color',
}, {
  img: 'assets/imgs/millie_profile.jpg',
  name: Streamer.Millie,
  group: StreamerGroup.Ethyria,
  youtubeLink: 'https://www.youtube.com/channel/UC47rNmkDcNgbOcM-2BwzJTQ',
  twitterLink: '',
  color: 'millie-primary-color',
  bgColor: 'millie-primary-bg-color',
}, {
  img: 'assets/imgs/reimu_profile.jpg',
  name: Streamer.Reimu,
  group: StreamerGroup.Ethyria,
  youtubeLink: 'https://www.youtube.com/channel/UCBURM8S4LH7cRZ0Clea9RDA',
  twitterLink: '',
  color: 'reimu-primary-color',
  bgColor: 'reimu-primary-bg-color',
}]


export const obsydia: Array<StreamerInfo> = [{
  img: 'assets/imgs/selen_profile.jpg',
  name: Streamer.Selen,
  group: StreamerGroup.OBSYDIA,
  youtubeLink: 'https://www.youtube.com/channel/UCV1xUwfM2v2oBtT3JNvic3w',
  twitterLink: '',
  color: 'selen-primary-color',
  bgColor: 'selen-primary-bg-color',
}, {
  img: 'assets/imgs/rosemi_profile.jpg',
  name: Streamer.Rosemi,
  group: StreamerGroup.OBSYDIA,
  youtubeLink: 'https://www.youtube.com/channel/UC4WvIIAo89_AzGUh1AZ6Dkg',
  twitterLink: '',
  color: 'rosemi-primary-color',
  bgColor: 'rosemi-primary-bg-color',
}, {
  img: 'assets/imgs/petra_profile.jpg',
  name: Streamer.Petra,
  group: StreamerGroup.OBSYDIA,
  youtubeLink: 'https://www.youtube.com/channel/UCgA2jKRkqpY_8eysPUs8sjw',
  twitterLink: '',
  color: 'petra-primary-color',
  bgColor: 'petra-primary-bg-color',
}]


export const lazuLight: Array<StreamerInfo> = [{
  img: 'assets/imgs/elira_profile.jpg',
  name: Streamer.Elira,
  group: StreamerGroup.LazuLight,
  youtubeLink: 'https://www.youtube.com/channel/UCIeSUTOTkF9Hs7q3SGcO-Ow',
  twitterLink: '',
  color: 'elira-primary-color',
  bgColor: 'elira-primary-bg-color',
}, {
  img: 'assets/imgs/pomu_profile.jpg',
  name: Streamer.Pomu,
  group: StreamerGroup.LazuLight,
  youtubeLink: 'https://www.youtube.com/channel/UCP4nMSTdwU1KqYWu3UH5DHQ',
  twitterLink: '',
  color: 'pomu-primary-color',
  bgColor: 'pomu-primary-bg-color',
}, {
  img: 'assets/imgs/finana_profile.jpg',
  name: Streamer.Finana,
  group: StreamerGroup.LazuLight,
  youtubeLink: 'https://www.youtube.com/channel/UCu-J8uIXuLZh16gG-cT1naw',
  twitterLink: '',
  color: 'finana-primary-color',
  bgColor: 'finana-primary-bg-color',
}]

export let streamers: Array<StreamerInfo> = []
streamers = streamers.concat(luxiem, noctyx)
// streamers = streamers.concat(luxiem, noctyx, ethyria, obsydia, lazuLight)

export function findStreamersInfoByGroup(group: StreamerGroup | string): StreamerInfo | undefined {
  return streamers.find(s => s.group === group)
}

export function findStreamerInfo(streamer: Streamer | string): StreamerInfo | undefined {
  return streamers.find(s => s.name === streamer)
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
