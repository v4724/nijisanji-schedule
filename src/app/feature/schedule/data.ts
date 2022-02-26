import { Stream, StreamerInfo, StreamViewItem } from './type'
import * as moment from 'moment-timezone'
import { Streamer } from '@app/feature/schedule/types/Streamer'

export const streams: Array<Stream> = [];

streams.push({id:1,streamer:'Vox',title:'ASK ME ANY THING',isStreamer:true,link:'https://www.youtube.com/watch?v=uJtjaurhq-M',isCollab:false,timestamp:1645362000000.,guestId:null})
streams.push({id:2,streamer:'Vox',title:'Overwatch',isStreamer:true,link:'https://www.youtube.com/watch?v=dPbkTvFoZ80',isCollab:true,timestamp:1645372800000.,guestId:null})
streams.push({id:3,streamer:'Vox',title:'Ring Fit',isStreamer:true,link:'https://www.youtube.com/watch?v=Xds474RmCUM',isCollab:false,timestamp:1645448400000.,guestId:null})
streams.push({id:4,streamer:'Vox',title:'SIMS 4',isStreamer:true,link:'https://www.youtube.com/watch?v=XIjMf23Of6Q',isCollab:false,timestamp:1645538400000.,guestId:null})
streams.push({id:5,streamer:'Vox',title:'ZATSUDAN',isStreamer:true,link:'https://www.youtube.com/watch?v=BS-HvJLMWg8',isCollab:false,timestamp:1645621200000.,guestId:null})
streams.push({id:6,streamer:'Vox',title:'The Crooked Man',isStreamer:true,link:'https://www.youtube.com/watch?v=MuFMQwmsYmc',isCollab:false,timestamp:1645707600000.,guestId:null})
streams.push({id:7,streamer:'Vox',title:'SUPA CATCHUP ZATSUDAN',isStreamer:true,link:'https://www.youtube.com/watch?v=gtqy1WNoAvU',isCollab:false,timestamp:1645794000000.,guestId:null})
streams.push({id:8,streamer:'Ike',title:'Propnight',isStreamer:true,link:'https://www.youtube.com/watch?v=BbyIJjJ3Dy4&t=9347s',isCollab:false,timestamp:1645293600000,guestId:null})
streams.push({id:9,streamer:'Ike',title:'Free Chat',isStreamer:true,link:'https://www.youtube.com/watch?v=leFQzQJU0bc',isCollab:false,timestamp:1645358400000,guestId:null})
streams.push({id:10,streamer:'Ike',title:'Free Chat',isStreamer:true,link:'https://www.youtube.com/watch?v=_NNOx0isvJM',isCollab:false,timestamp:1645556400000.,guestId:null})
streams.push({id:11,streamer:'Ike',title:'APEX',isStreamer:true,link:'https://www.youtube.com/watch?v=HE8Ivd-7cEU&t=12344s',isCollab:true,timestamp:1645635600000.,guestId:null})
streams.push({id:12,streamer:'Ike',title:'',isStreamer:false,link:'',isCollab:null,timestamp:null,guestId:6})
streams.push({id:13,streamer:'Ike',title:'',isStreamer:false,link:'',isCollab:null,timestamp:null,guestId:29})
streams.push({id:14,streamer:'Ike',title:'Firewatch',isStreamer:true,link:'https://www.youtube.com/watch?v=DlH1ptG_xck',isCollab:false,timestamp:1645804800000.,guestId:null})
streams.push({id:15,streamer:'Ike',title:'ABZU',isStreamer:true,link:'',isCollab:false,timestamp:1645880400000.,guestId:null})
streams.push({id:16,streamer:'Ike',title:'',isStreamer:false,link:'',isCollab:null,timestamp:null,guestId:17})
streams.push({id:17,streamer:'Nijisanji Official',title:'EN 5th DEBUT',isStreamer:true,link:'https://www.youtube.com/watch?v=Ensyl_-ftkc',isCollab:false,timestamp:1645927200000.,guestId:null})
streams.push({id:18,streamer:'Vox',title:'',isStreamer:false,link:'',isCollab:null,timestamp:null,guestId:13})
streams.push({id:19,streamer:'Luca',title:'Sekiro',isStreamer:true,link:'https://www.youtube.com/watch?v=fBgMU3ykPHA',isCollab:false,timestamp:1645502400000.,guestId:null})
streams.push({id:20,streamer:'Luca',title:'Metal Cear Rising',isStreamer:true,link:'https://www.youtube.com/watch?v=wnotjU2ndSE',isCollab:false,timestamp:1645588800000.,guestId:null})
streams.push({id:21,streamer:'Luca',title:'Mario & Sonic 2020 Olympic Games',isStreamer:true,link:'https://www.youtube.com/watch?v=G33gS6XfXIY',isCollab:true,timestamp:1645664400000.,guestId:null})
streams.push({id:22,streamer:'Ironmouse',title:'Speak of th Devil',isStreamer:true,link:'https://www.youtube.com/watch?v=ug8mukNdvZc',isCollab:false,timestamp:1645750800000.,guestId:null})
streams.push({id:23,streamer:'Luca',title:'',isStreamer:false,link:'',isCollab:null,timestamp:null,guestId:22})
streams.push({id:24,streamer:'Luca',title:'',isStreamer:false,link:'',isCollab:null,timestamp:null,guestId:13})
streams.push({id:25,streamer:'Luca',title:'Dread Hunger',isStreamer:true,link:'https://www.youtube.com/watch?v=EAnqPLoHObc',isCollab:true,timestamp:1645844400000,guestId:null})
streams.push({id:26,streamer:'Mysta',title:'Overwatch',isStreamer:true,link:'https://www.youtube.com/watch?v=JdEZdT5jBZs',isCollab:true,timestamp:1645372800000.,guestId:null})
streams.push({id:27,streamer:'Mysta',title:'APEX',isStreamer:true,link:'https://www.youtube.com/watch?v=wYf17UqgUX8',isCollab:false,timestamp:1645531200000,guestId:null})
streams.push({id:28,streamer:'Mysta',title:'Doulingo',isStreamer:true,link:'https://www.youtube.com/watch?v=4QFLWfnIu_A',isCollab:false,timestamp:1645617600000,guestId:null})
streams.push({id:29,streamer:'Mysta',title:'Luxiem Collab',isStreamer:true,link:'https://www.youtube.com/watch?v=EZyO08qg11g',isCollab:true,timestamp:1645729200000.,guestId:null})
streams.push({id:30,streamer:'Mysta',title:'Chatting',isStreamer:true,link:'https://www.youtube.com/watch?v=T59BYHE9V68',isCollab:false,timestamp:1645790400000,guestId:null})
streams.push({id:31,streamer:'Mysta',title:'Valorant',isStreamer:true,link:'',isCollab:false,timestamp:1645876800000,guestId:null})
streams.push({id:32,streamer:'Shu',title:'Overwatch',isStreamer:true,link:'https://www.youtube.com/watch?v=LcDRKUxiffs',isCollab:true,timestamp:1645372800000.,guestId:null})
streams.push({id:33,streamer:'Shu',title:'Nun Massacre',isStreamer:true,link:'https://www.youtube.com/watch?v=IrxpwcD2VPs',isCollab:false,timestamp:1645570800000.,guestId:null})
streams.push({id:34,streamer:'Shu',title:'Members only',isStreamer:true,link:'',isCollab:false,timestamp:1645646400000.,guestId:null})
streams.push({id:35,streamer:'Shu',title:'',isStreamer:false,link:'',isCollab:null,timestamp:null,guestId:29})
streams.push({id:36,streamer:'Shu',title:'AMONG AS',isStreamer:true,link:'https://www.youtube.com/watch?v=lJBtjRaXXPk',isCollab:true,timestamp:1645819200000.,guestId:null})
streams.push({id:37,streamer:'Shu',title:'Dread Hunger',isStreamer:true,link:'https://www.youtube.com/watch?v=t4phNqxYC_U',isCollab:true,timestamp:1645844400000,guestId:null})
streams.push({id:38,streamer:'Shu',title:'Pokemon Legends: Arceus',isStreamer:true,link:'',isCollab:false,timestamp:1645992000000.,guestId:null})

export const streamers: Array<StreamerInfo> = [{
  img: 'assets/imgs/ike_profile.jpg',
  name: Streamer.Ike,
  color: 'ike-primary-color',
  bgColor: 'ike-primary-bg-color',
}, {
  img: 'assets/imgs/vox_profile.jpg',
  name: Streamer.Vox,
  color: 'vox-primary-color',
  bgColor: 'vox-primary-bg-color',
}, {
  img: 'assets/imgs/luca_profile.jpg',
  name: Streamer.Luca,
  color: 'luca-primary-color',
  bgColor: 'luca-primary-bg-color',
}, {
  img: 'assets/imgs/mysta_profile.jpg',
  name: Streamer.Mysta,
  color: 'mysta-primary-color',
  bgColor: 'mysta-primary-bg-color',
}, {
  img: 'assets/imgs/shu_profile.jpg',
  name: Streamer.Shu,
  color: 'shu-primary-color',
  bgColor: 'shu-primary-bg-color',
}]

export function findLuxiemInfo(streamer: Streamer | string): StreamerInfo | undefined {
  return streamers.find(s => s.name === streamer)
}

export function findStreamerInfo(streamer: Streamer | string): StreamerInfo{
  const defaultInfo = {
    img: 'assets/imgs/undefine_profile.jpg',
    name: streamer,
    color: 'undefine-primary-color',
    bgColor: 'undefine-primary-bg-color'
  }
  const find = streamers.find(s => s.name === streamer)
  return find ?? defaultInfo
}

export function setDisplayValue(item: StreamViewItem, tz: string):void {
  item.displayDate = moment(item.timestamp).tz(tz).format('yyyy-MM-DD')
  item.displayTime = moment(item.timestamp).tz(tz).format('HH:mm')
}
