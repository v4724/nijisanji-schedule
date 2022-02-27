import { enumList } from '../utils'

export enum Streamer {
  Vox='Vox',
  Ike='Ike',
  Luca='Luca',
  Mysta='Mysta',
  Shu='Shu',
  NijisanjiOfficial='Nijisanji Official',
  Ironmouse='Ironmouse',
  Fulgur='Fulgur',
  Alban='Alban',
  Sonny='Sonny',
  Uki='Uki',
  Yugo='Yugo',
}

export function streamerList (): Array<string> {
  const list = enumList(Streamer)
  return list
}
