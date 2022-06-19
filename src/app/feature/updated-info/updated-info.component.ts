import { Component, OnInit } from '@angular/core';
import { UpdatedInfoService } from '@app/service/updated-info.service'
import { UpdatedInfoVo, updateVoList } from '@app/model/vo/UpdatedInfoVo'
import { TimezoneService } from '@app/feature/schedule/toolbar/timezone/timezone.service'
import { combineLatest } from 'rxjs'
import { UpdatedInfoType } from '@app/model/enum/UpdatedInfoType'

@Component({
  selector: 'app-updated-info',
  templateUrl: './updated-info.component.html',
  styleUrls: ['./updated-info.component.scss']
})
export class UpdatedInfoComponent implements OnInit {

  list: Array<UpdatedInfoVo> = []

  UpdatedInfoType = UpdatedInfoType

  constructor(private updatedInfoService: UpdatedInfoService,
              private tzService: TimezoneService) { }

  ngOnInit(): void {

    combineLatest([this.updatedInfoService.updatedBellList$, this.tzService.timezone$])
    .subscribe((results) => {
      const list = results[0]
      const tz = results[1]

      updateVoList(list, tz)
      this.list = list
    })

  }

}
