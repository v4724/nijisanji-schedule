import { OCRSchedule, TextAnnotation } from '@app/feature/ocr/ocr.component'
import * as lodash from 'lodash'
import { Point, StreamCountPoint, TitlePoint } from '@app/model/data/ocr/Point'
import * as moment from 'moment-timezone'
import { getTimezoneValue, Timezone } from '@app/model/enum/Timezone'
import { isNumeric } from 'rxjs/internal-compatibility'

export interface AnchorPoint {
  x: number,
  y: number
}
export interface PointBoundary {
  vertical: number,
  horizon: number
}

export interface StreamAnchorPoint {
  time: AnchorPoint,
  hourSystem: AnchorPoint,
  timezone: AnchorPoint,
  titleCenter: AnchorPoint,
}

export interface StreamAnchor {
  month?: AnchorPoint,
  day?: AnchorPoint,
  date: AnchorPoint,
  streamCountPoint: AnchorPoint,
  singleStream: StreamAnchorPoint,
  multiStream: {
    first: StreamAnchorPoint,
    second: StreamAnchorPoint
  }
}

export interface ScheduleAnchor {
  pointBoundary: PointBoundary,
  streamCounterBoundary: PointBoundary,
  titleBoundary: PointBoundary,
  titleMultiBoundary: PointBoundary,
  streamAnchors: Array<StreamAnchor>
}

function zoom (anchor: AnchorPoint, zoomRatio: number){
  anchor.x *= zoomRatio
  anchor.y *= zoomRatio
}

export default class TransferScheduleOCR {

  baseWidth: number  = 1296
  clientWidth: number = 1296

  pointHorizonBoundary = -1
  pointVerticalBoundary = -1

  streamCountHorizonBoundary = -1
  streamCountVerticalBoundary = -1

  titleHorizonBoundary = -1
  titleVerticalBoundary = -1

  titleMultiHorizonBoundary = -1
  titleMultiVerticalBoundary = -1

  anchors: Array<StreamAnchor> =[]
  textAnnotations: Array<TextAnnotation> = []
  tz: string = ''

  constructor (clientWidth: number, scheduleAnchor: ScheduleAnchor, textAnnotations: Array<TextAnnotation>, tz?: string) {
    this.clientWidth = clientWidth
    this.textAnnotations = textAnnotations
    this.tz = tz ?? ''

    this.pointHorizonBoundary = scheduleAnchor.pointBoundary.horizon
    this.pointVerticalBoundary = scheduleAnchor.pointBoundary.vertical
    this.streamCountHorizonBoundary = scheduleAnchor.streamCounterBoundary.horizon
    this.streamCountVerticalBoundary = scheduleAnchor.streamCounterBoundary.vertical
    this.titleHorizonBoundary = scheduleAnchor.titleBoundary.horizon
    this.titleVerticalBoundary = scheduleAnchor.titleBoundary.vertical
    this.titleMultiHorizonBoundary = scheduleAnchor.titleMultiBoundary.horizon
    this.titleMultiVerticalBoundary = scheduleAnchor.titleMultiBoundary.vertical

    this.pointHorizonBoundary = this.pointHorizonBoundary * this.zoomRatio
    this.pointVerticalBoundary = this.pointVerticalBoundary * this.zoomRatio
    this.streamCountHorizonBoundary = this.streamCountHorizonBoundary * this.zoomRatio
    this.streamCountVerticalBoundary = this.streamCountVerticalBoundary * this.zoomRatio
    this.titleHorizonBoundary = this.titleHorizonBoundary * this.zoomRatio
    this.titleVerticalBoundary = this.titleVerticalBoundary * this.zoomRatio
    this.titleMultiHorizonBoundary = this.titleMultiHorizonBoundary * this.zoomRatio
    this.titleMultiVerticalBoundary = this.titleMultiVerticalBoundary * this.zoomRatio

    this.anchors = lodash.cloneDeep(scheduleAnchor.streamAnchors)
    this.anchors.forEach((a) => {
      zoom(a.date, this.zoomRatio)
      zoom(a.streamCountPoint, this.zoomRatio)
      zoom(a.singleStream.time, this.zoomRatio)
      zoom(a.singleStream.hourSystem, this.zoomRatio)
      zoom(a.singleStream.timezone, this.zoomRatio)
      zoom(a.singleStream.titleCenter, this.zoomRatio)
      zoom(a.multiStream.first.time, this.zoomRatio)
      zoom(a.multiStream.first.hourSystem, this.zoomRatio)
      zoom(a.multiStream.first.timezone, this.zoomRatio)
      zoom(a.multiStream.first.titleCenter, this.zoomRatio)
      zoom(a.multiStream.second.time, this.zoomRatio)
      zoom(a.multiStream.second.hourSystem, this.zoomRatio)
      zoom(a.multiStream.second.timezone, this.zoomRatio)
      zoom(a.multiStream.second.titleCenter, this.zoomRatio)
    })
  }

  get zoomRatio (): number {
    const clientW = this.clientWidth
    const baseW = this.baseWidth
    return clientW/baseW
  }

  get schedule (): Array<OCRSchedule> {
    const schedule: Array<OCRSchedule> = []

    this.anchors.forEach((anchor) => {

      const streams = []
      let month  = ''
      let day  = ''
      let date = ''
      const streamCountP = this.getStreamCountPoint(anchor.streamCountPoint.x, anchor.streamCountPoint.y, this.streamCountVerticalBoundary, this.streamCountHorizonBoundary)
      if (streamCountP.noStream(this.textAnnotations)) {
        console.log('noStream')
        schedule.push(<OCRSchedule>{
          month: '',
          day: findTextAnnotation(anchor.day, this.textAnnotations, 10, 40)?.description ?? '',
          date: '',
          streams: []
        })
        return
      } else if (streamCountP.oneStream(this.textAnnotations)) {
        console.log('single')
        month = findTextAnnotation(anchor.month, this.textAnnotations, this.pointVerticalBoundary, this.pointHorizonBoundary)?.description ?? ''
        day = findTextAnnotation(anchor.day, this.textAnnotations, 10, 40)?.description ?? ''
        date = findTextAnnotation(anchor.date, this.textAnnotations, this.pointVerticalBoundary, this.pointHorizonBoundary)?.description ?? ''
        const time = findTextAnnotation(anchor.singleStream.time, this.textAnnotations, this.pointVerticalBoundary, this.pointHorizonBoundary)?.description
        const hourSystem = findTextAnnotation(anchor.singleStream.hourSystem, this.textAnnotations, this.pointVerticalBoundary, this.pointHorizonBoundary)?.description
        const timezone = findTextAnnotation(anchor.singleStream.timezone, this.textAnnotations, this.pointVerticalBoundary, this.pointHorizonBoundary)?.description
        const titleP = new TitlePoint(anchor.singleStream.titleCenter.x, anchor.singleStream.titleCenter.y, this.titleVerticalBoundary, this.titleHorizonBoundary)
        const title = titleP.getTitle(this.textAnnotations)

        // console.log(titleP, title)
        streams.push({
          time: time,
          hourSystem: hourSystem,
          timezone: timezone,
          title: title
        })
      } else if (streamCountP.twoStream(this.textAnnotations)) {

        console.log('multi')
        month = findTextAnnotation(anchor.month, this.textAnnotations, this.pointVerticalBoundary, this.pointHorizonBoundary)?.description ?? ''
        day = findTextAnnotation(anchor.day, this.textAnnotations, 10, 40)?.description ?? ''
        date = findTextAnnotation(anchor.date, this.textAnnotations, this.pointVerticalBoundary, this.pointHorizonBoundary)?.description ?? ''

        const titleP = new TitlePoint(anchor.multiStream.first.titleCenter.x, anchor.multiStream.first.titleCenter.y, this.titleMultiVerticalBoundary, this.titleMultiHorizonBoundary)
        const title = titleP.getTitle(this.textAnnotations)

        // console.log(titleP, title)
        streams.push({
          time: findTextAnnotation(anchor.multiStream.first.time, this.textAnnotations, this.pointVerticalBoundary, this.pointHorizonBoundary)?.description,
          hourSystem: findTextAnnotation(anchor.multiStream.first.hourSystem, this.textAnnotations, this.pointVerticalBoundary, this.pointHorizonBoundary)?.description,
          timezone: findTextAnnotation(anchor.multiStream.first.timezone, this.textAnnotations, this.pointVerticalBoundary, this.pointHorizonBoundary)?.description,
          title: title
        })

        const titleP2 = new TitlePoint(anchor.multiStream.second.titleCenter.x, anchor.multiStream.second.titleCenter.y, this.titleMultiVerticalBoundary, this.titleMultiHorizonBoundary)
        const title2 = titleP2.getTitle(this.textAnnotations)

        // console.log(titleP2, title2)
        streams.push({
          time: findTextAnnotation(anchor.multiStream.second.time, this.textAnnotations, this.pointVerticalBoundary, this.pointHorizonBoundary)?.description,
          hourSystem: findTextAnnotation(anchor.multiStream.second.hourSystem, this.textAnnotations, this.pointVerticalBoundary, this.pointHorizonBoundary)?.description,
          timezone: findTextAnnotation(anchor.multiStream.second.timezone, this.textAnnotations, this.pointVerticalBoundary, this.pointHorizonBoundary)?.description,
          title: title2
        })
      }

      schedule.push(<OCRSchedule>{
        month: month,
        day: day,
        date: date,
        streams: streams
      })
      console.log('date', date, streams)
    })
    return schedule
  }

  updateScheduleByTz(tz: string, orig: Array<OCRSchedule>): Array<OCRSchedule> {
// console.log('updateScheduleByTz', !orig.length, orig)
    if (!orig.length) {
      return []
    }

    let list = lodash.cloneDeep(orig)
    const startDay = list[0].day

    list.forEach((dateSchedule, index) => {
      if (!dateSchedule.date) {
        return
      }
      const date = this.getDate(dateSchedule.date, index, dateSchedule.day, startDay)
      const month = this.getMonth(dateSchedule.date, dateSchedule.month)
      dateSchedule.date = date.toString()

      // shu
      dateSchedule.streams = dateSchedule.streams.filter(s => s.time !== '-')

      dateSchedule.streams.forEach(s => {
        s.featStreamers = []

        if (!s.time) {
          return
        }

        const timezone = this.tz ? this.tz : getTimezoneValue(s.timezone)
        const time = this.getTime(s.time)
        let hour = Number.parseInt(time.split(':')[0])
        let min = Number.parseInt(time.split(':')[1])
        const hourSystem = this.getHourSystem(s.hourSystem)
        if (hourSystem === 'PM' && hour < 12 ) {
          hour += 12
        }

        // shu
        if (Number.isNaN(hour)) {
          return
        }

        let dateTime = moment()
          .tz(timezone)
          .set('month', month)
          .set('date', date)
          .set('hour', hour)
          .set('minute', min)
          .set('second', 0)
          .set('millisecond', 0)

        s.timezone = timezone
        s.date = dateTime.format('YYYY-MM-DD')
        s.time = dateTime.format('HH:mm')
        s.timestamp = dateTime.valueOf()
        s.scheduleOrigDisplayText = dateTime.format('YYYY/MM/DD HH:mm z')
        s.scheduleTzDisplayText = dateTime.tz(tz).format('YYYY/MM/DD HH:mm z')

        console.log('s', s, month, date, hour, min, timezone)
      })

    })

    list = list.filter(dateSchedule => !!dateSchedule.date)
     list.map(s => {
       if (s.streams[0]) {
         s.date = s.streams[0].date ? s.streams[0].date.split('-')[2] : s.date
       }
     })
    console.log('list', list)
    return list
  }

  getStreamCountPoint(anchorX: number, anchorY: number, vBoundary: number, hBoundary: number): StreamCountPoint {
    let targetTz = this.tz
    let targetTz2 = undefined
    switch (targetTz) {
      case Timezone.EST5EDT:
        targetTz = 'EST'
        targetTz2 = 'EDT'
        break;
      case Timezone.PST8PDT:
        targetTz = 'PST'
        targetTz2 = 'PDT'
        break;
      case Timezone.GMT:
        targetTz = 'PST'
        break;
      case Timezone.JST:
        targetTz = 'JST'
        break;
      case Timezone.BST:
        targetTz = 'BST'
        break;
      case Timezone.AEST:
        targetTz = 'AEST'
        break;
      case Timezone.WIB:
        targetTz = 'WIB'
        break;
    }

    // console.log(targetTz, targetTz2)
    return new StreamCountPoint(anchorX, anchorY, vBoundary, hBoundary, targetTz, targetTz2)
  }

  // date only
  getDate(date: string, index: number, day?: string, startDay?: string): number {
    console.log('date', date)
    if (date.indexOf('-') > 0) {
      const arr = date.split('-')
      return Number.parseInt(arr[0]) + index
    }

    return Number.parseInt(date) + index
  }

  // month only
  getMonth(date: string, month?: string): number {
    if (month && isNumeric(month)) {
      return Number.parseInt(month) -1
    }

    if (month && isNaN(Number(month))) {
      const m = moment().month(month).month()
      return m
    }

    if (date.indexOf('/') > -1 && !month) {
      const arr = date.split('/')
      return Number.parseInt(arr[0]) - 1
    }

    if (date.indexOf('.') > -1 && !month) {
      const arr = date.split('.')
      return Number.parseInt(arr[0]) - 1
    }

    return moment().month()
  }

  getTime(time: string): string {
    console.log('time', time)
    if (time.indexOf(':') > 0) {
      return time
    }

    if (time.length == 1 || time.length == 2) {
      return `${time}:00`
    }

    return `${time.slice(0, time.length - 2)}:00`
  }

  getHourSystem(hourSystem: string): string {
    if (hourSystem && hourSystem.length > 2) {
      return hourSystem.slice(hourSystem.length - 2, hourSystem.length).toUpperCase()
    }

    return hourSystem?.toUpperCase()
  }
}

function findTextAnnotation (anchor: any, textAnnotations: Array<TextAnnotation>, vBoundary?: number, hBoundary?: number): TextAnnotation | undefined {
  if (!anchor) {
    return undefined
  }

  const x = anchor.x
  const y = anchor.y
  const anchorP: Point = new Point(x, y, vBoundary, hBoundary)

  const find = textAnnotations.find((text: TextAnnotation) => {
    const x = text.x ?? 1
    const y = text.y ?? 1
    const target = new Point(x, y)
    // if (text.description === '14-08')
    //   console.log('text', text.description)
    const contains = anchorP.contains(target)
    // if (text.description === '14-08')
    //   console.log('contains', contains)
    return contains
  })

  return find
}
