import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router'

enum Schedule {
  Date='date',
  Month='month',
  Week=''
}

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  Schedule = Schedule
  current: Schedule = Schedule.Week

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    // 上下頁不會觸發狀態改變
    this.router.events
      .subscribe((e) => {
        if (e instanceof NavigationEnd) {
          const url = e.url.substr(1, e.url.length)
          this.current = url as Schedule
        }
      })
  }

}
