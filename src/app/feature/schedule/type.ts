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


export interface Header {
  key: string,
  value: string
}

export enum Day {
  SUN='0',
  MON='1',
  TUE='2',
  WEN='3',
  THU='4',
  FRI='5',
  SAT='6'
}
