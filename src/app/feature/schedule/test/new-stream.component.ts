import { Component, OnInit, ViewChild } from '@angular/core'
import { FirebaseService } from '@app/service/firebase.service'
import { Stream, initStream, toDto } from '@app/feature/schedule/test/dto/Stream'
import { ExcelStreamService } from '@app/service/excel-stream.service'
import { StreamDetailComponent } from '@app/feature/schedule/common/stream-detail/stream-detail.component'

@Component({
  selector: 'app-test',
  templateUrl: './new-stream.component.html',
  styleUrls: ['./new-stream.component.scss']
})
export class NewStreamComponent implements OnInit {

  @ViewChild('itemCmpRef') itemCmpRef: StreamDetailComponent | undefined

  item: Stream = initStream()
  submitLoading: boolean = false

  constructor(public firebaseService: FirebaseService,
              private excelStreamService: ExcelStreamService) {

  }

  ngOnInit(): void {

  }

  submit(): void {
    this.submitLoading = true

    const dto = toDto(this.item)

    this.firebaseService.add(dto)
      .then(() => {

      })
      .finally(() => {
        this.submitLoading = false
    })
  }

  batchImport(): void {
    this.excelStreamService.readFromExcel()
  }
}
