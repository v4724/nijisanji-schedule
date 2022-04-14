import { enumList } from '@app/feature/schedule/utils'

export enum StreamerGroup {
  LazuLight='LazuLight',
  OBSYDIA='OBSYDIA',
  Ethyria='Ethyria',
  Luxiem='Luxiem',
  Noctyx='Noctyx',
  ID='ID',
}

export const groups: Array<string> = enumList(StreamerGroup)
