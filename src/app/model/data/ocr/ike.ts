import { OCRSchedule, TextAnnotation } from '@app/feature/ocr/ocr.component'
import * as lodash from 'lodash'

interface AnchorPoint {
  x: number,
  y: number
}

interface StreamAnchorPoint {
  time: AnchorPoint,
  hourSystem: AnchorPoint,
  timezone: AnchorPoint,
  titleCenter: AnchorPoint,
}

interface IkeDateAnchor {
  date: AnchorPoint,
  streamCountPoint: AnchorPoint,
  singleStream: StreamAnchorPoint,
  multiStream: {
    first: StreamAnchorPoint,
    second: StreamAnchorPoint
  }
}

function zoom (anchor: AnchorPoint, zoomRatio: number){
  anchor.x *= zoomRatio
  anchor.y *= zoomRatio
}

export default class TransferScheduleOCR {

  baseWidth: number  = 1296
  clientWidth: number = 1296

  pointHorizonBoundary = 7
  pointVerticalBoundary = 7

  streamCountHorizonBoundary = 20
  streamCountVerticalBoundary = 20

  titleHorizonBoundary = 110
  titleVerticalBoundary = 30

  anchors: Array<IkeDateAnchor> =[]
  textAnnotations: Array<TextAnnotation> = []

  constructor (clientWidth: number, textAnnotations: Array<TextAnnotation>) {
    this.clientWidth = clientWidth
    this.textAnnotations = textAnnotations

    this.pointHorizonBoundary = this.pointHorizonBoundary * this.zoomRatio
    this.pointVerticalBoundary = this.pointVerticalBoundary * this.zoomRatio
    this.streamCountHorizonBoundary = this.streamCountHorizonBoundary * this.zoomRatio
    this.streamCountVerticalBoundary = this.streamCountVerticalBoundary * this.zoomRatio
    this.titleHorizonBoundary = this.titleHorizonBoundary * this.zoomRatio
    this.titleVerticalBoundary = this.titleVerticalBoundary * this.zoomRatio

    this.anchors = lodash.cloneDeep(anchors)
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
      let date = ''
      const streamCountP = new StreamCountPoint(anchor.streamCountPoint.x, anchor.streamCountPoint.y, this.streamCountVerticalBoundary, this.streamCountHorizonBoundary)
      if (streamCountP.noStream(this.textAnnotations)) {
        // console.log('noStream')
        return
      } else if (streamCountP.oneStream(this.textAnnotations)) {
        // console.log('single')
        date = findTextAnnotation(anchor.date, this.textAnnotations)?.description ?? ''
        const time = findTextAnnotation(anchor.singleStream.time, this.textAnnotations)?.description
        const hourSystem = findTextAnnotation(anchor.singleStream.hourSystem, this.textAnnotations)?.description
        const timezone = findTextAnnotation(anchor.singleStream.timezone, this.textAnnotations)?.description
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

        // console.log('multi')
        date = findTextAnnotation(anchor.date, this.textAnnotations)?.description ?? ''

        const titleP = new TitlePoint(anchor.multiStream.first.titleCenter.x, anchor.multiStream.first.titleCenter.y, this.titleVerticalBoundary, this.titleHorizonBoundary)
        const title = titleP.getTitle(this.textAnnotations)

        // console.log(titleP, title)
        streams.push({
          time: findTextAnnotation(anchor.multiStream.first.time, this.textAnnotations)?.description,
          hourSystem: findTextAnnotation(anchor.multiStream.first.hourSystem, this.textAnnotations)?.description,
          timezone: findTextAnnotation(anchor.multiStream.first.timezone, this.textAnnotations)?.description,
          title: title
        })

        const titleP2 = new TitlePoint(anchor.multiStream.second.titleCenter.x, anchor.multiStream.second.titleCenter.y, this.titleVerticalBoundary, this.titleHorizonBoundary)
        const title2 = titleP2.getTitle(this.textAnnotations)

        // console.log(titleP2, title2)
        streams.push({
          time: findTextAnnotation(anchor.multiStream.second.time, this.textAnnotations)?.description,
          hourSystem: findTextAnnotation(anchor.multiStream.second.hourSystem, this.textAnnotations)?.description,
          timezone: findTextAnnotation(anchor.multiStream.second.timezone, this.textAnnotations)?.description,
          title: title2
        })
      }

      schedule.push(<OCRSchedule>{
        date: date,
        streams: streams
      })
      console.log('date', date, streams)
    })
    return schedule
  }
}


class Point {

  x: number = -1;
  y: number = -1;

  verticalBoundary: number = 2
  horizonBoundary: number = 2

  constructor (x: number, y: number, vBoundary?: number, hBoundary?: number) {
    this.x = x
    this.y = y
    this.verticalBoundary = vBoundary ?? this.verticalBoundary
    this.horizonBoundary = hBoundary ?? this.horizonBoundary
  }

  contains (target: Point) {

    const minX = this.x - this.horizonBoundary
    const minY = this.y - this.verticalBoundary
    const maxX = this.x + this.horizonBoundary
    const maxY = this.y + this.verticalBoundary
    const contains = minX <= target.x && maxX >= target.x
      && minY <= target.y && maxY >= target.y

    // console.log(target.x, target.y, this.x, this.y, minX, minY, maxX, maxY, contains)
    return contains
  }
}

class StreamCountPoint extends Point {

  findStream (targets: Array<TextAnnotation>): Array<TextAnnotation> {
    const find = targets.filter(t => {
      const target = new Point(t.x ?? 1, t.y ?? 1)
      return this.contains(target) && t.description === 'EST'
    })
    return find
  }

  noStream (targets: Array<TextAnnotation>): boolean {
    return this.findStream(targets).length == 0
  }

  oneStream (targets: Array<TextAnnotation>): boolean {
    return this.findStream(targets).length == 1
  }

  twoStream (targets: Array<TextAnnotation>): boolean {
    return this.findStream(targets).length == 2
  }
}

class TitlePoint extends Point {

  findTitles (targets: Array<TextAnnotation>): Array<TextAnnotation> {
    return filterTextAnnotations(this, targets)
  }

  getTitle (targets: Array<TextAnnotation>): string {
    const titles = this.findTitles(targets)
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

    let title = titles.map((o) => o.description ).join(' ')
    title = title.replace(' : ', ': ')
    title = title.replace(' . ', '. ')
    title = title.replace(' , ', ', ')
    title = title.replace(' - ', '-')
    title = title.replace(' / ', '/')
    return title
  }
}

function findTextAnnotation (anchor: any, textAnnotations: Array<TextAnnotation>): TextAnnotation | undefined {
  const x = anchor.x
  const y = anchor.y
  const anchorP: Point = new Point(x, y)

  const find = textAnnotations.find((text: TextAnnotation) => {
    const x = text.x ?? 1
    const y = text.y ?? 1
    const target = new Point(x, y)
    return anchorP.contains(target)
  })

  return find
}

function filterTextAnnotations (anchorP: Point, textAnnotations: Array<TextAnnotation>): Array<TextAnnotation> {

  const find = textAnnotations.filter((text: TextAnnotation) => {
    const x = text.x ?? 1
    const y = text.y ?? 1
    const target = new Point(x, y)
    return anchorP.contains(target)
  })

  return find
}

let anchors: Array<IkeDateAnchor> = [
  {
  date: { x: 735, y: 96, },
  streamCountPoint: { x: 968, y: 101, },
  singleStream: {
    time: { x: 920, y: 89, },
    hourSystem: { x: 950, y: 89, },
    timezone: { x: 972, y: 89, },
    titleCenter: { x: 1119, y: 109, }
  },
  multiStream: {
    first: {
      time: { x: 920, y: 89, },
      hourSystem: { x: 950, y: 89, },
      timezone: { x: 972, y: 89, },
      titleCenter: { x: 1119, y: 109, }
    },
    second: {
      time: { x: 922, y: 114, },
      hourSystem: { x: 950, y: 114, },
      timezone: { x: 972, y: 114, },
      titleCenter: { x: 1119, y: 118, }}
  }
},
  {
  date: { x: 736, y: 180, },
  streamCountPoint: { x: 968, y: 185, },
  singleStream: {
    time: { x: 920, y: 173, },
    hourSystem: { x: 950, y: 173, },
    timezone: { x: 972, y: 173, },
    titleCenter: { x: 1119, y: 189, }
  },
  multiStream: {
    first: {
      time: { x: 920, y: 173, },
      hourSystem: { x: 950, y: 173, },
      timezone: { x: 972, y: 173, },
      titleCenter: { x: 1119, y: 173, }
    },
    second: {
      time: { x: 920, y: 200, },
      hourSystem: { x: 950, y: 200, },
      timezone: { x: 972, y: 200, },
      titleCenter: { x: 1119, y: 205, }}
  }
},
  {
    date: { x: 736, y: 267, },
    streamCountPoint: { x: 968, y: 272, },
    singleStream: {
      time: { x: 918, y: 261, },
      hourSystem: { x: 949, y: 261, },
      timezone: { x: 970, y: 261, },
      titleCenter: { x: 1119, y: 277, }
    },
    multiStream: {
      first: {
        time: { x: 918, y: 261, },
        hourSystem: { x: 949, y: 261, },
        timezone: { x: 970, y: 261, },
        titleCenter: { x: 1119, y: 257, }
      },
      second: {
        time: { x: 921, y: 286, },
        hourSystem: { x: 947, y: 286, },
        timezone: { x: 967, y: 286, },
        titleCenter: { x: 1119, y: 290, }}
    }
  },
  {
    date: { x: 736, y: 357, },
    streamCountPoint: { x: 968, y: 361, },
    singleStream: {
      time: { x: 919, y: 348, },
      hourSystem: { x: 949, y: 348, },
      timezone: { x: 969, y: 348, },
      titleCenter: { x: 1119, y: 361, }
    },
    multiStream: {
      first: {
        time: { x: 919, y: 348, },
        hourSystem: { x: 949, y: 348, },
        timezone: { x: 969, y: 348, },
        titleCenter: { x: 1119, y: 349, }
      },
      second: {
        time: { x: 918, y: 373, },
        hourSystem: { x: 949, y: 373, },
        timezone: { x: 971, y: 373, },
        titleCenter: { x: 1119, y: 381, }}
    }
  },
  {
    date: { x: 736, y: 445, },
    streamCountPoint: { x: 968, y: 450, },
    singleStream: {
      time: { x: 920, y: 438, },
      hourSystem: { x: 948, y: 438, },
      timezone: { x: 968, y: 438, },
      titleCenter: { x: 1119, y: 453, }
    },
    multiStream: {
      first: {
        time: { x: 920, y: 438, },
        hourSystem: { x: 948, y: 438, },
        timezone: { x: 968, y: 438, },
        titleCenter: { x: 1119, y: 437, }
      },
      second: {
        time: { x: 920, y: 449, },
        hourSystem: { x: 948, y: 449, },
        timezone: { x: 968, y: 449, },
        titleCenter: { x: 1119, y: 459, }}
    }
  },
  {
    date: { x: 735, y: 533, },
    streamCountPoint: { x: 968, y: 538, },
    singleStream: {
      time: { x: 918, y: 526, },
      hourSystem: { x: 948, y: 526, },
      timezone: { x: 969, y: 526, },
      titleCenter: { x: 1119, y: 541, }
    },
    multiStream: {
      first: {
        time: { x: 918, y: 526, },
        hourSystem: { x: 948, y: 526, },
        timezone: { x: 969, y: 526, },
        titleCenter: { x: 1119, y: 525, }
      },
      second: {
        time: { x: 914, y: 551, },
        hourSystem: { x: 950, y: 551, },
        timezone: { x: 965, y: 551, },
        titleCenter: { x: 1119, y: 557, }}
    }
  },
  {
    date: { x: 737, y: 621, },
    streamCountPoint: { x: 968, y: 626, },
    singleStream: {
      time: { x: 918, y: 613, },
      hourSystem: { x: 947, y: 613, },
      timezone: { x: 969, y: 613, },
      titleCenter: { x: 1119, y: 629, }
    },
    multiStream: {
      first: {
        time: { x: 918, y: 613, },
        hourSystem: { x: 947, y: 613, },
        timezone: { x: 969, y: 613, },
        titleCenter: { x: 1119, y: 610, }
      },
      second: {
        time: { x: 919, y: 639, },
        hourSystem: { x: 948, y: 639, },
        timezone: { x: 968, y: 639, },
        titleCenter: { x: 1119, y: 644, }}
    }
  }]
// anchors = [anchors[0]]
