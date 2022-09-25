import { OCRSchedule } from '@app/feature/ocr/ocr.component'
import * as lodash from 'lodash'
import { Point } from '@app/model/factory/ocr/Point'
import * as moment from 'moment-timezone'
import { getTimezoneValue, Timezone } from '@app/model/enum/Timezone'
import { isNumeric } from 'rxjs/internal-compatibility'
import { TemplateAnchor } from '@app/model/vo/ScheduleTemplate/TemplateAnchor'
import { StreamAnchor } from '@app/model/vo/ScheduleTemplate/StreamAnchor'
import { BoundingBox } from '@app/model/vo/ScheduleTemplate/BoundingBox'
import { TextAnnotation } from '@app/model/factory/ocr/TextAnnotation'

function zoom (boundingBox: BoundingBox | undefined, zoomRatio: number) {
  if (!boundingBox)
    return

  boundingBox.vertices.forEach((v) => {
    v.x *= zoomRatio
    v.y *= zoomRatio
  })
}

export default class ScheduleResult {

  baseWidth: number = 1296
  clientWidth: number = 1296

  pointHorizonBoundary = -1
  pointVerticalBoundary = -1

  streamCountHorizonBoundary = -1
  streamCountVerticalBoundary = -1

  titleHorizonBoundary = -1
  titleVerticalBoundary = -1

  titleMultiHorizonBoundary = -1
  titleMultiVerticalBoundary = -1

  defaultStartDate: BoundingBox | undefined
  defaultMonth: BoundingBox | undefined
  anchors: Array<StreamAnchor> = []
  textAnnotations: Array<TextAnnotation> = []
  tz: string = ''

  constructor (clientWidth: number, scheduleAnchor: TemplateAnchor, textAnnotations: Array<TextAnnotation>, tz?: string) {
    this.clientWidth = clientWidth
    this.textAnnotations = textAnnotations
    this.tz = tz ?? ''

    this.defaultMonth = scheduleAnchor.defaultMonth
    this.defaultStartDate = scheduleAnchor.defaultStartDate
    this.anchors = lodash.cloneDeep(scheduleAnchor.streamAnchors)
    this.anchors.forEach((a) => {
      zoom(a.date, this.zoomRatio)
      zoom(a.streamCounter, this.zoomRatio)
      zoom(a.singleStream.time, this.zoomRatio)
      zoom(a.singleStream.hourSystem, this.zoomRatio)
      zoom(a.singleStream.title, this.zoomRatio)
      zoom(a.multiStream.first.time, this.zoomRatio)
      zoom(a.multiStream.first.hourSystem, this.zoomRatio)
      zoom(a.multiStream.first.title, this.zoomRatio)
      zoom(a.multiStream.second.time, this.zoomRatio)
      zoom(a.multiStream.second.hourSystem, this.zoomRatio)
      zoom(a.multiStream.second.title, this.zoomRatio)
    })
  }

  get zoomRatio (): number {
    const clientW = this.clientWidth
    const baseW = this.baseWidth
    return clientW / baseW
  }

  // 取得文字位置
  get schedule (): Array<OCRSchedule> {
    const schedule: Array<OCRSchedule> = []

    const defaultStartDate = this.findTextAnnotation(this.defaultStartDate, this.textAnnotations)?.description ?? ''
    const defaultMonth = this.findTextAnnotation(this.defaultMonth, this.textAnnotations)?.description ?? ''
    // console.log('defaultMonth', defaultMonth)
    // console.log('defaultStartDate', defaultStartDate)

    this.anchors.forEach((anchor: StreamAnchor, index: number) => {

      const streams = []
      if (this.noStream(anchor.streamCounter, this.textAnnotations)) {
        console.log('noStream')
      } else if (this.oneStream(anchor.streamCounter, this.textAnnotations)) {
        console.log('single')
        const time = this.findTextAnnotation(anchor.singleStream.time, this.textAnnotations)?.description
        const hourSystem = this.findTextAnnotation(anchor.singleStream.hourSystem, this.textAnnotations)?.description
        const title = this.getTitle(anchor.singleStream.title, this.textAnnotations)

        // console.log(titleP, title)
        streams.push({
          time: time,
          hourSystem: hourSystem,
          timezone: this.tz,
          title: title
        })
      } else if (this.twoStream(anchor.streamCounter, this.textAnnotations)) {

        console.log('multi')

        const title = this.getTitle(anchor.multiStream.first.title, this.textAnnotations)

        // console.log(titleP, title)
        streams.push({
          time: this.findTextAnnotation(anchor.multiStream.first.time, this.textAnnotations)?.description,
          hourSystem: this.findTextAnnotation(anchor.multiStream.first.hourSystem, this.textAnnotations)?.description,
          timezone: this.tz,
          title: title
        })

        const title2 = this.getTitle(anchor.multiStream.second.title, this.textAnnotations)

        // console.log(titleP2, title2)
        streams.push({
          time: this.findTextAnnotation(anchor.multiStream.second.time, this.textAnnotations)?.description,
          hourSystem: this.findTextAnnotation(anchor.multiStream.second.hourSystem, this.textAnnotations)?.description,
          timezone: this.tz,
          title: title2
        })
      }

      let month = defaultMonth
      let day = ''
      let date = defaultStartDate
      if (anchor.month?.exist) {
        month = this.findTextAnnotation(anchor.month, this.textAnnotations)?.description ?? ''
      } else {
        month = this.getMonth(date, month).toString()
      }
      if (anchor.date?.exist) {
        date = this.findTextAnnotation(anchor.date, this.textAnnotations)?.description ?? ''
        date = this.getDate(date, 0).toString()
      } else {
        date = this.getDate(defaultStartDate, index).toString()
      }

      schedule.push(<OCRSchedule>{
        month: month,
        date: date,
        streams: streams
      })
      console.log('date', date, streams)
    })
    return schedule
  }

  // 處理時區/時間/文字顯示格式
  updateScheduleByTz (tz: string, orig: Array<OCRSchedule>): Array<OCRSchedule> {
    // console.log('updateScheduleByTz', !orig.length, orig)
    if (!orig.length) {
      return []
    }

    let list = lodash.cloneDeep(orig)
    list.forEach((dateSchedule, index) => {

      dateSchedule.date = dateSchedule.date.toString()

      // shu
      // dateSchedule.streams = dateSchedule.streams.filter(s => s.time !== '-')

      dateSchedule.streams.forEach(s => {
        // console.log('orig s', lodash.cloneDeep(s))

        s.featStreamers = []

        const timezone = getTimezoneValue(this.tz)
        let dateTime = moment().tz(timezone)
                               .set('month', Number.parseInt(dateSchedule.month))
                               .set('date', Number.parseInt(dateSchedule.date))
                               .set('hour', 0)
                               .set('minute', 0)
                               .set('second', 0)
                               .set('millisecond', 0)

        if (s.time) {
          const time = this.getTime(s.time)
          let hour = Number.parseInt(time.split(':')[0])
          let min = Number.parseInt(time.split(':')[1])
          const hourSystem = this.getHourSystem(s.hourSystem)
          if (hourSystem === 'PM' && hour < 12) {
            hour += 12
          }

          dateTime = dateTime
            .set('hour', hour)
            .set('minute', min)
            .set('second', 0)
            .set('millisecond', 0)

          // shu
          // if (Number.isNaN(hour)) {
          //   return
          // }
        }

        s.timezone = timezone
        s.date = dateTime.format('YYYY-MM-DD')
        s.time = dateTime.format('HH:mm')
        s.timestamp = dateTime.valueOf()
        s.scheduleOrigDisplayText = dateTime.format('YYYY/MM/DD HH:mm z')
        s.scheduleTzDisplayText = dateTime.tz(tz).format('YYYY/MM/DD HH:mm z')

        // console.log('new s', s)
      })

    })

    // list = list.filter(dateSchedule => !!dateSchedule.date)
    list.forEach((s) => {
      if (s.streams.length) {
        s.date = s.streams[0].date ? s.streams[0].date.split('-')[2] : s.date
      }
    })
    return list
  }

  getScheduleTzList (): Array<string> {
    const targetTzList = []
    let targetTz = this.tz
    switch (targetTz) {
      case Timezone.EST5EDT:
        targetTzList.push('EST')
        targetTzList.push('EDT')
        targetTzList.push('ET')
        break
      case Timezone.PST8PDT:
        targetTzList.push('PST')
        targetTzList.push('PDT')
        targetTzList.push('PT')
        break
      case Timezone.GMT:
        targetTzList.push('PST')
        break
      case Timezone.JST:
        targetTzList.push('JST')
        break
      case Timezone.BST:
        targetTzList.push('BST')
        break
      case Timezone.AEST:
        targetTzList.push('AEST')
        break
      case Timezone.WIB:
        targetTzList.push('WIB')
        break
    }

    return targetTzList
  }

  // date only
  getDate (date: string, index: number): number {
    // console.log('date', date)
    if (date.indexOf('-') > 0) {
      const arr = date.split('-')
      return Number.parseInt(arr[0]) + index
    }

    return Number.parseInt(date) + index
  }

  // month only
  getMonth (date: string, month?: string): number {
    if (month && isNumeric(month)) {
      return Number.parseInt(month) - 1
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

  getTime (time: string): string {
    // console.log('time', time)
    if (time.indexOf(':') > 0) {
      return time
    }

    if (time.length == 1 || time.length == 2) {
      return `${ time }:00`
    }

    return `${ time.slice(0, time.length - 2) }:00`
  }

  getHourSystem (hourSystem: string): string {
    if (hourSystem && hourSystem.length > 2) {
      return hourSystem.slice(hourSystem.length - 2, hourSystem.length).toUpperCase()
    }

    return hourSystem?.toUpperCase()
  }

  findTextAnnotation (boundingBox: BoundingBox | undefined, textAnnotations: Array<TextAnnotation>): TextAnnotation | undefined {
    if (!boundingBox) {
      return undefined
    }

    const find = textAnnotations.find((text: TextAnnotation) => {
      const x = text.x ?? 1
      const y = text.y ?? 1
      const target = new Point(x, y)
      // if (text.description === '14-08')
      //   console.log('text', text.description)
      const contains = boundingBox.contains(target)
      // if (text.description === '14-08')
      //   console.log('contains', contains)
      return contains
    })

    return find
  }

  findStream (boundary: BoundingBox, targets: Array<TextAnnotation>): Array<TextAnnotation> {
    const targetTzList = this.getScheduleTzList()
    // console.log('find', this.x, this.y)
    const find = targets.filter(t => {
      const target = new Point(t.x ?? 1, t.y ?? 1)
      const contains = boundary.contains(target)
      // if ((t.description === 'PDT' || t.description === 'PST')) {
      //   console.log(contains, this.targetTz, this.targetTz2, t.description === this.targetTz, (this.targetTz2 && t.description === this.targetTz2))
      // console.log(t.description === 'PDT', this.targetTz, t.description === this.targetTz)
      // console.log(t.description === 'PST', this.targetTz2, t.description === this.targetTz2)
      // }
      return contains && targetTzList.indexOf(t.description) > -1
    })
    // console.log('find re', find)
    return find
  }

  noStream (boundary: BoundingBox, targets: Array<TextAnnotation>): boolean {
    // console.log('noStream')
    return this.findStream(boundary, targets).length == 0
  }

  oneStream (boundary: BoundingBox, targets: Array<TextAnnotation>): boolean {
    return this.findStream(boundary, targets).length == 1
  }

  twoStream (boundary: BoundingBox, targets: Array<TextAnnotation>): boolean {
    return this.findStream(boundary, targets).length == 2
  }

  getTitle (boundingBox: BoundingBox, targets: Array<TextAnnotation>): string {
    const titles = targets.filter((text: TextAnnotation) => {
      const x = text.x ?? 1
      const y = text.y ?? 1
      const target = new Point(x, y)
      return boundingBox.contains(target)
    })

    titles.sort((t1, t2) => {
      const t1X = t1.x ?? 1
      const t1Y = t1.y ?? 1
      const t2X = t2.x ?? 1
      const t2Y = t2.y ?? 1
      if (t1X > t2X) {
        return 1
      } else if (t1Y > t2Y) {
        return 1
      } else {
        return -1
      }
    })

    let title = titles.map((o) => o.description).join(' ')
    title = title.replace(' : ', ': ')
    title = title.replace(' . ', '. ')
    title = title.replace(' , ', ', ')
    // title = title.replace(' - ', '-')
    // title = title.replace(' / ', '/')
    return title
  }
}
