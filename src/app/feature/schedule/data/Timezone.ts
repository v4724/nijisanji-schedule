export enum Timezone {
  AEST='Australia/Sydney',
  JST='Asia/Tokyo',
  GMT8='Asia/Taipei',
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

export const timezoneValues = Object.values(Timezone)
export const timezoneEntries = Object.entries(Timezone)

console.log('keys', Object.keys(Timezone))
console.log('values', Object.values(Timezone))
console.log('entries', Object.entries(Timezone))
