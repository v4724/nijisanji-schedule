import { Injectable, isDevMode } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal'
import { StreamViewItem } from '@app/model/vo/StreamVo'
import { EditModalComponent } from '@app/feature/schedule/common/edit-modal/edit-modal.component'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { EditStreamerInfoModalComponent } from '@app/feature/member/edit-streamer-info-modal/edit-streamer-info-modal.component'
import { StreamerInfoVo } from '@app/model/vo/StreamerInfoVo'
import { VoiceButtonInfoVo } from '@app/model/vo/VoiceButtonInfoVo'
import { EditVoiceDetailModalComponent } from '@app/feature/voice-button/edit-voice-detail-modal/edit-voice-detail-modal.component'
import { CreateModalComponent as CreateAnchorModalComponent } from '@app/feature/ocr/create-modal/create-modal.component'

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  isDevMode$ = new BehaviorSubject<boolean>(false)
  isLogin$ = new BehaviorSubject<boolean>(false)
  editable$ = new BehaviorSubject<boolean>(false)

  modalRef: MdbModalRef<EditModalComponent> | null = null;
  editStreamerInfoModalRef: MdbModalRef<EditStreamerInfoModalComponent> | null = null;
  editVoiceButtonInfoModalRef: MdbModalRef<EditVoiceDetailModalComponent> | null = null;
  createAnchorInfoModalRef: MdbModalRef<CreateAnchorModalComponent> | null = null;

  constructor(public auth: AngularFireAuth,
              private modalService: MdbModalService) {
    this.isDevMode$.next(isDevMode())
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.isLogin$.next(true)
      } else {
        this.isLogin$.next(false)
        this.editable$.next(false)
      }
    })
  }

  editToggle (): void {
    const value = this.editable$.getValue()
    this.editable$.next(!value)
  }

  openModal(stream: StreamViewItem): void {
    this.modalRef = this.modalService.open(EditModalComponent,{
      data: { item: stream },
    })
  }

  openStreamerInfoModal(isNew: boolean, streamer?: StreamerInfoVo): void {
    this.editStreamerInfoModalRef = this.modalService.open(EditStreamerInfoModalComponent,{
      data: { item: streamer, isNew: isNew },
    })
  }

  openVoiceButtonInfoModal(isNew: boolean, voiceButton?: VoiceButtonInfoVo): void {
    this.editVoiceButtonInfoModalRef = this.modalService.open(EditVoiceDetailModalComponent,{
      data: { item: voiceButton, isNew: isNew },
    })
  }

  openCreateAnchorInfoModal(): void {
    this.createAnchorInfoModalRef = this.modalService.open(CreateAnchorModalComponent)
  }
}
