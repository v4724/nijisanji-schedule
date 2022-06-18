import { StreamerInfoVo } from '@app/model/vo/StreamerInfoVo'
import { ScheduleCheckedState } from '@app/model/dto/ScheduleCheckedItemDto'

export interface ScheduleCheckedItemVo {
  id: string,
  streamer: string,
  streamerInfo: StreamerInfoVo | undefined,
  updatedTimestamp: number,
  state: ScheduleCheckedState
}
