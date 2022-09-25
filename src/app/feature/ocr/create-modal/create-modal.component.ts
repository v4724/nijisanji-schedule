import { Component, ContentChild, OnInit, ViewChild } from '@angular/core'
import { MdbModalRef } from 'mdb-angular-ui-kit/modal'
import { OcrAnchorService } from '@app/service/ocr-anchor.service'
import { StreamerInfoVo } from '@app/model/vo/StreamerInfoVo'
import { StreamerInfoService } from '@app/service/streamer-info.service'
import { MatAutocomplete } from '@angular/material/autocomplete'
import { FormControl } from '@angular/forms'
import { ScheduleTemplateVo } from '@app/model/vo/ScheduleTemplate/ScheduleTemplateVo'
import { toDto } from '@app/model/dto/ScheduleTemplateDto'

@Component({
  selector: 'app-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.scss']
})
export class CreateModalComponent implements OnInit {

  templateVo: ScheduleTemplateVo = new ScheduleTemplateVo()

  streamerKeyword = ''
  streamers: Array<StreamerInfoVo> = []
  filterStreamers: Array<StreamerInfoVo> = []
  myControl = new FormControl('');

  constructor(public modalRef: MdbModalRef<CreateModalComponent>,
              private streamerInfoService: StreamerInfoService,
              private ocrAnchorService: OcrAnchorService) { }

  ngOnInit(): void {
    this.streamers = this.streamerInfoService.streamerInfos$.getValue()
  }

  add(): void {

    const dto = toDto(this.templateVo)
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
    this.templateVo.streamer = value
  }
}
