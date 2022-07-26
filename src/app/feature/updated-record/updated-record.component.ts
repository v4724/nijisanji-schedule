import { Component, OnInit } from '@angular/core';
import { UpdatedRecordService } from '@app/service/updated-record.service'
import { UpdatedRecordVo, updateVoList } from '@app/model/vo/UpdatedRecordVo'
import { TimezoneService } from '@app/layout/timezone/timezone.service'
import { combineLatest } from 'rxjs'
import { UpdatedRecordType } from '@app/model/enum/UpdatedRecordType'
import { AdminService } from '@app/service/admin.service'

@Component({
  selector: 'app-updated-record',
  templateUrl: './updated-record.component.html',
  styleUrls: ['./updated-record.component.scss']
})
export class UpdatedRecordComponent implements OnInit {

  list: Array<UpdatedRecordVo> = []

  UpdatedRecordType = UpdatedRecordType

  constructor(private updatedRecordService: UpdatedRecordService,
              private tzService: TimezoneService,
              public adminService: AdminService) { }

  ngOnInit(): void {

    combineLatest([this.updatedRecordService.updatedBellList$, this.tzService.timezone$])
    .subscribe((results) => {
      const list = results[0]
      const tz = results[1]

      updateVoList(list, tz)
      this.list = list
    })

  }

  removeRecord (record: UpdatedRecordVo): void {
    const confirm = window.confirm('delete?')
    if (!confirm) {
      return
    }
    this.updatedRecordService.remove(record.id)
  }
}
