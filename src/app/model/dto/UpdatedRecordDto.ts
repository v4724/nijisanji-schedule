import { UpdatedRecordType } from '@app/model/enum/UpdatedRecordType'
import * as moment from 'moment-timezone'

export interface UpdatedRecordDto {
  streamer: string,
  message: string,
  type: string,
  timestamp: number
}

export function getDto (streamer: string, type: UpdatedRecordType, message: string) {
  return {
    streamer: streamer,
    message: message,
    type: type,
    timestamp: moment().valueOf()
  }
}
