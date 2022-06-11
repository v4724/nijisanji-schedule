import { Component, Input, OnInit } from '@angular/core'
import { MdbModalRef } from 'mdb-angular-ui-kit/modal'
import { RainbowLoaderService } from '@app/common-component/rainbow-loader/rainbow-loader.service'
import { initStreamerInfoVo, StreamerInfoVo } from '@app/model/vo/StreamerInfoVo'
import { StreamerInfoService } from '@app/service/streamer-info.service'
import { toDto } from '@app/model/dto/StreamerInfoDto'

@Component({
  selector: 'app-edit-streamer-info-modal',
  templateUrl: './edit-streamer-info-modal.component.html',
  styleUrls: ['./edit-streamer-info-modal.component.scss']
})
export class EditStreamerInfoModalComponent implements OnInit {

  item: StreamerInfoVo = initStreamerInfoVo()
  isNew: boolean = true

  constructor(public modalRef: MdbModalRef<EditStreamerInfoModalComponent>,
              private streamerInfoService: StreamerInfoService,
              private loaderService: RainbowLoaderService) {

  }

  ngOnInit(): void {
  }

  new(): void {
    if (this.item.order === 0) {
      this.item.order = this.streamerInfoService.streamerInfos$.getValue().length + 1
    }
    this.loaderService.set(true)

    this.streamerInfoService.add(this.item)
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

    const dto = toDto(this.item)
    this.streamerInfoService.update(this.item.id, dto)
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
    this.streamerInfoService.delete(this.item.id)
        .then(() => {
          this.modalRef.close()
        })
        .finally(() => {
          this.loaderService.set(false)
        })
  }
}
