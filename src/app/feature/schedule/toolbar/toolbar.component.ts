import { Component, OnInit } from '@angular/core';
import * as moment from 'moment-timezone'
import { StreamService } from '@app/service/stream.service'
import { TimezoneService } from '@app/feature/schedule/toolbar/timezone/timezone.service'
import { combineLatest } from 'rxjs'
import { ScheduleCheckedService } from '@app/service/schedule-checked.service'
import { UpdatedInfoService } from '@app/service/updated-info.service'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  scheduleUpdatedTime: string = ''

  constructor(private updatedInfoService: UpdatedInfoService,
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

}
