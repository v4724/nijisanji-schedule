import { StreamerInfoService } from '@app/service/streamer-info.service'
import * as moment from 'moment-timezone'
import { ScheduleCheckedItemVo } from '@app/model/vo/ScheduleCheckedItemVo'
import { ScheduleCheckedState } from '@app/model/enum/ScheduleCheckedState'

export const ScheduleCheckedStateValues: Array<string> = Object.values(ScheduleCheckedState)

export interface ScheduleCheckedItemDto {
  streamer: string,
  state: ScheduleCheckedState,
  updatedTimestamp: number
}

export function toDto (item: ScheduleCheckedItemVo): ScheduleCheckedItemDto {
  const itemDto: ScheduleCheckedItemDto = {
    streamer: item.streamer,
    state: item.state,
    updatedTimestamp: moment().valueOf()
  }

  return itemDto
}

export function fromDto (id: string, dto: ScheduleCheckedItemDto, streamerInfoService: StreamerInfoService): ScheduleCheckedItemVo {
  const item: ScheduleCheckedItemVo = {
    id: id,
    streamer: dto.streamer,
    streamerInfo: streamerInfoService.findStreamerInfo((dto.streamer)),
    state: dto.state,
    updatedTimestamp: dto.updatedTimestamp
  }

  return item
}

export function toScheduleCheckedData (origData: Array<ScheduleCheckedItemVo>, streamerInfoService: StreamerInfoService): Array<ScheduleCheckedItemVo> {
  return origData.map((dto) => {
    return fromDto(dto.id, dto, streamerInfoService)
  })
}
