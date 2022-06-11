import { Component, ComponentRef, OnInit, ViewChild } from '@angular/core'
import { AdminService } from '@app/service/admin.service'
import { MdbCollapseDirective } from 'mdb-angular-ui-kit/collapse'

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  @ViewChild('backgroundImageExample2') backgroundImageExample2: MdbCollapseDirective | undefined

  constructor(public adminService: AdminService) {
  }

  ngOnInit(): void {

  }

  click(): void {
    this.backgroundImageExample2?.hide()
  }
}
