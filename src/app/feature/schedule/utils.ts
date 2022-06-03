import { Moment } from 'moment-timezone'

export function enumList (enumObj :any): Array<string> {
  return Object.keys(enumObj)
}

export function openUrl (url: string) {
  window.open(url, '_blank')
}

export function setMidnightStartMoment (moment: Moment): Moment {
  return moment.set('hour', 0)
        .set('minute', 0)
        .set('second', 0)
        .set('millisecond', 0)
}

export function setMidnightEndMoment (moment: Moment): Moment {
  return moment.set('hour', 23)
        .set('minute', 59)
        .set('second', 59)
}

export function distinctArray<T> (source: Array<T>): Array<T> {
  const arr = source
    .filter((value, index, self) => {
      return self.indexOf(value) === index
    })

  return arr
}
