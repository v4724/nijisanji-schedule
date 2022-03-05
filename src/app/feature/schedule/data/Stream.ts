
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
}

