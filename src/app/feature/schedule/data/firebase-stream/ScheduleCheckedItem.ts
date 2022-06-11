import { QueryDocumentSnapshot } from '@angular/fire/compat/firestore'
import { StreamerInfo } from '@app/feature/schedule/data/StreamerInfo'
import { StreamerInfoService } from '@app/service/streamer-info.service'

export enum ScheduleCheckedState {
  none="NONE",
  checked="CHECKED",
  break="BREAK",
}
export const ScheduleCheckedStateValues: Array<string> = Object.values(ScheduleCheckedState)

export interface ScheduleCheckedItemDto {
  streamer: string,
  state: ScheduleCheckedState
}

export interface ScheduleCheckedItem {
  id: string,
  streamer: string,
  streamerInfo: StreamerInfo | undefined,
  state: ScheduleCheckedState
}

export function toDto (item: ScheduleCheckedItem): ScheduleCheckedItemDto {
  const itemDto: ScheduleCheckedItemDto = {
    streamer: item.streamer,
    state: item.state
  }

  return itemDto
}

export function fromDto (id: string, dto: ScheduleCheckedItemDto, streamerInfoService: StreamerInfoService): ScheduleCheckedItem {
  const item: ScheduleCheckedItem = {
    id: id,
    streamer: dto.streamer,
    streamerInfo: streamerInfoService.findStreamerInfo((dto.streamer)),
    state: dto.state
  }

  return item
}

export function toScheduleCheckedData (origData: Array<QueryDocumentSnapshot<ScheduleCheckedItemDto>>, streamerInfoService: StreamerInfoService): Array<ScheduleCheckedItem> {
  const data: Array<ScheduleCheckedItem> = []
  origData.forEach((doc) => {
    const origItem = doc.data()
    const item = fromDto(doc.id, origItem, streamerInfoService)
    data.push(item)
  })

  return data
}
