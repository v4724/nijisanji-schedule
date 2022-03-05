import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Group } from '@app/feature/schedule/toolbar/stream-group/stream-group.component'

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() groups: Array<Group> = []
  @Output() toggleSelection = new EventEmitter<Group>();

  constructor() { }

  ngOnInit(): void {
  }

}
