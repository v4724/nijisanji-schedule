import { Vertex } from '@app/model/vo/ScheduleTemplate/Vertex'

export class BoundingBox {
  vertices: Array<Vertex>;

  constructor () {
    this.vertices = []
    this.vertices.push(new Vertex())
    this.vertices.push(new Vertex())
    this.vertices.push(new Vertex())
    this.vertices.push(new Vertex())
  }

  get exist () {
    return !this.vertices.find(v => v.x === -1 || v.y === -1)
  }

  get minX () {
    const xList = this.vertices.map((v) => v.x)
    return Math.min(...xList)
  }

  get minY () {
    const yList = this.vertices.map((v) => v.y)
    return Math.min(...yList)
  }

  get width () {
    const xList = this.vertices.map((v) => v.x)
    const minX = Math.min(...xList)
    const maxX = Math.max(...xList)
    return maxX - minX
  }

  get height () {
    const yList = this.vertices.map((v) => v.y)
    const minY = Math.min(...yList)
    const maxY = Math.max(...yList)

    return maxY - minY
  }

  contains (target: Vertex) {
    const xList = this.vertices.map((v) => v.x)
    const yList = this.vertices.map((v) => v.y)
    const minX = Math.min(...xList)
    const minY = Math.min(...yList)
    const maxX = Math.max(...xList)
    const maxY = Math.max(...yList)
    const contains = minX <= target.x && maxX >= target.x
      && minY <= target.y && maxY >= target.y

    // console.log(target.x, target.y, this.x, this.y, minX, minY, maxX, maxY, contains)
    return contains
  }

  get centroid () {
    const minX = Math.min(...this.vertices.map(v => v.x))
    const maxX = Math.max(...this.vertices.map(v => v.y))
    const minY = Math.min(...this.vertices.map(v => v.x))
    const maxY = Math.max(...this.vertices.map(v => v.y))
    return new Vertex(maxX - minX, maxY - minY)
  }
}


