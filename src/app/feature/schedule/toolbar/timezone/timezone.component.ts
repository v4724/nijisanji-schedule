import { Component, Input, isDevMode, OnInit } from '@angular/core'
import * as moment from 'moment-timezone'
import { TimezoneService } from '@app/feature/schedule/toolbar/timezone/timezone.service'
import { AdminService } from '@app/service/admin.service'
import { timezoneEntries, timezoneValues } from '@app/feature/schedule/data/Timezone'

@Component({
  selector: 'app-timezone',
  templateUrl: './timezone.component.html',
  styleUrls: ['./timezone.component.scss']
})
export class TimezoneComponent implements OnInit {

  @Input() selectable: boolean = false;
  testTimezone: boolean = false

  timezones = moment.tz.names()

  timezone: string = '';

  constructor(private tzService: TimezoneService,
              public adminService: AdminService) {
    if (isDevMode()) {
      this.testTimezone = true
      this.timezones = timezoneValues
    }
  }

  ngOnInit(): void {
    this.tzService.timezone$.subscribe((timezone) => {
      this.timezone = timezone
    })

    this.adminService.editable$.subscribe((editable) => {
      if (editable) {
        const origTz = moment.tz.guess()
        this.timezones = timezoneValues
        if (this.timezones.indexOf(origTz) === -1) {
          this.timezones.push(origTz)
        }
      } else {
        this.timezones = moment.tz.names()
      }
    })
  }

  changeTimezone(): void {
    this.tzService.timezone$.next(this.timezone)
  }
}
