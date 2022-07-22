import { Component, Input, isDevMode, OnInit } from '@angular/core'
import * as moment from 'moment-timezone'
import { TimezoneService } from '@app/layout/timezone/timezone.service'
import { AdminService } from '@app/service/admin.service'

@Component({
  selector: 'app-timezone',
  templateUrl: './timezone.component.html',
  styleUrls: ['./timezone.component.scss']
})
export class TimezoneComponent implements OnInit {

  @Input() selectable: boolean = false;

  timezone: string = '';

  constructor(public tzService: TimezoneService,
              public adminService: AdminService) {

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
