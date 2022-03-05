import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-icon-def',
  templateUrl: './icon-def.component.html',
  styleUrls: ['./icon-def.component.scss']
})
export class IconDefComponent implements OnInit {

  @Input() canCollapse: boolean = false

  expand: boolean = true;

  constructor() { }

  ngOnInit(): void {
    if (this.canCollapse) {
      this.expand = false
    }
  }

}
