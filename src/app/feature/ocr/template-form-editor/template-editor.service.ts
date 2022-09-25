import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs'
import { BoundingBox } from '@app/model/vo/ScheduleTemplate/BoundingBox'

@Injectable({
  providedIn: 'root'
})
export class TemplateEditorService {

  currentRect$ = new BehaviorSubject<BoundingBox | undefined>(undefined)
  editingUrl$ = new BehaviorSubject<string>('')
  canvasSize$ = new BehaviorSubject<{ width: number, height: number }>({ width: 0, height: 0 })

  isEditing$ = new BehaviorSubject<boolean>(false)
  constructor() { }

  updateEditingUrlCanvasSize(img: HTMLImageElement) {
    this.canvasSize$.next({ width: img.width, height: img.height })
  }
}
