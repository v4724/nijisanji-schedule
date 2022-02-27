import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
