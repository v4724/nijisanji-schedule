import { UpdatedRecordType } from '@app/model/enum/UpdatedRecordType'
import * as moment from 'moment-timezone'

export interface UpdatedRecordDto {
  message: string,
  type: string,
  timestamp: number
}

export function getDto (type: UpdatedRecordType, message: string) {
  return {
    message: message,
    type: type,
    timestamp: moment().valueOf()
  }
}
