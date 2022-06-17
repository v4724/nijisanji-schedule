import { Component, OnInit } from '@angular/core'
import { StreamGroupService } from '@app/service/stream-group.service'

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
  selectedGroups: Array<string> = []

  constructor(private streamGroupService: StreamGroupService) { }

  ngOnInit(): void {

    this.streamGroupService.group$.subscribe((groups) => {
      this.groups = []
      groups.forEach(group => {
        this.groups.push({
          text: group,
          checked: true
        })
      })

      this.selectedGroups = groups
      this.changeGroup()
    })
  }

  toggleSelection(group: Group): void {
    group.checked = !group.checked
    const index = this.selectedGroups.indexOf(group.text)

    if (index > -1) {
      this.selectedGroups.splice(index, 1)
    } else {
      this.selectedGroups.push(group.text)
    }

    this.changeGroup()
  }

  changeGroup(): void {
    this.streamGroupService.selectedGroup$.next(this.selectedGroups)
  }
}
