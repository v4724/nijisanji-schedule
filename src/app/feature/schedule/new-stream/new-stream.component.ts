import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { StreamService } from '@app/service/stream.service'
import { StreamVo, initStream } from '@app/model/vo/StreamVo'
import { ExcelStreamService } from '@app/service/excel-stream.service'
import { StreamDetailComponent } from '@app/feature/schedule/common/stream-detail/stream-detail.component'
import { toDto } from '@app/model/dto/StreamDto'
import { ToastService } from '@app/common-component/toast/toast.service'

@Component({
  selector: 'app-test',
  templateUrl: './new-stream.component.html',
  styleUrls: ['./new-stream.component.scss']
})
export class NewStreamComponent implements OnInit {

  @ViewChild('itemCmpRef') itemCmpRef: StreamDetailComponent | undefined

  item: StreamVo = initStream()
  submitLoading: boolean = false


  constructor(public firebaseService: StreamService,
              private toastService: ToastService,
              private excelStreamService: ExcelStreamService) {

  }

  ngOnInit(): void {
  }

  submit(): void {
    this.submitLoading = true

    const dto = toDto(this.item)

    this.firebaseService.add(dto)
      .then(() => {

        this.toastService.show(true);

      })
      .catch(() => {

        this.toastService.show(false);

      })
      .finally(() => {
        this.submitLoading = false
    })
  }

  batchImport(): void {
    this.excelStreamService.readFromExcel()
  }
}
