import { Component, ElementRef, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core'
import { Group } from '@app/feature/schedule/toolbar/stream-group/stream-group.component'
import { StreamGroupService } from '@app/feature/schedule/toolbar/stream-group/stream-group.service'

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements OnInit {

  @ViewChild('multiSelectRef') multiSelectRef!: ElementRef
  @ViewChild('overSelectRef') overSelectRef!: ElementRef

  @Input() groups: Array<Group> = []
  @Output() toggleSelection = new EventEmitter<Group>();

  displayText: string = ''
  expanded: boolean = false;

  constructor(private streamGroupService: StreamGroupService) {
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement
      if (!this.targetIsMultiSelect(target) && !this.targetIsMultiSelectDiv(target)) {
        this.expanded = false
      }
    });
  }

  ngOnInit(): void {
    this.streamGroupService.group$.subscribe((groups) => {
      this.displayText = groups.join(',')
    })
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

  showCheckboxes($e: Event): void {

    const target = $e.target as HTMLElement
    if (this.targetIsMultiSelect(target)) {
      return
    }

    this.expanded = !this.expanded
  }
}
