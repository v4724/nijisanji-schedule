import { Component, ContentChild, OnInit, ViewChild } from '@angular/core'
import { MdbModalRef } from 'mdb-angular-ui-kit/modal'
import { OcrAnchorService } from '@app/service/ocr-anchor.service'
import { AnchorDetailComponent } from '@app/feature/ocr/anchor-detail/anchor-detail.component'
import { initOCRAnchor, OCRAnchorVo } from '@app/model/vo/OCRAnchorVo'
import { StreamerInfoVo } from '@app/model/vo/StreamerInfoVo'
import { StreamerInfoService } from '@app/service/streamer-info.service'
import { toDto } from '@app/model/dto/OCRAnchorDto'
import { MatAutocomplete } from '@angular/material/autocomplete'
import { FormControl } from '@angular/forms'

@Component({
  selector: 'app-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.scss']
})
export class CreateModalComponent implements OnInit {

  @ViewChild(AnchorDetailComponent) detail: AnchorDetailComponent | undefined
  ocrAnchorVo: OCRAnchorVo = initOCRAnchor()

  streamer: string = ''
  streamerKeyword = ''
  streamers: Array<StreamerInfoVo> = []
  filterStreamers: Array<StreamerInfoVo> = []
  myControl = new FormControl('');

  constructor(public modalRef: MdbModalRef<CreateModalComponent>,
              private streamerInfoService: StreamerInfoService,
              private ocrAnchorService: OcrAnchorService) { }

  ngOnInit(): void {
    this.streamers = this.streamerInfoService.streamerInfos$.getValue().filter(i => i.ocr)
  }

  add(): void {
    console.log(!this.detail?.cloneScheduleAnchor, this.detail)
    if (!this.detail?.cloneScheduleAnchor)
      return

    const dto = toDto(this.streamer, this.detail.cloneScheduleAnchor)
    this.ocrAnchorService.add(dto)
        .then((result) => {
          if (result) {
            this.modalRef.close()
          }
        })

  }

  streamerKeywordChanged(auto?: MatAutocomplete): void {
    const upperKeyword = this.streamerKeyword.toString().toUpperCase()
    this.filterStreamers = this.streamers.filter((info)=> {
      return upperKeyword.length ? info.name.toUpperCase().includes(upperKeyword) : true
    })

  }

  updateStreamer(value: string): void {
    this.streamer = value
  }
}
