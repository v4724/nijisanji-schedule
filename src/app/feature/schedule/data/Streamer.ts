import { enumList } from '../utils'

export enum Streamer {
  Ike='Ike',
  Vox='Vox',
  Mysta='Mysta',
  Shu='Shu',
  Luca='Luca',
  Fulgur='Fulgur',
  Uki='Uki',
  Alban='Alban',
  Sonny='Sonny',
  Yugo='Yugo',
  Reimu='Reimu',
  Enna='Enna',
  Millie='Millie',
  Nina='Nina',
  Selen='Selen',
  Rosemi='Rosemi',
  Petra='Petra',
  Pomu='Pomu',
  Elira='Elira',
  Finana='Finana',
  // NijisanjiOfficial='Nijisanji Official',
  // Ironmouse='Ironmouse',
  Mika='Mika',
}
export const orders = Object.values(Streamer)
export function streamerList (): Array<string> {
  const list = enumList(Streamer)
  return list
}
