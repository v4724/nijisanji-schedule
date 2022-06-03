import { Component, OnInit } from '@angular/core';
import { UpdatedRecordService } from '@app/service/updated-record.service'
import { skip } from 'rxjs/operators'
import { combineLatest } from 'rxjs'
import { UpdatedRecordVo, updateVoList } from '@app/model/vo/UpdatedRecordVo'
import { TimezoneService } from '@app/layout/timezone/timezone.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-updated-bell',
  templateUrl: './updated-bell.component.html',
  styleUrls: ['./updated-bell.component.scss']
})
export class UpdatedBellComponent implements OnInit {

  recordVos: Array<UpdatedRecordVo> = []
  update = false

  constructor(public service: UpdatedRecordService,
              private router: Router,
              private tzService: TimezoneService,
              private updatedRecordService: UpdatedRecordService) {

  }
  ngOnInit(): void {
    this.service.updated$
        .pipe(
          skip(1)
        )
        .subscribe((result) => {
          this.update = true
        })

    combineLatest([this.updatedRecordService.updatedBellList$, this.tzService.timezone$])
      .subscribe((results) => {
        const list = results[0].slice(0, 5)
        const tz = results[1]

        updateVoList(list, tz)
        this.recordVos = list
      })
  }
  clickIcon (): void {
    this.update = false
  }
  click (): void {
    this.router.navigate(['/message'])
  }
}
