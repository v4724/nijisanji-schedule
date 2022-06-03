import { Component, Input, OnInit } from '@angular/core'
import { PointBoundary } from '@app/model/data/ocr/TransferScheduleOCR'
import { PointBoundaryService } from '@app/feature/ocr/components/point-boundary/point-boundary.service'

@Component({
  selector: 'app-point-boundary',
  templateUrl: './point-boundary.component.html',
  styleUrls: ['./point-boundary.component.scss']
})
export class PointBoundaryComponent implements OnInit {

  @Input() pointBoundary: PointBoundary | undefined
  @Input() title: string = ''

  index = -1
  constructor(private service: PointBoundaryService) { }

  ngOnInit(): void {
    this.index = this.service.getIndex()
  }

  change(): void {

  }
}
