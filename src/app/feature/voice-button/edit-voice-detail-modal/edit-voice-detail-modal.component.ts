import {
  Component, ContentChild,
  OnInit, ViewChild
} from '@angular/core'
import { MdbModalRef } from 'mdb-angular-ui-kit/modal'
import { RainbowLoaderService } from '@app/common-component/rainbow-loader/rainbow-loader.service'
import { initVoiceButton, VoiceButtonInfoVo } from '@app/model/vo/VoiceButtonInfoVo'
import { VoiceButtonInfoService } from '@app/service/voice-button-info.service'
import { toDto } from '@app/model/dto/VoiceButtonInfoDto'
import { VoiceDetailComponent } from '@app/feature/voice-button/voice-detail/voice-detail.component'

@Component({
  selector: 'app-edit-voice-detail-modal',
  templateUrl: './edit-voice-detail-modal.component.html',
  styleUrls: ['./edit-voice-detail-modal.component.scss']
})
export class EditVoiceDetailModalComponent implements OnInit {

  @ViewChild('itemCmpRef') itemCmpRef: VoiceDetailComponent | undefined

  item: VoiceButtonInfoVo = initVoiceButton()
  isNew: boolean = true

  constructor(public modalRef: MdbModalRef<EditVoiceDetailModalComponent>,
              private voiceButtonInfoService: VoiceButtonInfoService,
              private loaderService: RainbowLoaderService) {

  }

  ngOnInit(): void {
  }

  new(): void {
    this.loaderService.set(true)

    const editedItem = this.itemCmpRef?.editedItem ?? initVoiceButton()
    this.voiceButtonInfoService.add(editedItem)
        .then((success) => {
          if (success) {
            this.modalRef.close()
          }
        })
        .finally(() => {
          this.loaderService.set(false)
        })
  }

  edit(): void {
    this.loaderService.set(true)

    const editedItem = this.itemCmpRef?.editedItem ?? initVoiceButton()
    const dto = toDto(editedItem)
    this.voiceButtonInfoService.update(editedItem.id, dto)
        .then(() => {
          this.modalRef.close()
        })
        .finally(() => {
          this.loaderService.set(false)
        })
  }

  delete(): void {
    const confirm = window.confirm('delete?')
    if (!confirm) {
      return
    }
    this.loaderService.set(true)

    const editedItem = this.itemCmpRef?.editedItem ?? initVoiceButton()
    this.voiceButtonInfoService.delete(editedItem.id)
        .then(() => {
          this.modalRef.close()
        })
        .finally(() => {
          this.loaderService.set(false)
        })
  }
}
