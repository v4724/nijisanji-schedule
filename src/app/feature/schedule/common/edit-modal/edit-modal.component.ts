import { Component, OnInit } from '@angular/core'
import { initStream, Stream, toDto } from '@app/feature/schedule/data/firebase-stream/Stream'
import { FirebaseService } from '@app/service/firebase.service'
import { MdbModalRef } from 'mdb-angular-ui-kit/modal'
import { RainbowLoaderService } from '@app/common-component/rainbow-loader/rainbow-loader.service'

@Component({
  selector: 'app-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {

  item: Stream = initStream()

  origTimestamp: number = -1

  constructor(public modalRef: MdbModalRef<EditModalComponent>,
              public firebaseService: FirebaseService,
              private loaderService: RainbowLoaderService) { }

  ngOnInit(): void {
  }

  get immutable(): boolean {
    return !!this.item.mainStreamer.length
  }

  get timestampForUpdate (): number {
    if (this.origTimestamp === -1 && this.item.timestamp) {
      this.origTimestamp = this.item.timestamp
    }

    return this.origTimestamp
  }

  edit(): void {
    this.loaderService.set(true)

    const dto = toDto(this.item)
    this.firebaseService.update(this.item.id, dto)
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
    this.firebaseService.delete(this.item.id)
        .then(() => {
          this.modalRef.close()
        })
        .finally(() => {
          this.loaderService.set(false)
        })
  }
}
