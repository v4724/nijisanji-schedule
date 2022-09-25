import { ScheduleAnchor, StreamAnchor } from '@app/model/factory/ocr/transferScheduleOCR'
import { OCRAnchorVo } from '@app/model/vo/OCRAnchorVo'
import { QueryDocumentSnapshot } from '@angular/fire/compat/firestore'

export interface OCRAnchorDto {
  streamer: string,
  anchorJson: string
}

export function toDto (streamer: string, scheduleAnchor: ScheduleAnchor | undefined): OCRAnchorDto {
  // const newFormat = {
  //   pointBoundary: {
  //     vertical: scheduleAnchor?.pointVerticalBoundary,
  //     horizon: scheduleAnchor?.pointHorizonBoundary
  //   },
  //   streamCounterBoundary: {
  //     vertical: scheduleAnchor?.pointVerticalBoundary,
  //     horizon: scheduleAnchor?.pointHorizonBoundary
  //   },
  //   titleBoundary: {
  //     vertical: scheduleAnchor?.titleVerticalBoundary,
  //     horizon: scheduleAnchor?.titleHorizonBoundary
  //   },
  //   titleMultiBoundary: {
  //     vertical: scheduleAnchor?.titleMultiVerticalBoundary,
  //     horizon: scheduleAnchor?.titleMultiHorizonBoundary
  //   },
  //   streamAnchors: scheduleAnchor?.streamAnchors
  // }
  const anchors: string = JSON.stringify(scheduleAnchor)

  const item: OCRAnchorDto = {
    streamer: streamer,
    anchorJson: anchors
  }

  return item
}

export function fromDto (id: string, dto: OCRAnchorDto): OCRAnchorVo {
  const scheduleAnchor: ScheduleAnchor = JSON.parse(dto.anchorJson)

  const item: OCRAnchorVo = {
    id: id,
    streamer: dto.streamer,
    anchor: scheduleAnchor
  }

  return item
}

export function toVoList (origData: Array<QueryDocumentSnapshot<OCRAnchorDto>>): Array<OCRAnchorVo> {
  const data: Array<OCRAnchorVo> = []
  origData.forEach((doc) => {
    const origItem = doc.data()
    const item = fromDto(doc.id, origItem)
    data.push(item)
  })

  return data
}
