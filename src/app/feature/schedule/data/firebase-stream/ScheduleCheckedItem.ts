import { QueryDocumentSnapshot } from '@angular/fire/compat/firestore'
import { StreamerInfo } from '@app/feature/schedule/data/StreamerInfo'
import { StreamerInfoService } from '@app/service/streamer-info.service'
import * as moment from 'moment-timezone'

export enum ScheduleCheckedState {
  none="NONE",
  checked="CHECKED",
  break="BREAK",
}
export const ScheduleCheckedStateValues: Array<string> = Object.values(ScheduleCheckedState)

export interface ScheduleCheckedItemDto {
  streamer: string,
  state: ScheduleCheckedState,
  updatedTimestamp: number
}

export interface ScheduleCheckedItem {
  id: string,
  streamer: string,
  streamerInfo: StreamerInfo | undefined,
  updatedTimestamp: number,
  state: ScheduleCheckedState
}

export function toDto (item: ScheduleCheckedItem): ScheduleCheckedItemDto {
  const itemDto: ScheduleCheckedItemDto = {
    streamer: item.streamer,
    state: item.state,
    updatedTimestamp: moment().valueOf()
  }

  return itemDto
}

export function fromDto (id: string, dto: ScheduleCheckedItemDto, streamerInfoService: StreamerInfoService): ScheduleCheckedItem {
  const item: ScheduleCheckedItem = {
    id: id,
    streamer: dto.streamer,
    streamerInfo: streamerInfoService.findStreamerInfo((dto.streamer)),
    state: dto.state,
    updatedTimestamp: dto.updatedTimestamp
  }

  return item
}

export function toScheduleCheckedData (origData: Array<ScheduleCheckedItem>, streamerInfoService: StreamerInfoService): Array<ScheduleCheckedItem> {
  return origData.map((dto) => {
    return fromDto(dto.id, dto, streamerInfoService)
  })
}
