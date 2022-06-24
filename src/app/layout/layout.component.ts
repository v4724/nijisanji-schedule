import { Component, OnInit, ViewChild } from '@angular/core'
import { AdminService } from '@app/service/admin.service'
import { MdbCollapseDirective } from 'mdb-angular-ui-kit/collapse'
import { combineLatest } from 'rxjs'
import * as moment from 'moment-timezone'
import { UpdatedRecordService } from '@app/service/updated-record.service'
import { TimezoneService } from '@app/layout/timezone/timezone.service'

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  @ViewChild('backgroundImageExample2') backgroundImageExample2: MdbCollapseDirective | undefined

  scheduleUpdatedTime: string = '-'
  constructor(public adminService: AdminService,
              private updatedInfoService: UpdatedRecordService,
              private timezoneService: TimezoneService) {
  }

  ngOnInit(): void {

    combineLatest([this.updatedInfoService.updatedBellList$, this.timezoneService.timezone$])
      .subscribe((results) => {
        const tz = results[1]
        const updatedInfoList = results[0]
        if (updatedInfoList.length) {
          const timestamp = updatedInfoList[0].timestamp
          this.scheduleUpdatedTime = moment(timestamp).tz(tz).format('YYYY-MM-DD HH:mm')
        }
      })
  }

  click(): void {
    this.backgroundImageExample2?.hide()
  }
}
