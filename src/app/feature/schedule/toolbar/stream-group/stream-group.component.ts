import { Component, OnInit } from '@angular/core'
import { StreamGroupService } from '@app/feature/schedule/toolbar/stream-group/stream-group.service'
import { groups, StreamerGroup } from '@app/feature/schedule/data/StreamerGroups'

@Component({
  selector: 'app-stream-group',
  templateUrl: './stream-group.component.html',
  styleUrls: ['./stream-group.component.scss']
})
export class StreamGroupComponent implements OnInit {

  groups = groups
  group: StreamerGroup = StreamerGroup.All

  constructor(private streamGroupService: StreamGroupService) { }

  ngOnInit(): void {
    this.group = this.streamGroupService.group$.getValue()
  }

  changeGroup(): void {
    this.streamGroupService.group$.next(this.group)
  }
}
