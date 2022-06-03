import { Component, Input, OnInit } from '@angular/core'
import { AnchorPoint } from '@app/model/data/ocr/TransferScheduleOCR'
import { AnchorPointService } from '@app/feature/ocr/components/anchor-point/anchor-point.service'

@Component({
  selector: 'app-anchor-point',
  templateUrl: './anchor-point.component.html',
  styleUrls: ['./anchor-point.component.scss']
})
export class AnchorPointComponent implements OnInit {

  @Input() anchorPoint: AnchorPoint | undefined
  @Input() title: string = ''

  index = -1
  constructor(private service: AnchorPointService) { }

  ngOnInit(): void {
    this.index = this.service.getIndex()
  }

  change(): void {

  }
}
