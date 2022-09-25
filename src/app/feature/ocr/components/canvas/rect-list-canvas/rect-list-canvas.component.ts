import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { MyCanvasComponent } from '@app/feature/ocr/components/canvas/my-canvas/my-canvas.component'
import { BoundingBox } from '@app/model/vo/ScheduleTemplate/BoundingBox'

@Component({
  selector: 'app-rect-list-canvas',
  templateUrl: './rect-list-canvas.component.html',
  styleUrls: ['./rect-list-canvas.component.scss']
})
export class RectListCanvasComponent extends MyCanvasComponent implements OnInit, OnChanges {

  @Input() data: Array<BoundingBox> = []

  strokeColor = 'yellow'
  constructor() {super() }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data?.currentValue) {
      this.redraw()
    }
  }

  redraw () {
    this.clearCanvas()

    // @ts-ignore
    this.ctx?.strokeStyle = this.strokeColor
    this.data.forEach((b) => {
      this.ctx?.strokeRect(b.minX, b.minY, b.width, b.height)
    })

  }
}
