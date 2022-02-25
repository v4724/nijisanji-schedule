import { enumList } from '../utils'

export enum Streamer {
  Vox='Vox',
  Ike='Ike',
  Luca='Luca',
  Mysta='Mysta',
  Shu='Shu',
  NijisanjiOfficial='Nijisanji Official',
  Ironmouse='Ironmouse',
}

export function streamerList (): Array<string> {
  const list = enumList(Streamer)
  return list
}
