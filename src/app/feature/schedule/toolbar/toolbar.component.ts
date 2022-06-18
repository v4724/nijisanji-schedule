import { Component, OnInit } from '@angular/core';
import * as moment from 'moment-timezone'
import { StreamService } from '@app/service/stream.service'
import { TimezoneService } from '@app/feature/schedule/toolbar/timezone/timezone.service'
import { combineLatest } from 'rxjs'
import { ScheduleCheckedService } from '@app/service/schedule-checked.service'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  scheduleUpdatedTime: string = ''

  constructor(private scheduleCheckedService: ScheduleCheckedService,
              private timezoneService: TimezoneService) {

  }

  ngOnInit(): void {

    combineLatest([this.scheduleCheckedService.lastUpdateTimestamp$, this.timezoneService.timezone$])
      .subscribe((result) => {
        const tz = result[1]
        const timestamp = result[0]
        if (timestamp > -1) {
          this.scheduleUpdatedTime = moment(timestamp).tz(tz).format('YYYY-MM-DD HH:mm')
        } else {
          this.scheduleUpdatedTime = 'Long Time Ago pien'
        }
      })
  }

}
