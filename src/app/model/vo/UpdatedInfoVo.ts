import { StreamerInfoDto } from '@app/model/dto/StreamerInfoDto'
import { ScheduleCheckedItemDto } from '@app/model/dto/ScheduleCheckedItemDto'
import { StreamDto } from '@app/model/dto/StreamDto'
import { ScheduleCheckedState } from '@app/model/enum/ScheduleCheckedState'
import * as moment from 'moment-timezone'

export interface UpdatedInfoVo {
  id: string,
  message: string,
  type: string,
  timestamp: number,
  displayDateTime: string,
}

export function updateVoList (list: Array<UpdatedInfoVo>, tz: string) {
  list.forEach(vo => {
    vo.displayDateTime = moment(vo.timestamp).tz(tz).format('YYYY/MM/DD HH:mm')
  })
}

export function getAddMemberMessage (info: StreamerInfoDto) {
  return `streamer: There is a new streamer ${info.name} added on schedule.`
}

export function getRemoveMemberMessage (info: StreamerInfoDto) {
  return `streamer: There is a streamer ${info.name} removed from schedule.`
}

export function getUpdatedScheduleMessage (item: ScheduleCheckedItemDto) {

  let message = ''
  switch (item.state) {
    case ScheduleCheckedState.break:
      message = `${item.streamer} take a break for this week.`
      break;
    case ScheduleCheckedState.checked:
      message = `The schedule of ${item.streamer} is updated for this week.`
      break;
  }

  return `schedule: ${message}`
}

export function getUpdatedStreamMessage (stream: StreamDto) {

  let message = ''
  if (stream.isCanceled) {
    message = `${stream.streamer} cancel '${stream.title}'`
  }
  if (stream.isModified) {
    message = `${stream.streamer} modify the time of '${stream.title}'`
  }

  return `stream: ${message}`
}
