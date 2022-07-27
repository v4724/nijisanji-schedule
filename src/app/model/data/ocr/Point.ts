import { TextAnnotation } from '@app/feature/ocr/ocr.component'

export class Point {

  x: number = -1;
  y: number = -1;

  horizonBoundary: number = 12
  verticalBoundary: number = 10

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

export class StreamCountPoint extends Point {

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

export class TitlePoint extends Point {

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

function filterTextAnnotations (anchorP: Point, textAnnotations: Array<TextAnnotation>): Array<TextAnnotation> {

  const find = textAnnotations.filter((text: TextAnnotation) => {
    const x = text.x ?? 1
    const y = text.y ?? 1
    const target = new Point(x, y)
    return anchorP.contains(target)
  })

  return find
}
