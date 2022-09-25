import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { RectCanvasComponent } from '@app/feature/ocr/components/canvas/rect-canvas/rect-canvas.component'
import { Vertex } from '@app/model/vo/ScheduleTemplate/Vertex'
import { TemplateEditorService } from '@app/feature/ocr/template-form-editor/template-editor.service'
import * as lodash from 'lodash'
import { BoundingBox } from '@app/model/vo/ScheduleTemplate/BoundingBox'
import { OcrService } from '@app/feature/ocr/ocr.service'
import { RectListCanvasComponent } from '@app/feature/ocr/components/canvas/rect-list-canvas/rect-list-canvas.component'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-template-editing-canvas',
  templateUrl: './template-editing-canvas.component.html',
  styleUrls: ['./template-editing-canvas.component.scss']
})
export class TemplateEditingCanvasComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('rectCanvas') rectCanvas?: RectCanvasComponent
  @ViewChild('rectListCanvas') rectListCanvas?: RectListCanvasComponent

  origVertices: Array<Vertex> = []
  currVertices: Array<Vertex> = []

  templateVertices: Array<BoundingBox> = []

  subscriptions: Array<Subscription> = []

  constructor(private service: TemplateEditorService,
              private ocrService: OcrService) {
  }

  ngOnInit(): void {
    const s = this.ocrService.currentTemplateAnchor$.subscribe((vo) => {
      const vertices: Array<BoundingBox> = []
      const pushIfExist = function (b: BoundingBox | undefined) {
        if (b)
          vertices.push(b)
      }
      pushIfExist(vo?.anchor.defaultMonth)
      pushIfExist(vo?.anchor.defaultStartDate)
      vo?.anchor.streamAnchors.forEach((s) => {
        pushIfExist(s.month)
        pushIfExist(s.date)
        pushIfExist(s.streamCounter)
        pushIfExist(s.singleStream.title)
        pushIfExist(s.singleStream.time)
        pushIfExist(s.singleStream.hourSystem)
        pushIfExist(s.multiStream.first.title)
        pushIfExist(s.multiStream.first.time)
        pushIfExist(s.multiStream.first.hourSystem)
        pushIfExist(s.multiStream.second.title)
        pushIfExist(s.multiStream.second.time)
        pushIfExist(s.multiStream.second.hourSystem)
      })

      this.templateVertices = vertices
    })
    this.subscriptions.push(s)

    const s1 = this.service.currentRect$.subscribe((o) => {
      this.origVertices = lodash.cloneDeep(o?.vertices ?? [])
      this.currVertices = o?.vertices ?? []
      this.resetRect()
    })
    this.subscriptions.push(s1)

    const s2 = this.service.canvasSize$.subscribe((size) => {
      this.resetCanvasSize()
    })
    this.subscriptions.push(s2)
  }

  ngAfterViewInit(): void {
    this.resetCanvasSize()
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      if (s) {
        s.unsubscribe()
      }
    })
  }

  get clearable (): boolean {
    return !!this.currVertices.length && this.currVertices[0].x !== -1
  }

  get resetable ( ): boolean {
    return !!this.origVertices.length && this.origVertices[0].x !== -1
  }

  resetCanvasSize () {
    const size = this.service.canvasSize$.getValue()
    this.rectCanvas?.resetSize(size.width, size.height)
    this.rectListCanvas?.resetSize(size.width, size.height)

    this.rectListCanvas?.redraw()
  }

  clearRect ($event: MouseEvent) {
    this.rectCanvas?.clearCanvas()
    const curr = this.service.currentRect$.getValue()
    if (curr) {
      curr.vertices = []
      this.currVertices = []
      this.rectListCanvas?.redraw()
    }
  }

  updateRect (vertices: Array<Vertex>) {
    const curr = this.service.currentRect$.getValue()
    if (curr) {
      curr.vertices = vertices
      this.currVertices = vertices
      this.rectListCanvas?.redraw()
    }
  }

  resetRect () {
    const curr = this.service.currentRect$.getValue()
    if (curr) {
      curr.vertices = this.origVertices
      this.currVertices = this.origVertices

      this.rectListCanvas?.redraw()
    }
  }
}
