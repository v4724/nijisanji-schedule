import { Component, OnInit } from '@angular/core';
import { StreamerInfo, streamers } from '@app/feature/schedule/data/StreamerInfo'
import { openUrl } from '@app/feature/schedule/utils'

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  streamers: Array<StreamerInfo> = streamers
  openUrl = openUrl
  constructor() { }

  ngOnInit(): void {
  }

}
