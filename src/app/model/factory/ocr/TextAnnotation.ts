
export interface TextAnnotation {
  description: string,
  boundingPoly: {
    vertices: Array<{ x: number, y: number }>
  },
  x?: number,
  y?: number,
  top?: string,
  left?: string
}
