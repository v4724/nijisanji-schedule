
export enum WeekType {
  Last,
  This,
  Next
}

export interface WeekHeader {
  key: string,
  value: string,
  isToday: boolean,
}

