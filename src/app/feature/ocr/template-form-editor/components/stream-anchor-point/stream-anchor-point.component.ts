import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core'
import { CollapseService } from '@app/feature/ocr/template-form-editor/components/stream-anchor-point/collapse.service'
import { SingleStreamAnchor } from '@app/model/vo/ScheduleTemplate/SingleStreamAnchor'

@Component({
  selector: 'app-stream-anchor-point',
  templateUrl: './stream-anchor-point.component.html',
  styleUrls: ['./stream-anchor-point.component.scss']
})
export class StreamAnchorPointComponent implements OnInit {
  @ViewChild('collapseTitle') collapseTitle: ElementRef | undefined

  @Input() singleStreamAnchor: SingleStreamAnchor = new SingleStreamAnchor()
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
