import { Component, OnInit } from '@angular/core';
import { UpdatedRecordService } from '@app/service/updated-record.service'
import { skip } from 'rxjs/operators'

@Component({
  selector: 'app-updated-bell',
  templateUrl: './updated-bell.component.html',
  styleUrls: ['./updated-bell.component.scss']
})
export class UpdatedBellComponent implements OnInit {

  update = false

  constructor(public service: UpdatedRecordService) {

  }
  ngOnInit(): void {
    this.service.updated$
        .pipe(
          skip(1)
        )
        .subscribe((result) => {
          console.log(result)
          this.update = true
        })
  }

  click (): void {
    this.update = false
  }
}
