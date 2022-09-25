import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core'
import { MyCanvasComponent } from '@app/feature/ocr/components/canvas/my-canvas/my-canvas.component'
import { Vertex } from '@app/model/vo/ScheduleTemplate/Vertex'
import { Group } from '@app/feature/schedule/toolbar/stream-group/stream-group.component'

@Component({
  selector: 'app-rect-canvas',
  templateUrl: './rect-canvas.component.html',
  styleUrls: ['./rect-canvas.component.scss']
})
export class RectCanvasComponent extends MyCanvasComponent implements OnInit, OnChanges {

  @Input() data: Array<Vertex> = []
  @Output() drown = new EventEmitter<Array<Vertex>>()

  startX = -1
  startY = -1
  currDrawingMouseX = -1
  currDrawingMouseY = -1
  width = 0
  height = 0
  vertices: Array<Vertex> = []

  constructor () {
    super()
  }

  ngOnInit (): void {
  }

  ngOnChanges (changes: SimpleChanges): void {
    if (changes.data?.currentValue) {
      this.updateByInput()
    }
  }

  @HostListener('mousedown', ['$event'])
  start (e: MouseEvent) {
    this.isDrawing = true
    this.startX = e.offsetX - this.offsetX
    this.startY = e.offsetY - this.offsetY

    // @ts-ignore
    this.ctx?.strokeStyle = 'green'

    e.preventDefault()
  }

  @HostListener('mousemove', ['$event'])
  move (e: MouseEvent) {
    if (this.isDrawing) {
      this.draw(e)
    }
    e.preventDefault()
  }

  @HostListener('mouseup', ['$event'])
  @HostListener('mouseout', ['$event'])
  stop (e: MouseEvent) {
    if (this.isDrawing) {
      this.draw(e)

      this.isDrawing = false
      this.currDrawingMouseX = -1
      this.currDrawingMouseY = -1

      this.drown.next(this.vertices)
    }
    e.preventDefault()
  }

  draw (e: MouseEvent) {
    const mouseX = e.offsetX - this.offsetX
    const mouseY = e.offsetY - this.offsetY

    let w = mouseX - this.startX
    let h = mouseY - this.startY

    this.currDrawingMouseX = mouseX
    this.currDrawingMouseY = mouseY

    if (this.currDrawingMouseX < 0) {
      w = -this.startX
    }
    if (this.currDrawingMouseY < 0) {
      h = -this.startY
    }
    if (this.currDrawingMouseX > this.canvasWidth) {
      w = this.canvasWidth - this.startX
    }
    if (this.currDrawingMouseY > this.canvasHeight) {
      h = this.canvasHeight - this.startY
    }
    this.width = w
    this.height = h

    this.drawByStyle()

    this.vertices = [
      { x: this.startX, y: this.startY },
      { x: this.startX + w, y: this.startY },
      { x: this.startX, y: this.startY + h },
      { x: this.startX + w, y: this.startY + h }
    ]
  }

  updateByInput () {
    if (!this.data.length) {
      this.clearCanvas()
      return
    }

    const sort = this.data.sort((v1, v2) => {
      return v1.x - v2.x || v1.y - v2.y
    })
    const startX = sort[0].x
    const startY = sort[0].y
    const endX = sort[3].x
    const endY = sort[3].y
    const w = endX - startX
    const h = endY - startY

    this.startX = startX
    this.startY = startY
    this.width = w
    this.height = h
    this.drawByStyle()
  }

  redraw () {
    this.updateByInput()
  }

  private drawByStyle () {
    this.clearCanvas()
    if (this.ctx) {
      this.ctx.shadowColor = '#ffbf00';
      this.ctx.shadowBlur = 10;
      this.ctx.lineJoin = 'bevel';
      this.ctx.lineWidth = 3;
      this.ctx.strokeStyle = 'red'
      this.ctx.strokeRect(this.startX, this.startY, this.width, this.height)
    }
  }
}
