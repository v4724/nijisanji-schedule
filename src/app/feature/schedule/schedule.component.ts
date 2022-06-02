import { Component, OnInit, isDevMode } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router'

enum Schedule {
  Date='date',
  Month='month',
  Week='',
  New='new'
}

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  isDevMode = isDevMode

  Schedule = Schedule
  current: Schedule = Schedule.Week
  constructor(private router: Router) { }

  ngOnInit(): void {
    const url = this.router.url
    this.updateCurrentByUrl(url)

    // 上下頁不會觸發狀態改變
    this.router.events
      .subscribe((e) => {
        if (e instanceof NavigationEnd) {
          this.updateCurrentByUrl(e.url)
        }
      })
  }

  updateCurrentByUrl(url: string): void {
    if (url.startsWith('/')) {
      url = url.substr(1, url.length)
    }
    this.current = url as Schedule
  }
}
