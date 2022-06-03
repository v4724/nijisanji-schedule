import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core'
import { StreamAnchorPoint } from '@app/model/data/ocr/TransferScheduleOCR'
import { CollapseService } from '@app/feature/ocr/components/stream-anchor-point/collapse.service'

@Component({
  selector: 'app-stream-anchor-point',
  templateUrl: './stream-anchor-point.component.html',
  styleUrls: ['./stream-anchor-point.component.scss']
})
export class StreamAnchorPointComponent implements OnInit {
  @ViewChild('collapseTitle') collapseTitle: ElementRef | undefined

  @Input() streamAnchorPoint: StreamAnchorPoint | undefined
  @Input() title: string = ''

  index = -1
  constructor(private collapseService: CollapseService) { }

  ngOnInit(): void {
    this.index = this.collapseService.getIndex()
  }

  get collapseIndex(): string {
    return 'collapseExample-'+ this.index
  }
}
