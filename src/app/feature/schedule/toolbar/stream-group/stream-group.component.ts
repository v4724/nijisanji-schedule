import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { groups, StreamerGroup } from '@app/feature/schedule/data/StreamerGroups'
import { StreamGroupService } from '@app/feature/schedule/toolbar/stream-group/stream-group.service'

export interface Group {
  text: string,
  checked: boolean
}

@Component({
  selector: 'app-stream-group',
  templateUrl: './stream-group.component.html',
  styleUrls: ['./stream-group.component.scss']
})
export class StreamGroupComponent implements OnInit {

  groups: Array<Group> = []
  selectedGroups: Array<StreamerGroup> = []

  constructor(private streamGroupService: StreamGroupService) { }

  ngOnInit(): void {
    this.selectedGroups = this.streamGroupService.group$.getValue()

    groups.forEach(group => {
      this.groups.push({
        text: group,
        checked: this.selectedGroups.indexOf(group as StreamerGroup) > -1
      })
    })
  }

  toggleSelection(group: Group): void {
    group.checked = !group.checked
    const index = this.selectedGroups.indexOf(group.text as StreamerGroup)

    if (index > -1) {
      this.selectedGroups.splice(index, 1)
    } else {
      this.selectedGroups.push(group.text as StreamerGroup)
    }

    this.changeGroup()
  }

  changeGroup(): void {
    this.streamGroupService.group$.next(this.selectedGroups)
  }
}
