import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { StreamGroupService } from '@app/feature/schedule/toolbar/stream-group/stream-group.service'
import { groups, StreamerGroup } from '@app/feature/schedule/data/StreamerGroups'

@Component({
  selector: 'app-stream-group',
  templateUrl: './stream-group.component.html',
  styleUrls: ['./stream-group.component.scss']
})
export class StreamGroupComponent implements OnInit, AfterViewInit {
  @ViewChild('multiSelectRef') multiSelectRef!: ElementRef
  @ViewChild('overSelectRef') overSelectRef!: ElementRef

  groups: Array<{ text: string, checked: boolean}> = []
  selectedGroups: Array<StreamerGroup> = []

  expanded: boolean = false;

  constructor(private streamGroupService: StreamGroupService) {
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement
      if (!this.targetIsMultiSelect(target) && !this.targetIsMultiSelectDiv(target)) {
        this.expanded = false
      }
    });
  }

  targetIsMultiSelectDiv(target: HTMLElement): boolean {
    return target === this.multiSelectRef.nativeElement
  }

  targetIsMultiSelect(target: HTMLElement): boolean {
    const children = this.overSelectRef.nativeElement.children

    for (let child of children) {
      if (child === target) {
        return true
      }
    }
    if (target.classList.contains('over-select-checkbox')) {
      return true
    }

    return false
  }

  ngOnInit(): void {
    this.selectedGroups = this.streamGroupService.group$.getValue()

    groups.forEach(group => {
      this.groups.push({
        text: group,
        checked: this.selectedGroups.indexOf(group as StreamerGroup) > -1
      })
    })
  }

  ngAfterViewInit(): void {
  }

  showCheckboxes($e: Event): void {

    const target = $e.target as HTMLElement
    if (this.targetIsMultiSelect(target)) {
      return
    }

    this.expanded = !this.expanded
  }

  toggleSelection(group: { text: string, checked: boolean }): void {
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
