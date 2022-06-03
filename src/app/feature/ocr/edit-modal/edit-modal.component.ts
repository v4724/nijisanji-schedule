import { Component, OnInit, ViewChild } from '@angular/core'
import { MdbModalRef } from 'mdb-angular-ui-kit/modal'
import * as lodash from 'lodash'
import { initOCRAnchor, OCRAnchorVo } from '@app/model/vo/OCRAnchorVo'
import { OcrAnchorService } from '@app/service/ocr-anchor.service'
import { AnchorDetailComponent } from '@app/feature/ocr/anchor-detail/anchor-detail.component'
import { toDto } from '@app/model/dto/OCRAnchorDto'

@Component({
  selector: 'app-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {

  @ViewChild(AnchorDetailComponent) detail: AnchorDetailComponent | undefined
  ocrAnchorVo: OCRAnchorVo = initOCRAnchor()

  constructor(public modalRef: MdbModalRef<EditModalComponent>,
              private ocrAnchorService: OcrAnchorService) { }

  ngOnInit(): void {
  }

  apply(): void {
    if (!this.ocrAnchorVo || !this.detail?.cloneScheduleAnchor)
      return

    this.ocrAnchorService.applyLocal({
      id: this.ocrAnchorVo.id,
      streamer: this.ocrAnchorVo?.streamer,
      anchor: this.detail.cloneScheduleAnchor
    })

  }

  save(): void {
    if (!this.detail?.cloneScheduleAnchor)
      return

    const anchor = this.detail.cloneScheduleAnchor
    const dto = toDto(this.ocrAnchorVo?.streamer ?? '', anchor)
    const id = this.ocrAnchorVo?.id ?? ''
    this.ocrAnchorService.update(id, dto)
        .then(() => {
          this.ocrAnchorService.applyLocal({
            id: id,
            streamer: this.ocrAnchorVo?.streamer,
            anchor: anchor
          })
        })
  }

  reset(): void {
    const streamer = this.ocrAnchorVo.streamer ?? ''
    this.ocrAnchorService.getByStreamer(streamer, true)
        .subscribe((vo) => {
          this.detail?.resetCloneScheduleAnchor(lodash.cloneDeep(vo.anchor))
        })
  }

  delete(): void {
    // const confirm = window.confirm('delete?')
    // if (!confirm) {
    //   return
    // }
    // this.loaderService.set(true)
    // this.firebaseService.delete(this.item.id)
    //     .then(() => {
    //       this.modalRef.close()
    //     })
    //     .finally(() => {
    //       this.loaderService.set(false)
    //     })
  }
}
