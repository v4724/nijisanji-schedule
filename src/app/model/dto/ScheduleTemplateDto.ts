import { AnchorPoint, PointBoundary, ScheduleAnchor, StreamAnchorPoint } from '@app/model/factory/ocr/transferScheduleOCR/TransferScheduleOCR'
import { QueryDocumentSnapshot } from '@angular/fire/compat/firestore'
import { ScheduleTemplateVo } from '@app/model/vo/ScheduleTemplate/ScheduleTemplateVo'
import { TemplateAnchor } from '@app/model/vo/ScheduleTemplate/TemplateAnchor'
import { Vertex } from '@app/model/vo/ScheduleTemplate/Vertex'
import { BoundingBox } from '@app/model/vo/ScheduleTemplate/BoundingBox'
import { SingleStreamAnchor } from '@app/model/vo/ScheduleTemplate/SingleStreamAnchor'

export interface ScheduleTemplateDto {
  streamer: string,
  name: string,
  templateUrl: string,
  anchorJson: string
}

export function toDto (vo: ScheduleTemplateVo): ScheduleTemplateDto {

  const anchors: string = JSON.stringify(vo.anchor)

  const item: ScheduleTemplateDto = {
    streamer: vo.streamer,
    name: vo.name,
    templateUrl: vo.templateUrl,
    anchorJson: anchors
  }

  return item
}

export function fromDto (id: string, dto: ScheduleTemplateDto): ScheduleTemplateVo {

  let anchor = JSON.parse(dto.anchorJson)
  if (!anchor.hasOwnProperty('version')) {
    anchor = fromOldScheduleAnchor(anchor)
  }
  else if (anchor.hasOwnProperty('version')) {
    anchor = fromJsonObject(anchor) as TemplateAnchor
  }

  const item: ScheduleTemplateVo = {
    id: id,
    streamer: dto.streamer,
    name: dto.name,
    templateUrl: dto.templateUrl,
    anchor: anchor
  }

  return item
}

export function toVoList (origData: Array<QueryDocumentSnapshot<ScheduleTemplateDto>>): Array<ScheduleTemplateVo> {
  const data: Array<ScheduleTemplateVo> = []
  origData.forEach((doc) => {
    const origItem = doc.data()
    const item = fromDto(doc.id, origItem)
    data.push(item)
  })

  return data
}

function fromJsonObject (jsonTA: TemplateAnchor): TemplateAnchor {
  const newTA = new TemplateAnchor()
  newTA.defaultMonth.vertices = jsonTA.defaultMonth.vertices
  newTA.defaultStartDate.vertices = jsonTA.defaultStartDate.vertices
  jsonTA.streamAnchors.forEach((jsonSA, index) => {
    const newSA = newTA.streamAnchors[index]
    if (newSA.date && jsonSA.date) {
      newSA.date.vertices = jsonSA.date.vertices
    }
    if (newSA.month && jsonSA.month) {
      newSA.month.vertices = jsonSA.month.vertices
    }
    newSA.streamCounter.vertices = jsonSA.streamCounter.vertices
    newSA.singleStream.title.vertices = jsonSA.singleStream.title.vertices
    newSA.singleStream.time.vertices = jsonSA.singleStream.time.vertices
    newSA.singleStream.hourSystem.vertices = jsonSA.singleStream.hourSystem.vertices
    newSA.multiStream.first.title.vertices = jsonSA.multiStream.first.title.vertices
    newSA.multiStream.first.time.vertices = jsonSA.multiStream.first.time.vertices
    newSA.multiStream.first.hourSystem.vertices = jsonSA.multiStream.first.hourSystem.vertices
    newSA.multiStream.second.title.vertices = jsonSA.multiStream.second.title.vertices
    newSA.multiStream.second.time.vertices = jsonSA.multiStream.second.time.vertices
    newSA.multiStream.second.hourSystem.vertices = jsonSA.multiStream.second.hourSystem.vertices

  })
  return newTA
}

function fromOldScheduleAnchor (old: ScheduleAnchor): TemplateAnchor {
  const newTA = new TemplateAnchor()

  const pointB = old.pointBoundary
  const streamCounterB = old.streamCounterBoundary
  const titleB = old.titleBoundary
  const titleMultiB = old.titleMultiBoundary

  old.streamAnchors.forEach((oldSA, index) => {
    const monthP = oldSA.month
    const dayP = oldSA.day
    const dateP = oldSA.date
    const streamCounterP = oldSA.streamCountPoint
    const singleStream = oldSA.singleStream
    const multiStream1 = oldSA.multiStream.first
    const multiStream2 = oldSA.multiStream.second

    if (index === 0) {
      if (monthP) {
        setBoundingBox(newTA.defaultMonth, monthP, pointB)
      }
      setBoundingBox(newTA.defaultStartDate, dateP, pointB)
    }

    const newSA = newTA.streamAnchors[index]
    setBoundingBox(newSA.streamCounter, streamCounterP, streamCounterB)
    setSingleStream(newSA.singleStream, singleStream, pointB, titleB)
    setSingleStream(newSA.multiStream.first, multiStream1, pointB, titleMultiB)
    setSingleStream(newSA.multiStream.second, multiStream2, pointB, titleMultiB)
  })

  return newTA
}

function setSingleStream (target: SingleStreamAnchor, source: StreamAnchorPoint, pointB: PointBoundary, titleB: PointBoundary) {
  setBoundingBox(target.time, source.time, pointB)
  setBoundingBox(target.hourSystem, source.hourSystem, pointB)
  setBoundingBox(target.title, source.titleCenter, titleB)
}

function setBoundingBox (target: BoundingBox, point: AnchorPoint, boundary: PointBoundary) {
  target.vertices = calVertices(point, boundary)
}

function calVertices (point: AnchorPoint, boundary: PointBoundary): Array<Vertex> {
  const vertices = []
  vertices.push(new Vertex(point.x - Number(boundary.horizon), point.y - Number(boundary.vertical)))
  vertices.push(new Vertex(point.x - Number(boundary.horizon), point.y + Number(boundary.vertical)))
  vertices.push(new Vertex(point.x + Number(boundary.horizon), point.y - Number(boundary.vertical)))
  vertices.push(new Vertex(point.x + Number(boundary.horizon), point.y + Number(boundary.vertical)))

  return vertices
}
