export enum Timezone {
  AEST='Australia/Sydney',
  JST='Asia/Tokyo',
  // GMT8='Asia/Taipei',
  WIB='Asia/Jakarta',
  BST='Europe/London',
  GMT='GMT+0',
  EST5EDT='EST5EDT',
  PST8PDT='PST8PDT',
}

export const countries: Array<string> = [
  'Australia/Sydney',
  'Japan',
  'Asia/Taipei',
  'Asia/Jakarta',
  'Europe/London',
  'GMT+0',
  'EST5EDT',
  'PST8PDT'
]

export interface Option {
  value: string,
  text: string
}

export function getTimezoneOptions (): Array<Option> {
  const options: Array<Option> = []
  timezoneEntries.forEach((arr) => {
    options.push({
      value: arr[1],
      text: arr[0]
    })
  })
  return options
}

export const timezoneValues = Object.values(Timezone)
export const timezoneEntries = Object.entries(Timezone)

export function getTimezoneValue (from: string): string {
  if (from === 'PDT' || from === 'PST') {
    return Timezone.PST8PDT
  }
  if (from === 'EDT' || from === 'EST') {
    return Timezone.EST5EDT
  }

  const find = getTimezoneOptions().find((option) => option.text === from)
  if (find) {
    return find.value
  }

  return from
}
