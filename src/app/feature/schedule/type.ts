export interface Stream {
  id: number,
  streamer: string,
  title: string,
  isStreamer: boolean,
  link: string,
  isCollab: boolean,
  timestamp: number | null,
  guestId: number | null
}

export interface StreamViewItem extends Stream {
  displayDate: string
  displayTime: string
}

export interface StreamerInfo {
  img: string,
  name: string,
  color: string,
  bgColor: string
}

export enum CategoryType {
  Streamer,
  Guest,
  All
}
