import { Component, OnInit } from '@angular/core'
import { initStream, StreamVo } from '@app/model/vo/StreamVo'
import { StreamService } from '@app/service/stream.service'
import { MdbModalRef } from 'mdb-angular-ui-kit/modal'
import { RainbowLoaderService } from '@app/common-component/rainbow-loader/rainbow-loader.service'
import { toDto } from '@app/model/dto/StreamDto'

@Component({
  selector: 'app-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {

  item: StreamVo = initStream()

  constructor(public modalRef: MdbModalRef<EditModalComponent>,
              public firebaseService: StreamService,
              private loaderService: RainbowLoaderService) { }

  ngOnInit(): void {
  }

  get immutable(): boolean {
    return !!this.item.mainStreamer.length
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
