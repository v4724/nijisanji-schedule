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
  Elira='Elira',
  Pomu='Pomu',
  Finana='Finana',
  Selen='Selen',
  Rosemi='Rosemi',
  Petra='Petra',
  Enna='Enna',
  Nina='Nina',
  Millie='Millie',
  Reimu='Reimu',
}

export function streamerList (): Array<string> {
  const list = enumList(Streamer)
  return list
}
