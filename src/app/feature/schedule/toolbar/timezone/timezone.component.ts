import { Component, Input, isDevMode, OnInit } from '@angular/core'
import * as moment from 'moment-timezone'
import { TimezoneService } from '@app/feature/schedule/toolbar/timezone/timezone.service'

@Component({
  selector: 'app-timezone',
  templateUrl: './timezone.component.html',
  styleUrls: ['./timezone.component.scss']
})
export class TimezoneComponent implements OnInit {

  @Input() selectable: boolean = false;
  testTimezone: boolean = false

  countries = moment.tz.names()

  timezone: string = '';

  constructor(private tzService: TimezoneService) {
    if (isDevMode()) {
      this.testTimezone = true
    }
  }

  ngOnInit(): void {
    this.tzService.timezone$.subscribe((timezone) => {
      this.timezone = timezone
    })
  }

  changeTimezone(): void {
    this.tzService.timezone$.next(this.timezone)
  }
}
