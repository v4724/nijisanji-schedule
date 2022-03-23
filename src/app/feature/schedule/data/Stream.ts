
export interface Stream {
  id: number,
  streamer: string,
  title: string,
  onSchedule: boolean,
  link: string,
  isCollab: boolean | null,
  timestamp: number | null,
  guestId: number | null,
  isUncertain: boolean | null,
  isModified: boolean | null,
  isCanceled: boolean | null,
  isNew: boolean | null,
  mainStreamer: string | null
}

export interface TBDStream {
  id: number,
  streamer: string,
  title: string,
  year: number,
  month: number,
  date: number,
}
