import { Component, Input, OnInit } from '@angular/core'
import { BoundingBox } from '@app/model/vo/ScheduleTemplate/BoundingBox'
import { BehaviorSubject } from 'rxjs'
import { TemplateEditorService } from '@app/feature/ocr/template-form-editor/template-editor.service'

@Component({
  selector: 'app-polygon-button',
  templateUrl: './polygon-button.component.html',
  styleUrls: ['./polygon-button.component.scss']
})
export class PolygonButtonComponent implements OnInit {

  @Input() text: string = ''
  @Input() data: BoundingBox | undefined

  isSelected$ = new BehaviorSubject(false)

  constructor(private service: TemplateEditorService) { }

  ngOnInit(): void {
    this.service.currentRect$.subscribe((source) => {
      this.isSelected$.next(source === this.data)
    })
  }

  hasData () {
    return !!this.data
  }

  click() {
    this.service.currentRect$.next(this.data)
  }
}
