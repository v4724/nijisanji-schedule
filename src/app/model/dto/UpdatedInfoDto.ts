import { UpdatedInfoType } from '@app/model/enum/UpdatedInfoType'
import * as moment from 'moment-timezone'

export interface UpdatedInfoDto {
  message: string,
  type: string,
  timestamp: number
}

export function getDto (type: UpdatedInfoType, message: string) {
  return {
    message: message,
    type: type,
    timestamp: moment().valueOf()
  }
}
