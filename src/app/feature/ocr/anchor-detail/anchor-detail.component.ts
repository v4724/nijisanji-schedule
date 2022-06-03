import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { ScheduleAnchor } from '@app/model/data/ocr/TransferScheduleOCR'
import * as lodash from 'lodash'
import { OcrAnchorService } from '@app/service/ocr-anchor.service'
import { OCRAnchorVo } from '@app/model/vo/OCRAnchorVo'
import { toDto } from '@app/model/dto/OCRAnchorDto'

@Component({
  selector: 'app-anchor-detail',
  templateUrl: './anchor-detail.component.html',
  styleUrls: ['./anchor-detail.component.scss']
})
export class AnchorDetailComponent implements OnInit, OnChanges {

  @Input() ocrAnchorVo: OCRAnchorVo | undefined
  cloneScheduleAnchor: ScheduleAnchor | undefined

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges (changes: SimpleChanges) {
    if (changes.ocrAnchorVo.currentValue) {
      this.cloneScheduleAnchor = lodash.cloneDeep(changes.ocrAnchorVo.currentValue.anchor)
    }
  }

  change(): void {

  }

  resetCloneScheduleAnchor (scheduleAnchor: ScheduleAnchor): void {
    this.cloneScheduleAnchor = scheduleAnchor
  }

}
