import { Component, OnInit } from '@angular/core';
import * as moment from 'moment-timezone'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  scheduleUpdatedTime: string = ''

  constructor() {
    this.scheduleUpdatedTime = moment(1647174061089).format('YYYY-MM-DD HH:mm')
  }

  ngOnInit(): void {
  }

}
