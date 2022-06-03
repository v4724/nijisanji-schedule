import { ScheduleAnchor } from '@app/model/data/ocr/TransferScheduleOCR'
import * as anchors from '@app/model/data/ocr/anchors'
import * as lodash from 'lodash'

export interface OCRAnchorVo {
  id: string,
  streamer: string,
  anchor: ScheduleAnchor
}

export function initOCRAnchor (): OCRAnchorVo {
  const anchor = lodash.cloneDeep(anchors.empty)

  return {
    id: '',
    streamer: '',
    anchor: anchor
  }
}

