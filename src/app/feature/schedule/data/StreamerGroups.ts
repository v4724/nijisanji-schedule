import { enumList } from '@app/feature/schedule/utils'

export enum StreamerGroup {
  All='All',
  Luxiem='Luxiem',
  Noctyx='Noctyx'
}

export const groups: Array<string> = enumList(StreamerGroup)
