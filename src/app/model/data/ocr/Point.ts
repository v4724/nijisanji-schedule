import { TextAnnotation } from '@app/feature/ocr/ocr.component'

export class Point {

  x: number = -1;
  y: number = -1;

  horizonBoundary: number = 12
  verticalBoundary: number = 10

  constructor (x: number, y: number, vBoundary?: number, hBoundary?: number) {
    this.x = Number(x)
    this.y = Number(y)
    this.verticalBoundary = Number(vBoundary ?? this.verticalBoundary)
    this.horizonBoundary = Number(hBoundary ?? this.horizonBoundary)
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

  targetTz = 'EST'
  targetTz2: string | undefined = 'EDT'

  constructor (anchorX: number, anchorY: number, vBoundary: number, hBoundary: number, targetTz: string, targetTz2?: string) {
    super(anchorX, anchorY, vBoundary, hBoundary);
    this.targetTz = targetTz
    this.targetTz2 = targetTz2
  }

  findStream (targets: Array<TextAnnotation>): Array<TextAnnotation> {
    // console.log('find', this.x, this.y)
    const find = targets.filter(t => {
      const target = new Point(t.x ?? 1, t.y ?? 1)
      const contains = this.contains(target)
      // if ((t.description === 'PDT' || t.description === 'PST')) {
      //   console.log(contains, this.targetTz, this.targetTz2, t.description === this.targetTz, (this.targetTz2 && t.description === this.targetTz2))
        // console.log(t.description === 'PDT', this.targetTz, t.description === this.targetTz)
        // console.log(t.description === 'PST', this.targetTz2, t.description === this.targetTz2)
      // }
      return contains &&
        (t.description === this.targetTz || (this.targetTz2 && t.description === this.targetTz2))
    })
    // console.log('find re', find)
    return find
  }

  noStream (targets: Array<TextAnnotation>): boolean {
    // console.log('noStream')
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
    // title = title.replace(' - ', '-')
    // title = title.replace(' / ', '/')
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
