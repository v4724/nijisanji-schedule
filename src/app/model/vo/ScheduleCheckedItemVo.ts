import { StreamerInfoVo } from '@app/model/vo/StreamerInfoVo'
import { ScheduleCheckedState } from '@app/model/enum/ScheduleCheckedState'

export interface ScheduleCheckedItemVo {
  id: string,
  streamer: string,
  streamerInfo: StreamerInfoVo | undefined,
  updatedTimestamp: number,
  state: ScheduleCheckedState
}
