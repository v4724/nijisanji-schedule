import { Component, OnDestroy, OnInit } from '@angular/core'
import { ScheduleTemplateVo } from '@app/model/vo/ScheduleTemplate/ScheduleTemplateVo'
import * as lodash from 'lodash'
import { OcrService } from '@app/feature/ocr/ocr.service'
import { TemplateEditorService } from '@app/feature/ocr/template-form-editor/template-editor.service'
import { OcrAnchorService } from '@app/service/ocr-anchor.service'
import { toDto } from '@app/model/dto/ScheduleTemplateDto'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form-editor.component.html',
  styleUrls: ['./template-form-editor.component.scss']
})
export class TemplateFormEditorComponent implements OnInit, OnDestroy {

  editingVo: ScheduleTemplateVo | undefined

  subscriptions: Array<Subscription> = []

  constructor(private ocrService: OcrService,
              private service: TemplateEditorService,
              private ocrAnchorService: OcrAnchorService) { }

  ngOnInit(): void {
    const s = this.ocrService.currentTemplateAnchor$.subscribe((o) => {
      this.editingVo = lodash.cloneDeep(o)
      this.service.editingUrl$.next(this.editingVo?.templateUrl ?? '')
    })
    this.subscriptions.push(s)
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      if (s) {
        s.unsubscribe()
      }
    })
  }

  get editingId () {
    return this.editingVo?.id ?? ''
  }

  urlChange (val: string) {
    if (this.editingVo) {
      this.editingVo.templateUrl = val
    }
    this.service.editingUrl$.next(val)
  }

  apply(): void {
    if (!this.editingVo)
      return

    this.ocrAnchorService.applyLocal(this.editingVo)
  }

  save(): void {
    if (!this.editingVo)
      return

    const dto = toDto(this.editingVo)
    this.ocrAnchorService.update(this.editingId, dto)
        .then(() => {
          if (this.editingVo) {
            this.ocrAnchorService.applyLocal(this.editingVo)
          }
        })
  }

  reset(): void {
    this.ocrAnchorService.getRemoteById(this.editingId)
        .subscribe((vo) => {
          if (vo) {
            this.editingVo = lodash.cloneDeep(vo)
            this.service.editingUrl$.next(this.editingVo?.templateUrl ?? '')
            this.service.currentRect$.next(undefined)
            this.ocrAnchorService.applyLocal(this.editingVo)
          }
        })
  }

  delete(): void {
    const confirm = window.confirm('delete?')
    if (!confirm) {
      return
    }
    this.ocrAnchorService.delete(this.editingId)
      .then(() => {
        this.ocrAnchorService.getByStreamer(this.editingVo?.streamer ?? '', true).subscribe()
      })
  }
}
